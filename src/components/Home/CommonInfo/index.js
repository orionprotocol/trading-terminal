import React, { useEffect, useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import PairDrop from './PairDrop';

import './index.css';
let price = require('crypto-price');

function handleWrapper() {
    const div = document.querySelector('#js-wrapper-pair');
    div.classList.toggle('active');

    const arrow = document.querySelector('.link.js-pair-link');
    arrow.classList.toggle('active');

    const drop = document.querySelector('.pair-drop.js-pair-drop');
    drop.classList.toggle('active');
}

const formatNumber = number => {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(
        number
    );
};
let intervalId = 0;
const CommonInfo = ({History}) => {
  
    const { symbolA, symbolB, lastPrice, high, low, vol, change,tickers } = useSelector(
        state => state.general
    );

    const [dollars, setDollars] = useState({});
    const [isFav, setIsFav] = useState(false);

    useEffect(
        _ => {
            if (symbolB === 'USDT') {
                return 
            }else{
               /*  console.log(tickers[`${symbolB}-USDT`]) */
                if(tickers[`${symbolB}-USDT`]!==undefined){
                    let last = (tickers[`${symbolB}-USDT`].lastPrice * lastPrice).toFixed(2);
                    let h = (tickers[`${symbolB}-USDT`].lastPrice * high).toFixed(2);
                    let l = (tickers[`${symbolB}-USDT`].lastPrice * low).toFixed(2);
                    let v = (tickers[`${symbolB}-USDT`].lastPrice * Number(vol)).toFixed(2);
    
                    last = formatNumber(last);
                    h = formatNumber(h);
                    l = formatNumber(l);
                    v = (v / 10 ** 6).toFixed(2);
                    v = formatNumber(v);
                    setDollars({ ...dollars, last, low: l, high: h, vol: v }); 
                }
            }
         /*    price.getCryptoPrice('USD', symbolB).then(object => {
                if (symbolB === 'USDT') {
                    object = {};
                    object.price = 1;
                    
                }
                if (object === undefined) return;
                console.log(object.price)
                let last = (object.price * lastPrice).toFixed(2);
                let h = (object.price * high).toFixed(2);
                let l = (object.price * low).toFixed(2);
                let v = (object.price * Number(vol)).toFixed(2);

                last = formatNumber(last);
                h = formatNumber(h);
                l = formatNumber(l);
                v = (v / 10 ** 6).toFixed(2);
                v = formatNumber(v);

                setDollars({ ...dollars, last, low: l, high: h, vol: v }); 
            });*/
        }, 
        //eslint-disable-next-line react-hooks/exhaustive-deps
        [lastPrice, high, low, vol]
    );

    useEffect(
        _ => {
            clearInterval(intervalId);
            intervalId = setInterval(() => {
                const pair = `${symbolA}-${symbolB}`;
                let favs = localStorage.getItem('favs');

                if (favs) {
                    favs = JSON.parse(favs);

                    if (favs[pair] === true || favs[pair] === false) {
                        setIsFav(favs[pair]);
                    }
                }
            }, 1000);
        },
        [symbolA, symbolB]
    );

    return (
        <div className="common-info js-panel-item js-pair">
            <div
                className="wrapper-pair js-wrapper-pair"
                id="js-wrapper-pair"
                onClick={handleWrapper}
            />
            <div className="top">
                <div className="star">
                    {isFav ? (
                        <i
                            className="fa fa-star"
                            style={{ color: '#00bbff' }}
                            aria-hidden="true"
                        />
                    ) : (
                        <i className="far fa-star"></i>
                    )}
                    <span>Pair</span>
                </div>
                <div className="pair-select">
                    <div className="link js-pair-link" onClick={handleWrapper}>
                        <span>
                            {symbolA} / {symbolB}
                        </span>
                        <span className="icon-arrow-d" />
                    </div>
                    <PairDrop History={History} handleWrapper={handleWrapper} />
                    
                </div>
            </div>
            <div className="price">
                <div className="last-price">
                    <span className="title">Last price</span>
                    <div className="value">
                        {symbolB !== 'USDT' ? (
                            <Fragment>
                                <span className="emp">
                                    {lastPrice.toFixed(5)}
                                </span>
                                <span className="dollars">${dollars.last}</span>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <span className="emp">
                                    {lastPrice.toFixed(2)}
                                </span>
                            </Fragment>
                        )}
                    </div>
                </div>
                <div className="change">
                    <span className="title">24h change</span>
                    <div className="value">
                        {change >= 0 ? (
                            <Fragment>
                                <img
                                    src="/img/growth.png"
                                    style={{ width: '10px', height: '10px' }}
                                    alt="home"
                                />
                                <p className="emp">
                                    {change} <span>%</span>
                                </p>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <img
                                    src="/img/red-arrow.png"
                                    style={{ width: '10px', height: '10px' }}
                                    alt="home"
                                />
                                <p className="emp">
                                    {change} <span>%</span>
                                </p>
                            </Fragment>
                        )}
                    </div>
                </div>
            </div>
            <div className="table">
                <div className="line">
                    <span className="title">24h High</span>
                    <p className="value averta">
                        <span>{high}</span>{' '}
                        {symbolB !== 'USDT' && (
                            <span className="small">${dollars.high}</span>
                        )}
                    </p>
                </div>
                <div className="line">
                    <span className="title">24h Low</span>
                    <p className="value averta">
                        <span>{low}</span>{' '}
                        {symbolB !== 'USDT' && (
                            <span className="small">${dollars.low}</span>
                        )}
                    </p>
                </div>
                <div className="line">
                    <span className="title">24h Vol</span>
                    <p className="value averta">
                        {symbolB === 'USDT' ? (
                            <Fragment>{formatNumber(vol / 10 ** 6)}M</Fragment>
                        ) : (
                            <Fragment>
                                <span>
                                    {new Intl.NumberFormat('en-US').format(vol)}
                                </span>{' '}
                                <span className="small">${dollars.vol}M</span>
                            </Fragment>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CommonInfo;
