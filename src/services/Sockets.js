import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const io = require('socket.io-client'),
	socket = io.connect(process.env.REACT_APP_SOCKET_URL);

const Sockets = props => {
	const balances = useSelector(state => state.balances);
	const dispatch = useDispatch();
	const setBalances = useCallback(data => dispatch({ type: 'SetBalances', payload: data }), [ dispatch ]);
	let address = localStorage.getItem('currentAccount');

	socket.on('connect', _ => {
		console.log('Connected....................................');
		socket.emit('clientAddress', window.wan3.toChecksumAddress(address));
	});

	socket.on('balanceChange', data => {
		console.log(data);

		if (window.wan3.toChecksumAddress(data.user) === window.wan3.toChecksumAddress(address)) {
			balances.contractbalances[data.asset] = data.newBalance;
			balances.walletBalances[data.asset] = data.newWalletBalance;
			setBalances(balances);

			console.log('Balances updated...');
		}

		socket.emit('balanceChange', 'received balance change');
	});

	useEffect(_ => {
		console.log('New balances', balances);
	});

	return <div />;
};

export default Sockets;
