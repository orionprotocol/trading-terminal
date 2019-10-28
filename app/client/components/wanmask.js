const exchangeArtifact = require('../../../public/json/Exchange.json');
const WETHArtifact = require('../../../public/json/WETH.json');
const WBTCArtifact = require('../../../public/json/WBTC.json');
const contractAddress = exchangeArtifact.networks['3'].address;
const WBTC = WBTCArtifact.networks['3'].address;
const WETH = WETHArtifact.networks['3'].address;
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
//let currentAccount = null;

const exchange = window.wan3.eth.contract(exchangeArtifact.abi).at(contractAddress);
const wbtc = window.wan3.eth.contract(WBTCArtifact.abi).at(WBTC);
const weth = window.wan3.eth.contract(WETHArtifact.abi).at(WETH);
const web3 = new Web3();

const tokensAddress = {
	WAN: ZERO_ADDRESS,
	WBTC,
	WETH
};

const tokens = {
	// Contracts
	wbtc,
	weth
};

const getWalletBalance = (currency, currentAccount) =>
	new Promise((resolve, reject) => {
		currency = currency.toLowerCase();

		if (currency === 'wan') {
			wan3.eth.getBalance(currentAccount, (err, res) => {
				if (err) reject(err);
				resolve(wan3.fromWei(String(res)));
			});
		} else {
			tokens[currency].balanceOf(currentAccount, (err, res) => {
				if (err) reject(err);
				resolve(wan3.fromWei(String(res)));
			});
		}
	});

const getBalance = (currency, currentAccount) =>
	new Promise((resolve, reject) => {
		currency = currency.toUpperCase();

		switch (currency) {
			case 'WAN':
				exchange.getBalance.call(ZERO_ADDRESS, currentAccount, (err, res) => {
					if (err) reject(err);
					resolve(wan3.fromWei(String(res)));
				});
				break;
			default:
				exchange.getBalance.call(tokensAddress[currency], currentAccount, (err, res) => {
					if (err) reject(err);
					resolve(wan3.fromWei(String(res)));
				});
				break;
		}
	});

const deposit = (currency, amount, currentAccount) =>
	new Promise((resolve, reject) => {
		currency = currency.toLowerCase();

		if (currency === 'btc') {
			currency = 'wbtc';
		} else if (currency == 'eth') {
			currency = 'weth';
		}

		if (currency === 'wan') {
			exchange.depositWan.sendTransaction({ from: currentAccount, value: wan3.toWei(amount) }, (err, res) => {
				if (err) reject(err);
				resolve(res);
			});
		} else {
			tokens[currency].approve(exchange.address, wan3.toWei(amount), { from: currentAccount }, (err, res) => {
				if (err) reject(err);

				const res1 = res;
				console.log('approve: ', res);

				setTimeout(() => {
					exchange.depositAsset(
						tokens[currency].address,
						wan3.toWei(amount),
						{ from: currentAccount },
						(err, res) => {
							if (err) reject(err);

							console.log('deposit: ', res);

							resolve([ res1, res ]);
						}
					);
				}, 1000);
			});
		}
	});

const withdraw = (currency, amount, currentAccount) =>
	new Promise((resolve, reject) => {
		currency = currency.toLowerCase();

		if (currency === 'btc') {
			currency = 'wbtc';
		} else if (currency == 'eth') {
			currency = 'weth';
		}

		if (currency === 'wan') {
			exchange.withdraw(ZERO_ADDRESS, wan3.toWei(amount), { from: currentAccount }, (err, res) => {
				if (err) reject(err);
				resolve(res);
			});
		} else {
			exchange.withdraw(tokens[currency].address, wan3.toWei(amount), { from: currentAccount }, (err, res) => {
				if (err) reject(err);
				resolve(res);
			});
		}
	});

// === Hash Order=== //

const hashOrder = orderInfo => {
	let message = new Web3().utils.soliditySha3(
		3,
		orderInfo.senderAddress,
		orderInfo.matcherAddress,
		orderInfo.baseAsset,
		orderInfo.quotetAsset,
		orderInfo.matcherFeeAsset,
		orderInfo.amount,
		orderInfo.price,
		orderInfo.matcherFee,
		orderInfo.nonce,
		orderInfo.expiration,
		orderInfo.side
	);

	return message;
};

// === SIGN ORDER === //

const signOrder = orderInfo =>
	new Promise((resolve, reject) => {
		let message = hashOrder(orderInfo);
		//Wanmask
		window.wan3.eth.sign(orderInfo.senderAddress, message, (err, res) => {
			if (err) reject(err);
			resolve(res);
		});

		//Web3 v1
		//let signedMessage = await web3.eth.sign(message, orderInfo.senderAddress);

		//Web3 v0.2
		//   let signedMessage = await web3.eth.sign(sender, message);
	});

module.exports = {
	getBalance,
	deposit,
	withdraw,
	hashOrder,
	signOrder,
	WETH,
	WBTC,
	tokensAddress,
	getWalletBalance
};
