import React, { Fragment, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const OrionWanchain = (_) => {
	const balances = useSelector((state) => state.balances);
	const dispatch = useDispatch();
	const { wanmaskConnect, wanActive } = useSelector((state) => state.wallet);
	const setBalances = useCallback((data) => dispatch({ type: 'SetBalances', payload: data }), [ dispatch ]);
	useEffect(
		() => {
			setTimeout(() => {
				let address = localStorage.getItem('currentAccount');
				const getBalances = (address) => {
					axios
						.get(`${process.env.REACT_APP_ORION_WAN}/api/balance/${address}`)
						.then((res) => {
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
						.catch((err) => {
							console.log(err.response);
						});
				};
				// If no balances
				if (Object.keys(balances).length === 0) {
					if (address && address !== '') getBalances(address);
				}
			}, 500);
		},
		//eslint-disable-next-line react-hooks/exhaustive-deps
		[ wanmaskConnect, wanActive ]
	);

	return <Fragment />;
};

export default OrionWanchain;
