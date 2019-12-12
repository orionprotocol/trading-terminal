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
			socket.on('connect', _ => {
				console.log('Connected....................................');
				if (window.wan3.toChecksumAddress(address)) {
					socket.emit('clientAddress', window.wan3.toChecksumAddress(address));
				}
			});
		}
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(
		_ => {
			// --------------------- Orion-Wanchain Sockets -----------------------------------------------------

			if (window.wan3) {
				socket.on('balanceChange', data => {
					if (window.wan3.toChecksumAddress(data.user) === window.wan3.toChecksumAddress(address)) {
						if (typeof contractBalances !== 'undefined' && typeof walletBalances !== 'undefined') {
							let newBal = 0;
							if (data.asset === 'WBTC') {
								newBal = data.newBalance * 100000000;
							} else {
								newBal = data.newBalance * 1000000000000000000;
							}

							let newWalletBal = data.newWalletBalance;
							contractBalances[data.asset] = newBal;
							walletBalances[data.asset] = newWalletBal;
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
		_ => {
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
