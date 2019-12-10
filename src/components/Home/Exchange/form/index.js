import React, { Fragment, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import validate from './validation';
import { useSelector } from 'react-redux';

// type: { trade: 'buy' or 'sell, selection: 'market' or 'limit-order'}
export default function BuyAndSellForm({ type }) {
	const { symbolA, symbolB } = useSelector(state => state.general);

	const [ values /* setValues */ ] = useState({
		amount: '',
		available: '0',
		price: '',
		percent: '',
		total: ''
	});
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

							<Field className="form-fields-buyandsell after" name="amount" type="number" />
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
							{errors.amount && touched.amount ? <div>{errors.amount}</div> : null}
						</div>
						{type.selection === 'limit-order' && (
							<div>
								<span style={{ marginLeft: '10px' }}>Price</span>
								<Field className="form-fields-buyandsell after" name="price" type="number" />
								{errors.price && touched.price ? <div>{errors.price}</div> : null}
							</div>
						)}
						<div style={{ justifyContent: 'space-between', display: 'flex' }}>
							<span style={{ marginLeft: '10px' }}>Available</span>

							{type.trade === 'buy' ? (
								<span>
									{values.available} {symbolB}
								</span>
							) : (
								<span>
									{values.available} {symbolA}
								</span>
							)}
						</div>
						<div className="percent-buttons">
							<button
								type="button"
								onClick={() => setFieldValue('percent', '25%')}
								className="percent-button left"
							>
								25%
							</button>
							<button
								type="button"
								onClick={() => setFieldValue('percent', '50%')}
								className="percent-button right"
							>
								50%
							</button>
							<button
								type="button"
								onClick={() => setFieldValue('percent', '75%')}
								className="percent-button left"
							>
								75%
							</button>
							<button
								type="button"
								onClick={() => setFieldValue('percent', '100%')}
								className="percent-button right"
							>
								100%
							</button>
						</div>

						<div className="total-price">
							<span style={{ marginLeft: '10px' }}>Total</span>
							<Field className="form-fields-buyandsell after" name="total" />
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
							{errors.total && touched.total ? <div>{errors.total}</div> : null}
						</div>
						<div style={{ margin: '30px 0px 20px 0' }}>
							{type.trade === 'buy' && (
								<button className="submit-form buy" type="submit">
									Buy {symbolA}
								</button>
							)}
							{type.trade === 'sell' && (
								<button className="submit-form sell" type="submit">
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
