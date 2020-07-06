import React, { memo, useEffect, useState, useCallback } from "react";
import WalletLink from "walletlink";
import Web3 from "web3";
import { useSelector, useDispatch } from "react-redux";

// TypeScrip
const APP_NAME = "Orion";
const APP_LOGO_URL = "https://demo.orionprotocol.io/img/logo.png";
const ETH_JSONRPC_URL =
  "https://ropsten.infura.io/v3/e7e50056370b47e0b71bdbc746887727";
const CHAIN_ID = 3;

// Initialize WalletLink
const walletLink = new WalletLink({
  appName: APP_NAME,
  appLogoUrl: APP_LOGO_URL,
  darkMode: false,
});
// Initialize a Web3 Provider object
export const ethereum = walletLink.makeWeb3Provider(ETH_JSONRPC_URL, CHAIN_ID);
// Initialize a Web3 object
export const web3 = new Web3(ethereum);

const Coinbase = memo(() => {
  const dispatch = useDispatch();
  const coinbaseConnected = useSelector(
    (state) => state.wallet.coinbaseConnected
  );
  const SetCoinbaseConnect = useCallback(
    (payload) => dispatch({ type: "SetCoinbaseConnect", payload }),
    [dispatch]
  );
  const setEthAddress = useCallback(
    (payload) => dispatch({ type: "SetEthAddress", payload }),
    [dispatch]
  );

  useEffect(() => {
    if (coinbaseConnected) {
      // la funcion getAccounts es llamada al momento de conectar esta wallet
      // al exchange
      ethereum.send("eth_requestAccounts").then((accounts) => {
        console.log(`User's address is ${accounts[0]}`);
        SetCoinbaseConnect(true);
        setEthAddress(accounts[0]);
        localStorage.setItem("ethAddress", accounts[0]);

        // Optionally, have the default account set for web3.js
        web3.eth.defaultAccount = accounts[0];
      });
    }
  }, [coinbaseConnected]);

  return null;
});

export default Coinbase;
