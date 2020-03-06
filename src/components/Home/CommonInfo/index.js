import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import PairDrop from "./PairDrop";
import axios from "axios";
import "./index.css";
let price = require("crypto-price");

function handleWrapper() {
    const div = document.querySelector("#js-wrapper-pair");
    div.classList.toggle("active");

    const arrow = document.querySelector(".link.js-pair-link");
    arrow.classList.toggle("active");

    const drop = document.querySelector(".pair-drop.js-pair-drop");
    drop.classList.toggle("active");
}

const getAssets = pairs => {
    let res1 = [];
    let res2 = [];

    pairs.forEach(e => {
        let quote = e.split("-")[1];

        if (res1.indexOf(quote) < 0) res1.push(quote);

        if (!res2[quote]) {
            res2[quote] = [];
            res2[quote].push(e.split("-")[0]);
        } else {
            res2[quote].push(e.split("-")[0]);
        }
    });
    // console.log('res1', res1, 'res2', res2);

    return { assets1: res1, assets2: res2 };
};

const formatNumber = number => {
    return new Intl.NumberFormat("en-US", { minimumFractionDigits: 2 }).format(
        number
    );
};
let intervalId = 0;
const CommonInfo = props => {
    const dispatch = useDispatch();

    const { symbolA, symbolB, lastPrice, high, low, vol, change } = useSelector(
        state => state.general
    );

    const [dollars, setDollars] = useState({});
    const [isFav, setIsFav] = useState(false);

    const setAssets = useCallback(
        data => dispatch({ type: "SetAssets", payload: data }),
        [dispatch]
    );

    useEffect(_ => {
        const url = process.env.REACT_APP_BACKEND + "/api/v1/pairs/list";
        // console.log(url);
        axios.get(url).then(res => {
            // console.log(res.data);
            setAssets(getAssets(res.data));
        });
        // const example = [ 'ETH-BTC', 'XRP-BTC', 'HOT-BTC', 'HOT-ETH' ];
        // setAssets(getAssets(example));
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(
        _ => {
            price.getCryptoPrice("USD", symbolB).then(object => {
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
            });
        },
        //eslint-disable-next-line react-hooks/exhaustive-deps
        [lastPrice, high, low, vol]
    );

    useEffect(
        _ => {
            clearInterval(intervalId);
            intervalId = setInterval(() => {
                const pair = symbolA + symbolB;
                let favs = localStorage.getItem("favs");

                if (favs) {
                    favs = JSON.parse(favs);

                    if (favs[pair] === true || favs[pair] === false) {
                        setIsFav(favs[pair]);
                    }
                }
            }, 2000);
        },
        [symbolA, symbolB]
    );

    return (
        <div className="common-info js-panel-item js-pair">
            <div
                className="wrapper-pair js-wrapper-pair"
                id="js-wrapper-pair"
            />
            <div className="top">
                <div className="star">
                    {isFav ? (
                        <i
                            className="fa fa-star"
                            style={{ color: "#00bbff" }}
                            aria-hidden="true"
                        />
                    ) : (
                        <i className="fa fa-star-o" aria-hidden="true" />
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
                    <PairDrop handleWrapper={handleWrapper} />
                </div>
            </div>
            <div className="price">
                <div className="last-price">
                    <span className="title">Last price</span>
                    <div className="value">
                        <span className="emp">{lastPrice.toFixed(5)}</span>
                        <span className="dollars">${dollars.last}</span>
                    </div>
                </div>
                <div className="change">
                    <span className="title">24h change</span>
                    <div className="value">
                        <img src="./img/growth.png" alt="home" />
                        <p className="emp">
                            {change} <span>%</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="table">
                <div className="line">
                    <span className="title">24h High</span>
                    <p className="value averta">
                        <span>{high}</span>{" "}
                        <span className="small">${dollars.high}</span>
                    </p>
                </div>
                <div className="line">
                    <span className="title">24h Low</span>
                    <p className="value averta">
                        <span>{low}</span>{" "}
                        <span className="small">${dollars.low}</span>
                    </p>
                </div>
                <div className="line">
                    <span className="title">24h Vol</span>
                    <p className="value averta">
                        <span>
                            {new Intl.NumberFormat("en-US").format(vol)}
                        </span>{" "}
                        <span className="small">${dollars.vol}M</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CommonInfo;
