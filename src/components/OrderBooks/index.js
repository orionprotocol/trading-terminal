import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Bids from './Bids';
import Asks from './Asks';

const urlBase = process.env.REACT_APP_BACKEND;

const OrderBooks = props => {
	const [ state, setState ] = useState({});
	const currentSymbol = 'ETH-BTC';
	// All exchanges

	// By each exchange
	// function loadExchangeSnapshot(exchange, symbol, depth, callback) {
	// 	if (symbol && depth) {
	// 		let url =
	// 			urlBase +
	// 			'/api/v1/exchange/orderBook?symbol={SYMBOL}&depth={DEPTH}&exchange={EXCHANGE}'
	// 				.replace('{SYMBOL}', symbol)
	// 				.replace('{DEPTH}', depth)
	// 				.replace('{EXCHANGE}', exchange);
	// 		axios.get(url).then(res => {
	// 			console.log('loadExchangeSnapshot', res.data);
	// 			callback(res.data);
	// 		});
	// 	}
	// }

	// function loadOrderBooks() {
	// 	loadSnapshot('ETH-BTC', 20);

	// 	// loadExchangeSnapshot('BINANCE', currentSymbol, 20, data => {
	// 	// 	console.log('loadExchangeSnapshot calllback', data);
	// 	// 	// this.setState({
	// 	// 	//     binance: {
	// 	// 	//         ...data,
	// 	// 	//         ...{
	// 	// 	//             lastPrice: 0,
	// 	// 	//             lastPriceStyle: "#000"
	// 	// 	//         }
	// 	// 	//     }
	// 	// 	// });
	// 	// });
	// }
	const loadSnapshot = (symbol, depth) => {
		if (symbol && depth) {
			let url =
				urlBase +
				'/api/v1/orderBook?symbol={SYMBOL}&depth={DEPTH}'.replace('{SYMBOL}', symbol).replace('{DEPTH}', depth);

			axios.get(url).then(async res => {
				// console.log('loadSnapshot', res.data);
				const { data } = res;
				// console.log('setData', data);
				// await setState({ ...state, hola: 'Juan' });
				await setState({
					...state,
					data: {
						...data,
						lastPrice: 0,
						lastPriceStyle: '#000',
						ask: data.asks[data.asks.length - 1].price,
						bid: data.bids[0].price
					}
				});
			});
		}
	};
	// loadSnapshot('ETH-BTC', 20);
	useEffect(_ => {
		loadSnapshot(currentSymbol, 20); // setState({ ...state, data: 'sssss' });
	}, []);

	// console.log(state);

	return (
		<div className="right-panel js-panel">
			<div className="js-panel-item js-orderbook">
				<Bids data={state.data} />
				<Asks data={state.data} />
			</div>
		</div>
	);
};

export default OrderBooks;
