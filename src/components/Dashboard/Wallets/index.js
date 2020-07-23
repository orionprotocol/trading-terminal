import React, { lazy, useState, useEffect, Suspense, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col } from 'antd';
import Slider from 'react-slick';
import FadeIn from 'react-fade-in';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ethereum } from '../../../services/Coinbase';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './wallets.scss';

const AddWallet1 = lazy(() => import('../../AddWallet/AddWallet1'));
const AddWallet2 = lazy(() => import('../../AddWallet/AddWallet2'));

const formatNumber = (number) => {
  return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(number);
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
  /* REDUX */
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.general.mode);
  const balances = useSelector((state) => state.balances);
  const assets = useSelector((state) => state.wallet.assets);
  const tickers = useSelector((state) => state.general.tickers);
  const changeInTickers = useSelector((state) => state.general.changeInTickers);
  const setAddWallet = useCallback((payload) => dispatch({ type: 'SetAddWallet', payload }), [
    dispatch,
  ]);
  /* REDUX */

  const [disconnecting, setdisconnecting] = useState(false);
  const [contract, setContract] = useState({});
  const [wallet, setWallet] = useState({});
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [total, setTotal] = useState({});
  const [inBTC, setInBTC] = useState({});
  const [inUSD, setInUSD] = useState({});

  const textAreaRef = useRef(null);

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
              newContract[a.toUpperCase()] = Number(contractBalances[assets[a.toUpperCase()]]);
            } else {
              newContract[a.toUpperCase()] = 0;
            }

            if (Number(walletBalances[assets[a.toUpperCase()]]) >= 0) {
              newWallet[a.toUpperCase()] = Number(walletBalances[assets[a.toUpperCase()]]);
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

  /* Disconnection function */
  const clearLocalStorage = (_) => {
    localStorage.removeItem('wanmaskConnected');
    localStorage.removeItem('metamaskConnected');
    localStorage.removeItem('fortmaticConnected');
    localStorage.removeItem('coinbaseConnected');
    localStorage.removeItem('ethAddress');
    localStorage.removeItem('address');
  };

  const handleDisconnect = (_) => {
    setdisconnecting(true);
    if (localStorage.getItem('coinbaseConnected')) {
      ethereum.close();
    }
    clearLocalStorage();

    setTimeout(() => {
      setdisconnecting(false);
      window.location.replace('/');
    }, 1000);
  };
  /* Disconnection function */

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

          if (symbolA === 'USDT' && tickers[`BTC-USDT`] !== undefined) {
            /* dolar price in BTC */
            newInBTC[symbolA] = formatNumber(
              Number(newTotal[symbolA]) / Number(tickers[`BTC-USDT`].lastPrice)
            );
          }

          if (tickers[`${symbolA}-BTC`] !== undefined) {
            newInBTC[symbolA] = formatNumber(
              Number(newTotal[symbolA]) * Number(tickers[`${symbolA}-BTC`].lastPrice)
            );
          }
          if (tickers[`${symbolA}-USDT`] !== undefined) {
            /* price for dolar */
            newInUSD[symbolA] = formatNumber(
              Number(newTotal[symbolA]) * Number(tickers[`${symbolA}-USDT`].lastPrice)
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

  const copyToClipboard = (e) => {
    textAreaRef.current.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    /*  e.target.focus();
    this.setState({ copySuccess: 'Copied!' }); */
  };

  return (
    <Col xs={24} className="wallets">
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
                <img
                  src={`/img/icons/currencies_highlight/${a.toLowerCase()}.svg`}
                  alt={a}
                />

                <button
                  onClick={handleDisconnect}
                  type="button"
                  className={`btn-disconnet-wallet ${mode}`}
                >
                  <img
                    src={`/img/icons/dashboard/totalBalance/minusIcon-${mode}.svg`}
                    alt={'minus'}
                  />
                  Disconnect Wallet
                </button>
              </div>

              <div className={`copy-address ${mode}`}>
                <form>
                  <textarea
                    readOnly
                    ref={textAreaRef}
                    value={localStorage.getItem('address')}
                  ></textarea>
                  <textarea disabled={true} className="invisible" />
                </form>
                {
                  /* Logical shortcut for only displaying the 
            button if the copy command exists */
                  document.queryCommandSupported('copy') && (
                    <img
                      onClick={copyToClipboard}
                      src={`/img/icons/dashboard/wallets/copy-icon-${mode}.svg`}
                      alt="copy"
                    />
                  )
                }
              </div>
              <span className={`title-total ${mode}`}>Total value</span>
              <p className="money">
                <span className="num">
                  {typeof total[a.toUpperCase()] === 'undefined' ? 0 : total[a.toUpperCase()]}
                </span>
                {'     '}
                <span className="currency">{a.toUpperCase()}</span>
              </p>

              <p className="currency-2">
                {typeof inBTC[a.toUpperCase()] === 'undefined' ? 0 : inBTC[a.toUpperCase()]} btc
              </p>
              <p className="currency-2">
                <span>
                  {typeof inUSD[a.toUpperCase()] === 'undefined' ? 0 : inUSD[a.toUpperCase()]} USD
                </span>
                <button type="button" className={`${mode}`}>
                  Details
                </button>
              </p>
            </div>
          ))}

          <div onClick={(_) => setAddWallet(true)} className={`wallet add-wallet ${mode}`}>
            <div className="add-w">
              <FontAwesomeIcon icon="plus" />
              Add wallet
            </div>
          </div>
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
    </Col>
  );
};

export default Wallets;
