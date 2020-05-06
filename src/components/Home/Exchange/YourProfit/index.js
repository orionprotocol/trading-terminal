import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './index.css';

const urlBase = process.env.REACT_APP_BACKEND;

const YourProfit = (pros) => {
	const { symbol, qtyForm, sideForm } = useSelector((state) => state.general);
	const [ binance, setBinance ] = useState({ pct: 0, btc: 0 });
	const [ poloniex, setPoloniex ] = useState({ pct: 0, btc: 0 });
	const [ bittrex, setBittrex ] = useState({ pct: 0, btc: 0 });

	const loadBenefits = () => {
		let url =
			urlBase +
			'/api/v1/order-benefits?symbol={symbol}&ordQty={ordQty}&side={side}'
				.replace('{symbol}', symbol)
				.replace('{ordQty}', qtyForm)
				.replace('{side}', sideForm);

		axios
			.get(url)
			.then((res) => {
				 console.log(res.data);
				setBinance({
					pct: res.data.binance.benefitPct,
					btc: res.data.binance.benefitBtc
				});
				setPoloniex({
					pct: res.data.poloniex.benefitPct,
					btc: res.data.poloniex.benefitBtc
				});
				setBittrex({
					pct: res.data.bittrex.benefitPct,
					btc: res.data.bittrex.benefitBtc
				});
			})
			.catch((err) => {
				console.log('err: ', err);
			});
	};

	useEffect(
		(_) => {
			loadBenefits();
		},
		//eslint-disable-next-line react-hooks/exhaustive-deps
		[ symbol, qtyForm, sideForm ]
	);

	return (
		<section className="your-profit">
			<div>
				<h2>Your Profit</h2>
			</div>
			<div className="your-profit-data">
				<div className="exchange">
					<div className="name">
						<span
							style={{
								color: 'rgb(240, 185, 11)',
								fontWeight: 'bold'
							}}
						>
							BINANCE
						</span>
					</div>
					<div className="numbers">
						<span>+ {binance.pct} % </span>
						<span>+ {binance.btc} BTC</span>
					</div>
				</div>
				<div className="exchange">
					<div className="name center">
						<span
							style={{
								color: '#0a6970',
								fontWeight: 'bold'
							}}
						>
							POLONIEX
						</span>
					</div>
					<div className="numbers center">
						<span>+ {poloniex.pct} % </span>
						<span>+ {poloniex.btc} BTC</span>
					</div>
				</div>
				<div className="exchange">
					<div className="name">
						<span
							style={{
								color: '#0084d4',
								fontWeight: 'bold'
							}}
						>
							BITTREX
						</span>
					</div>
					<div className="numbers">
						<span>+ {bittrex.pct} % </span>
						<span>+ {bittrex.btc} BTC</span>
					</div>
				</div>
			</div>
		</section>
	);
};

export default YourProfit;
