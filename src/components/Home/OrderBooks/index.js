import React, { lazy, useState, useEffect, Suspense } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../../Loader";
import "./index.css";

const Asks = lazy(() => import("./Asks"));
const Bids = lazy(() => import("./Bids"));

const urlBase = process.env.REACT_APP_BACKEND;

function sortAsks(a, b) {
  if (a.price > b.price) {
    return 1;
  }
  if (a.price < b.price) {
    return -1;
  }
  return 0;
}

function sortBids(a, b) {
  if (a.price > b.price) {
    return -1;
  }
  if (a.price < b.price) {
    return 1;
  }
  return 0;
}

function updateOrderBookData(data, exchange, stateData, callback) {
  const asks = data.asks;
  let stateAsks = stateData.asks;
  if (!stateAsks || !asks) return;
  for (let i = 0; i < asks.length; i++) {
    let exchanges = asks[i].exchanges || [];
    if (exchange !== "all") {
      let needExchange = false;
      for (let k = 0; k < exchanges.length; k++) {
        if (exchanges[k] === exchange) {
          needExchange = true;
        }
      }
      if (!needExchange) {
        continue;
      }
    }
    let updated = false;
    for (let j = 0; j < stateAsks.length; j++) {
      if (asks[i].price === stateAsks[j].price) {
        if (parseFloat(asks[i].size) === 0) {
          stateAsks.splice(j, 1);
        } else {
          stateAsks[j].dynamic = 0;
          if (stateAsks[j].size > asks[i].size) {
            stateAsks[j].dynamic = -1;
          }
          if (stateAsks[j].size < asks[i].size) {
            stateAsks[j].dynamic = 1;
          }
          stateAsks[j].size = asks[i].size;
        }
        updated = true;
        break;
      }
    }
    if (!updated && asks[i].size !== 0) {
      asks[i].dynamic = 1;
      stateAsks.push(asks[i]);
    }
  }
  stateAsks = stateAsks.sort(sortAsks).slice(0, 20);
  stateAsks = stateAsks.sort(sortBids);
  const bids = data.bids;
  let stateBids = stateData.bids;
  for (let i = 0; i < bids.length; i++) {
    let exchanges = bids[i].exchanges || [];
    if (exchange !== "all") {
      let needExchange = false;
      for (let k = 0; k < exchanges.length; k++) {
        if (exchanges[k] === exchange) {
          needExchange = true;
        }
      }
      if (!needExchange) {
        continue;
      }
    }
    let updated = false;
    for (let j = 0; j < stateBids.length; j++) {
      if (bids[i].price === stateBids[j].price) {
        if (parseFloat(bids[i].size) === 0) {
          stateBids.splice(j, 1);
        } else {
          stateBids[j].dynamic = 0;
          if (stateBids[j].size > bids[i].size) {
            stateBids[j].dynamic = -1;
          }
          if (stateBids[j].size < bids[i].size) {
            stateBids[j].dynamic = 1;
          }
          stateBids[j].size = bids[i].size;
        }
        updated = true;
        break;
      }
    }
    if (!updated && bids[i].size !== 0) {
      bids[i].dynamic = 1;
      stateBids.push(bids[i]);
    }
  }
  const maxBid = stateBids.reduce(function (prev, current) {
    return prev.price > current.price ? prev : current;
  });
  stateBids = stateBids.sort(sortBids).slice(0, 20);
  let lastPriceStyle = "#e5494d";
  if (maxBid.price > data.lastPrice) {
    lastPriceStyle = "#2051d3";
  }
  callback(stateAsks, stateBids, maxBid, lastPriceStyle);
}

const OrderBooks = (props) => {
  const { symbol, orderBook } = useSelector((state) => state.general);
  // const newData = useSelector(state => state.general);
  // console.log('general', general);
  // const dispatch = useDispatch();
  const [state, setState] = useState({ data: { lastPrice: 0 } });
  // const setLastPrice = useCallback(data => dispatch({ type: 'SetLastPrice', payload: data }), [ dispatch ]);
  // const currentSymbol = 'ETH-BTC';
  // All exchanges

  // By each exchange
  // function loadExchangeSnapshot(exchange, symbol, depth, callback) {
  // 	if (symbol && depth) {
  // 		let url =
  // 			urlBase +
  // 			'/api/v1/exchange/orderBook?symbol={SYMBOL}&depth={DEPTH}&exchange={EXCHANGE}'
  // 				.replace('{SYMBOL}', symbol)
  // 				.replace('{DEPTH}', depth)
  // 				.replace('{EXCHANGE}', exchange);
  // 		axios.get(url).then(res => {
  // 			console.log('loadExchangeSnapshot', res.data);
  // 			callback(res.data);
  // 		});
  // 	}
  // }

  // function loadOrderBooks() {
  // 	loadSnapshot('ETH-BTC', 20);

  // 	// loadExchangeSnapshot('BINANCE', currentSymbol, 20, data => {
  // 	// 	console.log('loadExchangeSnapshot calllback', data);
  // 	// 	// this.setState({
  // 	// 	//     binance: {
  // 	// 	//         ...data,
  // 	// 	//         ...{
  // 	// 	//             lastPrice: 0,
  // 	// 	//             lastPriceStyle: "#000"
  // 	// 	//         }
  // 	// 	//     }
  // 	// 	// });
  // 	// });
  // }
  const loadSnapshot = (symbol, depth) => {
    if (symbol && depth) {
      let url =
        urlBase +
        "/api/v1/orderBook?symbol={SYMBOL}&depth={DEPTH}"
          .replace("{SYMBOL}", symbol)
          .replace("{DEPTH}", depth);
      axios.get(url).then((res) => {
        const { data } = res;

        if (data.asks.length > 0 && data.bids.length > 0) {
          setState({
            ...state,
            data: {
              ...data,
              lastPrice: 0,
              lastPriceStyle: "#000",
              ask: data.asks[data.asks.length - 1].price,
              bid: data.bids[0].price,
            },
          });
          setcargando(true);
          setTimeout(() => {
            const div = document.querySelector(".orders.asks");
            if (div) div.scrollTop = div.scrollHeight;
          }, 10);
        } else {
          setState({
            ...state,
            data: {
              ...data,
              lastPrice: 0,
              lastPriceStyle: "#000",
              // ask: data.asks[data.asks.length - 1].price,
              // bid: data.bids[0].price
            },
          });
          setcargando(true);
          setTimeout(() => {
            const div = document.querySelector(".orders.asks");
            if (div) div.scrollTop = div.scrollHeight;
          }, 10);
        }
      });
    }
  };

  useEffect(
    (_) => {
      // console.log('loadSnapshot', symbol);
      setcargando(false);
      loadSnapshot(symbol, 20);
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [symbol]
  );

  useEffect(
    (_) => {
      if (orderBook) {
        let aggregatedData = {
          asks: orderBook.aggregatedAsks,
          bids: orderBook.aggregatedBids,
        };

        updateOrderBookData(
          aggregatedData,
          "all",
          state.data,
          (asks, bids, maxBid, lastPriceStyle) => {
            setState({
              ...state,
              data: {
                ...state.data,
                asks,
                bids,
                lastPrice: maxBid.price,
              },
            });

            // setLastPrice(maxBid.price);
          }
        );
        // console.log(aggregatedData);
      }
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [orderBook]
  );

  /*  console.log("STATE",state); */
  const [cargando, setcargando] = useState(false);

  return (
    <div className={`js-panel-item js-orderbook`}>
      <div className="order-book">
        <p className="heading">Order Book</p>
        <div className="titles">
          <span className="title">Price</span>
          <span className="title">Amount</span>
          <span className="title">Total</span>
          <span className="title exch">Exch</span>
        </div>
      </div>
      <Suspense fallback={<Loader />}>
        {cargando && (
          <Asks data={state.data} lastPrice={state.data.lastPrice} />
        )}
        {cargando && (
          <div className="order-book">
            <div className="last-price">
              <span className="cell">{state.data.lastPrice}</span>
              <span className="last">Last Price</span>
            </div>
          </div>
        )}
        {cargando && (
          <Bids data={state.data} lastPrice={state.data.lastPrice} />
        )}
      </Suspense>
    </div>
  );
};

export default OrderBooks;
