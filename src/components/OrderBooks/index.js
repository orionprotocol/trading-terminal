import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Bids from './Bids';
import Asks from './Asks';
import { useSelector } from 'react-redux';

const urlBase = process.env.REACT_APP_BACKEND;

function updateOrderBookData(data, exchange, stateData, callback) {
	const asks = data.asks;
	let stateAsks = stateData.asks;
	for (let i = 0; i < asks.length; i++) {
		let exchanges = asks[i].exchanges || [];
		if (exchange != 'all') {
			let needExchange = false;
			for (let k = 0; k < exchanges.length; k++) {
				if (exchanges[k] == exchange) {
					needExchange = true;
				}
			}
			if (!needExchange) {
				continue;
			}
		}
		let updated = false;
		for (let j = 0; j < stateAsks.length; j++) {
			if (asks[i].price == stateAsks[j].price) {
				if (parseFloat(asks[i].size) == 0) {
					stateAsks.splice(j, 1);
				} else {
					stateAsks[j].dynamic = 0;
					if (stateAsks[j].size > asks[i].size) {
						stateAsks[j].dynamic = -1;
					}
					if (stateAsks[j].size < asks[i].size) {
						stateAsks[j].dynamic = 1;
					}
					stateAsks[j].size = asks[i].size;
				}
				updated = true;
				break;
			}
		}
		if (!updated && asks[i].size != 0) {
			asks[i].dynamic = 1;
			stateAsks.push(asks[i]);
		}
	}
	stateAsks = stateAsks.sort(this.sortAsks).slice(0, 20);
	stateAsks = stateAsks.sort(this.sortBids);
	const bids = data.bids;
	let stateBids = stateData.bids;
	for (let i = 0; i < bids.length; i++) {
		let exchanges = bids[i].exchanges || [];
		if (exchange != 'all') {
			let needExchange = false;
			for (let k = 0; k < exchanges.length; k++) {
				if (exchanges[k] == exchange) {
					needExchange = true;
				}
			}
			if (!needExchange) {
				continue;
			}
		}
		let updated = false;
		for (let j = 0; j < stateBids.length; j++) {
			if (bids[i].price == stateBids[j].price) {
				if (parseFloat(bids[i].size) == 0) {
					stateBids.splice(j, 1);
				} else {
					stateBids[j].dynamic = 0;
					if (stateBids[j].size > bids[i].size) {
						stateBids[j].dynamic = -1;
					}
					if (stateBids[j].size < bids[i].size) {
						stateBids[j].dynamic = 1;
					}
					stateBids[j].size = bids[i].size;
				}
				updated = true;
				break;
			}
		}
		if (!updated && bids[i].size != 0) {
			bids[i].dynamic = 1;
			stateBids.push(bids[i]);
		}
	}
	const maxBid = stateBids.reduce(function(prev, current) {
		return prev.price > current.price ? prev : current;
	});
	stateBids = stateBids.sort(this.sortBids).slice(0, 20);
	let lastPriceStyle = '#e5494d';
	if (maxBid.price > data.lastPrice) {
		lastPriceStyle = '#2051d3';
	}
	callback(stateAsks, stateBids, maxBid, lastPriceStyle);
}
const OrderBooks = props => {
	const { symbol, ordersBooks } = useSelector(state => state.general);
	// const newData = useSelector(state => state.general);
	// console.log('general', general);
	const [ state, setState ] = useState({});
	// const currentSymbol = 'ETH-BTC';
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

	useEffect(
		_ => {
			console.log('loadSnapshot', symbol);
			loadSnapshot(symbol, 20);
		},
		[ symbol ]
	);

	useEffect(
		_ => {
			if (ordersBooks) {
				let aggregatedData = {
					asks: ordersBooks.aggregatedAsks,
					bids: ordersBooks.aggregatedBids
				};

				updateOrderBookData(aggregatedData, 'all', state.data, (asks, bids, maxBid, lastPriceStyle) => {
					// this.handleJqeuryScroll(
					// 	"#asks-general",
					// 	"#bids-general",
					// 	"orderbook-general"
					// );
					// this.handleJqeuryScroll(
					// 	"#modal-asks-general",
					// 	"#modal-bids-general",
					// 	"modal-orderbook-general"
					// );
					// this.setState({
					// 	data: {
					// 		asks: asks,
					// 		bids: bids,
					// 		lastPrice: maxBid.price,
					// 		lastPriceStyle: lastPriceStyle,
					// 		ask: this.state.data.asks[this.state.data.asks.length - 1].price,
					// 		bid: this.state.data.bids[0].price
					// 	}
					// });
					console.log('updateOrderBookData', asks, bids, maxBid, lastPriceStyle);
				});
				console.log(aggregatedData);
			}
		},
		[ ordersBooks ]
	);

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
