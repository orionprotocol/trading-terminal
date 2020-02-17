import React, { useEffect, useState } from 'react';

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
