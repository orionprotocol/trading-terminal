import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Line from '../Line';
import './index.css';

const PairDrop = ({ handleWrapper, History }) => {
    const dispatch = useDispatch();
    const { tickers } = useSelector(state => state.general);
    const { assets } = useSelector(state => state.general);
    const [assetsRender, setAssets] = useState([]);
    const [currentQuote, setCurrentQuote] = useState('');
    const [lines, setLines] = useState([]);
    const [newlines, setnewLines] = useState([]);
    const [favs, setFavs] = useState(false);

useEffect(() => {
    let pair='',auxpairs=[]
    if(assets.assets2){
        if(assets.assets2[currentQuote]!==undefined){
            for (let x = 0; x < assets.assets2[currentQuote].length; x++) {
                pair=`${assets.assets2[currentQuote][x]}${currentQuote}`
                if(tickers[pair]){
                    auxpairs.push({
                        symbolA:assets.assets2[currentQuote][x],
                        change24h: tickers[pair].change24h,
                        lastPrice: parseFloat(tickers[pair].lastPrice),
                        vol24h: parseFloat(tickers[pair].vol24h),
                    })
                }else{
                    break
                }
            }
        }
    }
   

}, [Object.keys(tickers),currentQuote,assets]);


    const setSymbolA = useCallback(
        data => dispatch({ type: 'SetSymbolA', payload: data }),
        [dispatch]
    );
    const setSymbolB = useCallback(
        data => dispatch({ type: 'SetSymbolB', payload: data }),
        [dispatch]
    );

    const updateRenderAssets = _ => {
        setAssets(
            assets.assets1.map((e, i) => {
                if (e === currentQuote) {
                    return (
                        <span
                            className="active"
                            key={i}
                            onClick={_ => setCurrentQuote(e)}
                        >
                            {e}
                        </span>
                    );
                } else {
                    return (
                        <span key={i} onClick={_ => setCurrentQuote(e)}>
                            {e}
                        </span>
                    );
                }
            })
        );
    };

    useEffect(
        _ => {
            if (assets.assets1) {
                setCurrentQuote(assets.assets1[0]);
            }
        },
        [assets]
    );

    useEffect(
        _ => {
            if (currentQuote !== '') {
                updateRenderAssets();

                setLines([]);

                setTimeout(() => {
                    setLines(assets.assets2[currentQuote]);
                }, 0);
            }
        },
        //eslint-disable-next-line react-hooks/exhaustive-deps
        [currentQuote]
    );

    const handlePair = symbolA => {
        setSymbolA(symbolA);
        setSymbolB(currentQuote);
        History.history.push(`/trade/${symbolA}_${currentQuote}`)
        handleWrapper();
    };

    const handleChange = e => {
        let field = e.target.value;

        if (field === '') {
            setLines(assets.assets2[currentQuote]);
        } else {
           /*  console.log("q coño es esto?", assets.assets2[currentQuote].filter(e => {
                let replace = '^' + field;
                let regex = new RegExp(replace, 'i');
                return regex.test(e);
            })) */
            setLines(
                assets.assets2[currentQuote].filter(e => {
                    let replace = '^' + field;
                    let regex = new RegExp(replace, 'i');
                    return regex.test(e);
                })
            );
        }
    };

    const handleFavs = _ => {
        if (assets.assets2[currentQuote]) {
            if (!favs === false) {
                setLines([]);
                setTimeout(() => {
                    setLines(assets.assets2[currentQuote]);
                }, 0);
            } else {
                let favs = localStorage.getItem('favs');

                if (favs) {
                    favs = JSON.parse(favs);

                    setLines([]);
/* console.log('q coño es esto 2',assets.assets2[currentQuote].filter(e => {
    let pair = e + currentQuote;

    if (favs[pair] === true) return true;
    return false;
})) */
                    setTimeout(() => {
                        setLines(
                            assets.assets2[currentQuote].filter(e => {
                                let pair = e + currentQuote;

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

    return (
        <div className="pair-drop js-pair-drop">
             
            <div className="titles">
            <div className="search" style={{padding:'0',paddingTop:'15px'}}>
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

                    <span>Favourites</span>
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
                    <div className="title">
                        <span>Pair</span>
                        <img src="/img/arrow-down.svg" alt="home" />
                    </div>
                    <div className="title short">
                        <span>Last Pr.</span>
                        <img src="/img/arrow-down.svg" alt="home" />
                    </div>
                    <div className="title short">
                        <span>24h Vol</span>
                        <img src="/img/arrow-down.svg" alt="home" />
                    </div>
                    <div className="title chg">
                        <span>24h Change</span>
                        <img src="/img/arrow-down.svg" alt="home" />
                    </div>
                </div>
                <div className="lines">
                    <div className="part">
                        {currentQuote !== '' &&
                            lines.map((e, i) => (
                                <Line
                                    lines={lines}
                                    asset={e}
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
