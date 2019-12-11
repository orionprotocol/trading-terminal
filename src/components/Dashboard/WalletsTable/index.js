import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const WalletsTable = _ => {
	const { contractBalances, walletBalances } = useSelector(state => state.balances);
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
				if (contractBalances && walletBalances) {
					setContract({
						...contract,
						ETH: contractBalances.WETH,
						BTC: contractBalances.WBTC,
						WAN: contractBalances.WAN
					});
					setWallet({
						...wallet,
						ETH: walletBalances.WETH,
						BTC: walletBalances.WBTC,
						WAN: walletBalances.WAN
					});
				}
			} catch (e) {
				console.log(e);
			}
		},
		//eslint-disable-next-line react-hooks/exhaustive-deps
		[ contractBalances ]
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
				<div className="line">
					<div className="cell emp coins">
						<img src="./img/btc-color.png" alt="dash" style={{ width: 20, height: 20 }} />
						<span>BTC</span>
					</div>
					<span className="cell">
						<span className="title-m">Wallet</span> {wallet.BTC}
					</span>
					<span className="cell">
						<span className="title-m">Contract</span> {contract.BTC}
					</span>
					<span className="cell">
						<span className="title-m">In open order</span> 0
					</span>
					<div className="cell actions">
						<button className="action">
							{' '}
							<img src="./img/arrow.png" alt="dash" />
							<span>Deposit</span>
						</button>
						<button className="action withdraw">
							<img src="./img/arrow.png" alt="dash" />
							<span>Withdraw</span>
						</button>
						<button className="action">
							{' '}
							<img src="./img/trade.png" alt="dash" />
							<span>Trade</span>
						</button>
					</div>
				</div>
				<div className="line">
					<div className="cell emp coins">
						<img src="./img/eth-wallet.png" alt="dash" style={{ width: 20, height: 20 }} />
						<span>ETH</span>
					</div>
					<span className="cell">
						<span className="title-m">Wallet</span> {wallet.ETH}
					</span>
					<span className="cell">
						<span className="title-m">Contract</span> {contract.ETH}
					</span>
					<span className="cell">
						<span className="title-m">In open order</span> 0
					</span>
					<div className="cell actions">
						<button className="action">
							{' '}
							<img src="./img/arrow.png" alt="dash" />
							<span>Deposit</span>
						</button>
						<button className="action withdraw">
							<img src="./img/arrow.png" alt="dash" />
							<span>Withdraw</span>
						</button>
						<button className="action">
							{' '}
							<img src="./img/trade.png" alt="dash" />
							<span>Trade</span>
						</button>
					</div>
				</div>
				<div className="line">
					<div className="cell emp coins">
						<img src="./img/wanchain.png" alt="dash" style={{ width: 20, height: 20 }} />
						<span>WAN</span>
					</div>
					<span className="cell">
						<span className="title-m">Wallet</span> {wallet.WAN}
					</span>
					<span className="cell">
						<span className="title-m">Contract</span> {contract.WAN}
					</span>
					<span className="cell">
						<span className="title-m">In open order</span> 0
					</span>
					<div className="cell actions">
						<button className="action">
							{' '}
							<img src="./img/arrow.png" alt="dash" />
							<span>Deposit</span>
						</button>
						<button className="action withdraw">
							<img src="./img/arrow.png" alt="dash" />
							<span>Withdraw</span>
						</button>
						<button className="action">
							{' '}
							<img src="./img/trade.png" alt="dash" />
							<span>Trade</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WalletsTable;
