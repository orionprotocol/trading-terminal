import React, { Fragment, useEffect, useState } from 'react';
/* REDUX */
import { useSelector } from 'react-redux';
/* STYLES */
import './index.scss';
import './table.css';
/* Exported functions */
import compareValues from '../../funtions/compareValues';
/*Dependencies */
import axios from 'axios';
import dayjs from 'dayjs';
import { Row, Col, Layout } from 'antd';
/* Components */
import Line from './Line';
import Table from './components/table';
import TypeOfFilter from './components/typeOfFilter';
import DateFilter from './components/dateFilter';
import PairFilter from './components/pairFilter';
import StatusFilter from './components/statusFilter';

const urlBase = process.env.REACT_APP_BACKEND;

const { Content } = Layout;

// Open orders
//  	orders[i].status == "NEW" ||
// 		orders[i].status == "PARTIALLY_FILLED"
var loadOrderHistory = () => {};

const Orders = (_) => {
  const symbolA = useSelector((state) => state.general.symbolA);
  const symbolB = useSelector((state) => state.general.symbolB);
  const mode = useSelector((state) => state.general.mode);
  const balances = useSelector((state) => state.balances);
  const ethAddress = useSelector((state) => state.wallet.ethAddress);
  const supportTradingPairs = useSelector((state) => state.general.supportTradingPairs);
  const [orders, setOrders] = useState([]);
  const [ordersOrigin, setOrdersOrigin] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [state, setState] = useState({ type: 'history', renderOrders: null });
  const [startDateA, setStartDateA] = useState('');
  const [startDateB, setStartDateB] = useState('');
  const [statusFilterSelection, setstatusFilterSelection] = useState('All');
  const [filterPairA, setfilterPairA] = useState(symbolA);
  const [filterPairB, setfilterPairB] = useState(symbolB);
  const [classes, setClasses] = useState({
    type: 'angle-down',
    pair: 'angle-down',
    time: 'angle-down',
    amount: 'angle-down',
    price: 'angle-down',
    status: 'angle-down',
    total: 'angle-down',
  });
  /*  console.log(balances.contractBalances)  */
  loadOrderHistory = () => {
    let address;

    const { ethereum } = window;

    if (ethereum) {
      address = ethereum.selectedAddress;
    } else {
      address = localStorage.getItem('currentAccount') || '';
    }

    if (address) {
      axios
        .get(
          `${urlBase}/api/v1/orderHistory?symbol=${filterPairA}-${filterPairB}&address=${address}`
        )
        .then((res) => {
          if (Array.isArray(res.data)) {
            setAllOrders(res.data);
            let newOrders;
            let newTime = dayjs(startDateA).unix();
            let timeB = dayjs(startDateB).unix();

            if (state.type === 'open') {
              newOrders = res.data.filter(
                (d) =>
                  d.status === 'NEW' ||
                  d.status === 'PARTIALLY_FILLED' ||
                  d.status === 'PARTIALLY_CANCELLED'
              );
            } else {
              if (statusFilterSelection === 'All') {
                newOrders = res.data;
              } else {
                newOrders = res.data.filter((d) => d.status === statusFilterSelection);
              }
            }
            if (startDateA !== '' && startDateB !== '') {
              newOrders = newOrders.filter((e) => {
                let time = String(e.time);
                time = time.substring(0, 10);
                return time >= newTime && time <= timeB;
              });
            }
            setOrders(newOrders);
            setOrdersOrigin(newOrders);
          }
        })
        .catch((err) => {
          console.log('error', err);
        });
    }
  };
  useEffect(
    (_) => {
      loadOrderHistory();
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    /* Si se añade un nuevo simbolo se debera de añadir, a esta lista para q, se pueda visualizar cuando cambie el valor del mismo dentro del objecto, de otra forma no se sabra cuando cambio el balance */
    [
      filterPairA,
      filterPairB,
      ethAddress,
      balances.contractBalances.ETH,
      balances.contractBalances.USDT,
      balances.contractBalances.WBTC,
      balances.contractBalances.WXRP,
    ]
  );

  useEffect(() => {
    setfilterPairA(symbolA);
    setfilterPairB(symbolB);
  }, [symbolA, symbolB]);

  const initialState = {
    minQty: 0,
    maxQty: 0,
    minPrice: 0,
    maxPrice: 0,
    pricePrecision: 0,
    qtyPrecision: 0,
    baseAssetPrecision: 0,
    quoteAssetPrecision: 0,
  };
  const [formatingPair, setformatingPair] = useState(initialState);
  useEffect(() => {
    setformatingPair(initialState);
  }, [filterPairA, filterPairB]);

  useEffect(() => {
    if (supportTradingPairs.length > 0) {
      if (formatingPair.pricePrecision === 0 && formatingPair.maxPrice === 0) {
        supportTradingPairs.forEach((pair) => {
          if (pair.symbolA === filterPairA && pair.symbolB === filterPairB) {
            setformatingPair({
              ...formatingPair,
              minQty: pair.minQty,
              maxQty: pair.maxQty,
              minPrice: pair.minPrice,
              maxPrice: pair.maxPrice,
              pricePrecision: pair.pricePrecision,
              qtyPrecision: pair.qtyPrecision,
              baseAssetPrecision: pair.baseAssetPrecision,
              quoteAssetPrecision: pair.quoteAssetPrecision,
            });
          }
        });
      }
    }
  }, [supportTradingPairs, formatingPair]);

  const handleType = (type) => {
    document.querySelector('#open-price-card-button').classList.toggle('active');
    document.querySelector('#history-price-card-button').classList.toggle('active');

    let newOrders = allOrders;
    let newTime = dayjs(startDateA).unix();
    let timeB = dayjs(startDateB).unix();
    if (type === 'open') {
      newOrders = allOrders.filter(
        (d) =>
          d.status === 'NEW' ||
          d.status === 'PARTIALLY_FILLED' ||
          d.status === 'PARTIALLY_CANCELLED'
      );
      if (startDateA !== '' && startDateB !== '') {
        newOrders = newOrders.filter((e) => {
          let time = String(e.time);
          time = time.substring(0, 10);
          return time >= newTime && time <= timeB;
        });
      }
    } else {
      if (statusFilterSelection === 'All') {
        newOrders = allOrders;
      } else {
        newOrders = allOrders.filter((d) => d.status === statusFilterSelection);
      }
      if (startDateA !== '' && startDateB !== '') {
        newOrders = newOrders.filter((e) => {
          let time = String(e.time);
          time = time.substring(0, 10);
          return time >= newTime && time <= timeB;
        });
      }
    }
    setOrders(newOrders);
    setOrdersOrigin(newOrders);
    setState({ ...state, type });
  };

  const handleSort = (type) => {
    let newClasses = {};
    let sortType = 'asc';
    for (let e in classes) {
      if (e === type) {
        if (classes[e] === 'angle-down') {
          newClasses[e] = 'angle-up';
        } else {
          newClasses[e] = 'angle-down';
          sortType = 'desc';
        }
      } else {
        newClasses[e] = 'angle-down';
      }
    }
    setClasses(newClasses);

    let sortKey = '';
    let ordersSorted = [];
    switch (type) {
      case 'type':
        sortKey = 'side';
        ordersSorted = orders.sort(compareValues(sortKey, sortType));
        setOrders([...ordersSorted]);
        break;
      case 'pair':
        sortKey = 'symbol';
        ordersSorted = orders.sort(compareValues(sortKey, sortType));
        setOrders([...ordersSorted]);
        break;
      case 'time':
        sortKey = 'time';
        ordersSorted = orders.sort(compareValues(sortKey, sortType));
        setOrders([...ordersSorted]);
        break;
      case 'amount':
        sortKey = 'orderQty';
        ordersSorted = orders.sort(compareValues(sortKey, sortType));
        setOrders([...ordersSorted]);
        break;
      case 'price':
        sortKey = 'price';
        ordersSorted = orders.sort(compareValues(sortKey, sortType));
        setOrders([...ordersSorted]);
        break;
      case 'status':
        sortKey = 'status';
        ordersSorted = orders.sort(compareValues(sortKey, sortType));
        setOrders([...ordersSorted]);
        break;
      case 'total':
        sortKey = 'total';
        ordersSorted = orders.sort(compareValues(sortKey, sortType));
        setOrders([...ordersSorted]);
        break;
      default:
        break;
    }
  };

  const renderOrders = (_) => {
    setState({ ...state, renderOrders: null });

    if (orders && orders.length > 0) {
      setTimeout((_) => {
        let newRenderOrders = orders.map((data, i) => (
          <Line formatingPair={formatingPair} type={state.type} key={i} data={data} />
        ));

        setState({ ...state, renderOrders: newRenderOrders });
      }, 0);
    }
  };

  useEffect(
    (_) => {
      renderOrders();
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [orders]
  );

  function handleChangeA(value) {
    setOrders([]);
    setfilterPairA(value);
  }
  function handleChangeB(value) {
    setOrders([]);
    setfilterPairB(value);
  }
  function handleChangeC(value) {
    if (value === 'All') {
      setOrders(allOrders);
    } else {
      setOrders(allOrders.filter((e) => e.status === value));
    }
  }

  const handleDateChangeRaw = (e) => {
    e.preventDefault();
  };

  useEffect(
    (_) => {
      let newTime = dayjs(startDateA).unix();
      let timeB = dayjs(startDateB).unix();

      let newOrders = allOrders.filter((e) => {
        let time = String(e.time);
        time = time.substring(0, 10);
        return time >= newTime && time <= timeB;
      });

      setOrders(newOrders);
    },
    [startDateA, startDateB]
  );

  const optsClass = mode === 'Light' ? 'option-select emp' : 'dark-mode option-select emp';

  const dropdownStyle =
    mode === 'Light'
      ? {}
      : {
          backgroundColor: '#2e2e45',
          color: '#e9e9e9a8',
        };

  return (
    <Fragment>
      <Layout className="father orders">
        <Content style={{ margin: '10px 15px 0 0', overflow: 'initial' }}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Row
                style={{
                  paddingLeft: '15px',
                }}
              >
                <TypeOfFilter handleType={handleType} />
                <DateFilter
                  startDateA={startDateA}
                  startDateB={startDateB}
                  setStartDateA={setStartDateA}
                  setStartDateB={setStartDateB}
                  handleDateChangeRaw={handleDateChangeRaw}
                />
                <Col xs={24} md={10}>
                  <div className="orders-selects">
                    <PairFilter
                      filterPairA={filterPairA}
                      filterPairB={filterPairB}
                      allOrders={allOrders}
                      optsClass={optsClass}
                      handleChangeA={handleChangeA}
                      handleChangeB={handleChangeB}
                      dropdownStyle={dropdownStyle}
                    />
                    <StatusFilter
                      setstatusFilterSelection={setstatusFilterSelection}
                      optsClass={optsClass}
                      handleChangeC={handleChangeC}
                      dropdownStyle={dropdownStyle}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          {/* AQUI */}
          <Row style={{ paddingLeft: 15, paddingBottom: 10 }}>
            <Table handleSort={handleSort} classes={classes} renderOrders={state.renderOrders} />
          </Row>
        </Content>
      </Layout>
    </Fragment>
  );
};

export default Orders;

export { loadOrderHistory };
