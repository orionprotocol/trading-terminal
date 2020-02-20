import React, { useEffect, useState } from 'react';

const Web3 = require('web3');
const exchangeArtifact = require('../contracts/Exchange.json');
const WETHArtifact = require('../contracts/WETH.json');
const WBTCArtifact = require('../contracts/WBTC.json');

const contractAddress = exchangeArtifact.networks['3'].address;
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
const web3 = new Web3(window['ethereum']);

const WBTC = WBTCArtifact.networks['3'].address;
const WETH = WETHArtifact.networks['3'].address;

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

export const deposit = async (currency, amount, address) => {
	if (!window.ethereum.selectedAddress) {
		window.ethereum.enable();
	}

	let newAmount = web3.utils.toWei(amount);
	if (currency === 'wbtc') {
		newAmount = amount * 100000000;
	}

	try {
		if (currency === 'weth') {
			const address = window.ethereum.selectedAddress;

			const res = await exchange.methods.depositWan().send({ from: address, value: newAmount });
			console.log(res);
		} else {
			const res1 = await tokens[currency].methods.approve(contractAddress, newAmount).send({ from: address });

			console.log(res1);

			const res2 = await exchange.methods
				.depositAsset(tokensAddress[currency.toUpperCase()], newAmount)
				.send({ from: address });

			console.log(res2);
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
	if (currency === 'wbtc') {
		newAmount = amount * 100000000;
	}

	try {
		const res2 = await exchange.methods
			.withdraw(tokensAddress[currency.toUpperCase()], newAmount)
			.send({ from: address });

		console.log(res2);
	} catch (e) {
		// Toastr.showError('Invalid amount, ' + newAmount);
		// console.log('decimals error: ', newAmount);
		console.log(e);
	}
};

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
