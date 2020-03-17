import React, { useEffect, useState } from 'react';
import coins from 'coinlist';
import { useSelector } from 'react-redux';
let price = require('crypto-price');

const formatNumber = number => {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 1 }).format(
        number
    );
};

export default function Line({ asset, handlePair, assetB }) {
    const { tickers } = useSelector(state => state.general);
    const [dollars, setDollars] = useState({});
    const [isFav, setIsFav] = useState(false);
    const [change24h, setChange24h] = useState(0);
    const [vol24h, setVol24h] = useState(0);

    const pair = asset + assetB;

    useEffect(_ => {
        let favs = localStorage.getItem('favs');
        if (favs) {
            favs = JSON.parse(favs);
            if (favs[pair]) {
                setIsFav(favs[pair]);
            }
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(
        _ => {
            if (tickers[pair]) {
                price.getCryptoPrice('USD', assetB).then(object => {
                    let vol = Number(tickers[pair].vol24h) * object.price;
                    vol = (vol / 10 ** 6).toFixed(2);
                    let last = (
                        Number(tickers[pair].lastPrice) * object.price
                    ).toFixed(2);
                    setDollars({
                        ...dollars,
                        last: last,
                        vol: vol
                    });
                });

                if (tickers[pair].vol24h) {
                    if (Number(tickers[pair].vol24h) > 1000000) {
                        setVol24h(
                            formatNumber(tickers[pair].vol24h / 1000000) + 'M'
                        );
                    } else {
                        setVol24h(formatNumber(tickers[pair].vol24h));
                    }
                }

                if (tickers[pair].change24h) {
                    setChange24h(Number(tickers[pair].change24h));
                }
            }
        },
        //eslint-disable-next-line react-hooks/exhaustive-deps
        [tickers[pair]]
    );

    const handleFav = _ => {
        let favs = localStorage.getItem('favs');

        if (!favs) {
            favs = {};
        } else {
            favs = JSON.parse(favs);
        }

        favs[pair] = !isFav;
        favs = JSON.stringify(favs);
        localStorage.setItem('favs', favs);
        setIsFav(!isFav);
    };

    return (
        <div className="line">
            <div className="cell" onClick={_ => handlePair(asset)}>
                <img
                    className="img"
                    src={`./img/${asset.toLowerCase()}.png`}
                    alt="home"
                />
                <div className="text">
                    <span className="emp">{asset}</span>
                    <span className="small">{coins.get(asset).name}</span>
                </div>
            </div>
            <div className="cell short">
                <span className="title-m">Last Pr.</span>
                <div className="text">
                    <span className="emp">
                        {tickers[pair] ? tickers[pair].lastPrice : 0}
                    </span>
                    <span className="small">${dollars.last}</span>
                </div>
            </div>
            <div className="cell short">
                <span className="title-m">24h Vol</span>
                <div className="text">
                    <span className="emp">{vol24h}</span>
                    <span className="small">${formatNumber(dollars.vol)}M</span>
                </div>
            </div>
            <div className="cell chg">
                {change24h >= 0 ? (
                    <img
                        src="./img/growth.png"
                        alt="home"
                        style={{ width: '10px', height: '10px' }}
                    />
                ) : (
                    <img
                        src="./img/red-arrow.png"
                        style={{ width: '10px', height: '10px' }}
                        alt="home"
                    />
                )}
                <p>
                    <span className="emp">{change24h}</span> <span>%</span>
                </p>

                {isFav ? (
                    <div className="star js-star active" onClick={handleFav}>
                        <i className="fa fa-star" aria-hidden="true" />
                    </div>
                ) : (
                    <div className="star js-star" onClick={handleFav}>
                        <i className="fa fa-star-o" aria-hidden="true" />
                    </div>
                )}
            </div>
        </div>
    );
}
