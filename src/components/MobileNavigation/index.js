import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from 'antd';
import './index.scss';

const MobileNavigation = (_) => {
  const pair = useSelector((state) => state.responsive.home.pair);
  const exchange = useSelector((state) => state.responsive.home.exchange);
  const chart = useSelector((state) => state.responsive.home.chart);
  const history = useSelector((state) => state.responsive.home.history);
  const orderbook = useSelector((state) => state.responsive.home.orderbook);
  const symbol = useSelector((state) => state.general.symbol);
  const dispatch = useDispatch();

  const setActive = useCallback((payload) => dispatch({ type: 'SetHomeActive', payload }), [
    dispatch,
  ]);
  const setPair = useCallback((_) => dispatch({ type: 'SetHomePair' }), [dispatch]);
  const setExchange = useCallback((_) => dispatch({ type: 'SetHomeExchange' }), [dispatch]);
  const setChart = useCallback((_) => dispatch({ type: 'SetHomeChart' }), [dispatch]);
  const setHistory = useCallback((_) => dispatch({ type: 'SetHomeHistory' }), [dispatch]);
  const setOrderbook = useCallback((_) => dispatch({ type: 'SetHomeOrderbook' }), [dispatch]);
  const setSymbol = useCallback((payload) => dispatch({ type: 'SetSymbol', payload }), [dispatch]);

  const update = (_) => {
    setPair();
    let orderbook = document.querySelector('.right-panel.js-panel');
    if (orderbook) orderbook.classList.add('active');
  };

  useEffect((_) => {
    window.addEventListener('resize', (_) => {
      if (window.innerWidth > 1130) {
        // setActive(true);
        // update();
        setActive(false);
      } else {
        //setActive(false);
      }
    });
    if (window.innerWidth < 1130) {
      update();
      setActive(true);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    (_) => {
      const div = document.querySelector('#chart-container');
      if (div) {
        if (chart) {
          div.style.visibility = 'visible';
          setSymbol(symbol);
        } else div.style.visibility = 'hidden';
      }
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [pair, exchange, chart, history, orderbook]
  );

  const handleChart = (_) => {
    setChart();
  };

  return (
    <Col className="mobile-navigation" xs={24} lg={0}>
      <Row className="prices">
        <Col>Last price</Col>
      </Row>
      <Row className="navigation">
        <Col
          xs={6}
          className={`nav-item ${exchange ? 'active' : ''}`}
          data-nav="exchange"
          onClick={setExchange}
        >
          <img src="/img/svg/exchange.svg" alt="exchange" />
          <div className="text">Exchange</div>
        </Col>
        <Col
          xs={6}
          className={`nav-item ${chart ? 'active' : ''}`}
          data-nav="chart"
          onClick={handleChart}
        >
          <img className="chart-icon" src="/img/svg/chart.svg" alt="chart" />
          <div className="text">Chart</div>
        </Col>
        <Col
          xs={6}
          className={`nav-item ${history ? 'active' : ''}`}
          data-nav="history"
          onClick={setHistory}
        >
          <img src="/img/svg/history.svg" alt="history" />
          <div className="text">History</div>
        </Col>
        <Col
          xs={6}
          className={`nav-item ${orderbook ? 'active' : ''}`}
          data-nav="orderbook"
          onClick={setOrderbook}
        >
          <img className="chart-icon" src="/img/svg/orderbook.svg" alt="orderbook" />
          <div className="text">Orderbook</div>
        </Col>
      </Row>
    </Col>
  );
};

export default MobileNavigation;
