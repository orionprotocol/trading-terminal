import React, { useEffect, useState } from 'react';

export default function Metamask() {
	const [ ethereum, setEthereum ] = useState(false);

	// const enable = async (_) => {
	// 	// console.log('enable');
	// 	// console.log(ethereum);
	// 	try {
	// 		// const dis = await ethereum.logout();
	// 		// console.log(dis);
	// 		const accounts = await ethereum.enable();
	// 		console.log('accounts', accounts);
	// 		// You now have an array of accounts!
	// 		// Currently only ever one:
	// 		// ['0xFDEa65C8e26263F6d9A1B5de9555D2931A33b825']
	// 	} catch (error) {
	// 		// Handle error. Likely the user rejected the login:
	// 		console.log(error);
	// 	}
	// };
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
