import React from 'react';
import TopMenu from '../components/TopMenu'
import Sidebar from '../components/Sidebar'
import Wallets from '../components/Dashboard/Wallets'

function Dashboard() {
	return (
    <div>
    <TopMenu/>
    <div class="dashboard">

    <Sidebar/>

    <div class="my-container">
        <div class="my-row">
            <div class="graph">
                <h2>Total Balance</h2>
                <div class="graph-container" id="pie"></div>
                <div class="coins">
                    <div class="coin">
                        <div class="left"><img src="./img/dash-wallet.png" alt="dash"/><span class="name">DASH</span></div><span class="num">178.23960</span>
                    </div>
                    <div class="coin">
                        <div class="left"><img src="./img/btc-wallet.png" alt="dash"/><span class="name">BTC</span></div><span class="num">178.23960</span>
                    </div>
                    <div class="coin">
                        <div class="left"><img src="./img/eth-wallet.png" alt="dash"/><span class="name">eth</span></div><span class="num">178.23960</span>
                    </div>
                </div>
            </div>
            <div class="wrapper">
                <Wallets/>
                <div class="wallets-table">
                    <div class="titles">
                        <div class="title"><span>Token</span><img src="./img/arrow-down.svg" alt="dash"/></div>
                        <div class="title"><span>Wallet</span><img src="./img/arrow-down.svg" alt="dash"/></div>
                        <div class="title"><span>Contract</span><img src="./img/arrow-down.svg" alt="dash"/></div>
                        <div class="title"><span>In open order</span><img src="./img/arrow-down.svg" alt="dash"/></div>
                        <div class="title actions"><span>Actions</span></div>
                    </div>
                    <div class="lines">
                        <div class="line">
                            <div class="cell emp coins"><img src="./img/btc-color.png" alt="dash"/><span>BTC</span></div><span class="cell"><span class="title-m">Wallet</span> 1.46780990</span><span class="cell"><span class="title-m">Contract</span> 1.46780990</span><span class="cell"><span class="title-m">In open order</span> 0.26000000</span>
                            <div class="cell actions">
                                <button class="action"> <img src="./img/arrow.png" alt="dash"/><span>Deposit</span></button>
                                <button class="action withdraw"><img src="./img/arrow.png" alt="dash"/><span>Withdraw</span></button>
                                <button class="action"> <img src="./img/trade.png" alt="dash"/><span>Trade</span></button>
                            </div>
                        </div>
                        <div class="line">
                            <div class="cell emp coins"><img src="./img/btc-color.png" alt="dash"/><span>BTC</span></div><span class="cell"><span class="title-m">Wallet</span> 1.46780990</span><span class="cell"><span class="title-m">Contract</span> 1.46780990</span><span class="cell"><span class="title-m">In open order</span> 0.26000000</span>
                            <div class="cell actions">
                                <button class="action"> <img src="./img/arrow.png" alt="dash"/><span>Deposit</span></button>
                                <button class="action withdraw"><img src="./img/arrow.png" alt="dash"/><span>Withdraw</span></button>
                                <button class="action"> <img src="./img/trade.png" alt="dash"/><span>Trade</span></button>
                            </div>
                        </div>
                        <div class="line">
                            <div class="cell emp coins"><img src="./img/btc-color.png" alt="dash"/><span>BTC</span></div><span class="cell"><span class="title-m">Wallet</span> 1.46780990</span><span class="cell"><span class="title-m">Contract</span> 1.46780990</span><span class="cell"><span class="title-m">In open order</span> 0.26000000</span>
                            <div class="cell actions">
                                <button class="action"> <img src="./img/arrow.png" alt="dash"/><span>Deposit</span></button>
                                <button class="action withdraw"><img src="./img/arrow.png" alt="dash"/><span>Withdraw</span></button>
                                <button class="action"> <img src="./img/trade.png" alt="dash"/><span>Trade</span></button>
                            </div>
                        </div>
                        <div class="line">
                            <div class="cell emp coins"><img src="./img/btc-color.png" alt="dash"/><span>BTC</span></div><span class="cell"><span class="title-m">Wallet</span> 1.46780990</span><span class="cell"><span class="title-m">Contract</span> 1.46780990</span><span class="cell"><span class="title-m">In open order</span> 0.26000000</span>
                            <div class="cell actions">
                                <button class="action"> <img src="./img/arrow.png" alt="dash"/><span>Deposit</span></button>
                                <button class="action withdraw"><img src="./img/arrow.png" alt="dash"/><span>Withdraw</span></button>
                                <button class="action"> <img src="./img/trade.png" alt="dash"/><span>Trade</span></button>
                            </div>
                        </div>
                        <div class="line">
                            <div class="cell emp coins"><img src="./img/btc-color.png" alt="dash"/><span>BTC</span></div><span class="cell"><span class="title-m">Wallet</span> 1.46780990</span><span class="cell"><span class="title-m">Contract</span> 1.46780990</span><span class="cell"><span class="title-m">In open order</span> 0.26000000</span>
                            <div class="cell actions">
                                <button class="action"> <img src="./img/arrow.png" alt="dash"/><span>Deposit</span></button>
                                <button class="action withdraw"><img src="./img/arrow.png" alt="dash"/><span>Withdraw</span></button>
                                <button class="action"> <img src="./img/trade.png" alt="dash"/><span>Trade</span></button>
                            </div>
                        </div>
                        <div class="line">
                            <div class="cell emp coins"><img src="./img/btc-color.png" alt="dash"/><span>BTC</span></div><span class="cell"><span class="title-m">Wallet</span> 1.46780990</span><span class="cell"><span class="title-m">Contract</span> 1.46780990</span><span class="cell"><span class="title-m">In open order</span> 0.26000000</span>
                            <div class="cell actions">
                                <button class="action"> <img src="./img/arrow.png" alt="dash"/><span>Deposit</span></button>
                                <button class="action withdraw"><img src="./img/arrow.png" alt="dash"/><span>Withdraw</span></button>
                                <button class="action"> <img src="./img/trade.png" alt="dash"/><span>Trade</span></button>
                            </div>
                        </div>
                        <div class="line">
                            <div class="cell emp coins"><img src="./img/btc-color.png" alt="dash"/><span>BTC</span></div><span class="cell"><span class="title-m">Wallet</span> 1.46780990</span><span class="cell"><span class="title-m">Contract</span> 1.46780990</span><span class="cell"><span class="title-m">In open order</span> 0.26000000</span>
                            <div class="cell actions">
                                <button class="action"> <img src="./img/arrow.png" alt="dash"/><span>Deposit</span></button>
                                <button class="action withdraw"><img src="./img/arrow.png" alt="dash"/><span>Withdraw</span></button>
                                <button class="action"> <img src="./img/trade.png" alt="dash"/><span>Trade</span></button>
                            </div>
                        </div>
                        <div class="line">
                            <div class="cell emp coins"><img src="./img/btc-color.png" alt="dash"/><span>BTC</span></div><span class="cell"><span class="title-m">Wallet</span> 1.46780990</span><span class="cell"><span class="title-m">Contract</span> 1.46780990</span><span class="cell"><span class="title-m">In open order</span> 0.26000000</span>
                            <div class="cell actions">
                                <button class="action"> <img src="./img/arrow.png" alt="dash"/><span>Deposit</span></button>
                                <button class="action withdraw"><img src="./img/arrow.png" alt="dash"/><span>Withdraw</span></button>
                                <button class="action"> <img src="./img/trade.png" alt="dash"/><span>Trade</span></button>
                            </div>
                        </div>
                        <div class="line">
                            <div class="cell emp coins"><img src="./img/btc-color.png" alt="dash"/><span>BTC</span></div><span class="cell"><span class="title-m">Wallet</span> 1.46780990</span><span class="cell"><span class="title-m">Contract</span> 1.46780990</span><span class="cell"><span class="title-m">In open order</span> 0.26000000</span>
                            <div class="cell actions">
                                <button class="action"> <img src="./img/arrow.png" alt="dash"/><span>Deposit</span></button>
                                <button class="action withdraw"><img src="./img/arrow.png" alt="dash"/><span>Withdraw</span></button>
                                <button class="action"> <img src="./img/trade.png" alt="dash"/><span>Trade</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="popup-wrapper js-add-wallet-1">
        <div class="popup-body">
            <div class="add-wallet-1">
                <div class="popup-top">
                    <p class="title">Add Wallet</p>
                    <div class="steps"><span class="active">1</span><span>2</span></div><img class="close js-close" src="./img/close.png" alt="dash"/>
                </div>
                <div class="choose-wallet">
                    <div class="item js-next-step"><img class="icon" src="./img/big-eth.png" alt="dash"/>
                        <div class="text">
                            <p class="name">Ethereum</p>
                            <p class="desc">Ethereum is the solution</p>
                        </div><img class="next" src="./img/arrow-down.svg" alt="dash"/>
                    </div>
                    <div class="item js-next-step"><img class="icon" src="./img/wanchain.png" alt="dash"/>
                        <div class="text">
                            <p class="name">Wanchain</p>
                            <p class="desc">Wanchain team has attended</p>
                        </div><img class="next" src="./img/arrow-down.svg" alt="dash"/>
                    </div>
                    <div class="item js-next-step"><img class="icon" src="./img/waves.png" alt="dash"/>
                        <div class="text">
                            <p class="name">Waves</p>
                            <p class="desc">Revolutionizing the world</p>
                        </div><img class="next" src="./img/arrow-down.svg" alt="dash"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="popup-wrapper js-add-wallet-2">
        <div class="popup-body">
            <div class="add-wallet-2">
                <div class="popup-top">
                    <p class="title">Add Wallet</p>
                    <div class="steps"><span>1</span><span class="active">2</span></div><img class="close js-close" src="./img/close.png" alt="dash"/>
                </div>
                <div class="methods">
                    <div class="tab-titles">
                        <button class="active js-tab-btn" data-tab="metamask">Metamask</button>
                        <button class="js-tab-btn" data-tab="key">Private Key</button>
                        <button class="js-tab-btn" data-tab="seed">Seed</button>
                    </div>
                    <div class="tabs">
                        <div class="tab-metamask tab">
                            <p class="desc">Trade tokens on the Ethereum blockchain using the MetaMask browser extension.</p>
                            <div class="connect">
                                <p class="subtitle">Connect to MetaMask</p>
                                <p class="allow">Allow Orion to connect to MetaMask to begin.</p>
                            </div>
                            <p class="recommend">This is a recommended trading method. All transaction signing is done within the MetaMask extension, and private keys are never sent to the browser.</p>
                        </div>
                        <div class="tab-key tab">
                            <div class="private-key"><span>Enter private key</span>
                                <input name type="password"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btns">
                    <button class="back js-go-back-to-1"><img src="./img/arrow-down.svg" alt="dash"/><span>Go back</span></button>
                    <button class="connect"><img src="./img/fox.png" alt="dash"/><span>Connect</span></button>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
	);
}

export default Dashboard;
