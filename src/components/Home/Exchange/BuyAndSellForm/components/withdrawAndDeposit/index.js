import React, { useState, useEffect, memo } from 'react';
import Modal from './components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
// import { deposit, withdraw } from '../../../services/Metamask';
import { deposit as depositWan, withdraw as withdrawWan } from '../../../../../../services/Wanmask';
import Contract from '../../../../../../services/Contract';

import Alert from '../../../../../../css/icons/alert-exchange.svg';

const WithdrawAndDeposit = memo((props) => {
  const symbolA = useSelector((state) => state.general.symbolA);
  const mode = useSelector((state) => state.general.mode);
  const wanmaskConnected = useSelector((state) => state.wallet.wanmaskConnected);
  const metamaskConnected = useSelector((state) => state.wallet.metamaskConnected);
  const fortmaticConnected = useSelector((state) => state.wallet.fortmaticConnected);
  const coinbaseConnected = useSelector((state) => state.wallet.coinbaseConnected);
  const assets = useSelector((state) => state.wallet.assets);
  const ethAddress = useSelector((state) => state.wallet.ethAddress);

  const [depositModal, toggleDepositModal] = useState(false);
  const [withdrawModal, toggleWithdrawModal] = useState(false);
  const [contract, setContract] = useState();
  const [conBalance, setconBalance] = useState(0);
  const [wallBalance, setwallBalance] = useState(0);
  useEffect(
    (_) => {
      if (metamaskConnected) {
        setContract(new Contract('metamask'));
      } else if (fortmaticConnected) {
        setContract(new Contract('fortmatic'));
      } else if (coinbaseConnected) {
        setContract(new Contract('coinbase'));
      }
    },
    [metamaskConnected, fortmaticConnected, coinbaseConnected]
  );
  useEffect(() => {
    if (props.balances) {
      for (const asset in props.balances.contractBalances) {
        if (asset.includes(symbolA)) {
          if (props.balances.contractBalances[asset] !== '')
            setconBalance(props.balances.contractBalances[asset]);
        }
      }
      for (const asset in props.balances.walletBalances) {
        if (asset.includes(symbolA)) {
          if (props.balances.walletBalances[asset] !== '')
            setwallBalance(props.balances.walletBalances[asset]);
        }
      }
    }
  }, [props.balances, symbolA]);

  const currentAccount = localStorage.getItem('currentAccount');

  const handleDeposit = (_) => {
    toggleDepositModal(!depositModal);
  };
  const handleWithdraw = (_) => {
    toggleWithdrawModal(!withdrawModal);
  };

  const submitDeposit = async (amount) => {
    if (wanmaskConnected) {
      await depositWan(symbolA.toLowerCase(), amount, currentAccount);
    } else if (metamaskConnected || fortmaticConnected || coinbaseConnected) {
      // const address = window.ethereum.selectedAddress;
      let asset = assets[symbolA.toUpperCase()].toLowerCase();
      contract.deposit(asset, amount, ethAddress, metamaskConnected);
    }
    handleDeposit();
  };

  const submitWithdraw = async (amount) => {
    if (wanmaskConnected) {
      await withdrawWan(symbolA.toLowerCase(), amount, currentAccount);
    } else if (metamaskConnected || fortmaticConnected || coinbaseConnected) {
      // const address = window.ethereum.selectedAddress;
      let asset = assets[symbolA.toUpperCase()].toLowerCase();
      /*   setTimeout(() => {
                
            }, 2000); */
      contract.withdraw(asset, amount, ethAddress, metamaskConnected);
      handleWithdraw();
    }
    // handleWithdraw();
  };

  return (
    <>
      <div className={`container-dep-with ${mode}`}>
        {conBalance === 0 && wallBalance === 0 ? (
          <div className="alert-message">
            <span>
              <img src={Alert} alt="replenish the balance" />
            </span>
            {localStorage.getItem('address') ? (
              <span>First you need to replenish the balance of the contract</span>
            ) : (
              <span>First you need to add a wallet</span>
            )}
          </div>
        ) : (
          <>
            <span>Wallet</span>
            <span>Contract</span>
            <span>{parseFloat(wallBalance).toPrecision(8)}</span>
            <span>{conBalance}</span>
          </>
        )}

        <button
          disabled={(conBalance === 0 && wallBalance === 0) || parseFloat(wallBalance) <= 0}
          type="button"
          onClick={handleDeposit}
        >
          {' '}
          <i className="fa fa-arrow-down"></i> Deposit{' '}
        </button>
        <button
          disabled={(conBalance === 0 && wallBalance === 0) || parseFloat(conBalance) <= 0}
          type="button"
          onClick={handleWithdraw}
        >
          {' '}
          <i className="fa fa-arrow-up"></i> Withdraw{' '}
        </button>
      </div>
      <Modal
        mode={mode}
        show={depositModal}
        operation="Deposit"
        toggle={(_) => toggleDepositModal(!depositModal)}
        submit={submitDeposit}
      />
      <Modal
        mode={mode}
        show={withdrawModal}
        operation="Withdraw"
        toggle={(_) => toggleWithdrawModal(!withdrawModal)}
        submit={submitWithdraw}
        maxWithdraw={props.contractBalance}
      />
    </>

    /* <div className="line">
      
      <div className="cell actions">
        <button className="action" onClick={handleDeposit}>
          <FontAwesomeIcon icon="arrow-down" />
          <span>Deposit</span>
        </button>
        <button className="action withdraw" onClick={handleWithdraw}>
          <FontAwesomeIcon icon="arrow-up" />
          <span>Withdraw</span>
        </button>
      </div>

      <Modal
        show={depositModal}
        operation="Deposit"
        toggle={(_) => toggleDepositModal(!depositModal)}
        submit={submitDeposit}
      />
      <Modal
        show={withdrawModal}
        operation="Withdraw"
        toggle={(_) => toggleWithdrawModal(!withdrawModal)}
        submit={submitWithdraw}
        maxWithdraw={props.contract}
      />
    </div> */
  );
});

export default WithdrawAndDeposit;
