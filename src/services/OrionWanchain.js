import React, { Fragment, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const OrionWanchain = _ => {
    // const balances = useSelector(state => state.balances);
    const dispatch = useDispatch();
    const {
        wanmaskConnected,
        wanActive,
        metamaskConnected,
        ethAddress,
        fortmaticConnected
    } = useSelector(state => state.wallet);
    const setBalances = useCallback(
        data => dispatch({ type: 'SetBalances', payload: data }),
        [dispatch]
    );
    // useEffect(
    // 	() => {
    // 		if (wanmaskConnected) {
    // 			let address = localStorage.getItem('currentAccount');
    // 			const getBalances = (address) => {
    // 				axios
    // 					.get(`${process.env.REACT_APP_ORION_WAN}/api/balance/${address}`)
    // 					.then((res) => {
    // 						if (res.data.contractbalances) {
    // 							// console.log(res.data);
    // 							//{walletBalances: {…}, contractbalances: {…}}
    // 							let all = res.data;
    // 							let newBal = {
    // 								walletBalances: all.walletBalances,
    // 								contractBalances: all.contractbalances
    // 							};
    // 							setBalances(newBal);
    // 						}
    // 					})
    // 					.catch((err) => {
    // 						console.log(err.response);
    // 					});
    // 			};
    // 			// If no balances
    // 			if (Object.keys(balances).length === 0) {
    // 				if (address && address !== '') getBalances(address);
    // 			}
    // 		}
    // 	},
    // 	//eslint-disable-next-line react-hooks/exhaustive-deps
    // 	[ wanmaskConnected, wanActive ]
    // );

    useEffect(
        () => {
            if (metamaskConnected || wanmaskConnected || fortmaticConnected) {
                let address = ethAddress;

                if (!ethAddress || ethAddress === '') {
                    address = localStorage.getItem('currentAccount');
                }

                console.log('getBalances', address);
                const getBalances = address => {
                    // console.log('object');
                    axios
                        .get(
                            `${process.env.REACT_APP_ORION_WAN}/api/eth/balance/${address}`
                        )
                        .then(res => {
                            if (res.data.walletBalances) {
                                let all = res.data;
                                // console.log(all);
                                setBalances(all);
                            }
                        })
                        .catch(err => {
                            console.log(err.response);
                        });
                };
                // If no balances
                // if (Object.keys(balances).length === 0) {
                // 	if (address && address !== '') getBalances(address);
                // }
                if (address && address !== '') getBalances(address);
            }
        },
        //eslint-disable-next-line react-hooks/exhaustive-deps
        [
            wanmaskConnected,
            metamaskConnected,
            fortmaticConnected,
            ethAddress,
            wanActive
        ]
    );

    return <Fragment />;
};

export default OrionWanchain;
