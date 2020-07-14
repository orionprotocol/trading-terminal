import React, { useState, useEffect } from 'react';
import Modal from './components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
// import { deposit, withdraw } from '../../../services/Metamask';
import { deposit as depositWan, withdraw as withdrawWan } from '../../../../../../services/Wanmask';

import Contract from '../../../../../../services/Contract';

const WithdrawAndDeposit = (props) => {
  const [depositModal, toggleDepositModal] = useState(false);
  const [withdrawModal, toggleWithdrawModal] = useState(false);
  const symbolA = useSelector((state) => state.general.symbolA);
  const mode = useSelector((state) => state.general.mode);
  const wanmaskConnected = useSelector((state) => state.wallet.wanmaskConnected);
  const metamaskConnected = useSelector((state) => state.wallet.metamaskConnected);
  const fortmaticConnected = useSelector((state) => state.wallet.fortmaticConnected);
  const coinbaseConnected = useSelector((state) => state.wallet.coinbaseConnected);
  const assets = useSelector((state) => state.wallet.assets);
  const ethAddress = useSelector((state) => state.wallet.ethAddress);
  const [contract, setContract] = useState();
/* console.log(depositModal,withdrawModal) */
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
      <button type='button' onClick={handleDeposit}>
        {' '}
        <i className="fa fa-arrow-up"></i> Deposit{' '}
      </button>
      <button type='button' onClick={handleWithdraw}>
        {' '}
        <i className="fa fa-arrow-down"></i> Withdraw{' '}
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
};

export default WithdrawAndDeposit;
