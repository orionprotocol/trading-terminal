import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Line from "../Line";
import "./index.css";

const PairDrop = props => {
    const dispatch = useDispatch();

    const { assets } = useSelector(state => state.general);
    const [assetsRender, setAssets] = useState([]);
    const [currentQuote, setCurrentQuote] = useState("");

    const setSymbolA = useCallback(
        data => dispatch({ type: "SetSymbolA", payload: data }),
        [dispatch]
    );
    const setSymbolB = useCallback(
        data => dispatch({ type: "SetSymbolB", payload: data }),
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
            if (currentQuote !== "") {
                updateRenderAssets();
            }
        },
        //eslint-disable-next-line react-hooks/exhaustive-deps
        [currentQuote]
    );

    const handlePair = symbolA => {
        setSymbolA(symbolA);
        setSymbolB(currentQuote);
        props.handleWrapper();
    };

    return (
        <div className="pair-drop js-pair-drop">
            <div className="titles">{assetsRender}</div>
            <div className="search">
                <div className="input">
                    <input type="text" placeholder="Search pair" />
                    <i className="fa fa-search" aria-hidden="true" />
                </div>
                <div className="favourite">
                    <i className="fa fa-star-o" aria-hidden="true" />
                    <span>Favourites</span>
                </div>
            </div>
            <div className="pair-table">
                <div className="titles-p">
                    <div className="title">
                        <span>Pair</span>
                        <img src="./img/arrow-down.svg" alt="home" />
                    </div>
                    <div className="title short">
                        <span>Last Pr.</span>
                        <img src="./img/arrow-down.svg" alt="home" />
                    </div>
                    <div className="title short">
                        <span>24h Vol</span>
                        <img src="./img/arrow-down.svg" alt="home" />
                    </div>
                    <div className="title chg">
                        <span>24h Change</span>
                        <img src="./img/arrow-down.svg" alt="home" />
                    </div>
                </div>
                <div className="lines">
                    <div className="part">
                        {currentQuote !== "" &&
                            assets.assets2[currentQuote].map((e, i) => (
                                <Line
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
