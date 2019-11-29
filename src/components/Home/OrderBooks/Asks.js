import React, { useState, useEffect } from 'react';
import ExchangeImg from './ExchangeImg';
// function chooseOrderBookLine(data, type) {
// 	if (type === 'asks') {
// 		// let price = data.price;
// 		// let count = 0;
// 		// let total = 0;
// 		// let asks = this.state.data.asks;
// 		// for (let i = 0; i < asks.length; i++) {
// 		// 	if (asks[i].price <= price) {
// 		// 		count = count + asks[i].size;
// 		// 		total = total + asks[i].total;
// 		// 	}
// 		// }
// 		// if (this.state.customCount) {
// 		// 	this.setState({ currentPrice: price, total: total }, () => {
// 		// 		this.loadBenefits();
// 		// 	});
// 		// } else {
// 		// 	this.setState({ currentPrice: price, count: count, total: total }, () => {
// 		// 		this.loadBenefits();
// 		// 	});
// 		// }

// 		// $('#buy-form-link').trigger('click');
// 		return;
// 	}
// }

function handleExchanges(e) {
	const cl = e.target.classList;
	const idDiv = 'div-' + cl[cl.length - 1];
	const div = document.querySelector('#' + idDiv);
	if (div) div.classList.toggle('active');

	const drop = document.querySelector('#drop-' + cl[cl.length - 1]);
	if (drop) drop.classList.toggle('active');
}

function calculateTotalAsks(array) {
	for (let i = array.length - 1; i >= 0; i--) {
		if (i + 1 >= array.length) {
			array[i].total = array[i].price * array[i].size;
		} else {
			array[i].total = array[i + 1].total + array[i].price * array[i].size;
		}
	}
	return array;
}
function calculatePercent(max, value) {
	return 100 * value / max;
}

function calculatePercent27(value) {
	value = Number(value.substring(0, value.length - 1));
	return 27 * value / 100;
}

const Asks = props => {
	const [ asks, setAsks ] = useState();

	function renderAsks(data) {
		let renderData = [];
		let key = 0;
		if (data && data.asks && data.asks.length > 0) {
			let asks = data.asks;
			calculateTotalAsks(asks);
			const maxAsk = asks.reduce(function(prev, current) {
				return prev.total > current.total ? prev : current;
			});
			for (let i = 0; i < asks.length; i++, key++) {
				let exchanges = asks[i].exchanges || [];
				const percent = calculatePercent(maxAsk.total, asks[i].total).toFixed(6);
				let percentStyle = percent + '%';
				let imgExchanges = [];
				let arrow = null;
				let exchangesExtras = null;

				if (exchanges.length < 3) {
					imgExchanges = [];
					for (let j = 0; j < exchanges.length; j++) {
						let time = new Date().getTime();
						let imagePath = 'img/exchanges/{exchange}.png'.replace('{exchange}', exchanges[j]);
						imgExchanges.push(
							<ExchangeImg
								key={'ask3e3' + key + time + j}
								id={key + j}
								className={'ask-' + key}
								style={{ height: '15px', width: '15px' }}
								imagePath={imagePath}
								alt={exchanges[j]}
							/>
						);
					}
				} else {
					imgExchanges = [];
					for (let j = 0; j < 2; j++) {
						let time = new Date().getTime();
						let imagePath = 'img/exchanges/{exchange}.png'.replace('{exchange}', exchanges[j]);
						imgExchanges.push(
							<ExchangeImg
								key={'ask33wr8' + key + time + j}
								id={key + j}
								className={'ask-' + key}
								style={{ height: '15px', width: '15px' }}
								imagePath={imagePath}
								alt={exchanges[j]}
							/>
						);
					}

					let extras = [];
					for (let j = 2; j < exchanges.length; j++) {
						let time = new Date().getTime();
						let imagePath = 'img/exchanges/{exchange}.png'.replace('{exchange}', exchanges[j]);
						extras.push(
							<div className="drop" key={j + time + 'dasks'}>
								<img src={imagePath} alt={exchanges[j]} />
								<span>{exchanges[j]}</span>
							</div>
						);
					}
					arrow = <img className={`arrow ask-${key}`} src="./img/arrow-down.svg" alt="home" />;
					exchangesExtras = (
						<div className="exch-drop js-exch-drop" id={'drop-ask-' + key}>
							{extras}
						</div>
					);
				}
				let time = new Date().getTime();
				let percentStyle27 = calculatePercent27(percentStyle) + '%';
				renderData.push(
					<div className="order" key={key + time}>
						{/* TOTAL - Max width 100% */}
						<span className="progress-light l-red" style={{ width: percentStyle }} />
						{/* Max width 27% */}
						<span className="progress-light d-red" style={{ width: percentStyle27 }} />
						<span className="cell emp">{asks[i].price.toFixed(8)}</span>
						<span className="cell">{asks[i].size.toFixed(3)}</span>
						<span className="cell">{asks[i].total.toFixed(8)}</span>
						<div className="cell exch">
							<div
								className="exch-content js-exch-content"
								id={'div-ask-' + key}
								onClick={handleExchanges}
							>
								{imgExchanges}
								{arrow}
							</div>
							{exchangesExtras}
						</div>
					</div>
				);
			}
		}
		return renderData;
	}

	useEffect(
		_ => {
			if (props.data) {
				// setAsks(null);
				setAsks(renderAsks(props.data));
			}
		},
		[ props ]
	);

	return (
		<div className="order-book">
			<div className="orders">{asks}</div>
		</div>
	);
};

export default Asks;
