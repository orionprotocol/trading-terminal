import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const io = require('socket.io-client'),
	socket = io.connect(process.env.REACT_APP_SOCKET_URL);
// socket = io.connect('http://localhost:3002');

const Sockets = (props) => {
	let { contractBalances, walletBalances } = useSelector((state) => state.balances);
	const { symbol } = useSelector((state) => state.general);
	const { wanmaskConnected, metamaskConnected } = useSelector((state) => state.wallet);
	const [ websocket, setWS ] = useState(null);
	const dispatch = useDispatch();
	const setBalances = useCallback((data) => dispatch({ type: 'SetBalances', payload: data }), [ dispatch ]);
	const setOrderBook = useCallback((data) => dispatch({ type: 'SetOrderBook', payload: data }), [ dispatch ]);
	const [ address, setAddress ] = useState(localStorage.getItem('currentAccount'));

	useEffect(
		(_) => {
			// if (window.wan3 && address) {
			if (wanmaskConnected) {
				socket.on('connect', (_) => {
					console.log('Connected....................................');
					if (window.wan3.toChecksumAddress(address)) {
						socket.emit('clientAddress', window.wan3.toChecksumAddress(address));
					}
				});
			}

			// if (window.ethereum) {
			if (metamaskConnected) {
				if (!window.ethereum.selectedAddress) window.ethereum.enable();
				const { web3, ethereum } = window;
				socket.on('connect', (_) => {
					console.log('Connected....................................');
					socket.emit('clientAddress', web3.toChecksumAddress(ethereum.selectedAddress));
				});
			}
		},
		//eslint-disable-next-line react-hooks/exhaustive-deps
		[ wanmaskConnected, metamaskConnected ]
	);
	useEffect(
		(_) => {
			// --------------------- Orion-Wanchain Sockets -----------------------------------------------------

			if (window.wan3) {
				socket.on('balanceChange', async (data) => {
					const { web3, wan3, ethereum } = window;

					if (!address) {
						setAddress(ethereum.selectedAddress);
					}

					if (
						(wanmaskConnected && wan3.toChecksumAddress(data.user) === wan3.toChecksumAddress(address)) ||
						(metamaskConnected &&
							web3.toChecksumAddress(data.user) === web3.toChecksumAddress(ethereum.selectedAddress))
					) {
						if (typeof contractBalances !== 'undefined' && typeof walletBalances !== 'undefined') {
							// console.log('New Balance, ', data);
							let newBal = 0;

							if (metamaskConnected) {
								newBal = data.newBalance;
							} else if (wanmaskConnected && data.asset === 'WBTC') {
								newBal = data.newBalance * 100000000;
							} else {
								newBal = data.newBalance * 1000000000000000000;
							}

							// console.log('newBal ', newBal, data.newBalance)

							let newWalletBal = Number(data.newWalletBalance);
							contractBalances[data.asset] = String(newBal.toFixed(8));
							walletBalances[data.asset] = String(newWalletBal.toFixed(8));
							setBalances({
								contractBalances,
								walletBalances
							});
						}
					}

					socket.emit('balanceChange', 'received balance change');
				});
			}
		},
		//eslint-disable-next-line react-hooks/exhaustive-deps
		[ contractBalances, walletBalances ]
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

			//---------------------------------------   Last price ----------------------------

			// let sym = symbol.split('-')[0] + symbol.split('-')[1];

			// console.log('symbol ', sym);
		},
		//eslint-disable-next-line react-hooks/exhaustive-deps
		[ symbol ]
	);

	return <div />;
};

export default Sockets;
