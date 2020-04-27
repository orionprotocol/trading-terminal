import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import AddWallet1 from '../../AddWallet/AddWallet1';
import AddWallet2 from '../../AddWallet/AddWallet2';
import FadeIn from 'react-fade-in';
import './index.css';

let price = require('crypto-price');

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
                speed: 1000,
            },
        },
    ],
};

const Wallets = _ => {
    const balances = useSelector(state => state.balances);
    const { assets } = useSelector(state => state.wallet);

    const [contract, setContract] = useState({});
    const [wallet, setWallet] = useState({});

    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [total, setTotal] = useState({});
    const [inBTC, setInBTC] = useState({});

    useEffect(
        _ => {
            let newContract = {},
                newWallet = {};
            for (let a in assets) {
                a = a.toUpperCase();
                newContract[a] = 0;
                newWallet[a] = 0;
            }
            setContract(newContract);
            setWallet(newWallet);
        },
        [assets]
    );

    useEffect(
        _ => {
            try {
                const { contractBalances, walletBalances } = balances;

                if (contractBalances && walletBalances) {
                    let newContract = {},
                        newWallet = {};

                    for (let a in assets) {
                        if (
                            Number(contractBalances[assets[a.toUpperCase()]]) >=
                            0
                        ) {
                            newContract[a.toUpperCase()] = Number(
                                contractBalances[assets[a.toUpperCase()]]
                            );
                        } else {
                            newContract[a.toUpperCase()] = 0;
                        }

                        if (
                            Number(walletBalances[assets[a.toUpperCase()]]) >= 0
                        ) {
                            newWallet[a.toUpperCase()] = Number(
                                walletBalances[assets[a.toUpperCase()]]
                            );
                        } else {
                            newWallet[a.toUpperCase()] = 0;
                        }
                    }

                    setContract({
                        // ...contract,
                        ...newContract,
                    });

                    setWallet({
                        // ...contract,
                        ...newWallet,
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
            if (Number(contract[asset]) >= 0 && Number(wallet[asset]) >= 0) {
                newTotal[asset] = (contract[asset] + wallet[asset]).toFixed(6);
                newInBTC[asset] = newTotal[asset];
                let res = await price.getCryptoPrice('BTC', asset);
                if (res) {
                    let amount;
                    if (newTotal[asset] === 'NaN') {
                        amount = 0;
                    } else {
                        amount = (
                            Number(newTotal[asset]) * Number(res.price)
                        ).toFixed(6);
                    }

                    newInBTC[asset] = amount;
                }
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
                    <img src="/img/add.png" alt="dash" />
                    <span>Add Wallet</span>
                </button>
            </div>
            <div className="crypto-wallets js-crypto-wallets">
                <Slider {...settings}>
                    {Object.keys(contract).map(a => (
                        <div className={`wallet ${a.toLowerCase()}`} key={a}>
                            <div className="title">
                                <img
                                    src={`./img/${a.toLowerCase()}-wallet.png`}
                                    alt={a}
                                />
                                <span>Details</span>
                            </div>
                            <p className="money">
                                <span className="num">
                                    {typeof total[a.toUpperCase()] ===
                                    'undefined'
                                        ? 0
                                        : total[a.toUpperCase()]}
                                </span>
                                {'     '}
                                <span className="currency">
                                    {a.toUpperCase()}
                                </span>
                            </p>
                            <p className="currency-2">
                                {typeof inBTC[a.toUpperCase()] === 'undefined'
                                    ? 0
                                    : inBTC[a.toUpperCase()]}{' '}
                                btc
                            </p>
                        </div>
                    ))}
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
