import React, { Fragment, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const OrionWanchain = _ => {
	const balances = useSelector(state => state.balances);
	const dispatch = useDispatch();

	let address = localStorage.getItem('currentAccount');

	const setBalances = useCallback(data => dispatch({ type: 'SetBalances', payload: data }), [ dispatch ]);

	const getBalances = address => {
		axios
			.get(`${process.env.REACT_APP_ORION_WAN}/api/balance/${address}`)
			.then(res => {
				if (res.data.contractbalances) {
					// console.log(res.data);
					//{walletBalances: {…}, contractbalances: {…}}
					let all = res.data;
					let newBal = {
						walletBalances: all.walletBalances,
						contractBalances: all.contractbalances
					};
					setBalances(newBal);
				}
			})
			.catch(err => {
				console.log(err);
			});
	};
	// If no balances
	if (Object.keys(balances).length === 0) {
		if (address && address !== '') getBalances(address);
	}
	return <Fragment />;
};

export default OrionWanchain;
