import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

const isInstalled = () => {
	if (typeof wan3 !== 'undefined') {
		return true;
	} else {
		return false;
	}
};

const isLocked = () =>
	new Promise((resolve, reject) => {
		window.wan3.eth.getAccounts((err, accounts) => {
			if (err != null) {
				console.log('Wan err: ', err);
				reject(err);
			} else if (accounts.length === 0) {
				// console.log('WanMask is locked');
				resolve(true);
			} else {
				// console.log('WanMask is unlocked');
				// console.log(accounts);
				resolve(false);
			}
		});
	});

let interval = 0;
let interval2 = 0;

const WanmaskVerification = props => {
	const dispatch = useDispatch();
	const setWanActive = useCallback(payload => dispatch({ type: 'SetWanActive', payload }), [ dispatch ]);

	const setAccounts = _ => {
		let currentAccount = localStorage.getItem('currentAccount');
		window.wan3.eth.getAccounts((err, accounts) => {
			if (err != null) {
				console.log('Wan err: ', err);
			} else if (accounts.length === 0) {
				window.clearInterval(interval2);
				wanmaskVerification();
			} else {
				if (currentAccount !== accounts[0]) {
					currentAccount = accounts[0];
					localStorage.setItem('currentAccount', currentAccount);
				}
			}
		});
	};

	const wanmaskVerification = async _ => {
		if (!isInstalled()) {
			// alert('Not installed')
			console.log('Not installed');
			console.log('Please install wanmask, https://wanmask.io/');
		} else {
			let islocked = await isLocked();
			if (islocked) {
				// alert('Please, sign in on wanmask')
				// console.log('Please, sign in on wanmask');
				setWanActive(false);
				if (interval === 0) {
					interval = setInterval(() => {
						wanmaskVerification();
					}, 2000);
				}
			} else {
				window.clearInterval(interval);
				interval = 0;
				setWanActive(true);
				setAccounts();
				interval2 = setInterval(() => {
					setAccounts();
				}, 1000);
			}
		}
	};
	wanmaskVerification();

	return <div />;
};

export default WanmaskVerification;
