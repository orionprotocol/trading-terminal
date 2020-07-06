import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
// import { deposit, withdraw } from '../../../services/Metamask';
import {
  deposit as depositWan,
  withdraw as withdrawWan,
} from "../../../services/Wanmask";

import Contract from "../../../services/Contract";

const Line = (props) => {
  const [depositModal, toggleDepositModal] = useState(false);
  const [withdrawModal, toggleWithdrawModal] = useState(false);
  const wanmaskConnected = useSelector(
    (state) => state.wallet.wanmaskConnected
  );
  const metamaskConnected = useSelector(
    (state) => state.wallet.metamaskConnected
  );
  const fortmaticConnected = useSelector(
    (state) => state.wallet.fortmaticConnected
  );
  const coinbaseConnected = useSelector(
    (state) => state.wallet.coinbaseConnected
  );
  const assets = useSelector((state) => state.wallet.assets);
  const ethAddress = useSelector((state) => state.wallet.ethAddress);
  const [contract, setContract] = useState();

  useEffect(
    (_) => {
      if (metamaskConnected) {
        setContract(new Contract("metamask"));
      } else if (fortmaticConnected) {
        setContract(new Contract("fortmatic"));
      } else if (coinbaseConnected) {
        setContract(new Contract("coinbase"));
      }
    },
    [metamaskConnected, fortmaticConnected, coinbaseConnected]
  );

  const currentAccount = localStorage.getItem("currentAccount");
  const handleTrade = (_) => props.history.push("/home");
  const handleDeposit = (_) => {
    toggleDepositModal(!depositModal);
  };
  const handleWithdraw = (_) => {
    toggleWithdrawModal(!withdrawModal);
  };

  const submitDeposit = async (amount) => {
    if (wanmaskConnected) {
      await depositWan(props.currency.toLowerCase(), amount, currentAccount);
    } else if (metamaskConnected || fortmaticConnected || coinbaseConnected) {
      // const address = window.ethereum.selectedAddress;
      let asset = assets[props.currency.toUpperCase()].toLowerCase();
      contract.deposit(asset, amount, ethAddress, metamaskConnected);
    }
    handleDeposit();
  };

  const submitWithdraw = async (amount) => {
    if (wanmaskConnected) {
      await withdrawWan(props.currency.toLowerCase(), amount, currentAccount);
    } else if (metamaskConnected || fortmaticConnected || coinbaseConnected) {
      // const address = window.ethereum.selectedAddress;
      let asset = assets[props.currency.toUpperCase()].toLowerCase();
      /*   setTimeout(() => {
                
            }, 2000); */
      contract.withdraw(asset, amount, ethAddress, metamaskConnected);
      handleWithdraw();
    }
    // handleWithdraw();
  };

  return (
    <div className="line">
      <div className="cell emp coins">
        <img
          src={props.img}
          alt={props.currency}
          style={{ width: 20, height: 20 }}
        />
        <span>{props.currency}</span>
      </div>
      <span className="cell">
        <span className="title-m">Wallet</span>
        {props.wallet}
      </span>
      <span className="cell">
        <span className="title-m">Contract</span> {props.contract}
      </span>
      <span className="cell">
        <span className="title-m">In open order</span> 0
      </span>
      <div className="cell actions">
        <button className="action" onClick={handleDeposit}>
          <FontAwesomeIcon icon="arrow-down" />
          <span>Deposit</span>
        </button>
        <button className="action withdraw" onClick={handleWithdraw}>
          <FontAwesomeIcon icon="arrow-up" />
          <span>Withdraw</span>
        </button>
        <button className="action" onClick={handleTrade}>
          <FontAwesomeIcon icon="exchange-alt" />
          <span>Trade</span>
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
    </div>
  );
};

export default Line;
