import React, { useEffect, useState } from 'react';

const Web3 = require('web3');
const exchangeArtifact = require('../contracts/Exchange.json');
const WBTCArtifact = require('../contracts/WBTC.json');
const Long = require('long');

const contractAddress = exchangeArtifact.networks['3'].address;
const web3 = new Web3(window['ethereum']);

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
const WBTC = "0x335123EB7029030805864805fC95f1AB16A64D61";
const WXRP = "0x15a3Eb660823e0a3eF4D4A86EEC0d66f405Db515";

const exchange = new web3.eth.Contract(exchangeArtifact.abi, contractAddress);
const wbtc = new web3.eth.Contract(WBTCArtifact.abi, WBTC);
const wxrp = new web3.eth.Contract(WBTCArtifact.abi, WXRP);

export const tokensAddress = {
	ETH: ZERO_ADDRESS,
	WBTC,
	WXRP,
};
const tokens = {
	// Contracts
	wbtc,
	wxrp
};

// === Hash Order=== //// CONVERT LONG TO BYTES
export const longToBytes = (long) => {
	return web3.utils.bytesToHex(Long.fromNumber(long).toBytesBE());
};

// === GET ORDER HASH=== //
export const hashOrder = (orderInfo) => {
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

export const signOrder = (orderInfo) =>
	new Promise((resolve, reject) => {
		let message = hashOrder(orderInfo);

		web3.eth.personal.sign(message, orderInfo.senderAddress, (err, res) => {
			if (err) reject(err);
			resolve(res);
		});
	});

export const deposit = async (currency, amount, address) => {
	if (!window.ethereum.selectedAddress) {
		window.ethereum.enable();
	}

	let newAmount = Number(web3.utils.toWei(amount));
	if (currency === 'wbtc' || currency === 'wxrp') {
		newAmount = (amount * 1e8).toFixed(0);
	}
	newAmount = Number(newAmount.toFixed(0));

	try {
		if (currency === 'weth') {
			const res = await exchange.methods.depositWan().send({ from: address, value: newAmount });
			console.log(res);
		} else {
			tokens[currency].methods.approve(contractAddress, newAmount).send({ from: address });

			// console.log(res1);

			setTimeout(() => {
				exchange.methods.depositAsset(tokensAddress[currency.toUpperCase()], newAmount).send({ from: address });
			}, 1000);

			// console.log(res2);
		}
	} catch (e) {
		// Toastr.showError('Invalid amount, ' + newAmount);
		// console.log('decimals error: ', newAmount);
		console.log(e);
	}
};

export const withdraw = async (currency, amount, address) => {
	if (!window.ethereum.selectedAddress) {
		window.ethereum.enable();
	}

	let newAmount = web3.utils.toWei(amount);
	if (currency === 'wbtc' || currency === 'wxrp') {
		newAmount = (amount * 1e8).toFixed(0);
	}

	try {
		if (currency === 'weth') {
			const res = await exchange.methods.withdraw(ZERO_ADDRESS, newAmount).send({ from: address });
			console.log(res);
		} else {
			const res2 = await exchange.methods
				.withdraw(tokensAddress[currency.toUpperCase()], newAmount)
				.send({ from: address });

			console.log(res2);
		}
	} catch (e) {
		// Toastr.showError('Invalid amount, ' + newAmount);
		// console.log('decimals error: ', newAmount);
		console.log(e);
	}
};

// === GET SIGATURE OBJECT === //
const getSignatureObj = (signature) => {
	const netId = 3;
	signature = signature.substr(2); //remove 0x
	const r = '0x' + signature.slice(0, 64);
	const s = '0x' + signature.slice(64, 128);
	let v = web3.utils.hexToNumber('0x' + signature.slice(128, 130)); //gwan
	if (netId !== 3) v += 27; //ganache
	return { v, r, s };
};

export const validateSolidity = (orderInfo, signature) =>
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

export default function Metamask() {
	const [ ethereum, setEthereum ] = useState(false);

	useEffect((_) => {
		if (typeof window.ethereum !== 'undefined' || typeof window.web3 !== 'undefined') {
			// Web3 browser user detected. You can now use the provider.
			const provider = window['ethereum'] || window.web3.currentProvider;
			window.ethereum.autoRefreshOnNetworkChange = false;
			setEthereum(provider);
		}
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(
		(_) => {
			// if (ethereum) enable();
		},
		//eslint-disable-next-line react-hooks/exhaustive-deps
		[ ethereum ]
	);

	return <div />;
}
