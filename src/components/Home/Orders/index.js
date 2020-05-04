import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, Icon, Select, Layout } from 'antd';
import { useSelector } from 'react-redux';
import './index.css';
import './table.css';
import Line from './Line';
import axios from 'axios';
import compareValues from '../../funtions/compareValues';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import moment from 'moment';

const urlBase = process.env.REACT_APP_BACKEND;

const { Option } = Select;
const { Content } = Layout;

// Open orders
//  	orders[i].status == "NEW" ||
// 		orders[i].status == "PARTIALLY_FILLED"
var loadOrderHistory = () => {};

const Orders = _ => {
    const { symbol, mode } = useSelector(state => state.general);
    const { ethAddress } = useSelector(state => state.wallet);
    const [orders, setOrders] = useState([]);
    const [ordersOrigin, setOrdersOrigin] = useState([]);
    const [allOrders, setAllOrders] = useState([]);
    const [state, setState] = useState({ type: 'history', renderOrders: null });
    const [startDateA, setStartDateA] = useState(new Date());
    const [startDateB, setStartDateB] = useState(new Date());
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

        if (address) {
            let url =
                urlBase +
                '/api/v1/orderHistory?symbol=' +
                symbol +
                '&address=' +
                address;
            axios
                .get(url)
                .then(res => {
                    if (Array.isArray(res.data)) {
                        setAllOrders(res.data);

                        if (state.type === 'open') {
                            let newOrders = res.data.filter(
                                d =>
                                    d.status === 'NEW' ||
                                    d.status === 'PARTIALLY_FILLED'
                            );
                            setOrders(newOrders);
                            setOrdersOrigin(newOrders);
                        } else {
                            setOrders(res.data);
                            setOrdersOrigin(res.data);
                        }
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
        [symbol, ethAddress]
    );

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
        let newOrders = ordersOrigin.filter(e => {
            let symbolA = e.symbol.split('-')[0];

            return symbolA === value;
        });

        setOrders(newOrders);
    }
    function handleChangeB(value) {
        let newOrders = ordersOrigin.filter(e => {
            let symbolB = e.symbol.split('-')[1];

            return symbolB === value;
        });

        setOrders(newOrders);
    }
    function handleChangeC(value) {
        switch (value) {
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
        }
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
                                <Col xs={24} md={6}>
                                    <button
                                        className="price-card-button emp"
                                        id="open-price-card-button"
                                        onClick={_ => handleType('open')}
                                    >
                                        Orders
                                    </button>
                                    <button
                                        className="price-card-button active emp"
                                        id="history-price-card-button"
                                        style={{ border: 'none !important' }}
                                        onClick={_ => handleType('history')}
                                    >
                                        History
                                    </button>
                                </Col>
                                <Col
                                    xs={24}
                                    md={8}
                                    style={{ marginTop: '3px' }}
                                >
                                    <div className="orders-dates">
                                        <DatePicker
                                            selected={startDateA}
                                            onChange={date =>
                                                setStartDateA(date)
                                            }
                                            calendarClassName="date"
                                            dateFormat="dd.MM.Y"
                                            onChangeRaw={handleDateChangeRaw}
                                        />
                                        <span className="date-icon">
                                            <Icon type="calendar" />
                                        </span>
                                        <span className="price-card-date-line">
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        </span>
                                        <DatePicker
                                            selected={startDateB}
                                            onChange={date =>
                                                setStartDateB(date)
                                            }
                                            calendarClassName="date"
                                            dateFormat="dd.MM.Y"
                                            onChangeRaw={handleDateChangeRaw}
                                        />
                                        <span className="date-icon">
                                            <Icon type="calendar" />
                                        </span>
                                    </div>
                                </Col>
                                <Col xs={24} md={10}>
                                    <div className="orders-selects">
                                        <Select
                                            className="price-card-selector emp"
                                            defaultValue="ETH"
                                            style={{
                                                width: 80,
                                                padding: 0,
                                                border: 'none',
                                            }}
                                            onChange={handleChangeA}
                                        >
                                            <Option
                                                value="ETH"
                                                className={optsClass}
                                            >
                                                ETH
                                            </Option>
                                            <Option
                                                value="XRP"
                                                className={optsClass}
                                            >
                                                XRP
                                            </Option>
                                        </Select>
                                        /
                                        <Select
                                            className="price-card-selector emp"
                                            defaultValue="BTC"
                                            style={{
                                                width: 80,
                                                padding: 0,
                                                border: 'none',
                                            }}
                                            onChange={handleChangeB}
                                        >
                                            <Option
                                                value="BTC"
                                                className={optsClass}
                                            >
                                                BTC
                                            </Option>
                                        </Select>
                                        <Select
                                            className="price-card-selector emp"
                                            defaultValue="All"
                                            style={{
                                                width: 100,
                                                padding: 0,
                                                border: 'none',
                                            }}
                                            onChange={handleChangeC}
                                        >
                                            <Option
                                                value="All"
                                                className={optsClass}
                                            >
                                                All
                                            </Option>
                                            <Option
                                                value="Open"
                                                className={optsClass}
                                            >
                                                Open
                                            </Option>
                                            <Option
                                                value="Filled"
                                                className={optsClass}
                                            >
                                                Filled
                                            </Option>
                                            <Option
                                                value="Partial"
                                                className={optsClass}
                                            >
                                                Partial
                                            </Option>
                                            <Option
                                                value="Cancelled"
                                                className={optsClass}
                                            >
                                                Cancelled
                                            </Option>
                                        </Select>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    {/* AQUI */}
                    <Row style={{ paddingLeft: 15, paddingBottom: 10 }}>
                        {/* <OrdersTable /> */}
                        <div className="table-content">
                            <div className="titles">
                                <div
                                    className="title short"
                                    onClick={_ => handleSort('type')}
                                >
                                    <span>Type</span>
                                    <i
                                        className={`fa ${classes.type}`}
                                        aria-hidden="true"
                                    />
                                </div>
                                <div
                                    className="title"
                                    onClick={_ => handleSort('pair')}
                                >
                                    <span>Pair</span>
                                    <i
                                        className={`fa ${classes.pair}`}
                                        aria-hidden="true"
                                    >
                                        {' '}
                                    </i>
                                </div>
                                <div
                                    className="title time"
                                    onClick={_ => handleSort('time')}
                                >
                                    <span>Time</span>
                                    <i
                                        className={`fa ${classes.time}`}
                                        aria-hidden="true"
                                    />
                                </div>
                                <div
                                    className="title"
                                    onClick={_ => handleSort('amount')}
                                >
                                    <span>Amount</span>
                                    <i
                                        className={`fa ${classes.amount}`}
                                        aria-hidden="true"
                                    />
                                </div>
                                <div
                                    className="title"
                                    onClick={_ => handleSort('price')}
                                >
                                    <span>Price</span>
                                    <i
                                        className={`fa ${classes.price}`}
                                        aria-hidden="true"
                                    />
                                </div>
                                <div
                                    className="title status"
                                    onClick={_ => handleSort('status')}
                                >
                                    <span>Status</span>
                                    <i
                                        className={`fa ${classes.status}`}
                                        aria-hidden="true"
                                    />
                                </div>
                                <div
                                    className="title"
                                    onClick={_ => handleSort('total')}
                                >
                                    <span>Total</span>
                                    <i
                                        className={`fa ${classes.total}`}
                                        aria-hidden="true"
                                    />
                                </div>
                            </div>
                            <div className="lines">{state.renderOrders}</div>
                        </div>
                    </Row>
                </Content>
            </Layout>
        </Fragment>
    );
};

export default Orders;

export { loadOrderHistory };
