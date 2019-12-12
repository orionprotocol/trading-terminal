import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Line from './Line';
import './index.css';

const WalletsTable = props => {
	const balances = useSelector(state => state.balances);
	const [ contract, setContract ] = useState({
		ETH: 0,
		BTC: 0,
		WAN: 0
	});
	const [ wallet, setWallet ] = useState({
		ETH: 0,
		BTC: 0,
		WAN: 0
	});

	useEffect(
		_ => {
			try {
				const { contractBalances, walletBalances } = balances;
				if (contractBalances && walletBalances) {
					setContract({
						...contract,
						ETH: Number(contractBalances.WETH),
						BTC: Number(contractBalances.WBTC),
						WAN: Number(contractBalances.WAN)
					});
					setWallet({
						...wallet,
						ETH: Number(walletBalances.WETH),
						BTC: Number(walletBalances.WBTC),
						WAN: Number(walletBalances.WAN)
					});
				}
			} catch (e) {
				console.log(e);
			}
		},
		//eslint-disable-next-line react-hooks/exhaustive-deps
		[ balances ]
	);

	return (
		<div className="wallets-table">
			<div className="titles">
				<div className="title">
					<span>Token</span>
					<img src="./img/arrow-down.svg" alt="dash" />
				</div>
				<div className="title">
					<span>Wallet</span>
					<img src="./img/arrow-down.svg" alt="dash" />
				</div>
				<div className="title">
					<span>Contract</span>
					<img src="./img/arrow-down.svg" alt="dash" />
				</div>
				<div className="title">
					<span>In open order</span>
					<img src="./img/arrow-down.svg" alt="dash" />
				</div>
				<div className="title actions">
					<span>Actions</span>
				</div>
			</div>
			<div className="lines">
				<Line
					currency="BTC"
					wallet={wallet.BTC.toFixed(8)}
					contract={contract.BTC.toFixed(8)}
					img="/img/btc-color.png"
					history={props.history}
				/>
				<Line
					currency="ETH"
					wallet={wallet.ETH.toFixed(8)}
					contract={contract.ETH.toFixed(8)}
					img="/img/eth-wallet.png"
					history={props.history}
				/>
				<Line
					currency="WAN"
					wallet={wallet.WAN.toFixed(8)}
					contract={contract.WAN.toFixed(8)}
					img="/img/wanchain.png"
					history={props.history}
				/>
			</div>
		</div>
	);
};

export default WalletsTable;
