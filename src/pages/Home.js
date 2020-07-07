import React, { lazy, useEffect, useCallback, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../components/Loader';
import IndexNav from '../components/Home/IndexNav';

const CommonInfo = lazy(() =>
  import(/* webpackChunkName: 'CommonInfo' */ '../components/Home/CommonInfo')
);
const Exchange = lazy(() =>
  import(/* webpackChunkName: 'Exchange' */ '../components/Home/Exchange')
);
const OrderBooks = lazy(() =>
  import(/* webpackChunkName: 'OrderBooks' */ '../components/Home/OrderBooks')
);
const Orders = lazy(() =>
  import(/* webpackChunkName: 'OrderHistory' */ '../components/Home/Orders')
);
const Sidebar = lazy(() => import(/* webpackChunkName: 'Sidebar' */ '../components/Sidebar'));
const TVChart = lazy(() =>
  import(/* webpackChunkName: 'TVChart' */ '../components/TVChartContainer')
);

function addClass() {
  let e = document.querySelector('.left-panel.js-panel');
  if (e) e.classList.add('active');

  let orderbook = document.querySelector('.right-panel.js-panel');
  if (orderbook) orderbook.classList.add('active');
}

function removeClass() {
  let e = document.querySelector('.left-panel.js-panel');
  if (e) e.classList.remove('active');

  let orderbook = document.querySelector('.right-panel.js-panel');
  if (orderbook) orderbook.classList.remove('active');
}

function Home(props) {
  const dispatch = useDispatch();
  const setSymbol = useCallback((payload) => dispatch({ type: 'SetSymbol', payload }), [dispatch]);
  const setSymbolA = useCallback((data) => dispatch({ type: 'SetSymbolA', payload: data }), [
    dispatch,
  ]);
  const setSymbolB = useCallback((data) => dispatch({ type: 'SetSymbolB', payload: data }), [
    dispatch,
  ]);

  useEffect(() => {
    let aux = props.history.location.pathname.split('/');
    if (aux.length === 3) {
      aux = aux[2].split('_');
      if (props.history.location.pathname.includes('trade') && aux.length === 2) {
        setSymbolA(aux[0]);
        setSymbolB(aux[1]);
        setSymbol(`${aux[0]}-${aux[1]}`);
      }
    }
  }, [props.history.location.pathname]);

  const active = useSelector((state) => state.responsive.home.active);
  const pair = useSelector((state) => state.responsive.home.pair);
  const exchange = useSelector((state) => state.responsive.home.exchange);
  const chart = useSelector((state) => state.responsive.home.chart);
  const history = useSelector((state) => state.responsive.home.history);
  const orderbook = useSelector((state) => state.responsive.home.orderbook);

  useEffect(() => {
    window.addEventListener('resize', (_) => {
      if (window.innerWidth > 1130) removeClass();
      else addClass();
    });

    if (window.innerWidth > 1130) removeClass();
    else addClass();
  }, []);
  return (
    <Suspense fallback={<Loader />}>
      <IndexNav />

      <div className="index">
        <Sidebar history={props.history} />

        <div className="my-container">
          <div className="my-row">
            <div className="left-panel js-panel">
              {!active || (active && pair) ? <CommonInfo History={props} /> : null}

              {!active || (active && exchange) ? <Exchange /> : null}
            </div>

            {/* Large */}
            {!active ? (
              <div className="center-panel js-panel">
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
    </Suspense>
  );
}

export default Home;
