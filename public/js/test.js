console.log('Hello Wanmask');
const contractAddress = '0x68906c3327833808FAe401b96b4A6EBBa8Bf0EA7';

fetch('/json/Exchange.json').then(data => data.json()).then(res => {
	const exchangeArtifact = res;
	const exchange = window.wan3.eth.contract(exchangeArtifact.abi).at(contractAddress);
	const currentAccount = localStorage.getItem('currentAccount');

	console.log('test---------------------------------------------');

	//---------------------------------------------------------------------------
	// exchange.assetBalances.call(currentAccount, '0x0000000000000000000000000000000000000000', (err, res) =>
	// 	console.log('balance: ', String(res))
	// );
	//------------------------------------------------------------------------
	// 0xf66e2a73b1630eb6b4fc2256494471fcfeaf1683d4af80120f169cec4b494f08
	// exchange.depositWan.sendTransaction({ from: currentAccount, value: wan3.toWei('17') }, (err, res) => {
	// 	console.log('deposit');
	// 	console.log(res);
	// });
	//-------------------------------------------------------------------------
});
