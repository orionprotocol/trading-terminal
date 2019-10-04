console.log('Hello Wanmask');

// const isInstalled = () => {
// 	if (typeof wan3 !== 'undefined') {
// 		alert('Wanmask Installed');
// 	} else {
// 		alert('Please, install Wanmask');
// 	}
// };

// const isLocked = () => {
// 	window.wan3.eth.getAccounts(function(err, accounts) {
// 		if (err != null) {
// 			console.log('Wan err: ', err);
// 		} else if (accounts.length === 0) {
// 			console.log('WanMask is locked');
// 		} else {
// 			console.log('WanMask is unlocked');
// 			console.log(accounts);
// 		}
// 	});
// };

const checkBalance = () => {
	wan3.eth.getBalance(wan3.eth.accounts[0], function(err, result) {
		if (err != null) {
			console.log('Warn err: ', err);
		}
		let balances = [ result.c[0] / 10000 ];
		console.log('WAN', balances[0]);
	});
};

// //isInstalled();
// isLocked();
//checkBalance();

// const isLocked = () =>
// 	new Promise((resolve, reject) => {
// 		console.log('inside promise');
// 		window.wan3.eth.getAccounts((err, accounts) => {
// 			if (err != null) {
// 				console.log('Wan err: ', err);
// 				reject(err);
// 			} else if (accounts.length === 0) {
// 				console.log('WanMask is locked');
// 				resolve(true);
// 			} else {
// 				console.log('WanMask is unlocked');
// 				console.log(accounts);
// 				resolve(false);
// 			}
// 		});
// 	});

// const main = async _ => {
// 	let islocked = await isLocked();
// 	console.log(islocked);
// };

// main();

// const main = async _ => {
// 	if (window.wan3) {
// 		console.log('Using wan3 enabled browser');
// 		console.log(new Wan3());
// 		window.wan3 = new Wan3(window.wan3.currentProvider);
// 		let accounts = await window.wan3.eth.getAccounts();
// 		console.log('ACCOUNTS', accounts);
// 		let account = accounts[0];
// 		console.log(account);
// 		// setInterval(async () => {
// 		//   let _accounts = await window.wan3.eth.getAccounts();
// 		//   if (_accounts[0] !== this.state.currentAccount) {
// 		//     this.setState({ currentAccount: _accounts[0] });
// 		//     this.props.getUserEscrows(this.state.currentAccount);
// 		//   }
// 		// }, 500);
// 	}
// };

// main();
