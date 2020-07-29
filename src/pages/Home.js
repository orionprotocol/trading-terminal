import React, { lazy, useEffect, useCallback, Suspense, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from 'antd';
import MobileNavigation from '../components/MobileNavigation';
import Loader from '../components/Loader';
import PairDrop2 from './components/PairDrop2';
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
  /*  const pair = useSelector((state) => state.responsive.home.pair); */
  const exchange = useSelector((state) => state.responsive.home.exchange);
  const chart = useSelector((state) => state.responsive.home.chart);
  const history = useSelector((state) => state.responsive.home.history);
  const orderbook = useSelector((state) => state.responsive.home.orderbook);
  /*   console.log(exchange) */
  const [showPairsDropdown, setShowPairsDropdown] = useState(false);
  const togglePairsDropdown = () => setShowPairsDropdown(!showPairsDropdown);

  return (
    <Suspense fallback={<Loader />}>
      <div className="index">
        <Sidebar
          history={props.history}
          togglePairsDropdown={togglePairsDropdown}
          showPairsDropdown={showPairsDropdown}
        />

        <Row className="home-container">
          {/* Mobile modules */}
          {!showPairsDropdown && <MobileNavigation />}
          {active && showPairsDropdown && (
            <PairDrop2 History={props.history} handleWrapper={togglePairsDropdown} />
          )}
          {/* Mobile modules */}

          {/* Sections */}
          <Col xs={24}>
            <Row gutter={[8]}>
              <Col className="left-panel" xs={24} lg={4}>
                {!active && <CommonInfo History={props} />}

                {(!active || (active && exchange && !showPairsDropdown)) && <Exchange />}
              </Col>
              <Col className="center-panel" xs={24} lg={16}>
                <Row gutter={[0, 8]}>
                  <Col xs={24}>
                    {' '}
                    {(!active || (active && chart && !showPairsDropdown)) && <TVChart />}
                  </Col>
                  <Col xs={24}>
                    {' '}
                    {(!active || (active && history && !showPairsDropdown)) && <Orders />}
                  </Col>
                </Row>
              </Col>

              <Col className="right-panel" xs={24} lg={4}>
                {(!active || (active && orderbook && !showPairsDropdown)) && <OrderBooks />}
              </Col>
            </Row>
          </Col>
          {/* Sections */}
        </Row>
      </div>
    </Suspense>
  );
}

export default Home;
