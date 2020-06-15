import React, { useEffect, useState, Fragment } from 'react';
import coins from 'coinlist';
import { useSelector } from 'react-redux';
let price = require('crypto-price');

const formatNumber = number => {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 1 }).format(
        number
    );
};

export default function Line2({data,handlePair}) {
/* REDUX */
const { tickers } = useSelector(state => state.general);
/* REDUX */

    const [dollars, setDollars] = useState({});
    const [change24h, setChange24h] = useState(0);
    const [vol24h, setVol24h] = useState(0);

    useEffect(
        _ => {
            if (data) {
               /*  if (assetB === 'USDT') return */
                let vol = (Number(data.vol24h) * Number(tickers[`BTC-USDT`].lastPrice) / 10 ** 6).toFixed(2);
           
                let last = (
                    Number(data.lastPrice) * Number(tickers[`BTC-USDT`].lastPrice)
                ).toFixed(2);
                setDollars({
                    ...dollars,
                    last: last,
                    vol: vol,
                });
                if (data.vol24h) {
                    if (Number(data.vol24h) > 1000000) {
                        setVol24h(
                            formatNumber(Number(data.vol24h) / 1000000) + 'M'
                        );
                    } else {
                        setVol24h(formatNumber(Number(data.vol24h)));
                    }
                }

                if (data.change24h) {
                    setChange24h(Number(data.change24h));
                }
            }


        },
        //eslint-disable-next-line react-hooks/exhaustive-deps
        [data]
    );

    const handleFav = _ => {
        /* Este es la funcion que se encarga de añadir un nuevo favorito a la lista de local storage */
        let favs = localStorage.getItem('fav');

        if (!favs) {
            favs = {};
        } else {
            favs = JSON.parse(favs);
        }

        favs[data.pair] = !data.fav;
        favs = JSON.stringify(favs);
        localStorage.setItem('fav', favs);
    };
   

    return (
        <div className="line" >
            <div className="cell" onClick={_ => handlePair(data.symbolA,data.symbolB)}>
                <img
                    className="img"
                    src={`/img/${data.symbolA.toLowerCase()}.png`}
                    alt="home"
                />
                <div className="text">
                    <span className="emp">{data.symbolA}-</span>
                    <span className="small">{data.symbolA}</span> 
                </div>
            </div>
            <div className="cell short" onClick={_ => handlePair(data.symbolA,data.symbolB)}>
                <span className="title-m">Last Pr.</span>
                <div className="text">
                    <span className="emp">
                        {data ? data.lastPrice : 0}
                    </span>
                    <span className="small">${dollars.last}</span>
                </div>
            </div>
            <div className="cell short" onClick={_ => handlePair(data.symbolA,data.symbolB)}>
                <span className="title-m">24h Vol</span>
                <div className="text">
                    <span className="emp">{vol24h}</span>
                    <span className="small">${formatNumber(dollars.vol)}M</span>
                </div>
            </div>

            <div className="cell chg">
                {change24h >= 0 ? (
                    <img
                        onClick={_ => handlePair(data.symbolA,data.symbolB)}
                        src="/img/growth.png"
                        alt="home"
                        style={{ width: '10px', height: '10px' }}
                    />
                ) : (
                        <img
                            onClick={_ => handlePair(data.symbolA,data.symbolB)}
                            src="/img/red-arrow.png"
                            style={{ width: '10px', height: '10px' }}
                            alt="home"
                        />
                    )}
                <p onClick={_ => handlePair(data.symbolA,data.symbolB)}>
                    <span className="emp">{change24h}</span> <span>%</span>
                </p>

                {data.fav ? (
                    <div className="star js-star active" onClick={handleFav}>
                        <i className="fa fa-star" aria-hidden="true" />
                    </div>
                ) : (
                        <div className="star js-star" onClick={handleFav}>
                            <i className="far fa-star"></i>
                        </div>
                    )}
            </div>
        </div>
    );
}
