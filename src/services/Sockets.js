import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// const io = require('socket.io-client'),
// 	socket = io.connect(process.env.REACT_APP_SOCKET_URL);

const Sockets = props => {
	// const balances = useSelector(state => state.balances);
	const { symbol } = useSelector(state => state.general);
	const [ websocket, setWS ] = useState(null);
	const dispatch = useDispatch();
	// const setBalances = useCallback(data => dispatch({ type: 'SetBalances', payload: data }), [ dispatch ]);
	const setOrderBook = useCallback(data => dispatch({ type: 'SetOrderBook', payload: data }), [ dispatch ]);
	// let address = localStorage.getItem('currentAccount');

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

			// --------------------- Orion-Wanchain Sockets -----------------------------------------------------

			// console.log('object');
			// socket.on('connect', _ => {
			// 	console.log('Connected....................................');
			// 	// socket.emit('clientAddress', window.wan3.toChecksumAddress(address));
			// });

			// socket.on('balanceChange', data => {
			// 	console.log(data);

			// 	if (window.wan3.toChecksumAddress(data.user) === window.wan3.toChecksumAddress(address)) {
			// 		balances.contractbalances[data.asset] = data.newBalance;
			// 		balances.walletBalances[data.asset] = data.newWalletBalance;
			// 		setBalances(balances);

			// 		console.log('Balances updated...');
			// 	}

			// 	socket.emit('balanceChange', 'received balance change');
			// });
		},
		//eslint-disable-next-line react-hooks/exhaustive-deps
		[ symbol ]
	);

	return <div />;
};

export default Sockets;
