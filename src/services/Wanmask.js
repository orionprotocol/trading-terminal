import React from 'react';

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
				console.log('WanMask is locked');
				resolve(true);
			} else {
				// console.log('WanMask is unlocked');
				// console.log(accounts);
				resolve(false);
			}
		});
	});

const Wanmask = props => {
	const wanmaskVerification = async _ => {
		if (!isInstalled()) {
			// alert('Not installed')
			console.log('Not installed');
			console.log('Please install wanmask, https://wanmask.io/');
		} else {
			let islocked = await isLocked();
			if (islocked) {
				// alert('Please, sign in on wanmask')
				console.log('Please, sign in on wanmask');
			} else {
				let currentAccount = localStorage.getItem('currentAccount');

				setInterval(() => {
					window.wan3.eth.getAccounts((err, accounts) => {
						if (err != null) {
							console.log('Wan err: ', err);
						} else if (accounts.length === 0) {
						} else {
							if (currentAccount !== accounts[0]) {
								currentAccount = accounts[0];
								localStorage.setItem('currentAccount', currentAccount);
							}
						}

						// console.log(currentAccount);
					});
				}, 1000);
			}
		}
	};

	wanmaskVerification();

	return <div />;
};

export default Wanmask;
