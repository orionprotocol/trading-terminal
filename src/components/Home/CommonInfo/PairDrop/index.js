import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Line from '../Line';
import compareValues from '../functions/compareValues'
import './index.css';

const PairDrop = ({ handleWrapper, History }) => {
    const dispatch = useDispatch();
    const { tickers } = useSelector(state => state.general);
    const { assets } = useSelector(state => state.general);
    const [assetsRender, setAssets] = useState([]);
    const [currentQuote, setCurrentQuote] = useState('');
    const [lines, setLines] = useState([]);
    const [linesSetted, setlinesSetted] = useState(false);
    const [classes, setClasses] = useState({
        type: 'fa-angle-down',
        pair: 'fa-angle-down',
        time: 'fa-angle-down',
        amount: 'fa-angle-down',
        price: 'fa-angle-down',
        status: 'fa-angle-down',
        total: 'fa-angle-down',
    });
    const [favs, setFavs] = useState(false);

    const setChange = useCallback(
        data => dispatch({ type: 'SetChange', payload: data }),
        [dispatch]
    );
    const setHigh = useCallback(
        data => dispatch({ type: 'SetHigh', payload: data }),
        [dispatch]
    );
    const setLow = useCallback(
        data => dispatch({ type: 'SetLow', payload: data }),
        [dispatch]
    );
    const setVol = useCallback(
        data => dispatch({ type: 'SetVol', payload: data }),
        [dispatch]
    );
    const setLastPrice = useCallback(
        data => dispatch({ type: 'SetLastPrice', payload: data }),
        [dispatch]
    );


    useEffect(
        _ => {
            if (assets.assets1) {
                setCurrentQuote(assets.assets1[0]);
            }
        },
        [assets]
    );

    useEffect(() => {
        let pair = '', auxpairs = []
        if (assets.assets2) {
            if (assets.assets2[currentQuote] !== undefined) {
                for (let x = 0; x < assets.assets2[currentQuote].length; x++) {
                    pair = `${assets.assets2[currentQuote][x]}${currentQuote}`
                    if (tickers[pair]) {
                        auxpairs.push({
                            symbolA: assets.assets2[currentQuote][x],
                            change24h: tickers[pair].change24h,
                            lastPrice: parseFloat(tickers[pair].lastPrice),
                            vol24h: parseFloat(tickers[pair].vol24h),
                        })
                    } else {
                        auxpairs = []
                        break
                    }
                }
                if (auxpairs.length > 0 && !linesSetted) {
                    setLines(auxpairs)
                    setlinesSetted(true)
                    updateRenderAssets()
                }
            }
        }
    }, [Object.keys(tickers), currentQuote, assets]);

    const setSymbolA = useCallback(
        data => dispatch({ type: 'SetSymbolA', payload: data }),
        [dispatch]
    );
    const setSymbolB = useCallback(
        data => dispatch({ type: 'SetSymbolB', payload: data }),
        [dispatch]
    );


    const updateRenderAssets = _ => {
        const changeSymbolB = symbol => {
            setCurrentQuote(symbol);
            setlinesSetted(false)
        }
        setAssets(
            assets.assets1.map((e, i) => {
                if (e === currentQuote) {
                    return (
                        <span
                            className="active"
                            key={i}
                            onClick={_ => changeSymbolB(e)}
                        >
                            {e}
                        </span>
                    );
                } else {
                    return (
                        <span key={i} onClick={_ => changeSymbolB(e)
                        }>
                            {e}
                        </span>
                    );
                }
            })
        );
    };

    const handleChange = e => {
        let field = e.target.value;
        if (field === '') {
            setlinesSetted(false)
        } else {
            setLines(
                lines.filter(e => {
                    let replace = '^' + field;
                    let regex = new RegExp(replace, 'i');
                    return regex.test(e.symbolA);
                })
            );
        }
    };

    const handleFavs = _ => {
        if (assets.assets2[currentQuote]) {
            if (!favs === false) {
                setLines([]);
                setTimeout(() => {
                    setlinesSetted(false)
                }, 0);
            } else {
                let favs = localStorage.getItem('favs');

                if (favs) {
                    favs = JSON.parse(favs);

                    setLines([]);
                    setTimeout(() => {
                        setLines(
                            lines.filter(e => {
                                let pair = e.symbolA + currentQuote;

                                if (favs[pair] === true) return true;
                                return false;
                            })
                        );
                    }, 0);
                }
            }
            setFavs(!favs);
        }
    };

    const handlePair = symbolA => {
        setChange(0);
        setLow(0);
        setHigh(0);
        setVol(0);
        setLastPrice(0);
        setSymbolA(symbolA);
        setSymbolB(currentQuote);
        History.history.push(`/trade/${symbolA}_${currentQuote}`)
        handleWrapper();
    };

    const handleSort = (name, sortType) => {
        let linesSorted = [];
        linesSorted = compareValues(name, sortType, lines)
        setLines([...linesSorted]);
        /*  let newClasses = {};
         let sortType = 'asc';
         for (let e in classes) {
             if (e === type) {
                 if (classes[e] === 'fa-angle-down') {
                     newClasses[e] = 'fa-angle-up';
                 } else {
                     newClasses[e] = 'fa-angle-down';
                     sortType = 'desc';
                 }
             } else {
                 newClasses[e] = 'fa-angle-down';
             }
         }
         setClasses(newClasses); */

        /*  symbolA: assets.assets2[currentQuote][x],
         change24h: tickers[pair].change24h,
         lastPrice: parseFloat(tickers[pair].lastPrice),
         vol24h: parseFloat(tickers[pair].vol24h), */

    };

    return (
        <div className="pair-drop js-pair-drop">

            <div className="titles">
                <div className="search" style={{ padding: '0', paddingTop: '15px' }}>
                    <div className="favourite" onClick={handleFavs}>
                        {favs ? (
                            <i
                                className="fa fa-star"
                                style={{ color: '#00bbff' }}
                                aria-hidden="true"
                            />
                        ) : (
                                <>
                                    <i className="far fa-star"></i>
                                </>
                            )}

                        {/*  <span>Favourites</span> */}
                    </div>
                </div>
                {assetsRender}
            </div>
            <div className="search">
                <div className="input">
                    <input
                        type="text"
                        placeholder="Search pair"
                        onChange={handleChange}
                    />
                    <i className="fa fa-search" aria-hidden="true" />
                </div>
            </div>
            <div className="pair-table">
                <div className="titles-p">
                    <div className="title" onClick={_ => handleSort('symbolA', 'letter')}>
                        <span>Pair</span>
                        <img src="/img/arrow-down.svg" alt="home" />
                    </div>
                    <div className="title short" onClick={_ => handleSort('lastPrice', 'number')}>
                        <span>Last Pr.</span>
                        <img src="/img/arrow-down.svg" alt="home" />
                    </div>
                    <div className="title short" onClick={_ => handleSort('vol24h', 'number')}>
                        <span>24h Vol</span>
                        <img src="/img/arrow-down.svg" alt="home" />
                    </div>
                    <div className="title chg" onClick={_ => handleSort('change24h', 'number')}>
                        <span>24h Change</span>
                        <img src="/img/arrow-down.svg" alt="home" />
                    </div>
                </div>
                <div className="lines">
                    <div className="part">
                        {currentQuote !== '' &&
                            lines.map((e, i) => (
                                <Line
                                    asset={e.symbolA}
                                    key={i}
                                    handlePair={handlePair}
                                    assetB={currentQuote}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PairDrop;
