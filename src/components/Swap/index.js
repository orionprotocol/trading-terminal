import React, { memo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./swapSelector.scss";
import CoinPrice from "./priceOfCoins";
import SwapSelectors from "./swapSelector";
import Loader from "../Loader";
import { EthereumOrder } from "../../services/EthereumOrder";
import openNotification from "../../components/Notification";
const index = memo(() => {
  const balances = useSelector((state) => state.balances);
  const metamaskConnected = useSelector(
    (state) => state.wallet.metamaskConnected
  );
  const fortmaticConnected = useSelector(
    (state) => state.wallet.fortmaticConnected
  );
  const coinbaseConnected = useSelector(
    (state) => state.wallet.coinbaseConnected
  );
  const mode = useSelector((state) => state.general.mode);
  const assets = useSelector((state) => state.general.assets);
  const tickers = useSelector((state) => state.general.tickers);

  const [swapCoins, setswapCoins] = useState({
    from: "ETH",
    to: "WBTC",
  });
  const [swapValue, setswapValue] = useState({
    from: 0,
    to: 0,
  });
  const [errorMessage, seterrorMessage] = useState({ error: false, msg: "" });
  const [symbolsB, setSymbolsB] = useState([]);

  useEffect(
    (_) => {
      console.log(assets.assets1);
      if (assets.assets1 && assets.assets1.length > 0) {
        const { assets1 } = assets;

        const symbsb = assets1.map((e) => {
          if (assets[e.toUpperCase()]) {
            return assets[e.toUpperCase()];
          } else {
            return e;
          }
        });

        setSymbolsB(symbsb);
      }
    },
    [assets]
  );

  useEffect(() => {
    const checkAmountAvailable = () => {
      for (let x in balances.contractBalances) {
        if (swapCoins.from === x) {
          if (swapValue.from > balances.contractBalances[x]) {
            seterrorMessage({
              error: true,
              msg: `Your don't have enough ${x} in your wallet, to perform this action`,
            });
          } else {
            seterrorMessage({ error: false, msg: "" });
          }
        }
      }
    };
    checkAmountAvailable();
  }, [swapValue.from]);

  useEffect(() => {
    let regex = new RegExp(swapCoins.from.replace("W", ""));
    let regex2 = new RegExp(swapCoins.to.replace("W", ""));
    if (Object.keys(tickers).length > 0) {
      let exist = true;
      for (let x in tickers) {
        if (regex.test(x) && regex2.test(x)) {
          exist = false;
        }
      }
      exist
        ? seterrorMessage({
            error: true,
            msg: `You can not swap this Pair for the moment`,
          })
        : seterrorMessage({ error: false, msg: "" });
    }
  }, [swapCoins, tickers]);

  const setTypeOfTrade = () => {
    let regex = new RegExp(symbolsB.join("|"));
    if (regex.test(swapCoins.from)) {
      return "buy";
    } else {
      return "sell";
    }
  };

  const setSymbols = () => {
    let symbolA, symbolB;
    let regex = new RegExp(symbolsB.join("|"));
    if (regex.test(swapCoins.from)) {
      symbolA = swapCoins.to;
      symbolB = swapCoins.from;
    } else if (regex.test(swapCoins.to)) {
      symbolA = swapCoins.from;
      symbolB = swapCoins.to;
    }
    return [symbolA, symbolB];
  };

  const setPrice = () => {
    /* In here this logic only will work if the coins have names without the W in his name */
    let from = swapCoins.from.replace("W", ""),
      to = swapCoins.to.replace("W", "");
    for (let x in tickers) {
      if (x.includes(from) && x.includes(to)) return tickers[x].lastPrice;
    }
  };

  const swap = async () => {
    try {
      let ethereumOrderMessage = "";

      if (fortmaticConnected) {
        let ethereumOrder = new EthereumOrder("fortmatic");
        ethereumOrderMessage = await ethereumOrder.toEthereumOrder(
          setSymbols(),
          setTypeOfTrade(),
          setPrice(),
          swapValue.from
        )();
      } else if (metamaskConnected) {
        let ethereumOrder = new EthereumOrder("metamask");
        ethereumOrderMessage = await ethereumOrder.toEthereumOrder(
          setSymbols(),
          setTypeOfTrade(),
          setPrice(),
          swapValue.from
        )();
      } else if (coinbaseConnected) {
        let ethereumOrder = new EthereumOrder("coinbase");
        ethereumOrderMessage = await ethereumOrder.toEthereumOrder(
          setSymbols(),
          setTypeOfTrade(),
          setPrice(),
          swapValue.from
        )();
      }

      openNotification({
        message: ethereumOrderMessage,
      });
    } catch (e) {
      console.log("error", e);

      if (e.msg) {
        openNotification({
          message: e.msg,
        });
      }
    }
  };

  if (!balances.contractBalances) return <Loader />;
  return (
    <div className={`swap-container ${mode === "Light" ? "" : "dark-mode"}`}>
      <div className="swap-card">
        <SwapSelectors
          swapCoins={swapCoins}
          setswapCoins={setswapCoins}
          swapValue={swapValue}
          setswapValue={setswapValue}
        />
        <CoinPrice
          swapCoins={swapCoins}
          errorMessage={errorMessage}
          seterrorMessage={seterrorMessage}
        />
        <span className="error">
          {" "}
          {errorMessage.error ? errorMessage.msg : null}
        </span>
        <button
          disabled={errorMessage.error}
          className="swap-button"
          onClick={swap}
        >
          <h6>SWAP</h6>
        </button>
      </div>
    </div>
  );
});

export default index;
