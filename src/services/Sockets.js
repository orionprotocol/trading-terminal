import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const io = require('socket.io-client');
let socket;

// socket = io.connect('http://localhost:3002');

const Sockets = (props) => {
	const dispatch = useDispatch();

	let { contractBalances, walletBalances } = useSelector((state) => state.balances);
	const { symbol } = useSelector((state) => state.general);
	const { wanmaskConnected, metamaskConnected, ethAddress } = useSelector((state) => state.wallet);

	const [ websocket, setWS ] = useState(null);
	const [ websocket2, setWS2 ] = useState(null);

	const setBalances = useCallback((data) => dispatch({ type: 'SetBalances', payload: data }), [ dispatch ]);
	const setOrderBook = useCallback((data) => dispatch({ type: 'SetOrderBook', payload: data }), [ dispatch ]);
	const setChange = useCallback((data) => dispatch({ type: 'SetChange', payload: data }), [ dispatch ]);
	const setHigh = useCallback((data) => dispatch({ type: 'SetHigh', payload: data }), [ dispatch ]);
	const setLow = useCallback((data) => dispatch({ type: 'SetLow', payload: data }), [ dispatch ]);
	const setVol = useCallback((data) => dispatch({ type: 'SetVol', payload: data }), [ dispatch ]);
	const setLastPrice = useCallback((data) => dispatch({ type: 'SetLastPrice', payload: data }), [ dispatch ]);

	const [ address, setAddress ] = useState(localStorage.getItem('currentAccount'));
	const [ isConn, setIsConn ] = useState(false);

	useEffect(
		(_) => {
			// if (window.wan3 && address) {
			if (wanmaskConnected) {
				socket = io.connect(process.env.REACT_APP_SOCKET_URL);
				socket.on('connect', (_) => {
					console.log('Connected....................................');
					setIsConn(true);
					if (window.wan3.toChecksumAddress(address)) {
						socket.emit('clientAddress', window.wan3.toChecksumAddress(address));
					}
				});
			}

			// if (window.ethereum) {
			if (metamaskConnected) {
				// console.log('metamaskConnected');
				if (window.ethereum && !window.ethereum.selectedAddress) {
					window.ethereum.enable();
				}
			}
		},
		//eslint-disable-next-line react-hooks/exhaustive-deps
		[ wanmaskConnected, metamaskConnected ]
	);

	useEffect(
		(_) => {
			if (window.ethereum) {
				const { selectedAddress } = window.ethereum;
				if (selectedAddress) {
					const { web3, ethereum } = window;
					if (socket) {
						socket.close();
						console.log('Socket.io closed');
					}
					socket = io.connect(process.env.REACT_APP_SOCKET_URL);
					socket.on('connect', (_) => {
						console.log('Connected....................................');
						setIsConn(true);
						socket.emit('clientAddress', web3.toChecksumAddress(ethereum.selectedAddress));
					});
				}
			}
		},
		//eslint-disable-next-line react-hooks/exhaustive-deps
		[ window.ethereum, ethAddress ]
	);
	useEffect(
		(_) => {
			// --------------------- Orion-Wanchain Sockets -----------------------------------------------------

			if (
				isConn &&
				(wanmaskConnected || metamaskConnected) &&
				(typeof contractBalances !== 'undefined' && typeof walletBalances !== 'undefined')
			) {
				socket.on('balanceChange', async (data) => {
					// console.log('balanceChange', data);
					const { web3, wan3, ethereum } = window;

					if (!address) {
						setAddress(ethereum.selectedAddress);
					}

					// console.log('new balances 0', data);

					if (
						(wanmaskConnected && wan3.toChecksumAddress(data.user) === wan3.toChecksumAddress(address)) ||
						(metamaskConnected &&
							web3.toChecksumAddress(data.user) === web3.toChecksumAddress(ethereum.selectedAddress))
					) {
						console.log('new balances', data);
						const newBal = data.newBalance;

						let newWalletBal = Number(data.newWalletBalance);
						contractBalances[data.asset] = String(newBal.toFixed(8));
						walletBalances[data.asset] = String(newWalletBal.toFixed(8));
						setBalances({
							contractBalances,
							walletBalances
						});
					}

					socket.emit('balanceChange', 'received balance change');
				});
			}
		},
		//eslint-disable-next-line react-hooks/exhaustive-deps
		[ isConn, contractBalances, walletBalances ]
	);
	useEffect(
		(_) => {
			// ---------------------------------------- Orion Backend Sockets Aks - Bids ---------------

			if (websocket !== null) {
				websocket.close();
				setWS(null);
			}

			const urlWS = `wss://demo.orionprotocol.io/backend/${symbol}`;

			const ws = new window.WebsocketHeartbeatJs({
				url: urlWS,
				pingTimeout: 5000,
				pongTimeout: 5000
			});

			setWS(ws);

			ws.onmessage = function(data) {
				setOrderBook(JSON.parse(data.data));
			};

			//---------------------------------------   Last price (a symbol) ----------------------------

			if (websocket2 !== null) {
				websocket2.close();
				setWS2(null);
			}

			let sym = symbol.split('-')[0] + symbol.split('-')[1];

			const urlWS2 = `wss://candles.orionprotocol.io/api/v1/ticker/${sym}`;
			// console.log('url symbol ', urlWS2);

			const ws2 = new window.WebsocketHeartbeatJs({
				url: urlWS2,
				pingTimeout: 5000,
				pongTimeout: 5000
			});

			setWS2(ws2);

			ws2.onmessage = function(data) {
				// setOrderBook(JSON.parse(data.data));
				// console.log(JSON.parse(data.data)[1])
				data = JSON.parse(data.data)[1];
				let lastPrice = data[1];
				let openPrice = data[2];
				let change = ((lastPrice / openPrice - 1) * 100).toFixed(2);
				if (change > 0) change = '+' + change;
				let high = data[3].toFixed(6);
				let low = data[4].toFixed(6);
				let vol = data[5].toFixed(2);

				setChange(change);
				setLow(low);
				setHigh(high);
				setVol(vol);
				setLastPrice(lastPrice);
				// console.log('setedLastPrice', lastPrice);
			};
		},
		//eslint-disable-next-line react-hooks/exhaustive-deps
		[ symbol ]
	);

	useEffect((_) => {
		// const urlWS = 'wss://candles.orionprotocol.io/api/v1/allTickers';
		// const ws = new window.WebsocketHeartbeatJs({
		// 	url: urlWS,
		// 	pingTimeout: 5000,
		// 	pongTimeout: 5000
		// });
		// ws.onmessage = function(data) {
		// 	let all = JSON.parse(data.data);
		// 	all[1].forEach((e) => {
		// 		let lastPrice = e[1];
		// 		let openPrice = e[2];
		// 		let change = ((lastPrice / openPrice - 1) * 100).toFixed(2);
		// 		if (change > 0) change = '+' + change;
		// 		console.log(e[5]);
		// 		// let ticker = {
		// 		// 	pair: e[0],
		// 		// 	lastPrice,
		// 		// 	vol24h: e[5].toFixed(4),
		// 		// 	change24h: change
		// 		// };
		// 		// console.log(ticker);
		// 	});
		// };
	}, []);

	return <div />;
};

export default Sockets;
