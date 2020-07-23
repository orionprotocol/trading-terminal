import React, { memo, useCallback,useEffect,useState } from 'react';
/* MODULES */
import { web3 } from "../../services/Fortmatic"
import { ethereum } from "../../services/Coinbase";
/* DEPENDENCIES */
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'antd';
/* STYLES */
import './index.scss'

const walletsList =[
    {
        id:'metamask',
        name:'Metamask',
        logo: '/img/icons/modal_metamask.svg',
    },
    {
        id:'formatic',
        name:'Formatic',
        logo: '/img/icons/modal_fortmatic.svg',
    },
     {
        id:'coin_base',
        name:'Coinbase Wallet',
        logo: '/img/icons/modal_coinbase.svg',
    },
    /*{
        id:'key_store',
        name:'Keystore',
        logo: '/img/icons/modal_keystore.svg',
    },
    {
        id:'private_key',
        name:'Privatekey',
        logo: '/img/icons/modal_private_key.svg',
    } */
]

const AddWallet = memo(() => {
  /* REDUX */
  const dispatch = useDispatch();

  const mode = useSelector((state) => state.general.mode);
  const walletOpt = useSelector((state) => state.wallet.walletOpt);
  const addWallet = useSelector((state) => state.wallet.addWallet);

  const setWalletOpt = useCallback((payload) => dispatch({ type: 'SetWalletOpt', payload }), [
    dispatch,
  ]);
  const setWanmaskConnect = useCallback(
    (payload) => dispatch({ type: 'SetWanmaskConnect', payload }),
    [dispatch]
  );
  const setMetamaskConnect = useCallback(
    (payload) => dispatch({ type: 'SetMetamaskConnect', payload }),
    [dispatch]
  );
  const setFortmaticConnect = useCallback(
    (payload) => dispatch({ type: 'SetFortmaticConnect', payload }),
    [dispatch]
  );
  const SetCoinbaseConnect = useCallback(
    (payload) => dispatch({ type: 'SetCoinbaseConnect', payload }),
    [dispatch]
  );
  const setEthAddress = useCallback((payload) => dispatch({ type: 'SetEthAddress', payload }), [
    dispatch,
  ]);
  const setAddWallet = useCallback((payload) => dispatch({ type: 'SetAddWallet', payload }), [
    dispatch,
  ]);

  /* REDUX */

  const [opts, setOpts] = useState([]);
  const [opt, setOpt] = useState("");



/* OPEN MODAL EFFECT */
useEffect(() => {
/* Change the redux state called  WalletOpt  to ethereum when the user open the modal, and change it again to the original state when the user close it*/
    if(addWallet){
        setWalletOpt('ethereum');// state when the modal was open by the user
    }else{
        setWalletOpt('wanchain');//original state in redux
    }
}, [addWallet]);
/*END OF OPEN MODAL EFFECT */

/* Conect wallet function */
const handleConnect = async (id) => {
  switch (id) {
    case "WanMask":
      localStorage.setItem("wanmaskConnected", "true");
      setWanmaskConnect(true);
      setAddWallet(false)
      break;
    case "metamask":
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.enable();
          // console.log('accounts', accounts);
          localStorage.setItem("metamaskConnected", "true");
          localStorage.setItem("address", accounts[0]);
          setMetamaskConnect(true);
          setAddWallet(false)
        } catch (err) {
          console.log(err);
        }
      }
      break;
    case "formatic":
      web3.eth.getAccounts((error, accounts) => {
        if (accounts !== undefined && accounts.length > 0) {
          // console.log('ethAddress', ethAddress);
          setFortmaticConnect(true);
          setEthAddress(accounts[0]);
          localStorage.setItem("fortmaticConnected", "true");
          setAddWallet(false)
        }
      });
      break;
    case "coin_base":
      ethereum.send("eth_requestAccounts").then((accounts) => {
        console.log(`User's address is ${accounts[0]}`);
        SetCoinbaseConnect(true);
        setEthAddress(accounts[0]);
        localStorage.setItem("coinbaseConnected", "true");
        setAddWallet(false)
        // Optionally, have the default account set for web3.js
        web3.eth.defaultAccount = accounts[0];
      });
      break;
    default:
      break;
  }
};
/*END OF Conect wallet function */
  return (
    <Modal
    title='Add wallet'
      wrapClassName={`modal-custom-addwallet ${mode}`}
      centered={true}
      visible={addWallet}
      footer={null}
      onCancel={()=>setAddWallet(!addWallet)}
    >
      <h5>Choose your wallet</h5>
      <div className="container-wallets">
        {walletsList.map((res,key)=>{
            return(
                <div key={key} className="wallet" onClick={()=>handleConnect(res.id)}>
                    <img src={res.logo} alt={res.name}/>
                    <span>{res.name}</span>
                </div>
            )
        })}
        {/* <div  className="wallet">
            <p>Other wallets</p>
        </div> */}
      </div>
      
    </Modal>
  );
});

export default AddWallet;
