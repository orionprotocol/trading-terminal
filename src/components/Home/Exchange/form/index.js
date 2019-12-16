import React, { Fragment, useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import validate from './validation';
import { useSelector } from 'react-redux';
import { WanchainOrder } from '../../../../services/WanchainOrder';
import { loadOrderHistory } from '../../Orders/index';

// type: { trade: 'buy' or 'sell, selection: 'market' or 'limit-order'}
export default function BuyAndSellForm({ type }) {
	const { symbolA, symbolB, orderData, lastPrice } = useSelector(state => state.general);
	const balances = useSelector(state => state.balances);

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
	const [ prevType, setPrevType ] = useState('');

	useEffect(_ => {
		setPrevType(type.trade);

		if (type.selection === 'market') {
			setValues({
				...values,
				price: lastPrice
			});
		}
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(
		_ => {
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
		_ => {
			const { contractBalances } = balances;
			if (contractBalances) {
				for (let key in contractBalances) {
					switch (key) {
						case 'WETH':
							if (symbolA === 'ETH') setAvailableA(contractBalances[key]);
							else if (symbolB === 'ETH') setAvailableB(contractBalances[key]);
							break;
						case 'WBTC':
							if (symbolA === 'BTC') setAvailableA(contractBalances[key]);
							else if (symbolB === 'BTC') setAvailableB(contractBalances[key]);
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
		_ => {
			if (type.trade === 'buy') {
				setAvailable(availableB);
			} else if (type.trade === 'sell') {
				setAvailable(availableA);
			}

			if (prevType !== type.trade) {
				setPrevType(type.trade);
				setValues({
					...values,
					amount: '',
					price: ''
				});
				setTotal(0);
			}
		},
		//eslint-disable-next-line react-hooks/exhaustive-deps
		[ type, availableA, availableB ]
	);

	const handlePercent = percent => {
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

	const handleChange = e => {
		if (e.target.name === 'amount' || e.target.name === 'price') {
			if (type.selection === 'market') {
				setTotal((e.target.value * lastPrice).toFixed(8));
			} else if (type.selection === 'limit-order') {
				if (values.price !== '') {
					setTotal((e.target.value * values.price).toFixed(8));
				}
			}
		}

		setValues({
			...values,
			[e.target.name]: e.target.value
		});
	};

	const submitOrder = async _ => {
		let price = values.price === '' ? lastPrice : values.price;
		let orderSymbolA = symbolA,
			orderSymbolB = symbolB;

		if (symbolA === 'ETH') {
			orderSymbolA = 'WETH';
		} else if (symbolA === 'BTC') {
			orderSymbolA = 'WBTC';
		}

		if (symbolB === 'ETH') {
			orderSymbolB = 'WETH';
		} else if (symbolB === 'BTC') {
			orderSymbolB = 'WBTC';
		}

		let orderSymbols = [ orderSymbolA, orderSymbolB ];

		try {
			const wanchainOrder = await WanchainOrder.toWanchainOrder(orderSymbols, type.trade, price, values.amount);

			loadOrderHistory();

			setValues({
				...values,
				amount: '',
				price: ''
			});
			setTotal(0);

			alert(wanchainOrder);
		} catch (e) {
			console.log('error', e);
		}
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
									position: 'absolute',
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
						<div style={{ justifyContent: 'space-between', display: 'flex' }}>
							<span style={{ marginLeft: '10px' }}>Available</span>

							{type.trade === 'buy' ? (
								<span>
									{available} {symbolB}
								</span>
							) : (
								<span>
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
									position: 'absolute',
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
