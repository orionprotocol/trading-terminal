import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import ExchangeImg from './ExchangeImg';

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

const renderSize = data => {
	let id = 'ask-row-' + Math.floor(Math.random() * 100000);
	let colorClass = 'cell';
	if (!data.dynamic) {
	} else {
		if (data.dynamic === 1) {
			colorClass = 'cell green';
		}
		if (data.dynamic === -1) {
			colorClass = 'cell red';
		}
	}
	data.dynamic = 0;

	setTimeout(() => {
		let element = document.querySelector('#' + id);
		if (element) {
			element.classList.remove('green');
			element.classList.remove('red');
		}
	}, 300);

	return (
		<span className={colorClass} id={id}>
			{data.size.toFixed(3)}
		</span>
	);
};

const Asks = props => {
	const dispatch = useDispatch();
	const [ asks, setAsks ] = useState();
	const setOrderData = useCallback(data => dispatch({ type: 'SetOrderData', payload: data }), [ dispatch ]);
	const [ dataAsks, setDataAsks ] = useState([]);

	useEffect(
		_ => {
			if (props.data) {
				// setAsks(null);
				setAsks(renderAsks(props.data));
				setDataAsks(props.data.asks);
			}
		},
		//eslint-disable-next-line react-hooks/exhaustive-deps
		[ props ]
	);

	function chooseOrderBookLine(data) {
		let { price } = data;
		let amount = 0;
		let total = 0;
		let asks = dataAsks;
		for (let i = 0; i < asks.length; i++) {
			if (asks[i].price <= price) {
				amount = amount + asks[i].size;
				total = total + asks[i].total;
			}
		}

		setOrderData({ price, amount, total });
	}

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
				const percent2 = Math.abs(percent - 100);
				let percentStyle = percent + '%';
				const percentStyle2 = percent2 + '%';
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
					<div className="order" key={key + time} onClick={_ => chooseOrderBookLine(asks[i])}>
						{/* TOTAL - Max width 100% */}
						<span className="progress-light l-red" style={{ width: percentStyle2 }} />
						{/* Max width 27% */}
						<span className="progress-light d-red" style={{ width: percentStyle27 }} />
						<span className="cell emp">{asks[i].price.toFixed(8)}</span>
						{/* <span className="cell">{asks[i].size.toFixed(3)}</span> */}
						{renderSize(asks[i])}

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

	return (
		<div className="order-book">
			<div className="orders">{asks}</div>
		</div>
	);
};

export default Asks;