import React, { useEffect, useState, Fragment } from 'react';
import { useSelector } from 'react-redux';

/* import PairDrop from './PairDrop'; */
import PairDrop2 from './PairDrop2';
import './index.css';

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

const CommonInfo = ({ History }) => {
    /* REDUX */
    const symbolA = useSelector(state => state.general.symbolA);
    const symbolB = useSelector(state => state.general.symbolB);
    const lastPrice = useSelector(state => state.general.lastPrice);
    const high = useSelector(state => state.general.high);
    const low = useSelector(state => state.general.low);
    const vol = useSelector(state => state.general.vol);
    const change = useSelector(state => state.general.change);
    const tickers = useSelector(state => state.general.tickers);
    const supportTradingPairs = useSelector(state => state.general.supportTradingPairs);
    /*   const {  supportTradingPairs } = useSelector(state => state.general); */
    /* REDUX */

    const [dollars, setDollars] = useState({});
    const [isFav, setIsFav] = useState(false);
    const [formatVol, setformatVol] = useState(0);

    /* FORMATING NUMBERS STATE*/
    //Aca inicia las funciones que se encargan de darle un formato a cada valor que se muestra en pantalla 
    //a traves de la data que viene del back end
    const initialState = {
        minQty: 0,
        maxQty: 0,
        minPrice: 0,
        maxPrice: 0,
        pricePrecision: 0,
        qtyPrecision: 0,
        baseAssetPrecision: 0,
        quoteAssetPrecision: 0
    }
    const [formatingPair, setformatingPair] = useState(initialState)

    useEffect(() => {
        setformatingPair(initialState)
    }, [symbolA, symbolB]);

    useEffect(() => {
        if (supportTradingPairs.length > 0) {
            if (formatingPair.pricePrecision === 0 && formatingPair.maxPrice === 0) {
                supportTradingPairs.forEach(pair => {
                    if (pair.symbolA === symbolA && pair.symbolB === symbolB) {
                        setformatingPair({
                            ...formatingPair,
                            minQty: pair.minQty,
                            maxQty: pair.maxQty,
                            minPrice: pair.minPrice,
                            maxPrice: pair.maxPrice,
                            pricePrecision: pair.pricePrecision,
                            qtyPrecision: pair.qtyPrecision,
                            baseAssetPrecision: pair.baseAssetPrecision,
                            quoteAssetPrecision: pair.quoteAssetPrecision
                        })
                    }
                });
            }
        }
    }, [supportTradingPairs, lastPrice, high, low]);
    /* END OF FORMATING NUMBERS STATE SECTION*/

    /*  console.log("la precision segun el par", formatingPair) */

    const formatFunction = (vol) =>{
        let volumen
        let sizeOfNumber = vol.toString().replace('.', '').length - 3
        if (vol <= 999) {
            volumen = `${vol}`
        } else if (vol > 999 && vol <= 999999) {
            volumen = `${(vol / Math.pow(10, sizeOfNumber)).toFixed(2)} K`
        } else if (vol > 999999 && vol <= 999999999) {
            volumen = `${(vol / Math.pow(10, sizeOfNumber)).toFixed(2)} M`
        } else if (vol > 999999999) {
            volumen = `${(vol / Math.pow(10, sizeOfNumber)).toFixed(2)} B`
        }
        return volumen
    }
    useEffect(
        _ => {
            if (symbolB === 'USDT') {
                return
            } else {
                /*  console.log(tickers[`${symbolB}-USDT`]) */
                if (tickers[`${symbolB}-USDT`] !== undefined) {
                    let last = (tickers[`${symbolB}-USDT`].lastPrice * lastPrice).toFixed(2);
                    let h = (tickers[`${symbolB}-USDT`].lastPrice * high).toFixed(2);
                    let l = (tickers[`${symbolB}-USDT`].lastPrice * low).toFixed(2);
                    let v = (tickers[`${symbolB}-USDT`].lastPrice * Number(vol)).toFixed(2);
                    last = formatNumber(last);
                    h = formatNumber(h);
                    l = formatNumber(l);
                    /*   v = (v / 10 ** 6).toFixed(2); */
                    /* v = formatNumber(v); */
                    setDollars({ ...dollars, last, low: l, high: h, vol: formatFunction(v) });
                }
            }
        },
        //eslint-disable-next-line react-hooks/exhaustive-deps
        [lastPrice, high, low, vol]
    );

    /* FORMAT VOL NUMBER  FUNCTION*/
    //Esta funcion se encarga de tomar el valor que proviene de la base de datos, y transformarlo en una 
    //anotacion reducida
    useEffect(() => {
        let finalvalue = parseFloat(vol)
        setformatVol(formatFunction(finalvalue))
       
    }, [vol]);
    /* END OF FORMAT VOL NUMBER FUNCTION*/

    /* console.log(formatVol) */
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

                    {/* <PairDrop History={History} handleWrapper={handleWrapper} /> */}
                    <PairDrop2 History={History} handleWrapper={handleWrapper} />
                </div>
            </div>
            <div className="price">
                <div className="last-price">
                    <span className="title">Last price</span>
                    <div className="value">
                        <span className="emp">
                            {lastPrice.toFixed(formatingPair.pricePrecision)}{symbolB === 'USDT' && '$'}
                        </span>
                        {symbolB !== 'USDT' && <span className="dollars">${dollars.last}</span>}
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
                        <span>{parseFloat(high).toFixed(formatingPair.pricePrecision)}</span>
                        {symbolB === 'USDT' && '$'}{' '}
                        {symbolB !== 'USDT' && (
                            <span className="small">${dollars.high}</span>
                        )}
                    </p>
                </div>
                <div className="line">
                    <span className="title">24h Low</span>
                    <p className="value averta">
                        <span>{parseFloat(low).toFixed(formatingPair.pricePrecision)}</span>
                        {symbolB === 'USDT' && '$'}{' '}
                        {symbolB !== 'USDT' && (
                            <span className="small">${dollars.low}</span>
                        )}
                    </p>
                </div>
                <div className="line">
                    <span className="title">24h Vol</span>
                    <p className="value averta">
                        {symbolB === 'USDT' ?
                            (`${formatVol} $`)
                            :
                            (
                                <Fragment>
                                    <span>
                                        {formatVol}
                                        {/* {new Intl.NumberFormat('en-US').format(vol)} */}
                                    </span>{' '}
                                    <span className="small">${dollars.vol}</span>
                                </Fragment>
                            )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CommonInfo;
