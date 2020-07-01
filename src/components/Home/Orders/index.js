import React, { Fragment, useEffect, useState } from 'react';
/* REDUX */
import { useSelector } from 'react-redux';
/* STYLES */
import './index.css';
import './table.css';
/* Exported functions */
import compareValues from '../../funtions/compareValues';
/*Dependencies */
import axios from 'axios';
import moment from 'moment';
import { Row, Col, Select, Layout } from 'antd';
import 'react-datepicker/dist/react-datepicker.min.css';
/* Components */
import Line from './Line';
import Table from './components/table'
import TypeOfFilter from './components/typeOfFilter'
import DateFilter from './components/dateFilter'
import PairFilter from './components/pairFilter'
import StatusFilter from './components/statusFilter'


const urlBase = process.env.REACT_APP_BACKEND;

const { Content } = Layout;

// Open orders
//  	orders[i].status == "NEW" ||
// 		orders[i].status == "PARTIALLY_FILLED"
var loadOrderHistory = () => { };

const Orders = _ => {
    const { symbolA, symbolB,symbol, mode, lastPrice, high, low, vol, change,tickers } = useSelector(
        state => state.general
    );
/*     const { symbol, mode } = useSelector(state => state.general); */
    const balances = useSelector(state => state.balances);
    const { ethAddress } = useSelector(state => state.wallet);
    const [orders, setOrders] = useState([]);
    const [ordersOrigin, setOrdersOrigin] = useState([]);
    const [allOrders, setAllOrders] = useState([]);
    const [state, setState] = useState({ type: 'history', renderOrders: null });
    const [startDateA, setStartDateA] = useState(new Date());
    const [startDateB, setStartDateB] = useState(new Date());
    const [statusFilterSelection, setstatusFilterSelection] = useState('All')
    const [filterPairA, setfilterPairA] = useState(symbolA)
    const [filterPairB, setfilterPairB] = useState(symbolB)
  /* console.log(allOrders)   */
    const [classes, setClasses] = useState({
        type: 'fa-angle-down',
        pair: 'fa-angle-down',
        time: 'fa-angle-down',
        amount: 'fa-angle-down',
        price: 'fa-angle-down',
        status: 'fa-angle-down',
        total: 'fa-angle-down',
    });

    loadOrderHistory = () => {
        let address;

        const { ethereum } = window;

        if (ethereum) {
            address = ethereum.selectedAddress;
        } else {
            address = localStorage.getItem('currentAccount') || '';
        }
console.log(symbolA,symbolB,filterPairA,filterPairB,symbol)
        if (address) {
            axios
                .get(`${urlBase}/api/v1/orderHistory?symbol=${filterPairA}-${filterPairB}&address=${address}`)
                .then(res => {
                    if (Array.isArray(res.data)) {
                        setAllOrders(res.data);
                        let newOrders
                        if (state.type === 'open') {
                            newOrders = res.data.filter(
                                d =>
                                    d.status === 'NEW' ||
                                    d.status === 'PARTIALLY_FILLED'
                            );
                        } else {
                            if (statusFilterSelection === 'All') {
                                newOrders = res.data
                            } else {
                                newOrders = res.data.filter(
                                    d =>
                                        d.status === statusFilterSelection
                                );
                            }
                        }
                        setOrders(newOrders);
                        setOrdersOrigin(newOrders);
                    }
                })
                .catch(err => {
                    console.log('error', err);
                });
        }
    };
    useEffect(
        _ => {
            loadOrderHistory();
        },
        //eslint-disable-next-line react-hooks/exhaustive-deps
        /* Si se añade un nuevo simbolo se debera de añadir, a esta lista para q, se pueda visualizar cuando cambie el valor del mismo dentro del objecto, de otra forma no se sabra cuando cambio el balance */
        [symbolA,symbolB,filterPairA,filterPairB, ethAddress, balances.contractBalances.ETH, balances.contractBalances.USDT , balances.contractBalances.WBTC, balances.contractBalances.WXRP ]
    );
    /* console.log(ordersOrigin) */
    const handleType = type => {
        document
            .querySelector('#open-price-card-button')
            .classList.toggle('active');
        document
            .querySelector('#history-price-card-button')
            .classList.toggle('active');

        let newOrders = allOrders;
        if (type === 'open') {
            newOrders = allOrders.filter(
                d => d.status === 'NEW' || d.status === 'PARTIALLY_FILLED'
            );
        } else {
            if (statusFilterSelection === 'All') {
                newOrders = allOrders
            } else {
                newOrders = allOrders.filter(
                    d => d.status === statusFilterSelection
                );
            }
            
        }

        setOrders(newOrders);
        setOrdersOrigin(newOrders);
        setState({ ...state, type });
    };

    const handleSort = type => {
        let newClasses = {};
        let sortType = 'asc';
        for (let e in classes) {
            if (e === type) {
                if (classes[e] === 'fa-angle-down') {
                    newClasses[e] = 'fa-angle-up';
                } else {
                    newClasses[e] = 'fa-angle-down';
                    sortType = 'desc';
                }
            } else {
                newClasses[e] = 'fa-angle-down';
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

    const renderOrders = _ => {
        setState({ ...state, renderOrders: null });

        setTimeout(_ => {
            let newRenderOrders = orders.map((data, i) => (
                <Line type={state.type} key={i} data={data} />
            ));

            setState({ ...state, renderOrders: newRenderOrders });
        }, 0);
    };

    useEffect(
        _ => {
            renderOrders();
        },
        //eslint-disable-next-line react-hooks/exhaustive-deps
        [orders]
    );

    function handleChangeA(value) {
        let newOrders = allOrders.filter(e => e.symbol.split('-')[0] === value);
        setOrders(newOrders);
        setfilterPairA(value)
    }
    function handleChangeB(value) {
        let newOrders = allOrders.filter(e => e.symbol.split('-')[1] === value);
        setOrders(newOrders);
        setfilterPairB(value)
    }

    function handleChangeC(value) {
        if (value === 'All') {
            setOrders(allOrders);
        } else {
            setOrders(allOrders.filter(e => e.status === value));
        }
        /* switch (value) {
            case 'All':
                setOrders(ordersOrigin);
                break;
            case 'Open':
                setOrders(ordersOrigin.filter(e => e.status === 'NEW'));
                break;
            case 'Filled':
                setOrders(ordersOrigin.filter(e => e.status === 'FILLED'));
                break;
            case 'Partial':
                setOrders(
                    ordersOrigin.filter(e => e.status === 'PARTIALLY_FILLED')
                );
                break;
            case 'Cancelled':
                setOrders(ordersOrigin.filter(e => e.status === 'CANCELLED'));
                break;
            default:
                break;
        } */
    }

    const handleDateChangeRaw = e => {
        e.preventDefault();
    };

    useEffect(
        _ => {
            let newTime = moment(startDateA).unix();
            let timeB = moment(startDateB).unix();

            let newOrders = ordersOrigin.filter(e => {
                let time = String(e.time);
                time = time.substring(0, 10);
                return time >= newTime && time <= timeB;
            });

            setOrders(newOrders);
        },
        //eslint-disable-next-line react-hooks/exhaustive-deps
        [startDateA]
    );

    useEffect(
        _ => {
            let newTime = moment(startDateB).unix();
            let timeA = moment(startDateA).unix();

            let newOrders = ordersOrigin.filter(e => {
                let time = String(e.time);
                time = time.substring(0, 10);
                return time <= newTime && time >= timeA;
            });

            setOrders(newOrders);
        },
        //eslint-disable-next-line react-hooks/exhaustive-deps
        [startDateB]
    );

    const optsClass =
        mode === 'Light' ? 'option-select emp' : 'dark-mode option-select emp';

    return (
        <Fragment>
            <Layout className="father orders">
                <Content
                    style={{ margin: '10px 15px 0 0', overflow: 'initial' }}
                >
                    <Row gutter={[8, 8]}>
                        <Col span={24}>
                            <Row
                                style={{
                                    paddingTop: '5px',
                                    paddingLeft: '15px',
                                }}
                            >
                                <TypeOfFilter handleType={handleType} />
                                <DateFilter startDateA={startDateA} startDateB={startDateB} setStartDateA={setStartDateA} setStartDateB={setStartDateB} handleDateChangeRaw={handleDateChangeRaw} />
                                <Col xs={24} md={10}>
                                    <div className="orders-selects">
                                        <PairFilter  allOrders={allOrders} optsClass={optsClass} handleChangeA={handleChangeA} handleChangeB={handleChangeB} />
                                        {/* /////////////////////////////////// */}
                                        <StatusFilter setstatusFilterSelection={setstatusFilterSelection} optsClass={optsClass} handleChangeC={handleChangeC} />
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{ paddingLeft: 15, paddingBottom: 10 }}>
                        {/* <OrdersTable />  AQUI*/}
                        <Table handleSort={handleSort} classes={classes} state={state} />
                    </Row>
                </Content>
            </Layout>
        </Fragment>
    );
};

export default Orders;

export { loadOrderHistory };
