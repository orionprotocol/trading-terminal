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
	const { symbolA, symbolB, orderData, lastPrice } = useSelector((state) => state.general);
	const balances = useSelector((state) => state.balances);
	const setQtyForm = useCallback((data) => dispatch({ type: 'SetQtyForm', payload: data }), [ dispatch ]);
	// const setSideForm = useCallback((data) => dispatch({ type: 'SetSideForm', payload: data }), [ dispatch ]);

	const [ values, setValues ] = useState({
		amount: '',
		available: '0',
		price: '',
		percent: '',
		total: ''
	});

	const [ availableA, setAvailableA ] = useState(0);
	const [ availableB, setAvailableB ] = useState(0);
	const [ available, setAvailable ] = useState(0);
	const [ total, setTotal ] = useState(0);
	// const [ prevType, setPrevType ] = useState('');

	useEffect((_) => {
		// setPrevType(type.trade);

		if (type.selection === 'market') {
			setValues({
				...values,
				price: lastPrice
			});
		}
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(
		(_) => {
			if (orderData['price']) {
				setValues({
					...values,
					amount: orderData.amount.toFixed(8),
					price: orderData.price.toFixed(8)
				});
				setTotal(orderData.total.toFixed(8));
			}
		},
		//eslint-disable-next-line react-hooks/exhaustive-deps
		[ orderData ]
	);

	useEffect(
		(_) => {
			const { contractBalances } = balances;
			if (contractBalances) {
				for (let key in contractBalances) {
					switch (key) {
						// case 'WETH':
						// 	if (symbolA === 'ETH') setAvailableA(contractBalances[key]);
						// 	else if (symbolB === 'ETH') setAvailableB(contractBalances[key]);
						// 	break;
						case 'WBTC':
							if (symbolA === 'BTC') setAvailableA(contractBalances[key]);
							else if (symbolB === 'BTC') setAvailableB(contractBalances[key]);
							break;
						case 'WXRP':
							if (symbolA === 'XRP') setAvailableA(contractBalances[key]);
							else if (symbolB === 'XRP') setAvailableB(contractBalances[key]);
							break;
						default:
							if (symbolA === key) setAvailableA(contractBalances[key]);
							else if (symbolB === key) setAvailableB(contractBalances[key]);
							break;
					}
				}
			}
		},
		//eslint-disable-next-line react-hooks/exhaustive-deps
		[ balances ]
	);

	useEffect(
		(_) => {
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
		[ type, availableA, availableB ]
	);

	const handlePercent = (percent) => {
		if (type.trade === 'sell') {
			setValues({
				...values,
				amount: (available * percent).toFixed(8)
			});
			setTotal((available * percent * lastPrice).toFixed(8));
		} else {
			setValues({
				...values,
				amount: (available * percent / lastPrice).toFixed(8)
			});
			setTotal((available * percent).toFixed(8));
		}
	};

	const handleChange = (e) => {
		if (e.target.name === 'amount' || e.target.name === 'price') {
			if (e.target.name === 'amount') {
				setQtyForm(e.target.value);
			}

			if (type.selection === 'market') {
				setTotal((e.target.value * lastPrice).toFixed(8));
			} else if (type.selection === 'limit-order') {
				if (values.price !== '') {
					setTotal((e.target.value * values.price).toFixed(8));
				} else {
					setTotal((e.target.value * lastPrice).toFixed(8));
				}
			}
		}

		setValues({
			...values,
			[e.target.name]: e.target.value
		});
	};

	const submitOrder = async (_) => {
		if (values.amount === '' || Number(values.amount) <= 0) {
			openNotification({
				message: `Please, enter a valid amount.`
			});
			return;
		}

		if (type.trade === 'buy') {
			if (Number(total) > Number(available)) {
				openNotification({
					message: `Insufficient ${symbolB} balance`
				});

				return;
			}
		} else if (type.trade === 'sell') {
			if (Number(values.amount) > Number(available)) {
				openNotification({
					message: `Insufficient ${symbolA} balance`
				});

				return;
			}
		}

		let price = values.price === '' ? lastPrice : values.price;
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


		let orderSymbols = [ orderSymbolA, orderSymbolB ];

		try {
			const ethereumOrder = await EthereumOrder.toEthereumOrder(orderSymbols, type.trade, price, values.amount);

			loadOrderHistory();

			setValues({
				...values,
				amount: '',
				price: ''
			});
			setTotal(0);

			openNotification({
				message: ethereumOrder
			});
		} catch (e) {
			console.log('error', e);
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
				onSubmit={(values) => {
					console.log(values);
				}}
			>
				{({ errors, touched, setFieldValue }) => (
					<Form>
						<div>
							<span>Amount</span>

							<Field
								className="form-fields-buyandsell after"
								name="amount"
								type="number"
								value={values.amount}
								onChange={handleChange}
							/>
							<label
								style={{
									// position: 'absolute',
									fontSize: '14px',
									color: '#706E7D',
									marginLeft: '-40px',
									marginTop: '7px'
								}}
							>
								{symbolA}
							</label>
							{/* {errors.amount && touched.amount ? <div>{errors.amount}</div> : null} */}
						</div>
						{type.selection === 'limit-order' && (
							<div>
								<span style={{ marginLeft: '10px' }}>Price</span>
								<Field
									className="form-fields-buyandsell after"
									name="price"
									type="number"
									value={values.price !== '' ? values.price : lastPrice}
									onChange={handleChange}
								/>
								{/* {errors.price && touched.price ? <div>{errors.price}</div> : null} */}
							</div>
						)}
						<div style={{ justifyContent: 'space-between', display: 'flex', paddingTop: '5px' }}>
							<span style={{ marginLeft: '10px' }}>Available</span>

							{type.trade === 'buy' ? (
								<span className="avl-amount">
									{available} {symbolB}
								</span>
							) : (
								<span className="avl-amount">
									{available} {symbolA}
								</span>
							)}
						</div>
						<div className="percent-buttons">
							<button type="button" onClick={() => handlePercent(0.25)} className="percent-button left">
								25%
							</button>
							<button type="button" onClick={() => handlePercent(0.5)} className="percent-button right">
								50%
							</button>
							<button type="button" onClick={() => handlePercent(0.75)} className="percent-button left">
								75%
							</button>
							<button type="button" onClick={() => handlePercent(1)} className="percent-button right">
								100%
							</button>
						</div>

						<div className="total-price">
							<span style={{ marginLeft: '10px' }}>Total</span>
							<Field
								className="form-fields-buyandsell after"
								name="total"
								value={total}
								onChange={handleChange}
								disabled={true}
							/>
							<label
								style={{
									// position: 'absolute',
									fontSize: '14px',
									color: '#706E7D',
									marginLeft: '-40px',
									marginTop: '7px'
								}}
							>
								{symbolB}
							</label>
							{/* {errors.total && touched.total ? <div>{errors.total}</div> : null} */}
						</div>
						<div style={{ margin: '30px 0px 20px 0' }}>
							{type.trade === 'buy' && (
								<button className="submit-form buy" type="submit" onClick={submitOrder}>
									Buy {symbolA}
								</button>
							)}
							{type.trade === 'sell' && (
								<button className="submit-form sell" type="submit" onClick={submitOrder}>
									Sell {symbolA}
								</button>
							)}
						</div>
					</Form>
				)}
			</Formik>
		</Fragment>
	);
}
