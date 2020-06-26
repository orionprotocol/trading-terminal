import React, { lazy, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import IndexNav from "../components/Home/IndexNav";
import Orders from "../components/Home/Orders";

const CommonInfo = lazy(() =>
  import(/* webpackChunkName: 'CommonInfo' */ "../components/Home/CommonInfo")
);
const Exchange = lazy(() =>
  import(/* webpackChunkName: 'Exchange' */ "../components/Home/Exchange")
);
const OrderBooks = lazy(() =>
  import(/* webpackChunkName: 'OrderBooks' */ "../components/Home/OrderBooks")
);
const Sidebar = lazy(() =>
  import(/* webpackChunkName: 'Sidebar' */ "../components/Sidebar")
);
const TVChart = lazy(() =>
  import(/* webpackChunkName: 'TVChart' */ "../components/TVChartContainer")
);

function addClass() {
  let e = document.querySelector(".left-panel.js-panel");
  if (e) e.classList.add("active");

  let orderbook = document.querySelector(".right-panel.js-panel");
  if (orderbook) orderbook.classList.add("active");
}

function removeClass() {
  let e = document.querySelector(".left-panel.js-panel");
  if (e) e.classList.remove("active");

  let orderbook = document.querySelector(".right-panel.js-panel");
  if (orderbook) orderbook.classList.remove("active");
}

function Home(props) {
  const dispatch = useDispatch();
  const setSymbol = useCallback(
    (payload) => dispatch({ type: "SetSymbol", payload }),
    [dispatch]
  );
  const setSymbolA = useCallback(
    (data) => dispatch({ type: "SetSymbolA", payload: data }),
    [dispatch]
  );
  const setSymbolB = useCallback(
    (data) => dispatch({ type: "SetSymbolB", payload: data }),
    [dispatch]
  );

  useEffect(() => {
    let aux = props.history.location.pathname.split("/");
    if (aux.length === 3) {
      aux = aux[2].split("_");
      if (
        props.history.location.pathname.includes("trade") &&
        aux.length === 2
      ) {
        setSymbolA(aux[0]);
        setSymbolB(aux[1]);
        setSymbol(`${aux[0]}-${aux[1]}`);
      }
    }
  }, [props.history.location.pathname]);
  const { orderbook, active, pair, exchange, chart, history } = useSelector(
    (state) => state.responsive.home
  );
  const { mode, symbol } = useSelector((state) => state.general);

  useEffect(() => {
    window.addEventListener("resize", (_) => {
      if (window.innerWidth > 1130) removeClass();
      else addClass();
    });

    if (window.innerWidth > 1130) removeClass();
    else addClass();
  }, []);

  // useEffect(
  //     _ => {
  //         const { pathname } = window.location;

  //         if (pathname.includes('trade')) {
  //             window.renderChart('all', symbol, mode);
  //         }
  //     },
  //     //eslint-disable-next-line react-hooks/exhaustive-deps
  //     [window.location.pathname, mode, symbol]
  // );

  return (
    <div className="">
      <IndexNav />

      <div className="index">
        <Sidebar history={props.history} />

        <div className="my-container">
          <div className="my-row">
            <div className="left-panel js-panel">
              {!active || (active && pair) ? (
                <CommonInfo History={props} />
              ) : null}

              {!active || (active && exchange) ? <Exchange /> : null}
              {/* <Exchange /> */}
            </div>

            {/* Large */}
            {!active ? (
              <div className="center-panel js-panel">
                {/* <div className="image js-chart js-panel-item">
                                    <TVChart />
                                  
                                </div> */}
                <TVChart />
                <Orders />
              </div>
            ) : null}

            {/* Small */}
            {(active && chart) || (active && history) ? (
              <div>
                {active && chart ? <TVChart /> : null}

                {active && history ? <Orders /> : null}
              </div>
            ) : null}
            <div className="right-panel js-panel active">
              {!active || (active && orderbook) ? <OrderBooks /> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
