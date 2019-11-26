import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TopMenu from '../components/TopMenu'
import IndexNav from '../components/IndexNav'
import Sidebar from '../components/Sidebar'
import OrderBooks from '../components/OrderBooks';
import Orders from '../components/Orders'
// import { setSymbol } from '../chartData';

function Home() {
    // const { symbol } = useSelector(state => state.general);
	const dispatch = useDispatch();

    const setSymbol = useCallback(data => dispatch({ type: 'SetSymbol', payload: data }), [ dispatch ]);

    // console.log('home symbol', symbol)

    useEffect(() => {

        if(window.innerWidth > 1130){
            let e = document.querySelector('.js-panel')
            e.classList.remove("active");
        }

    }, [])

    const handleClick = symbol => {
		setSymbol(symbol);
	};

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
                                        <input type="text" readOnly={true}/><span className="currency">BTC</span>
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
                                        <input type="text" readOnly={true}/><span className="currency">BTC</span>
                                    </div>
                                    <div className="buy-btn">
                                        <button className="buy">Buy ETH</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="center-panel js-panel">
                        <div className="image js-chart js-panel-item">
                            <button onClick={_ => handleClick('XRP-BTC')}>XRP-BTC</button>
                            <button onClick={_ => handleClick('ETH-BTC')}>ETH-BTC</button>
                            <div id="chart-container" style={{ height: '56.5vh' }}>
                               
                            </div>
                        </div>
                        <Orders/>
                    </div>
                    <OrderBooks/>
                </div>
            </div>
        </div>
		</div>
	);
}

export default Home;
