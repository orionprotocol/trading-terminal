import React, { lazy, useEffect, useCallback, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from 'antd';
import MobileNavigation from '../components/MobileNavigation';
import Loader from '../components/Loader';

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
      <div className="index">
        <Sidebar history={props.history} />
        <Row className="home-container">
          <MobileNavigation />
          <Col xs={24}>
            <Row className="content-container" gutter={[8, 8]}>
              <Col className="left-panel" xs={24} lg={4}>
                {!active || (active && pair) ? <CommonInfo History={props} /> : null}

                {!active || (active && exchange) ? <Exchange /> : null}
              </Col>

              <Col className="center-panel" xs={24} lg={14}>
                {!active || (active && chart) ? <TVChart /> : null}
                {!active || (active && history) ? <Orders /> : null}
              </Col>

              <Col className="right-panel" xs={24} lg={6}>
                {!active || (active && orderbook) ? <OrderBooks /> : null}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Suspense>
  );
}

export default Home;
