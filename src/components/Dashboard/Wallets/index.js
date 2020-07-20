import React, { lazy, useState, useEffect, Suspense } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import FadeIn from "react-fade-in";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

const AddWallet1 = lazy(() => import("../../AddWallet/AddWallet1"));
const AddWallet2 = lazy(() => import("../../AddWallet/AddWallet2"));

const formatNumber = (number) => {
  return new Intl.NumberFormat("en-US", { minimumFractionDigits: 2 }).format(
    number
  );
};

const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  responsive: [
    {
      breakpoint: 1130,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        speed: 1000,
        arrows: false,
      },
    },
  ],
};

const Wallets = (_) => {
  const balances = useSelector((state) => state.balances);
  const assets = useSelector((state) => state.wallet.assets);
  const tickers = useSelector((state) => state.general.tickers);
  const changeInTickers = useSelector((state) => state.general.changeInTickers);
  const [contract, setContract] = useState({});
  const [wallet, setWallet] = useState({});

  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [total, setTotal] = useState({});
  const [inBTC, setInBTC] = useState({});
  const [inUSD, setInUSD] = useState({});

  useEffect(
    (_) => {
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
    (_) => {
      try {
        const { contractBalances, walletBalances } = balances;

        if (contractBalances && walletBalances) {
          let newContract = {},
            newWallet = {};

          for (let a in assets) {
            if (Number(contractBalances[assets[a.toUpperCase()]]) >= 0) {
              newContract[a.toUpperCase()] = Number(
                contractBalances[assets[a.toUpperCase()]]
              );
            } else {
              newContract[a.toUpperCase()] = 0;
            }

            if (Number(walletBalances[assets[a.toUpperCase()]]) >= 0) {
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

  const setTotals = async (_) => {
    let newTotal = {},
      newInBTC = {},
      newInUSD = {};
    if (Object.keys(tickers).length !== 0) {
      for (const symbolA in contract) {
        if (Number(contract[symbolA]) >= 0 && Number(wallet[symbolA]) >= 0) {
          newTotal[symbolA] = (contract[symbolA] + wallet[symbolA]).toFixed(6);
          newInBTC[symbolA] = newTotal[symbolA];
          newInUSD[symbolA] = newTotal[symbolA];

          if (symbolA === "USDT" && tickers[`BTC-USDT`] !== undefined) {
            /* dolar price in BTC */
            newInBTC[symbolA] = formatNumber(
              Number(newTotal[symbolA]) / Number(tickers[`BTC-USDT`].lastPrice)
            );
          }

          if (tickers[`${symbolA}-BTC`] !== undefined) {
            newInBTC[symbolA] = formatNumber(
              Number(newTotal[symbolA]) *
                Number(tickers[`${symbolA}-BTC`].lastPrice)
            );
          }
          if (tickers[`${symbolA}-USDT`] !== undefined) {
            /* price for dolar */
            newInUSD[symbolA] = formatNumber(
              Number(newTotal[symbolA]) *
                Number(tickers[`${symbolA}-USDT`].lastPrice)
            );
          }
        }
      }
    }
    setInBTC(newInBTC);
    setTotal(newTotal);
    setInUSD(newInUSD);
  };

  useEffect(
    (_) => {
      setTotals();
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [contract, wallet, changeInTickers]
  );

  const handleAddWallet = (_) => {
    setShow1(!show1);
  };

  const handleShow2 = (_) => {
    setShow1(false);
    setTimeout(() => {
      setShow2(true);
    }, 100);
  };

  const handleShow1 = (_) => {
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
          <FontAwesomeIcon icon="plus" />
          <span>Add Wallet</span>
        </button>
      </div>
      <div className="crypto-wallets js-crypto-wallets">
        <Slider {...settings}>
          {Object.keys(contract).map((a) => (
            <div className={`wallet ${a.toLowerCase()}`} key={a}>
              <div className="title">
              <img src={require(`../../../css/icons/currencies_highlight/${a.toLowerCase()}.svg`)} alt={a} />
                <span>Details</span>
              </div>
              <p className="money">
                <span className="num">
                  {typeof total[a.toUpperCase()] === "undefined"
                    ? 0
                    : total[a.toUpperCase()]}
                </span>
                {"     "}
                <span className="currency">{a.toUpperCase()}</span>
              </p>
              <p className="currency-2">
                {typeof inBTC[a.toUpperCase()] === "undefined"
                  ? 0
                  : inBTC[a.toUpperCase()]}{" "}
                btc
              </p>
              <p className="currency-2">
                $
                {typeof inUSD[a.toUpperCase()] === "undefined"
                  ? 0
                  : inUSD[a.toUpperCase()]}
              </p>
            </div>
          ))}
        </Slider>
      </div>
      <Suspense fallback="">
        {show1 ? (
          <FadeIn transitionDuration={500}>
            <AddWallet1 show2={handleShow2} hide1={(_) => setShow1(false)} />
          </FadeIn>
        ) : null}

        {show2 ? (
          <FadeIn transitionDuration={500}>
            <AddWallet2 show1={handleShow1} hide2={(_) => setShow2(false)} />
          </FadeIn>
        ) : null}
      </Suspense>
    </div>
  );
};

export default Wallets;
