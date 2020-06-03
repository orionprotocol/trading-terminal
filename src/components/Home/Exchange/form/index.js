import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { Formik, Form, Field } from 'formik';
import validate from './validation';
import { useSelector, useDispatch } from 'react-redux';
// import { WanchainOrder } from '../../../../services/WanchainOrder';
import { EthereumOrder } from '../../../../services/EthereumOrder';
import { loadOrderHistory } from '../../Orders/index';
import openNotification from '../../../Notification';

// type: { trade: 'buy' or 'sell, selection: 'market' or 'limit-order'}
export default function BuyAndSellForm({ type }) {
    const dispatch = useDispatch();

    const { symbol, symbolA, symbolB, orderData, lastPrice } = useSelector(
        state => state.general
    );
    const { metamaskConnected, fortmaticConnected, coinbaseConnected } = useSelector(
        state => state.wallet
    );

    const balances = useSelector(state => state.balances);

    const setQtyForm = useCallback(
        data => dispatch({ type: 'SetQtyForm', payload: data }),
        [dispatch]
    );
    // const setSideForm = useCallback((data) => dispatch({ type: 'SetSideForm', payload: data }), [ dispatch ]);
    const setAddWallet = useCallback(
        data => dispatch({ type: 'SetAddWallet', payload: data }),
        [dispatch]
    );
    const { orderBook } = useSelector((state) => state.general);
    /*  console.log(type.trade)
     if(orderBook){
         console.log( orderBook.aggregatedAsks,orderBook.aggregatedBids )
     } */
    const [values, setValues] = useState({
        amount: '',
        available: '0',
        price: '',
        percent: '',
        total: '',
    });

    const [availableA, setAvailableA] = useState(0);
    const [availableB, setAvailableB] = useState(0);
    const [available, setAvailable] = useState(0);
    const [total, setTotal] = useState(0);
    // const [ prevType, setPrevType ] = useState('');

    useEffect(_ => {
        // setPrevType(type.trade);

        if (type.selection === 'market') {
            setValues({
                ...values,
                price: lastPrice,
            });
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    /* This useEffect is made to change the de total if the amount change */
    const iterating_price_for_total = (array, amount, type) => {
        let price = 0
        let totalPrice = 0
        let remanent = 0
        let percent = 0.03
        if (type === 'sell') percent = -0.03
        if (amount === '') return 0
        remanent = parseFloat(amount)
        for (let x = 0; x < array.length; x++) {
            if (remanent - array[x].size <= 0) {
                price += (remanent * array[x].price)
                return totalPrice = (price + (array[x].price + array[x].price * percent)).toFixed(8)
            } else if (remanent - array[x].size > 0) {
                price += (remanent * array[x].price)
                remanent = remanent - array[x].size
            }
        }
    }
    useEffect(() => {
        if (type.selection !== 'limit-order') {
            if (type.trade === 'buy') {
               
                setTotal(iterating_price_for_total(orderBook.aggregatedAsks, values.amount, 'buy'))
                /* console.log(`orderBook.aggregatedAsks[0].price (${orderBook.aggregatedAsks[0].price}) is grater than orderBook.aggregatedAsks[1].price (${orderBook.aggregatedAsks[1].price})` ,orderBook.aggregatedAsks[0].price>orderBook.aggregatedAsks[1].price) */
                /* totalPrice=iterating_price_for_total(orderBook.aggregatedAsks) */
            } else if (type.trade === 'sell') {
                
                setTotal(iterating_price_for_total(orderBook.aggregatedBids, values.amount, 'sell'))
            }
        }
    }, [orderBook.aggregatedAsks, orderBook.aggregatedBids, values.amount,type.selection]);
/* This useEffect works to change the total price when u switch from market to limit order */
    useEffect(() => {
        if(type.selection==='limit-order'){
            if (values.price !== '' && values.amount!=='') {
                setTotal((values.amount * values.price).toFixed(8));
            }
        }
    }, [type.selection]);

    useEffect(
        _ => {
            if (type.selection === 'market') {
                // console.log('lastPrice', lastPrice);
                setValues({
                    ...values,
                    price: lastPrice,
                });
            }
        },
        //eslint-disable-next-line react-hooks/exhaustive-deps
        [lastPrice]
    );

    useEffect(
        _ => {
            if (orderData['price']) {
                setValues({
                    ...values,
                    amount: orderData.amount.toFixed(8),
                    price: parseFloat(orderData.price).toFixed(8),
                });
                setTotal(orderData.total.toFixed(8));
            }
        },
        //eslint-disable-next-line react-hooks/exhaustive-deps
        [orderData]
    );

    useEffect(
        _ => {
            const { contractBalances } = balances;
            if (contractBalances) {
                for (let key in contractBalances) {
                    switch (key) {
                        // case 'WETH':
                        // 	if (symbolA === 'ETH') setAvailableA(contractBalances[key]);
                        // 	else if (symbolB === 'ETH') setAvailableB(contractBalances[key]);
                        // 	break;
                        case 'WBTC':
                            if (symbolA === 'BTC')
                                setAvailableA(contractBalances[key]);
                            else if (symbolB === 'BTC')
                                setAvailableB(contractBalances[key]);
                            break;
                        case 'WXRP':
                            if (symbolA === 'XRP')
                                setAvailableA(contractBalances[key]);
                            else if (symbolB === 'XRP')
                                setAvailableB(contractBalances[key]);
                            break;
                        default:
                            if (symbolA === key)
                                setAvailableA(contractBalances[key]);
                            else if (symbolB === key)
                                setAvailableB(contractBalances[key]);
                            break;
                    }
                }
            }
        },
        //eslint-disable-next-line react-hooks/exhaustive-deps
        [balances, symbol]
    );

    useEffect(
        _ => {
            if (type.trade === 'buy') {
                setAvailable(availableB);
            } else if (type.trade === 'sell') {
                setAvailable(availableA);
            }

            // if (prevType !== type.trade) {
            // 	setPrevType(type.trade);
            // 	setValues({
            // 		...values,
            // 		amount: '',
            // 		price: ''
            // 	});
            // 	setTotal(0);
            // 	setSideForm(type.trade);
            // 	setQtyForm(0);
            // }
        },
        //eslint-disable-next-line react-hooks/exhaustive-deps
        [type, availableA, availableB]
    );

    const handlePercent = percent => {
        if (type.trade === 'sell') {
            setQtyForm((available * percent).toFixed(8));
            setValues({
                ...values,
                amount: (available * percent).toFixed(8),
            });
            setTotal((available * percent * lastPrice).toFixed(8));
        } else {
            setQtyForm(((available * percent) / lastPrice).toFixed(8));
            setValues({
                ...values,
                amount: ((available * percent) / lastPrice).toFixed(8),
            });
            setTotal((available * percent).toFixed(8));
        }
    };

    const handleChange = e => {
        if (e.target.name === 'amount' || e.target.name === 'price') {
            if (e.target.name === 'amount') {
                setQtyForm(e.target.value);
            }
           if (type.selection === 'limit-order') {
                if (values.price !== '') {
                    setTotal((e.target.value * values.price).toFixed(8));
                } else {
                    setTotal((e.target.value * lastPrice).toFixed(8));
                }
            }
            /* if (type.selection === 'market') {
                setTotal((e.target.value * lastPrice).toFixed(8));
            } else if (type.selection === 'limit-order') {
                if (values.price !== '') {
                    setTotal((e.target.value * values.price).toFixed(8));
                } else {
                    setTotal((e.target.value * lastPrice).toFixed(8));
                }
            } */
        }

        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const submitOrder = async _ => {
        if (values.amount === '' || Number(values.amount) <= 0) {
            openNotification({
                message: `Please, enter a valid amount.`,
            });
            return;
        }

        if (type.trade === 'buy') {
            if (Number(total) > Number(available)) {
                openNotification({
                    message: `Insufficient ${symbolB} balance`,
                });

                return;
            }
        } else if (type.trade === 'sell') {
            if (Number(values.amount) > Number(available)) {
                openNotification({
                    message: `Insufficient ${symbolA} balance`,
                });

                return;
            }
        }

        let price = values.price === '' ? lastPrice : values.price;

        // if (Number(price) <= 0) {
        //     openNotification({
        //         message: 'Price should be > 0'
        //     });
        //     return;
        // }

        let orderSymbolA = symbolA,
            orderSymbolB = symbolB;

        // ----------------------------------- Ethereum --------------------------------------

        if (symbolA === 'BTC') {
            orderSymbolA = 'WBTC';
        }

        if (symbolA === 'XRP') {
            orderSymbolA = 'WXRP';
        }

        if (symbolB === 'BTC') {
            orderSymbolB = 'WBTC';
        }

        if (symbolB === 'XRP') {
            orderSymbolB = 'WXRP';
        }

        let orderSymbols = [orderSymbolA, orderSymbolB];

        try {
            console.log(orderSymbols, type.trade, price, values.amount);

            let ethereumOrderMessage = '';

            if (fortmaticConnected) {
                let ethereumOrder = new EthereumOrder('fortmatic');
                ethereumOrderMessage = await ethereumOrder.toEthereumOrder(
                    orderSymbols,
                    type.trade,
                    price,
                    values.amount
                );
            } else if (metamaskConnected) {
                let ethereumOrder = new EthereumOrder('metamask');
                ethereumOrderMessage = await ethereumOrder.toEthereumOrder(
                    orderSymbols,
                    type.trade,
                    price,
                    values.amount, 'metamask'
                );
            } else if (coinbaseConnected) {
                let ethereumOrder = new EthereumOrder('coinbase');
                ethereumOrderMessage = await ethereumOrder.toEthereumOrder(
                    orderSymbols,
                    type.trade,
                    price,
                    values.amount
                );
            }

            loadOrderHistory();

            setValues({
                ...values,
                amount: '',
                price: '',
            });
            setTotal(0);

            openNotification({
                message: ethereumOrderMessage,
            });
        } catch (e) {
            console.log('error', e);

            if (e.msg) {
                openNotification({
                    message: e.msg,
                });
            }
        }
        // ----------------------------------- End - Ethereum --------------------------------------

        // ----------------------------------- Wanchain --------------------------------------

        // if (symbolA === 'ETH') {
        // 	orderSymbolA = 'WETH';
        // } else if (symbolA === 'BTC') {
        // 	orderSymbolA = 'WBTC';
        // }

        // if (symbolB === 'ETH') {
        // 	orderSymbolB = 'WETH';
        // } else if (symbolB === 'BTC') {
        // 	orderSymbolB = 'WBTC';
        // }

        // let orderSymbols = [ orderSymbolA, orderSymbolB ];
        // console.log(orderSymbols, type.trade, price, values.amount);

        // try {
        // 	const wanchainOrder = await WanchainOrder.toWanchainOrder(orderSymbols, type.trade, price, values.amount);

        // 	loadOrderHistory();

        // 	setValues({
        // 		...values,
        // 		amount: '',
        // 		price: ''
        // 	});
        // 	setTotal(0);

        // 	openNotification({
        // 		message: wanchainOrder
        // 	});
        // } catch (e) {
        // 	console.log('error', e);
        // }

        // ----------------------------------- End - Wanchain --------------------------------------
    };

    return (
        <Fragment>
            <Formik
                initialValues={values}
                validationSchema={validate}
                onSubmit={values => {
                    console.log(values);
                }}
            >
                {({ errors, touched, setFieldValue }) => (
                    <Form>
                        <div>
                            {type.trade === 'buy' ?
                                <span style={{ color: 'rgb(0, 187, 255)', marginLeft: '10px' }}>Amount</span> :
                                <span style={{ color: 'rgb(255, 99, 85)', marginLeft: '10px' }}>Amount</span>
                            }

                            <Field
                                className={`form-fields-buyandsell after ${type.trade === 'buy' ? 'buy' : 'sell'}`}
                                name="amount"
                                type="number"
                                value={values.amount}
                                onChange={handleChange}
                            />
                            {type.trade === 'buy' ?
                                <label
                                    style={{
                                        fontSize: '14px',
                                        color: '#706E7D',
                                        marginLeft: '-40px',
                                        marginTop: '7px',
                                        color: 'rgb(0, 187, 255)'
                                    }}
                                >
                                    {symbolA}
                                </label>
                                :
                                <label
                                    style={{
                                        fontSize: '14px',
                                        color: '#706E7D',
                                        marginLeft: '-40px',
                                        marginTop: '7px',
                                        color: 'rgb(255, 99, 85)'
                                    }}
                                >
                                    {symbolA}
                                </label>

                            }

                        </div>
                        {type.selection === 'limit-order' && (
                            <div>
                                {type.trade === 'buy' ?
                                    <span style={{ color: 'rgb(0, 187, 255)', marginLeft: '10px' }}>Price</span> :
                                    <span style={{ color: 'rgb(255, 99, 85)', marginLeft: '10px' }}>Price</span>
                                }

                                <Field
                                    className={`form-fields-buyandsell after ${type.trade === 'buy' ? 'buy' : 'sell'}`}
                                    name="price"
                                    type="number"
                                    value={
                                        values.price !== ''
                                            ? values.price
                                            : lastPrice
                                    }
                                    onChange={handleChange}
                                />

                            </div>
                        )}
                        <div
                            style={{
                                justifyContent: 'space-between',
                                display: 'flex',
                                paddingTop: '5px',
                            }}
                        >
                            {type.trade === 'buy' ?
                                <span style={{ color: 'rgb(0, 187, 255)', marginLeft: '10px' }}>Available</span> :
                                <span style={{ color: 'rgb(255, 99, 85)', marginLeft: '10px' }}>Available</span>
                            }

                            {type.trade === 'buy' ? (
                                <span className="avl-amount" style={{ color: 'rgb(0, 187, 255)' }} >
                                    {available} {symbolB}
                                </span>
                            ) : (
                                    <span className="avl-amount" style={{ color: 'rgb(255, 99, 85)' }}>
                                        {available} {symbolA}
                                    </span>
                                )}
                        </div>
                        <div className="percent-buttons">
                            <button
                                type="button"
                                onClick={() => handlePercent(0.25)}
                                className={`percent-button left ${type.trade === 'buy' ? 'buy' : 'sell'}`}
                            >

                                25%
                            </button>
                            <button
                                type="button"
                                onClick={() => handlePercent(0.5)}
                                className={`percent-button right ${type.trade === 'buy' ? 'buy' : 'sell'}`}
                            >
                                50%
                            </button>
                            <button
                                type="button"
                                onClick={() => handlePercent(0.75)}
                                className={`percent-button left ${type.trade === 'buy' ? 'buy' : 'sell'}`}
                            >
                                75%
                            </button>
                            <button
                                type="button"
                                onClick={() => handlePercent(1)}
                                className={`percent-button right ${type.trade === 'buy' ? 'buy' : 'sell'}`}
                            >
                                100%
                            </button>
                        </div>

                        <div className="total-price">
                            {type.trade === 'buy' ?
                                <span style={{ color: 'rgb(0, 187, 255)', marginLeft: '10px' }}>Total</span> :
                                <span style={{ color: 'rgb(255, 99, 85)', marginLeft: '10px' }}>Total</span>
                            }

                            <Field
                                className={`form-fields-buyandsell after ${type.trade === 'buy' ? 'buy' : 'sell'}`}
                                name="total"
                                value={total}
                                onChange={handleChange}
                                disabled={true}
                            />
                            {type.trade === 'buy' ?
                                <label
                                    style={{
                                        fontSize: '14px',
                                        color: '#706E7D',
                                        marginLeft: '-40px',
                                        marginTop: '7px',
                                        color: 'rgb(0, 187, 255)'
                                    }}
                                >
                                    {symbolB}
                                </label>
                                :
                                <label
                                    style={{
                                        fontSize: '14px',
                                        color: '#706E7D',
                                        marginLeft: '-40px',
                                        marginTop: '7px',
                                        color: 'rgb(255, 99, 85)'
                                    }}
                                >
                                    {symbolB}
                                </label>

                            }

                        </div>
                        <div style={{ margin: '30px 0px 20px 0' }}>
                            {(metamaskConnected || fortmaticConnected || coinbaseConnected) &&
                                type.trade === 'buy' && (
                                    <button
                                        className="submit-form buy"
                                        type="submit"
                                        onClick={submitOrder}
                                    >
                                        Buy {symbolA}
                                    </button>
                                )}

                            {(metamaskConnected || fortmaticConnected || coinbaseConnected) &&
                                type.trade === 'sell' && (
                                    <button
                                        className="submit-form sell"
                                        type="submit"
                                        onClick={submitOrder}
                                    >
                                        Sell {symbolA}
                                    </button>
                                )}

                            {!metamaskConnected && !fortmaticConnected && !coinbaseConnected && (
                                <button
                                    className="submit-form buy"
                                    type="submit"
                                    onClick={_ => setAddWallet(true)}
                                >
                                    Add Wallet
                                </button>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>
        </Fragment>
    );
}
