import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import ExchangeImg from './ExchangeImg';

function calculateTotalBids(array) {
	for (let i = 0; i < array.length; i++) {
		if (i - 1 < 0) {
			array[i].total = array[i].price * array[i].size;
		} else {
			array[i].total = array[i - 1].total + array[i].price * array[i].size;
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

// function renderSize(data, exchange) {
// 	if (exchange === 'binance' && data.dynamic !== 0) {
// 		// console.log("EXCHANGE " + exchange + " DYNAMIC " + data.dynamic);
// 	}
// 	let colorClassName = 'exchange-size-default-color';
// 	if (!data.dynamic) {
// 		colorClassName = 'exchange-size-default-color';
// 	} else {
// 		if (data.dynamic === 0) {
// 			colorClassName = 'exchange-size-default-color';
// 		}
// 		if (data.dynamic === 1) {
// 			colorClassName = 'exchange-size-increase-color';
// 		}
// 		if (data.dynamic === -1) {
// 			colorClassName = 'exchange-size-decrease-color';
// 		}
// 	}
// 	data.dynamic = 0;
// 	return (
// 		<td className={colorClassName} style={{ width: '27%' }}>
// 			{data.size.toFixed(3)}
// 		</td>
// 	);
// }

const renderSize = data => {
	let id = 'bid-row-' + Math.floor(Math.random() * 100000);
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
function handleExchanges(e) {
	const cl = e.target.classList;
	const idDiv = 'div-' + cl[cl.length - 1];
	const div = document.querySelector('#' + idDiv);
	if (div) div.classList.toggle('active');

	const drop = document.querySelector('#drop-' + cl[cl.length - 1]);
	if (drop) drop.classList.toggle('active');
}

const Bids = props => {
	const dispatch = useDispatch();
	const [ bids, setBids ] = useState();
	const [ dataBids, setDataBids ] = useState([]);
	const setOrderData = useCallback(data => dispatch({ type: 'SetOrderData', payload: data }), [ dispatch ]);

	useEffect(
		_ => {
			if (props.data) {
				setBids(renderBids(props.data));
				setDataBids(props.data.bids);
			}
		},
		//eslint-disable-next-line react-hooks/exhaustive-deps
		[ props ]
	);

	function chooseOrderBookLine(data) {
		let { price } = data;
		let amount = 0;
		let total = 0;
		let bids = dataBids;
		for (let i = 0; i < bids.length; i++) {
			if (bids[i].price >= price) {
				amount = amount + bids[i].size;
				total = total + bids[i].total;
			}
		}

		setOrderData({ price, amount, total });
	}

	function renderBids(data) {
		let renderData = [];
		let key = 0;
		if (data && data.bids && data.bids.length > 0) {
			const bids = data.bids;
			calculateTotalBids(bids);
			const maxBid = bids.reduce(function(prev, current) {
				return prev.total > current.total ? prev : current;
			});
			for (let i = 0; i < bids.length; i++, key++) {
				let exchanges = bids[i].exchanges || [];
				const percent = calculatePercent(maxBid.total, bids[i].total).toFixed(6);
				const percent2 = Math.abs(percent - 100);
				let percentStyle = percent + '%';
				let percentStyle2 = percent2 + '%';
				let imgExchanges = [];
				let arrow = null;
				let exchangesExtras = null;

				if (exchanges.length < 3) {
					for (let j = 0; j < exchanges.length; j++) {
						let time = new Date().getTime();
						let imagePath = 'img/exchanges/{exchange}.png'.replace('{exchange}', exchanges[j]);
						imgExchanges.push(
							<ExchangeImg
								key={'bids3i39' + key + time + j}
								className={'bid-' + key}
								style={{ height: '15px', width: '15px' }}
								imagePath={imagePath}
								alt={exchanges[j]}
							/>
						);
					}
				} else {
					let extras = [];
					for (let j = 0; j < 2; j++) {
						let time = new Date().getTime();
						let imagePath = 'img/exchanges/{exchange}.png'.replace('{exchange}', exchanges[j]);
						imgExchanges.push(
							<ExchangeImg
								key={'bids3i39' + key + time + j}
								className={'bid-' + key}
								style={{ height: '15px', width: '15px' }}
								imagePath={imagePath}
								alt={exchanges[j]}
							/>
						);
					}

					for (let j = 2; j < exchanges.length; j++) {
						let time = new Date().getTime();
						let imagePath = 'img/exchanges/{exchange}.png'.replace('{exchange}', exchanges[j]);
						extras.push(
							<div className="drop" key={j + time + 'dbids'}>
								<img src={imagePath} alt={exchanges[j]} />
								<span>{exchanges[j]}</span>
							</div>
						);
					}

					arrow = <img className={`arrow bid-${key}`} src="./img/arrow-down.svg" alt="home" />;
					exchangesExtras = (
						<div className="exch-drop js-exch-drop" id={'drop-bid-' + key}>
							{extras}
						</div>
					);
				}
				let time = new Date().getTime();
				let percentStyle27 = calculatePercent27(percentStyle) + '%';
				renderData.push(
					<div className="order" key={key + time + 'bids'} onClick={_ => chooseOrderBookLine(bids[i])}>
						{/* TOTAL - Max width 100% */}
						<span className="progress-light l-green" style={{ width: percentStyle2 }} />
						{/* Max width 27% */}
						<span className="progress-light d-green" style={{ width: percentStyle27 }} />
						<span className="cell emp">{bids[i].price.toFixed(8)}</span>
						{/* <span className="cell">{bids[i].size.toFixed(3)}</span> */}
						{renderSize(bids[i])}
						<span className="cell">{bids[i].total.toFixed(8)}</span>
						<div className="cell exch">
							<div
								className={`exch-content js-exch-content`}
								onClick={handleExchanges}
								id={'div-bid-' + key}
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
			<p className="heading">Order Book</p>
			<div className="titles">
				<span className="title">Price</span>
				<span className="title">Amount</span>
				<span className="title">Total</span>
				<span className="title exch">Exch</span>
			</div>
			<div className="orders bids">{bids}</div>
			<div className="last-price">
				<span className="cell">{props.lastPrice}</span>
				<span className="last">Last Price</span>
			</div>
		</div>
	);
};

export default Bids;
