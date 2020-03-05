import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import AddWallet1 from "../../AddWallet/AddWallet1";
import AddWallet2 from "../../AddWallet/AddWallet2";
import FadeIn from "react-fade-in";
import "./index.css";

let price = require("crypto-price");

const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1130,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                autoplay: true,
                speed: 1000
            }
        }
    ]
};

const Wallets = _ => {
    const balances = useSelector(state => state.balances);
    const [contract, setContract] = useState({
        ETH: 0,
        BTC: 0,
        XRP: 0
    });
    const [wallet, setWallet] = useState({
        ETH: 0,
        BTC: 0,
        XRP: 0
    });

    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [total, setTotal] = useState({});
    const [inBTC, setInBTC] = useState({});

    useEffect(
        _ => {
            try {
                const { contractBalances, walletBalances } = balances;
                if (contractBalances && walletBalances) {
                    // price.getCryptoPrice('BTC', 'ETH').then((object) => {
                    // 	// console.log(object);
                    // 	let amount = (Number(contractBalances.ETH) * Number(object.price)).toFixed(6);
                    // 	setEthBtc(amount);
                    // 	// console.log(amount);
                    // });

                    setContract({
                        ...contract,
                        // ETH: Number(contractBalances.WETH),
                        ETH: Number(contractBalances.ETH) || 0,
                        BTC: Number(contractBalances.WBTC) || 0,
                        XRP: Number(contractBalances.WXRP) || 0
                    });

                    setWallet({
                        ...wallet,
                        // ETH: Number(contractBalances.WETH),
                        ETH: Number(walletBalances.ETH) || 0,
                        BTC: Number(walletBalances.WBTC) || 0,
                        XRP: Number(walletBalances.WXRP) || 0
                    });
                }
            } catch (e) {
                console.log(e);
            }
        },
        //eslint-disable-next-line react-hooks/exhaustive-deps
        [balances]
    );

    const setTotals = async _ => {
        let newTotal = {},
            newInBTC = {};
        for (let asset in contract) {
            newTotal[asset] = (contract[asset] + wallet[asset]).toFixed(6);
            newInBTC[asset] = newTotal[asset];
            let res = await price.getCryptoPrice("BTC", asset);
            if (res) {
                let amount = (
                    Number(newTotal[asset]) * Number(res.price)
                ).toFixed(6);

                newInBTC[asset] = amount;
            }
        }
        setInBTC(newInBTC);
        setTotal(newTotal);
    };

    useEffect(
        _ => {
            setTotals();
        },
        //eslint-disable-next-line react-hooks/exhaustive-deps
        [contract, wallet]
    );

    const handleAddWallet = _ => {
        setShow1(!show1);
    };

    const handleShow2 = _ => {
        setShow1(false);
        setTimeout(() => {
            setShow2(true);
        }, 100);
    };

    const handleShow1 = _ => {
        setShow2(false);
        setTimeout(() => {
            setShow1(true);
        }, 100);
    };

    return (
        <div className="wallets">
            <div className="top">
                <h2>Wallets</h2>
                <button className="add js-add-wallet" onClick={handleAddWallet}>
                    <img src="./img/add.png" alt="dash" />
                    <span>Add Wallet</span>
                </button>
            </div>
            <div className="crypto-wallets js-crypto-wallets">
                <Slider {...settings}>
                    <div className="wallet eth">
                        <div className="title">
                            <img src="./img/eth-wallet.png" alt="dash" />
                            <span>Details</span>
                        </div>
                        <p className="money">
                            <span className="num">
                                {/* {contract.ETH.toFixed(6)} */}
                                {total.ETH}
                            </span>{" "}
                            <span className="currency">ETH</span>
                        </p>
                        <p className="currency-2">{inBTC.ETH} btc</p>
                    </div>
                    <div className="wallet btc">
                        <div className="title">
                            <img src="./img/btc-wallet.png" alt="dash" />
                            <span>Details</span>
                        </div>
                        <p className="money">
                            <span className="num">
                                {/* {contract.BTC.toFixed(6)} */}
                                {total.BTC}
                            </span>{" "}
                            <span className="currency">BTC</span>
                        </p>
                        <p className="currency-2">{inBTC.BTC} btc</p>
                    </div>
                    <div className="wallet dash">
                        <div className="title">
                            <img src="./img/xrp-wallet.png" alt="dash" />
                            <span>Details</span>
                        </div>
                        <p className="money">
                            <span className="num">
                                {/* {contract.XRP.toFixed(6)} */}
                                {total.XRP}
                            </span>{" "}
                            <span className="currency">XRP</span>
                        </p>
                        <p className="currency-2">{inBTC.XRP} btc</p>
                    </div>
                </Slider>
            </div>

            {show1 ? (
                <FadeIn transitionDuration={500}>
                    <AddWallet1
                        show2={handleShow2}
                        hide1={_ => setShow1(false)}
                    />
                </FadeIn>
            ) : null}

            {show2 ? (
                <FadeIn transitionDuration={500}>
                    <AddWallet2
                        show1={handleShow1}
                        hide2={_ => setShow2(false)}
                    />
                </FadeIn>
            ) : null}
        </div>
    );
};

export default Wallets;
