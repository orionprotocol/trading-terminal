import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const io = require('socket.io-client'),
	socket = io.connect(process.env.REACT_APP_SOCKET_URL);

const Sockets = props => {
	let { contractBalances, walletBalances } = useSelector(state => state.balances);
	const { symbol } = useSelector(state => state.general);
	const [ websocket, setWS ] = useState(null);
	const dispatch = useDispatch();
	const setBalances = useCallback(data => dispatch({ type: 'SetBalances', payload: data }), [ dispatch ]);
	const setOrderBook = useCallback(data => dispatch({ type: 'SetOrderBook', payload: data }), [ dispatch ]);
	const address = localStorage.getItem('currentAccount');

	useEffect(_ => {
		if (window.wan3) {
			// console.log('object');
			socket.on('connect', _ => {
				console.log('Connected....................................');
				// console.log(balances);
				if (window.wan3.toChecksumAddress(address)) {
					socket.emit('clientAddress', window.wan3.toChecksumAddress(address));
				}
			});
		}
	}, []);
	// console.log(contractBalances, walletBalances);
	useEffect(
		_ => {
			console.log('useEffect', contractBalances, walletBalances);
			// --------------------- Orion-Wanchain Sockets -----------------------------------------------------

			if (window.wan3) {
				// console.log('object');

				socket.on('balanceChange', data => {
					// console.log(data);
					// console.log('newBalances0', contractBalances, walletBalances);
					if (window.wan3.toChecksumAddress(data.user) === window.wan3.toChecksumAddress(address)) {
						// balances.contractbalances[data.asset] = data.newBalance;
						// balances.walletBalances[data.asset] = data.newWalletBalance;
						// setBalances(balances);
						// console.log(balances)

						let newBalances = { contractBalances, walletBalances };
						// console.log('newBalances1', newBalances);
						// console.log('newBalances1', newBalances);

						if (typeof contractBalances !== 'undefined' && typeof walletBalances !== 'undefined') {
							// console.log('newBalances1', newBalances);
							newBalances.contractBalances[data.asset] = data.newBalance;
							newBalances.walletBalances[data.asset] = data.newWalletBalance;
							// console.log(newBalances);
							console.log(newBalances.contractBalances.WAN, data.newBalance);
							setBalances(newBalances);
							console.log('Balances updated...');
							// console.log(newBalances.contractBalances.WAN, data.asset);
						}
					}

					socket.emit('balanceChange', 'received balance change');
				});
			}
		},
		[ contractBalances, walletBalances ]
	);
	// console.log(balances);
	useEffect(
		_ => {
			// console.log('New balances', balances);

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
		},
		//eslint-disable-next-line react-hooks/exhaustive-deps
		[ symbol ]
	);

	return <div />;
};

export default Sockets;
