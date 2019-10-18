// console.log('Hello Wanmask');
// //let contractAddress = '0x68906c3327833808FAe401b96b4A6EBBa8Bf0EA7'; // Exchange OLD
// // let contractAddress = '0x3F4BDC2dfBa3d148728dF5e313fe377D2A4e97E2';
// let contractAddress = '0x4899AEE8d0C0b35bC3DC6057D2a9F68730B5C3cb';

// const myAddress = '0x102b9e62b9a42270be1009a8ad352392fbafc417';
// const secondAddress = '0x1e7b4238bab7d3f5e8d09a18b44c295228b80643';
// const WBTC = '0xe5aF2Cd77ba717055Df4a59921C809ab2cd891C3';
// const WETH = '0xB4a3F5b8D096aA03808853Db807f1233a2515dF2';
// var exchange = null;
// const web3 = new Web3();
// const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
// var abi = null;
// let currentAccount = localStorage.getItem('currentAccount');
// var wbtc = null;
// var weth = null;
// let exchangeArtifact = null;

// fetch('/json/WETH.json').then(data => data.json()).then(async res => {
// 	abi = res.abi;
// });

// fetch('/json/Exchange.json').then(data => data.json()).then(async res => {
// 	exchangeArtifact = res;
// 	exchange = window.wan3.eth.contract(exchangeArtifact.abi).at(contractAddress);
// });

// // === Hash Order=== //

// function hashOrder(orderInfo) {
// 	let message = web3.utils.soliditySha3(
// 		3,
// 		orderInfo.senderAddress,
// 		orderInfo.matcherAddress,
// 		orderInfo.baseAsset,
// 		orderInfo.quotetAsset,
// 		orderInfo.matcherFeeAsset,
// 		orderInfo.amount,
// 		orderInfo.price,
// 		orderInfo.matcherFee,
// 		orderInfo.nonce,
// 		orderInfo.expiration,
// 		orderInfo.side
// 	);

// 	return message;
// }

// // === SIGN ORDER === //

// const signOrder = orderInfo =>
// 	new Promise((resolve, reject) => {
// 		let message = hashOrder(orderInfo);
// 		//Wanmask
// 		window.wan3.eth.sign(orderInfo.senderAddress, message, (err, res) => {
// 			if (err) reject(err);
// 			resolve(res);
// 		});

// 		//Web3 v1
// 		//let signedMessage = await web3.eth.sign(message, orderInfo.senderAddress);

// 		//Web3 v0.2
// 		//   let signedMessage = await web3.eth.sign(sender, message);
// 	});

// setTimeout(async () => {
// 	console.log('test--------------------------------------------');

// 	// Tokens Instances ------------------------------------
// 	// wbtc = window.wan3.eth.contract(abi).at(WBTC);
// 	// weth = window.wan3.eth.contract(abi).at(WETH);
// 	//--------------------------------------------------------------

// 	// Balances ----------------------------------------

// 	// currentAccount = '0x1e7b4238bab7d3f5e8d09a18b44c295228b80643'; // Felipe
// 	// console.log('currentAccount: ', currentAccount);

// 	//contractAddress = '0x68906c3327833808FAe401b96b4A6EBBa8Bf0EA7'; // Exchange
// 	//console.log('abi', exchangeArtifact.abi);
// 	exchange = window.wan3.eth.contract(exchangeArtifact.abi).at(contractAddress);

// 	wbtc = window.wan3.eth.contract(abi).at(WBTC);
// 	weth = window.wan3.eth.contract(abi).at(WETH);

// 	// exchange.getBalance.call(ZERO_ADDRESS, currentAccount, (err, res) => {
// 	// 	console.log('------ WAN: ', wan3.fromWei(String(res)));
// 	// });

// 	// exchange.getBalance.call(WBTC, currentAccount, (err, res) => {
// 	// 	console.log('------ WBTC: ', wan3.fromWei(String(res)));
// 	// });

// 	// exchange.getBalance.call(WETH, currentAccount, (err, res) => {
// 	// 	console.log('------ WETH: ', wan3.fromWei(String(res)));
// 	// });

// 	//-----------------------------------------------
// 	// console.log(
// 	// 	'--- exchange.address:',
// 	// 	exchange.address,
// 	// 	' -- wbtc.address:',
// 	// 	wbtc.address,
// 	// 	' -- weth.address:',
// 	// 	weth.address
// 	// );

// 	//---------------------- Depositar al exchange -----------------------------------------------------

// 	// weth.approve(exchange.address, wan3.toWei('1'), { from: currentAccount }, (err, res) => {
// 	// 	console.log('approve: ', res);

// 	// 	exchange.depositAsset(weth.address, wan3.toWei('1'), { from: currentAccount }, (err, res) => {
// 	// 		console.log('deposit: ', res);
// 	// 	});
// 	// });

// 	// exchange.depositWan.sendTransaction({ from: currentAccount, value: wan3.toWei('7') }, (err, res) => {
// 	// 	console.log('deposit');
// 	// 	console.log(res);
// 	// });

// 	//----------------------- Retirar del exchange -----------------------------------------------------------

// 	// exchange.withdraw(wbtc.address, wan3.toWei('1'), { from: currentAccount }, (err, res) => {
// 	// 	console.log(res);
// 	// });

// 	// exchange.withdraw(ZERO_ADDRESS, wan3.toWei('1'), (err, res) => {
// 	// 	console.log(res);
// 	// });

// 	//---------------------------------------------------------------------------
// 	// Obtener balance dentro del contrato
// 	//exchange.assetBalances.call(WBTC, currentAccount, (err, res) => console.log('balance: ', String(res)));
// 	//exchange.assetBalances.call('0xe5aF2Cd77ba717055Df4a59921C809ab2cd891C3', '0x102b9e62b9a42270be1009a8ad352392fbafc417', (err, res) => console.log('balance: ', String(res)));

// 	//----------------------------------- Sign Buy Orders--------------------------------------------

// 	// const nowTimestamp = Date.now();

// 	// const buyOrder = {
// 	// 	senderAddress: myAddress, //accounts[1],
// 	// 	matcherAddress: secondAddress, // accounts[0],
// 	// 	baseAsset: WETH,
// 	// 	quotetAsset: WBTC, // WBTC
// 	// 	matcherFeeAsset: WETH, // WETH
// 	// 	amount: 150000000,
// 	// 	price: 2100000,
// 	// 	matcherFee: 350000,
// 	// 	nonce: nowTimestamp,
// 	// 	expiration: nowTimestamp + 29 * 24 * 60 * 60,
// 	// 	side: true //true = buy, false = sell
// 	// };

// 	// let signature1 = await signOrder(buyOrder);
// 	// console.log('----- Message: ', hashOrder(buyOrder));
// 	// console.log('----- Signature: ', signature1);
// 	// console.log('----- Signed By: ', buyOrder.senderAddress);
// 	// console.log('----- Buy Order Struct: \n', buyOrder);

// 	//----------------------------------- Sign Sell Orders--------------------------------------------

// 	// const sellOrder = {
// 	// 	senderAddress: myAddress, //accounts[1],
// 	// 	matcherAddress: secondAddress, // accounts[0],
// 	// 	baseAsset: WETH,
// 	// 	quotetAsset: WBTC, // WBTC
// 	// 	matcherFeeAsset: WETH, // WETH
// 	// 	amount: 150000000,
// 	// 	price: 2100000,
// 	// 	matcherFee: 350000,
// 	// 	nonce: nowTimestamp,
// 	// 	expiration: nowTimestamp + 29 * 24 * 60 * 60,
// 	// 	side: false //true = buy, false = sell
// 	// };

// 	// let signature2 = await signOrder(sellOrder);
// 	// console.log('----- Message: ', hashOrder(sellOrder));
// 	// console.log('----- Signature: ', signature2);
// 	// console.log('----- Signed By: ', sellOrder.senderAddress);
// 	// console.log('----- Sell Order Struct: \n', sellOrder);

// 	//---------------------------------------------------------------------------------------
// }, 4000);

// // WBTC - 0xe5aF2Cd77ba717055Df4a59921C809ab2cd891C3
// // WETH - 0xB4a3F5b8D096aA03808853Db807f1233a2515dF2

// // wan3.eth.getBalance(wan3.eth.accounts[0], function(err, result) {
// // 	console.log(wan3.fromWei(String(result)));
// // });
// // const checkBalance = () => {
// // 	wan3.eth.getBalance(wan3.eth.accounts[0], function(err, result) {
// // 		if (err != null) {
// // 			console.log('Warn err: ', err);
// // 		}
// // 		console.log(result);
// // 	});
// // };

// // checkBalance();

// //------------------------------- Balances Tokens ---------------------------------------

// // weth.balanceOf("0x102b9e62b9a42270be1009a8ad352392fbafc417", (err, res) => {console.log(wan3.fromWei(String(res)))})
// // wbtc.balanceOf("0x102b9e62b9a42270be1009a8ad352392fbafc417", (err, res) => {console.log(wan3.fromWei(String(res)))})
