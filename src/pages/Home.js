import React, { useEffect } from 'react';
import TopMenu from '../components/TopMenu'
import IndexNav from '../components/IndexNav'
import Sidebar from '../components/Sidebar'

function Home() {

    useEffect(() => {

        if(window.innerWidth > 1130){
            let e = document.querySelector('.js-panel')
            e.classList.remove("active");
        }

    }, [])

	return (
		<div className="">
			<TopMenu/>

			<IndexNav/>

      <div className="index">

            <Sidebar/>

            <div className="my-container">
                <div className="my-row">
                    <div className="left-panel js-panel active">
                        <div className="common-info js-panel-item js-pair">
                            <div className="top">
                                <div className="star"><i className="fa fa-star-o" aria-hidden="true"></i><span>Pair</span></div>
                                <div className="pair-select">
                                    <div className="link js-pair-link"><span>ETH / BTC</span><span className="icon-arrow-d"></span></div>
                                    <div className="pair-drop js-pair-drop">
                                        <div className="titles"><span>BTC</span><span>USD</span><span className="active">ETH</span><span>NEO</span><span>EOS</span></div>
                                        <div className="search">
                                            <div className="input">
                                                <input type="text" placeholder="Search pair"/><i className="fa fa-search" aria-hidden="true"></i>
                                            </div>
                                            <div className="favourite"><i className="fa fa-star-o" aria-hidden="true"></i><span>Favourites</span></div>
                                        </div>
                                        <div className="pair-table">
                                            <div className="titles-p">
                                                <div className="title"><span>Pair</span><img src="./img/arrow-down.svg" alt="home"/></div>
                                                <div className="title short"><span>Last Pr.</span><img src="./img/arrow-down.svg" alt="home"/></div>
                                                <div className="title short"><span>24h Vol</span><img src="./img/arrow-down.svg" alt="home"/></div>
                                                <div className="title chg"><span>24h Change</span><img src="./img/arrow-down.svg" alt="home"/></div>
                                            </div>
                                            <div className="lines">
                                                <div className="part">
                                                    <div className="line">
                                                        <div className="cell"><img className="img" src="./img/btc-color.png" alt="home"/>
                                                            <div className="text"><span className="emp">BTC</span><span className="small">Bitcoin</span></div>
                                                        </div>
                                                        <div className="cell short"><span className="title-m">Last Pr.</span>
                                                            <div className="text"><span className="emp">0.0174</span><span className="small">$174.41</span></div>
                                                        </div>
                                                        <div className="cell short"><span className="title-m">24h Change</span>
                                                            <div className="text"><span className="emp">0.001500</span><span className="small">$53.41</span></div>
                                                        </div>
                                                        <div className="cell chg"><img src="./img/growth.png" alt="home"/>
                                                            <p><span className="emp">+4,42</span> <span>%</span></p>
                                                            <div className="star js-star"><i className="fa fa-star-o" aria-hidden="true"></i></div>
                                                        </div>
                                                    </div>
                                                    <div className="line">
                                                        <div className="cell"><img className="img" src="./img/btc-color.png" alt="home"/>
                                                            <div className="text"><span className="emp">BTC</span><span className="small">Bitcoin</span></div>
                                                        </div>
                                                        <div className="cell short"><span className="title-m">Last Pr.</span>
                                                            <div className="text"><span className="emp">0.0174</span><span className="small">$174.41</span></div>
                                                        </div>
                                                        <div className="cell short"><span className="title-m">24h Change</span>
                                                            <div className="text"><span className="emp">0.001500</span><span className="small">$53.41</span></div>
                                                        </div>
                                                        <div className="cell chg"><img src="./img/growth.png" alt="home"/>
                                                            <p><span className="emp">+4,42</span> <span>%</span></p>
                                                            <div className="star js-star"><i className="fa fa-star-o" aria-hidden="true"></i></div>
                                                        </div>
                                                    </div>
                                                    <div className="line">
                                                        <div className="cell"><img className="img" src="./img/btc-color.png" alt="home"/>
                                                            <div className="text"><span className="emp">BTC</span><span className="small">Bitcoin</span></div>
                                                        </div>
                                                        <div className="cell short"><span className="title-m">Last Pr.</span>
                                                            <div className="text"><span className="emp">0.0174</span><span className="small">$174.41</span></div>
                                                        </div>
                                                        <div className="cell short"><span className="title-m">24h Change</span>
                                                            <div className="text"><span className="emp">0.001500</span><span className="small">$53.41</span></div>
                                                        </div>
                                                        <div className="cell chg"><img src="./img/growth.png" alt="home"/>
                                                            <p><span className="emp">+4,42</span> <span>%</span></p>
                                                            <div className="star js-star"><i className="fa fa-star-o" aria-hidden="true"></i></div>
                                                        </div>
                                                    </div>
                                                    <div className="line">
                                                        <div className="cell"><img className="img" src="./img/btc-color.png" alt="home"/>
                                                            <div className="text"><span className="emp">BTC</span><span className="small">Bitcoin</span></div>
                                                        </div>
                                                        <div className="cell short"><span className="title-m">Last Pr.</span>
                                                            <div className="text"><span className="emp">0.0174</span><span className="small">$174.41</span></div>
                                                        </div>
                                                        <div className="cell short"><span className="title-m">24h Change</span>
                                                            <div className="text"><span className="emp">0.001500</span><span className="small">$53.41</span></div>
                                                        </div>
                                                        <div className="cell chg"><img src="./img/growth.png" alt="home"/>
                                                            <p><span className="emp">+4,42</span> <span>%</span></p>
                                                            <div className="star js-star"><i className="fa fa-star-o" aria-hidden="true"></i></div>
                                                        </div>
                                                    </div>
                                                    <div className="line">
                                                        <div className="cell"><img className="img" src="./img/btc-color.png" alt="home"/>
                                                            <div className="text"><span className="emp">BTC</span><span className="small">Bitcoin</span></div>
                                                        </div>
                                                        <div className="cell short"><span className="title-m">Last Pr.</span>
                                                            <div className="text"><span className="emp">0.0174</span><span className="small">$174.41</span></div>
                                                        </div>
                                                        <div className="cell short"><span className="title-m">24h Change</span>
                                                            <div className="text"><span className="emp">0.001500</span><span className="small">$53.41</span></div>
                                                        </div>
                                                        <div className="cell chg"><img src="./img/growth.png" alt="home"/>
                                                            <p><span className="emp">+4,42</span> <span>%</span></p>
                                                            <div className="star js-star"><i className="fa fa-star-o" aria-hidden="true"></i></div>
                                                        </div>
                                                    </div>
                                                    <div className="line">
                                                        <div className="cell"><img className="img" src="./img/btc-color.png" alt="home"/>
                                                            <div className="text"><span className="emp">BTC</span><span className="small">Bitcoin</span></div>
                                                        </div>
                                                        <div className="cell short"><span className="title-m">Last Pr.</span>
                                                            <div className="text"><span className="emp">0.0174</span><span className="small">$174.41</span></div>
                                                        </div>
                                                        <div className="cell short"><span className="title-m">24h Change</span>
                                                            <div className="text"><span className="emp">0.001500</span><span className="small">$53.41</span></div>
                                                        </div>
                                                        <div className="cell chg"><img src="./img/growth.png" alt="home"/>
                                                            <p><span className="emp">+4,42</span> <span>%</span></p>
                                                            <div className="star js-star"><i className="fa fa-star-o" aria-hidden="true"></i></div>
                                                        </div>
                                                    </div>
                                                    <div className="line">
                                                        <div className="cell"><img className="img" src="./img/btc-color.png" alt="home"/>
                                                            <div className="text"><span className="emp">BTC</span><span className="small">Bitcoin</span></div>
                                                        </div>
                                                        <div className="cell short"><span className="title-m">Last Pr.</span>
                                                            <div className="text"><span className="emp">0.0174</span><span className="small">$174.41</span></div>
                                                        </div>
                                                        <div className="cell short"><span className="title-m">24h Change</span>
                                                            <div className="text"><span className="emp">0.001500</span><span className="small">$53.41</span></div>
                                                        </div>
                                                        <div className="cell chg"><img src="./img/growth.png" alt="home"/>
                                                            <p><span className="emp">+4,42</span> <span>%</span></p>
                                                            <div className="star js-star"><i className="fa fa-star-o" aria-hidden="true"></i></div>
                                                        </div>
                                                    </div>
                                                    <div className="line">
                                                        <div className="cell"><img className="img" src="./img/btc-color.png" alt="home"/>
                                                            <div className="text"><span className="emp">BTC</span><span className="small">Bitcoin</span></div>
                                                        </div>
                                                        <div className="cell short"><span className="title-m">Last Pr.</span>
                                                            <div className="text"><span className="emp">0.0174</span><span className="small">$174.41</span></div>
                                                        </div>
                                                        <div className="cell short"><span className="title-m">24h Change</span>
                                                            <div className="text"><span className="emp">0.001500</span><span className="small">$53.41</span></div>
                                                        </div>
                                                        <div className="cell chg"><img src="./img/growth.png" alt="home"/>
                                                            <p><span className="emp">+4,42</span> <span>%</span></p>
                                                            <div className="star js-star"><i className="fa fa-star-o" aria-hidden="true"></i></div>
                                                        </div>
                                                    </div>
                                                    <div className="line">
                                                        <div className="cell"><img className="img" src="./img/btc-color.png" alt="home"/>
                                                            <div className="text"><span className="emp">BTC</span><span className="small">Bitcoin</span></div>
                                                        </div>
                                                        <div className="cell short"><span className="title-m">Last Pr.</span>
                                                            <div className="text"><span className="emp">0.0174</span><span className="small">$174.41</span></div>
                                                        </div>
                                                        <div className="cell short"><span className="title-m">24h Change</span>
                                                            <div className="text"><span className="emp">0.001500</span><span className="small">$53.41</span></div>
                                                        </div>
                                                        <div className="cell chg"><img src="./img/growth.png" alt="home"/>
                                                            <p><span className="emp">+4,42</span> <span>%</span></p>
                                                            <div className="star js-star"><i className="fa fa-star-o" aria-hidden="true"></i></div>
                                                        </div>
                                                    </div>
                                                    <div className="line">
                                                        <div className="cell"><img className="img" src="./img/btc-color.png" alt="home"/>
                                                            <div className="text"><span className="emp">BTC</span><span className="small">Bitcoin</span></div>
                                                        </div>
                                                        <div className="cell short"><span className="title-m">Last Pr.</span>
                                                            <div className="text"><span className="emp">0.0174</span><span className="small">$174.41</span></div>
                                                        </div>
                                                        <div className="cell short"><span className="title-m">24h Change</span>
                                                            <div className="text"><span className="emp">0.001500</span><span className="small">$53.41</span></div>
                                                        </div>
                                                        <div className="cell chg"><img src="./img/growth.png" alt="home"/>
                                                            <p><span className="emp">+4,42</span> <span>%</span></p>
                                                            <div className="star js-star"><i className="fa fa-star-o" aria-hidden="true"></i></div>
                                                        </div>
                                                    </div>
                                                    <div className="line">
                                                        <div className="cell"><img className="img" src="./img/btc-color.png" alt="home"/>
                                                            <div className="text"><span className="emp">BTC</span><span className="small">Bitcoin</span></div>
                                                        </div>
                                                        <div className="cell short"><span className="title-m">Last Pr.</span>
                                                            <div className="text"><span className="emp">0.0174</span><span className="small">$174.41</span></div>
                                                        </div>
                                                        <div className="cell short"><span className="title-m">24h Change</span>
                                                            <div className="text"><span className="emp">0.001500</span><span className="small">$53.41</span></div>
                                                        </div>
                                                        <div className="cell chg"><img src="./img/growth.png" alt="home"/>
                                                            <p><span className="emp">+4,42</span> <span>%</span></p>
                                                            <div className="star js-star"><i className="fa fa-star-o" aria-hidden="true"></i></div>
                                                        </div>
                                                    </div>
                                                    <div className="line">
                                                        <div className="cell"><img className="img" src="./img/btc-color.png" alt="home"/>
                                                            <div className="text"><span className="emp">BTC</span><span className="small">Bitcoin</span></div>
                                                        </div>
                                                        <div className="cell short"><span className="title-m">Last Pr.</span>
                                                            <div className="text"><span className="emp">0.0174</span><span className="small">$174.41</span></div>
                                                        </div>
                                                        <div className="cell short"><span className="title-m">24h Change</span>
                                                            <div className="text"><span className="emp">0.001500</span><span className="small">$53.41</span></div>
                                                        </div>
                                                        <div className="cell chg"><img src="./img/growth.png" alt="home"/>
                                                            <p><span className="emp">+4,42</span> <span>%</span></p>
                                                            <div className="star js-star"><i className="fa fa-star-o" aria-hidden="true"></i></div>
                                                        </div>
                                                    </div>
                                                    <div className="line">
                                                        <div className="cell"><img className="img" src="./img/btc-color.png" alt="home"/>
                                                            <div className="text"><span className="emp">BTC</span><span className="small">Bitcoin</span></div>
                                                        </div>
                                                        <div className="cell short"><span className="title-m">Last Pr.</span>
                                                            <div className="text"><span className="emp">0.0174</span><span className="small">$174.41</span></div>
                                                        </div>
                                                        <div className="cell short"><span className="title-m">24h Change</span>
                                                            <div className="text"><span className="emp">0.001500</span><span className="small">$53.41</span></div>
                                                        </div>
                                                        <div className="cell chg"><img src="./img/growth.png" alt="home"/>
                                                            <p><span className="emp">+4,42</span> <span>%</span></p>
                                                            <div className="star js-star"><i className="fa ffa-star-o" aria-hidden="true"></i></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="price">
                                <div className="last-price"><span className="title">Last price</span>
                                    <div className="value"><span className="emp">0.0174</span><span className="dollars">$174.41</span></div>
                                </div>
                                <div className="change"><span className="title">24h change</span>
                                    <div className="value"><img src="./img/growth.png" alt="home"/>
                                        <p className="emp">+4.42 <span>%</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className="table">
                                <div className="line"><span className="title">24h High</span>
                                    <p className="value averta"><span>0.015200</span> <span className="small">$180.41</span></p>
                                </div>
                                <div className="line"><span className="title">24h Low</span>
                                    <p className="value averta"><span>0.015200</span> <span className="small">$180.41</span></p>
                                </div>
                                <div className="line"><span className="title">24h Vol</span>
                                    <p className="value averta"><span>0.015200</span> <span className="small">$180.41</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="buy-sell js-panel-item js-exchange">
                            <div className="top">
                                <button className="js-buy-sell active" data-content="buy-content">Buy</button>
                                <button className="js-buy-sell sell-btn" data-content="sell-content">Sell</button>
                            </div>
                            <div className="main-content">
                                <div className="buy-content js-buy-sell-content">
                                    <div className="big-toggler">
                                        <button className="active">Market</button>
                                        <button>Limit order</button>
                                    </div>
                                    <div className="amount"><span className="placeholder">Amount</span>
                                        <input type="text"/><span className="currency">ETH</span>
                                        <div className="available"><span>Available</span><span>0.10099921 BTC</span></div>
                                    </div>
                                    <div className="btns">
                                        <button>25%</button>
                                        <button>50%</button>
                                        <button>75%</button>
                                        <button>100%</button>
                                    </div>
                                    <div className="amount total"><span className="placeholder">Total</span>
                                        <input type="text" readonly="true"/><span className="currency">BTC</span>
                                    </div>
                                    <div className="buy-btn">
                                        <button className="buy">Buy ETH</button>
                                    </div>
                                </div>
                                <div className="sell-content js-buy-sell-content">
                                    <div className="big-toggler">
                                        <button className="active">Market</button>
                                        <button>Limit order</button>
                                    </div>
                                    <div className="amount"><span className="placeholder">Amount</span>
                                        <input type="text"/><span className="currency">ETH</span>
                                        <div className="available"><span>Available</span><span>0.10099921 BTC</span></div>
                                    </div>
                                    <div className="btns">
                                        <button>25%</button>
                                        <button>50%</button>
                                        <button>75%</button>
                                        <button>100%</button>
                                    </div>
                                    <div className="amount total"><span className="placeholder">Total</span>
                                        <input type="text" readonly="true"/><span className="currency">BTC</span>
                                    </div>
                                    <div className="buy-btn">
                                        <button className="buy">Buy ETH</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="center-panel js-panel">
                        <div className="image js-chart js-panel-item"><img src="./img/graph.jpg" alt="home"/></div>
                        <div className="table js-history js-panel-item">
                            <div className="top">
                                <div className="big-toggler"><span className="active">Orders</span><span>History</span></div>
                                <div className="date">
                                    <div className="date-1">
                                        <input className="datepicker-here pick" type="text"/><i className="fa fa-calendar-o" aria-hidden="true"></i>
                                    </div><span className="hr"></span>
                                    <div className="date-1">
                                        <input className="datepicker-here pick" type="text"/><i className="fa fa-calendar-o" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div className="currency-all">
                                    <div className="currency">
                                        <select className="currency-select-1" name>
                                            <option value="">ETH</option>
                                            <option value="">ETH</option>
                                        </select><span className="sep">/</span>
                                        <select className="currency-select-1" name>
                                            <option value="">BTC</option>
                                            <option value="">ETH</option>
                                        </select>
                                    </div>
                                    <div className="all">
                                        <select className="currency-select-1" name>
                                            <option value="">All</option>
                                            <option value="">All</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="table-content">
                                <div className="titles">
                                    <div className="title short"><span>Type</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                    <div className="title"><span>Pair</span><i className="fa fa-angle-down" aria-hidden="true"> </i></div>
                                    <div className="title time"><span>Time</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                    <div className="title"><span>Amount</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                    <div className="title"><span>Price</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                    <div className="title status"><span>Status</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                    <div className="title"><span>Total</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                </div>
                                <div className="lines">
                                    <div className="line">
                                        <div className="line-big">
                                            <div className="line-big-main js-line-big-main"><span className="cell short emp">Sell</span><span className="cell">ETH / BTC</span><span className="cell time"><span>09.09.2019</span> <span> 12:42:4</span></span><span className="cell">0,004422124</span><span className="cell">0,000042142</span><span className="cell filled status">Filled</span><span className="cell">1,4422124</span></div>
                                            <div className="subtable">
                                                <div className="subline">
                                                    <div className="subtitles">
                                                        <div className="subtitle"><span>Exchange</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                                        <div className="subtitle right"><span>ID</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                                        <div className="subtitle right"><span>Amount</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                                        <div className="subtitle right"><span>Price</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                                        <div className="subtitle right"><span>Status</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                                    </div>
                                                    <div className="subcontent">
                                                        <div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right filled">Filled</span></div>
                                                        <div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right open">Filled</span></div>
                                                        <div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right cancel">Filled</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="line-small">
                                            <div className="cell cell-top"><span className="data">Sell</span><span className="data-eth">ETH / BTC</span><span className="filled status">Filled</span></div>
                                            <div className="cell"><span className="sub-title">Amount</span><span className="data-text">0.004422124</span><span className="data-text date">09.09.2019</span></div>
                                            <div className="cell"><span className="sub-title">Price</span><span className="data-text">0.004422124</span><span className="data-text date">12:42:09</span></div>
                                            <div className="cell"><span className="sub-title">Total</span><span className="data-text">0.004422124</span></div>
                                        </div>
                                    </div>
                                    <div className="line">
                                        <div className="line-big">
                                            <div className="line-big-main js-line-big-main"><span className="cell short emp">Sell</span><span className="cell">ETH / BTC</span><span className="cell time"><span>09.09.2019</span> <span> 12:42:4</span></span><span className="cell">0,004422124</span><span className="cell">0,000042142</span><span className="cell filled status">Filled</span><span className="cell">1,4422124</span></div>
                                            <div className="subtable">
                                                <div className="subline">
                                                    <div className="subtitles">
                                                        <div className="subtitle"><span>Exchange</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                                        <div className="subtitle right"><span>ID</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                                        <div className="subtitle right"><span>Amount</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                                        <div className="subtitle right"><span>Price</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                                        <div className="subtitle right"><span>Status</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                                    </div>
                                                    <div className="subcontent">
                                                        <div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right filled">Filled</span></div>
                                                        <div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right open">Filled</span></div>
                                                        <div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right cancel">Filled</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="line-small">
                                            <div className="cell cell-top"><span className="data">Sell</span><span className="data-eth">ETH / BTC</span><span className="filled status">Filled</span></div>
                                            <div className="cell"><span className="sub-title">Amount</span><span className="data-text">0.004422124</span><span className="data-text date">09.09.2019</span></div>
                                            <div className="cell"><span className="sub-title">Price</span><span className="data-text">0.004422124</span><span className="data-text date">12:42:09</span></div>
                                            <div className="cell"><span className="sub-title">Total</span><span className="data-text">0.004422124</span></div>
                                        </div>
                                    </div>
                                    <div className="line">
                                        <div className="line-big">
                                            <div className="line-big-main js-line-big-main"><span className="cell short emp">Sell</span><span className="cell">ETH / BTC</span><span className="cell time"><span>09.09.2019</span> <span> 12:42:4</span></span><span className="cell">0,004422124</span><span className="cell">0,000042142</span><span className="cell filled status">Filled</span><span className="cell">1,4422124</span></div>
                                            <div className="subtable">
                                                <div className="subline">
                                                    <div className="subtitles">
                                                        <div className="subtitle"><span>Exchange</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                                        <div className="subtitle right"><span>ID</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                                        <div className="subtitle right"><span>Amount</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                                        <div className="subtitle right"><span>Price</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                                        <div className="subtitle right"><span>Status</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                                    </div>
                                                    <div className="subcontent">
                                                        <div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right filled">Filled</span></div>
                                                        <div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right open">Filled</span></div>
                                                        <div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right cancel">Filled</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="line-small">
                                            <div className="cell cell-top"><span className="data">Sell</span><span className="data-eth">ETH / BTC</span><span className="filled status">Filled</span></div>
                                            <div className="cell"><span className="sub-title">Amount</span><span className="data-text">0.004422124</span><span className="data-text date">09.09.2019</span></div>
                                            <div className="cell"><span className="sub-title">Price</span><span className="data-text">0.004422124</span><span className="data-text date">12:42:09</span></div>
                                            <div className="cell"><span className="sub-title">Total</span><span className="data-text">0.004422124</span></div>
                                        </div>
                                    </div>
                                    <div className="line">
                                        <div className="line-big">
                                            <div className="line-big-main js-line-big-main"><span className="cell short emp">Sell</span><span className="cell">ETH / BTC</span><span className="cell time"><span>09.09.2019</span> <span> 12:42:4</span></span><span className="cell">0,004422124</span><span className="cell">0,000042142</span><span className="cell filled status">Filled</span><span className="cell">1,4422124</span></div>
                                            <div className="subtable">
                                                <div className="subline">
                                                    <div className="subtitles">
                                                        <div className="subtitle"><span>Exchange</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                                        <div className="subtitle right"><span>ID</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                                        <div className="subtitle right"><span>Amount</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                                        <div className="subtitle right"><span>Price</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                                        <div className="subtitle right"><span>Status</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                                    </div>
                                                    <div className="subcontent">
                                                        <div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right filled">Filled</span></div>
                                                        <div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right open">Filled</span></div>
                                                        <div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right cancel">Filled</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="line-small">
                                            <div className="cell cell-top"><span className="data">Sell</span><span className="data-eth">ETH / BTC</span><span className="filled status">Filled</span></div>
                                            <div className="cell"><span className="sub-title">Amount</span><span className="data-text">0.004422124</span><span className="data-text date">09.09.2019</span></div>
                                            <div className="cell"><span className="sub-title">Price</span><span className="data-text">0.004422124</span><span className="data-text date">12:42:09</span></div>
                                            <div className="cell"><span className="sub-title">Total</span><span className="data-text">0.004422124</span></div>
                                        </div>
                                    </div>
                                    <div className="line">
                                        <div className="line-big">
                                            <div className="line-big-main js-line-big-main"><span className="cell short emp">Sell</span><span className="cell">ETH / BTC</span><span className="cell time"><span>09.09.2019</span> <span> 12:42:4</span></span><span className="cell">0,004422124</span><span className="cell">0,000042142</span><span className="cell filled status">Filled</span><span className="cell">1,4422124</span></div>
                                            <div className="subtable">
                                                <div className="subline">
                                                    <div className="subtitles">
                                                        <div className="subtitle"><span>Exchange</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                                        <div className="subtitle right"><span>ID</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                                        <div className="subtitle right"><span>Amount</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                                        <div className="subtitle right"><span>Price</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                                        <div className="subtitle right"><span>Status</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                                    </div>
                                                    <div className="subcontent">
                                                        <div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right filled">Filled</span></div>
                                                        <div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right open">Filled</span></div>
                                                        <div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right cancel">Filled</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="line-small">
                                            <div className="cell cell-top"><span className="data">Sell</span><span className="data-eth">ETH / BTC</span><span className="filled status">Filled</span></div>
                                            <div className="cell"><span className="sub-title">Amount</span><span className="data-text">0.004422124</span><span className="data-text date">09.09.2019</span></div>
                                            <div className="cell"><span className="sub-title">Price</span><span className="data-text">0.004422124</span><span className="data-text date">12:42:09</span></div>
                                            <div className="cell"><span className="sub-title">Total</span><span className="data-text">0.004422124</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right-panel js-panel">
                        <div className="js-panel-item js-orderbook">
                            <div className="order-book">
                                <p className="heading">Order Book</p>
                                <div className="titles"><span className="title">Price</span><span className="title">Amount</span><span className="title">Total</span><span className="title exch">Exch</span></div>
                                <div className="orders">
                                    <div className="order"><span className="progress-light l-green" style={{ width: '41%'}}></span><span className="progress-light d-green" style={{width: '5%'}}></span><span className="cell emp">0,0174</span><span className="cell green">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch">
                                            <div className="exch-content js-exch-content"><img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                            <div className="exch-drop js-exch-drop">
                                                <div className="drop"><img src="./img/bitcoin.png" alt="home"/><span>Exchange 1</span></div>
                                                <div className="drop"><img src="./img/eth.png" alt="home"/><span>Exchange 2</span></div>
                                                <div className="drop"><img src="./img/bitcoin.png" alt="home"/><span>Exchange 3</span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green" style={{width:'20%' }}></span><span className="progress-light d-green" style={{width:'2%' }}></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green" style={{width:'15%'}}></span><span className="progress-light d-green" style={{width:'10%'}}></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green" style={{width:'85%'}}></span><span className="progress-light d-green" style={{width:'6%'}}></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green" style={{width:'90%'}}></span><span className="progress-light d-green" style={{width:'1%'}}></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green"></span><span className="progress-light d-green" style={{width:'15%'}}></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green"></span><span className="progress-light d-green" style={{width:'18%'}}></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green"></span><span className="progress-light d-green" style={{width:'7%'}}></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green"></span><span className="progress-light d-green" style={{width:'16.5%'}}></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green"></span><span className="progress-light d-green" style={{width:'3.5%'}}></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green"></span><span className="progress-light d-green" style={{width:'9%'}}></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green"></span><span className="progress-light d-green"></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green"></span><span className="progress-light d-green"></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green"></span><span className="progress-light d-green"></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green"></span><span className="progress-light d-green"></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green"></span><span className="progress-light d-green"></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green"></span><span className="progress-light d-green"></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green"></span><span className="progress-light d-green"></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green"></span><span className="progress-light d-green"></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green"></span><span className="progress-light d-green"></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green"></span><span className="progress-light d-green"></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green"></span><span className="progress-light d-green"></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green"></span><span className="progress-light d-green"></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green"></span><span className="progress-light d-green"></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green"></span><span className="progress-light d-green"></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green"></span><span className="progress-light d-green"></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green"></span><span className="progress-light d-green"></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green"></span><span className="progress-light d-green"></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green"></span><span className="progress-light d-green"></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green"></span><span className="progress-light d-green"></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green"></span><span className="progress-light d-green"></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green"></span><span className="progress-light d-green"></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green"></span><span className="progress-light d-green"></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green"></span><span className="progress-light d-green"></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green"></span><span className="progress-light d-green"></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green"></span><span className="progress-light d-green"></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green"></span><span className="progress-light d-green"></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green"></span><span className="progress-light d-green"></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green"></span><span className="progress-light d-green"></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green"></span><span className="progress-light d-green"></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-green"></span><span className="progress-light d-green"></span><span className="cell emp">0,0174</span><span className="cell red">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                </div>
                                <div className="last-price"><span className="cell">0,0174</span><span className="last">Last Price</span></div>
                            </div>
                            <div className="order-book">
                                <div className="orders">
                                    <div className="order"><span className="progress-light l-red" style={{width:'27%'}}></span><span className="progress-light d-red" style={{width:'5%'}}></span><span className="cell emp">0,0174</span><span className="cell">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-red" style={{width:'30%'}}></span><span className="progress-light d-red" style={{width:'7%'}}></span><span className="cell emp">0,0174</span><span className="cell">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-red" style={{width:'80%'}}></span><span className="progress-light d-red" style={{width:'10%'}}></span><span className="cell emp">0,0174</span><span className="cell">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-red" style={{width:'45%'}}></span><span className="progress-light d-red" style={{width:'15%'}}></span><span className="cell emp">0,0174</span><span className="cell">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-red" style={{width:'95%'}}></span><span className="progress-light d-red" style={{width:'1%'}}></span><span className="cell emp">0,0174</span><span className="cell">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-red"></span><span className="progress-light d-red" style={{width:'5%'}}></span><span className="cell emp">0,0174</span><span className="cell">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-red"></span><span className="progress-light d-red" style={{width:'3%'}}></span><span className="cell emp">0,0174</span><span className="cell">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-red"></span><span className="progress-light d-red" style={{width:'5%'}}></span><span className="cell emp">0,0174</span><span className="cell">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-red"></span><span className="progress-light d-red" style={{width:'18%'}}></span><span className="cell emp">0,0174</span><span className="cell">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-red"></span><span className="progress-light d-red" style={{width:'9.2%'}}></span><span className="cell emp">0,0174</span><span className="cell">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-red"></span><span className="progress-light d-red" style={{width:'4%'}}></span><span className="cell emp">0,0174</span><span className="cell">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-red"></span><span className="progress-light d-red"></span><span className="cell emp">0,0174</span><span className="cell">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-red"></span><span className="progress-light d-red"></span><span className="cell emp">0,0174</span><span className="cell">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                    <div className="order"><span className="progress-light l-red"></span><span className="progress-light d-red"></span><span className="cell emp">0,0174</span><span className="cell">0,5125</span><span className="cell">20.4124</span>
                                        <div className="cell exch"> <img src="./img/bitcoin.png" alt="home"/><img src="./img/eth.png" alt="home"/><img className="arrow" src="./img/arrow-down.svg" alt="home"/></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
		</div>
	);
}

export default Home;
