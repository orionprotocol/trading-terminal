const exchangeArtifact = require('../../../public/json/Exchange.json');
const tokenArtifact = require('../../../public/json/WETH.json');
const contractAddress = '0x3F4BDC2dfBa3d148728dF5e313fe377D2A4e97E2';
const WBTC = '0xe5aF2Cd77ba717055Df4a59921C809ab2cd891C3';
const WETH = '0xB4a3F5b8D096aA03808853Db807f1233a2515dF2';
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
//let currentAccount = null;

const exchange = window.wan3.eth.contract(exchangeArtifact.abi).at(contractAddress);
const wbtc = window.wan3.eth.contract(tokenArtifact.abi).at(WBTC);
const weth = window.wan3.eth.contract(tokenArtifact.abi).at(WETH);

const tokensAddress = {
	WBTC,
	WETH
};
const tokens = {
	wbtc,
	weth
};

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

		exchange.withdraw(tokens[currency].address, wan3.toWei(amount), { from: currentAccount }, (err, res) => {
			if (err) reject(err);
			resolve(res);
		});
	});

module.exports = {
	getBalance,
	deposit,
	withdraw
};
