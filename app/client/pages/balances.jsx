import React from "react";
import { Modal } from "react-bootstrap";
import QRCode from "qrcode.react";
const regtestUtils = require("../../service/_regtest");
var orion = require("orion-atomic");
const wc = require("@waves/waves-crypto");

import ReactDOM from "react-dom";
import { Toastr } from "../../service/Toastr";
import { getBalance, deposit, withdraw, getWalletBalance } from '../components/wanmask.js'
import tokens from '../components/tokens.js'
import { getBalances } from "../../service/OrionWanchain";
import { balance } from "@waves/waves-transactions/dist/nodeInteraction";
import { URL_SOCKET } from '../../constants.js';

const
    io = require("socket.io-client"),
    socket = io.connect(URL_SOCKET);

class Balance extends React.Component {
    constructor() {
        super();
        this.state = {
            modal: false,
            walletBalances: {
                BTC: 0,
                ETH: 0,
                WAN: 0
            },
            balances: {
                BTC: 0,
                ETH: 0,
                WAN: 0
            },
            amount: 0,
            option: '',
            currentCurrency: ''
        };

        this.loadBalance = this.loadBalance.bind(this);
        this.renderBalances = this.renderBalances.bind(this);
        this.mapToImage = this.mapToImage.bind(this);
        this.showDeposit = this.showDeposit.bind(this);

        orion.wavesSwap.settings.network = "T";
        orion.wavesSwap.settings.nodeUrl =
            "https://pool.testnet.wavesnodes.com";
        orion.wavesSwap.settings.assetId =
            "EBJDs3MRUiK35xbj59ejsf5Z4wH9oz6FuHvSCHVQqZHS";
    }

    async componentDidMount() {
        // orion.btcSwap.settings.network = regtestUtils.network;
        // orion.btcSwap.settings.client = {
        //     unspents: regtestUtils.unspents,
        //     calcFee: regtestUtils.calcFee,
        //     getBalance: regtestUtils.getBalance
        // };
        // setInterval(() => {
        //     this.loadBalance();
        // }, 1000);

        // this.loadWanchainBalances()
        // this.loadWalletBalance()

        this.loadOrionWanchainBalances()
        this.connect()
    }

    connect = _ => {
        
        let currentAccount = localStorage.getItem('currentAccount');

        socket.on('connect', _ => {
            console.log('Connected');
            socket.emit('clientAddress', wan3.toChecksumAddress(currentAccount))
        });
        
        socket.on('balanceChange', data => {
            // console.log('Balance Change: ', data);
                        
            // if( wan3.toChecksumAddress(data.user) === wan3.toChecksumAddress(currentAccount)){
            //     let balances = this.state.balances
            //     let walletBalances = this.state.walletBalances
            //     if( data.asset === 'WETH'){
            //         balances['ETH'] = Number(data.newBalance) * 1000000000000000000
            //         walletBalances['ETH'] = data.newWalletBalance
            //     }else if(data.asset === 'WBTC'){
            //         balances['BTC'] = Number(data.newBalance) * 100000000
            //         walletBalances['BTC'] = data.newWalletBalance
            //     }else{
            //         balances[data.asset] = Number(data.newBalance) * 1000000000000000000
            //         walletBalances[data.asset] = data.newWalletBalance
            //     }
                
            //     this.setState({ balances, walletBalances })

            //     console.log('Balances updated...');
            // }

            if( wan3.toChecksumAddress(data.user) === wan3.toChecksumAddress(currentAccount)){
                let balances = this.state.balances
                let walletBalances = this.state.walletBalances
                if( data.asset === 'WETH'){
                    balances['ETH'] = data.newBalance
                    walletBalances['ETH'] = data.newWalletBalance
                }else if(data.asset === 'WBTC'){
                    balances['BTC'] = data.newBalance
                    walletBalances['BTC'] = data.newWalletBalance
                }else{
                    balances[data.asset] = data.newBalance
                    walletBalances[data.asset] = data.newWalletBalance
                }
                this.setState({ balances, walletBalances })
                console.log('Balances updated...');
            }

            socket.emit('balanceChange', 'received balance change');
        });
    }

    loadOrionWanchainBalances = async _ => {
        
        let currentAccount = localStorage.getItem('currentAccount');
        const balances = await getBalances(currentAccount)
        let walletBalances = {}
        let contractBalances = {}

        for(let currency in balances.contractbalances){
         

            if( currency === 'WBTC'){
                contractBalances['BTC'] = balances.contractbalances[currency]
            }else if( currency === 'WETH'){
                contractBalances['ETH'] =  balances.contractbalances[currency]
            }else{
                contractBalances[currency] = balances.contractbalances[currency]
            }
            this.setState({ balances: contractBalances })
        }

        for(let currency in balances.walletBalances){
          

            if( currency === 'WBTC'){
                walletBalances['BTC'] = balances.walletBalances[currency]
            }else if( currency === 'WETH'){
                walletBalances['ETH'] = balances.walletBalances[currency]
            }else{
                walletBalances[currency] = balances.walletBalances[currency]
            }
            this.setState({ walletBalances: walletBalances })
        }
    }

    // loadWalletBalance = async () => {
    //     let walletBalances = {}
    //     let currentAccount = localStorage.getItem('currentAccount');

    //     tokens.forEach( async token => {
    //         walletBalances[token] = await getWalletBalance(token, currentAccount)
    //         this.setState({ walletBalances })
    //     })
    // }

    // loadWanchainBalances = async _ => {
    //     let balances = {}
    //     const currentAccount = localStorage.getItem('currentAccount')

    //     tokens.forEach( async token => {
    //         balances[token] = await getBalance(token, currentAccount)
    //         this.setState({ balances })
    //     })
    // }

    loadBalance() {
        let seed = localStorage.getItem("seed") || "";
        let address = wc.address(seed, "T");
        if (address) {
            // let url = ${window.location.hostname}
            fetch(`https://demo.orionprotocol.io:2083/api/balance/${address}`, {
                credentials: "same-origin"
            })
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    console.log(data)
                    this.setState({ balances: data });
                });
        }
    }

    mapToImage(symbol) {
        switch (symbol) {
            case "btc":
                return "img/bitcoin.svg";
            case "waves":
                return "img/waves.svg";
            case "eth":
                return "img/ethereum.svg";
            case "xrp":
                return "img/ripple.svg";
            case "weth":
                return "img/weth.png";
            case "wbtc":
                return "img/wbtc.png";
            case "wan":
                return "img/wan.png";
        }
    }

    showDeposit(key) {
        if (key.toLowerCase() == "btc") {
            window.location.href = "/deposit";
        }
    }

    handleChange = e => {
        let newState = this.state
        newState[e.target.id] = e.target.value

        this.setState(newState)
    }

    renderBalances() {
        const { balances, walletBalances } = this.state;
        let renderedBalances = [];
        for (let key in balances) {
            if (balances.hasOwnProperty(key)) {
                const image = this.mapToImage(key.toLowerCase());
                renderedBalances.push(
                    <tr key={key}>
                        <td>
                            <div className="row" style={{ marginLeft: "5px" }}>
                                <div
                                    className="col-md-6 col-xs-6 balanceIcon"
                                    style={{
                                        backgroundSize: "100% 100%",
                                        backgroundImage: "url({image})".replace(
                                            "{image}",
                                            image
                                        )
                                    }}
                                />
                                <div
                                    className="col-md-6 col-xs-6 balanceText"
                                    style={{ paddingTop: "5px" }}
                                >
                                    {key}
                                </div>
                            </div>
                        </td>
                        <td>
                            <b>{walletBalances[key]}</b>
                        </td>
                        <td>
                            <b>{balances[key]}</b>
                        </td>
                        <td>
                            <button
                                // onClick={() => this.showDeposit(key)}
                                onClick={() => this.toggleModal('Deposit', key)}
                                className="btn  balance-btn"
                            >
                                Deposit
                            </button>
                        </td>
                        <td>
                            <button className="btn balance-btn"
                                onClick={() => this.toggleModal('Withdraw', key)}

                            >
                                Withdraw
                            </button>
                        </td>
                        {/* <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td> */}
                    </tr>
                );
            }
        }
        return renderedBalances;
    }

    toggleModal = (option = '', cur = '') => this.setState({modal: !this.state.modal, option, currentCurrency: cur})

    handleClick = async _ => {
        const { option, currentCurrency, amount, balances } = this.state
        console.log(currentCurrency);
        const currentAccount = localStorage.getItem('currentAccount')

        if( option === 'Deposit' ){
            let res = await deposit(currentCurrency, amount, currentAccount)
            // console.log(res)
            Toastr.showSuccess("Successful Deposit");
        }else if (option === 'Withdraw'){
            
            if(Number(amount) >  Number(balances[currentCurrency])){
                Toastr.showError("Insufficient balance");
                return
            }else{
                let res = await withdraw(currentCurrency, amount, currentAccount)
                // console.log(res)
                Toastr.showSuccess("Successful Withdrawal");
            }
           
        }
        this.toggleModal()
    }

    render() {
        const windowHeight = window.innerHeight + "px";
        let address = localStorage.getItem("address") || "";
        return (
            <div
                className="balanceContent"
                style={{
                    height: windowHeight
                }}
            >
                <div style={{ backgroundColor: "#fff", marginTop: "20px", overflowX: "scroll" }} className="balanceContent2">
                    <table
                        className="table"
                        id="balance"
                        style={{
                            width: "100%",
                            height: "100%",
                            minHeight: "100%"
                        }}
                    >
                        <thead>
                            <tr>
                                <td>Asset</td>
                                <td>Wallet Balance</td>
                                <td>Balance</td>
                                <td>Deposit</td>
                                <td>Withdraw</td>
                                {/* <td>Asset</td>
                                <td>Wallet Balance</td>
                                <td>Contract Balance</td>
                                <td>In Open Orders</td>
                                <td>Actions</td> */}
                            </tr>
                        </thead>
                        <tbody>{this.renderBalances()}</tbody>
                    </table>
                </div>
                <Modal show={this.state.modal} onHide={this.toggleModal}>
                    <Modal.Header>
                        <Modal.Title />
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{ backgroundColor: "#fff" }}>
                            <div>
                                <div className="container" style={{ width: '100%'}}>
                                    <div className="row" style={{ marginBottom: '10px'}}>
                                        <div className="col-12">

                                            <div className="col-md-12 text-center">
                                                <h3 style={{ color: '#656d75' }}>
                                                    {this.state.option} Amount
                                                </h3>
                                            </div>
                                        </div>
                                       
                                    </div>
                                    
                                    <div className="row" style={{ marginBottom: '10px'}}>
                                        <div
                                            style={{
                                                backgroundColor: "#f8f9fb",
                                                border: "1px solid #dae1e9",
                                                padding: "15px",
                                                borderRadius: "4px"
                                            }}
                                            className="col-12 text-center"
                                        >
                                            <input type="number" id="amount" onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                    
                                    <div
                                        className="row"
                                        style={{ marginBottom: '20px'}}
									>
										<div className="col-md-12 text-center">
											<button className="btn btn-primary" onClick={this.handleClick}>
												Send
											</button>
										</div>
									</div>
                                </div>
                            
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
export default Balance;
