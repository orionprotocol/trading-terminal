// const web3 = require('web3');
const Web3 = require('web3');
const web3 = new Web3(window.wan3.currentProvider);
const exchangeArtifact = require('../../../public/json/Exchange.json');
const WETHArtifact = require('../../../public/json/WETH.json');
const WBTCArtifact = require('../../../public/json/WBTC.json');
const contractAddress = exchangeArtifact.networks['3'].address;
const WBTC = WBTCArtifact.networks['3'].address;
const WETH = WETHArtifact.networks['3'].address;
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
const Long = require('long');
//let currentAccount = null;

// const exchange = wan3.eth.contract(exchangeArtifact.abi).at(contractAddress);
// const wbtc = wan3.eth.contract(WBTCArtifact.abi).at(WBTC);
// const weth = wan3.eth.contract(WETHArtifact.abi).at(WETH);

const exchange = new web3.eth.Contract(exchangeArtifact.abi, contractAddress);
const wbtc = new web3.eth.Contract(WBTCArtifact.abi, WBTC);
const weth = new web3.eth.Contract(WETHArtifact.abi, WETH);

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

// const getWalletBalance = (currency, currentAccount) =>
// 	new Promise((resolve, reject) => {
// 		currency = currency.toLowerCase();

// 		if (currency === 'wan') {
// 			web3.eth.getBalance(currentAccount, (err, res) => {
// 				if (err) reject(err);
// 				resolve(web3.utils.fromWei(String(res)));
// 			});
// 		} else {
// 			tokens[currency].balanceOf(currentAccount, (err, res) => {
// 				if (err) reject(err);
// 				resolve(web3.utils.fromWei(String(res)));
// 			});
// 		}
// 	});

// const getBalance = (currency, currentAccount) =>
// 	new Promise((resolve, reject) => {
// 		currency = currency.toUpperCase();

// 		switch (currency) {
// 			case 'WAN':
// 				exchange.getBalance.call(ZERO_ADDRESS, currentAccount, (err, res) => {
// 					if (err) reject(err);
// 					resolve(web3.utils.fromWei(String(res)));
// 				});
// 				break;
// 			default:
// 				exchange.getBalance.call(tokensAddress[currency], currentAccount, (err, res) => {
// 					if (err) reject(err);
// 					resolve(web3.utils.fromWei(String(res)));
// 				});
// 				break;
// 		}
// 	});

const deposit = (currency, amount, currentAccount) =>
	new Promise(async (resolve, reject) => {
		currency = currency.toLowerCase();

		if (currency === 'btc') {
			currency = 'wbtc';
		} else if (currency == 'eth') {
			currency = 'weth';
		}

		if (currency === 'wan') {
			console.log('deposit WAN .....');
			exchange.methods
				.depositWan()
				.send({ from: currentAccount, value: web3.utils.toWei(amount) }, (err, res) => {
					if (err) reject(err);
					console.log('deposit: ', res);
					resolve(res);
				});
		} else {
			let newAmount = web3.utils.toWei(amount);

			if (currency === 'wbtc') {
				newAmount = Number(amount) * 100000000;
			}

			tokens[currency].methods
				.approve(contractAddress, web3.utils.toWei(amount))
				.send({ from: currentAccount }, (err, res) => {
					if (err) reject(err);

					const res1 = res;
					console.log('approve: ', res);

					setTimeout(() => {
						exchange.methods
							.depositAsset(tokensAddress[currency.toUpperCase()], newAmount)
							.send({ from: currentAccount }, (err, res) => {
								if (err) reject(err);

								console.log('deposit: ', res);

								resolve([ res1, res ]);
							});
					}, 1000);
				});
		}
	});

const withdraw = (currency, amount, currentAccount) =>
	new Promise(async (resolve, reject) => {
		currency = currency.toLowerCase();

		if (currency === 'btc') {
			currency = 'wbtc';
		} else if (currency == 'eth') {
			currency = 'weth';
		}

		if (currency === 'wan') {
			exchange.methods
				.withdraw(ZERO_ADDRESS, web3.utils.toWei(amount))
				.send({ from: currentAccount }, (err, res) => {
					if (err) reject(err);
					resolve(res);
				});
		} else {
			let newAmount = web3.utils.toWei(amount);

			if (currency === 'wbtc') {
				newAmount = Number(amount) * 100000000;
			}

			exchange.methods
				.withdraw(tokensAddress[currency.toUpperCase()], newAmount)
				.send({ from: currentAccount }, (err, res) => {
					if (err) reject(err);
					resolve(res);
				});
		}
	});

// === Hash Order=== //// CONVERT LONG TO BYTES
const longToBytes = long => {
	return web3.utils.bytesToHex(Long.fromNumber(long).toBytesBE());
};

// === GET ORDER HASH=== //
const hashOrder = orderInfo => {
	let message = web3.utils.soliditySha3(
		'0x03',
		orderInfo.senderAddress,
		orderInfo.matcherAddress,
		orderInfo.baseAsset,
		orderInfo.quoteAsset,
		orderInfo.matcherFeeAsset,
		longToBytes(orderInfo.amount),
		longToBytes(orderInfo.price),
		longToBytes(orderInfo.matcherFee),
		longToBytes(orderInfo.nonce),
		longToBytes(orderInfo.expiration),
		orderInfo.side === 'buy' ? '0x00' : '0x01'
	);

	return message;
};

// === SIGN ORDER === //

const signOrder = orderInfo =>
	new Promise((resolve, reject) => {
		let message = hashOrder(orderInfo);
		//Wanmask
		// web3.eth.sign(orderInfo.senderAddress, message, (err, res) => {
		// 	if (err) reject(err);
		// 	resolve(res);
		// });

		//

		web3.eth.personal.sign(message, orderInfo.senderAddress, (err, res) => {
			if (err) reject(err);
			resolve(res);
		});

		//Web3 v1
		//let signedMessage = await web3.eth.sign(message, orderInfo.senderAddress);

		//Web3 v0.2
		//   let signedMessage = await web3.eth.sign(sender, message);
	});

// === GET SIGATURE OBJECT === //
function getSignatureObj(signature) {
	const netId = 3;
	signature = signature.substr(2); //remove 0x
	const r = '0x' + signature.slice(0, 64);
	const s = '0x' + signature.slice(64, 128);
	let v = web3.utils.hexToNumber('0x' + signature.slice(128, 130)); //gwan
	if (netId !== 3) v += 27; //ganache
	return { v, r, s };
}

const validateSolidity = (orderInfo, signature) =>
	new Promise(async (resolve, reject) => {
		//Validate in smart contract

		// const exchange2 = web3.eth.contract(exchangeArtifact.abi, contractAddress);
		// console.log('exchange2', exchange2);

		// exchange.isValidSignature.call(orderInfo, getSignatureObj(signature), (err, res) => {
		// 	if (err) reject(err);
		// 	resolve(res);
		// });

		//------------- Felipe

		// const web3 = new Web3(web3.currentProvider);
		// const exchange2 = web3.eth.contract(exchangeArtifact.abi).at(contractAddress);
		// console.log(exchange2);

		let response = await exchange.methods.isValidSignature(orderInfo, getSignatureObj(signature)).call();

		resolve(response);
	});

module.exports = {
	// getBalance,
	deposit,
	withdraw,
	hashOrder,
	signOrder,
	WETH,
	WBTC,
	tokensAddress,
	// getWalletBalance,
	getSignatureObj,
	validateSolidity
};
