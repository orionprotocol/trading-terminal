import React, { useEffect, useCallback,memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from 'antd';
import './index.scss';

import LastPriceMobile from './components/lastPrice'

const MobileNavigation = memo((_) => {
  /* Redux */
/*   const pair = useSelector((state) => state.responsive.home.pair); */
  const mode = useSelector((state) => state.general.mode);
  const active = useSelector((state) => state.responsive.home.active);
  const exchange = useSelector((state) => state.responsive.home.exchange);
  const chart = useSelector((state) => state.responsive.home.chart);
  const history = useSelector((state) => state.responsive.home.history);
  const orderbook = useSelector((state) => state.responsive.home.orderbook);
  /* const symbol = useSelector((state) => state.general.symbol); */
  const dispatch = useDispatch();

  const setActive = useCallback((payload) => dispatch({ type: 'SetHomeActive', payload }), [
    dispatch,
  ]);
  const setPair = useCallback((_) => dispatch({ type: 'SetHomePair' }), [dispatch]);
  const setExchange = useCallback((_) => dispatch({ type: 'SetHomeExchange' }), [dispatch]);
  const setChart = useCallback((_) => dispatch({ type: 'SetHomeChart' }), [dispatch]);
  const setHistory = useCallback((_) => dispatch({ type: 'SetHomeHistory' }), [dispatch]);
  const setOrderbook = useCallback((_) => dispatch({ type: 'SetHomeOrderbook' }), [dispatch]);
 /* Redux */


 window.addEventListener('resize', (_) => {
  if (window.innerWidth > 991 && active ) {
    setActive(false);
  } else if (window.innerWidth <= 991 && !active) {
    setActive(true);
  }
});

  /* const update = (_) => {
    setPair();
  }; */
 
 useEffect((_) => {
   /*  window.addEventListener('resize', (_) => { */
       if (window.innerWidth < 1130) {
        setActive(true);
      }
   /*  }); */
    
  }, []); 

  return (
    <Col className="mobile-navigation" xs={24} lg={0}>
      <LastPriceMobile/>
      <Row className="navigation">
        <Col
          xs={6}
          className={`nav-item ${exchange ? 'active' : ''}`}
          data-nav="exchange"
          onClick={setExchange}
        >
          {mode==='Dark' ? 
          <img src={`/img/svg/${exchange? 'exchange-active':'exchange-dark'}.svg`} alt="exchange" />
          :
          <img src={`/img/svg/${exchange? 'exchange-active':'exchange-light'}.svg`} alt="exchange" />
          }
          
          <div className="text">Exchange</div>
        </Col>
        <Col
          xs={6}
          className={`nav-item ${chart ? 'active' : ''}`}
          data-nav="chart"
          onClick={setChart}
        >
          {mode==='Dark' ? 
          <img src={`/img/svg/${chart? 'chart-active':'chart-dark'}.svg`} alt="chart" />
          :
          <img src={`/img/svg/${chart? 'chart-active':'chart-light'}.svg`} alt="chart" />
          }
          
          <div className="text">Chart</div>
        </Col>
        <Col
          xs={6}
          className={`nav-item ${history ? 'active' : ''}`}
          data-nav="history"
          onClick={setHistory}
        >
           {mode==='Dark' ? 
           
          <img src={`/img/svg/${history? 'history-active':'history-dark'}.svg`} alt="history" />
          :
          <img src={`/img/svg/${history? 'history-active':'history-light'}.svg`} alt="history" />
          }
         
          <div className="text">History</div>
        </Col>
        <Col
          xs={6}
          className={`nav-item ${orderbook ? 'active' : ''}`}
          data-nav="orderbook"
          onClick={setOrderbook}
        >
           {mode==='Dark' ? 
           
          <img src={`/img/svg/${orderbook? 'orderbook-active':'orderbook-dark'}.svg`} alt="orderbook" />
          :
          <img src={`/img/svg/${orderbook? 'orderbook-active':'orderbook-light'}.svg`} alt="orderbook" />
          }
          {/* <img className="chart-icon" src={`/img/svg/orderbook${orderbook? '-active':''}.svg`} alt="orderbook" /> */}
          <div className="text">Orderbook</div>
        </Col>
      </Row>
    </Col>
  );
});

export default MobileNavigation;
