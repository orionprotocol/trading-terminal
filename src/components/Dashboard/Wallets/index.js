import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import AddWallet1 from '../AddWallet/AddWallet1';
import AddWallet2 from '../AddWallet/AddWallet2';
import FadeIn from 'react-fade-in';
import './index.css';

const Wallets = _ => {
	const { contractBalances } = useSelector(state => state.balances);
	const [ contract, setContract ] = useState({
		ETH: 0,
		BTC: 0,
		WAN: 0
	});

	const [ show1, setShow1 ] = useState(false);
	const [ show2, setShow2 ] = useState(false);

	useEffect(
		_ => {
			try {
				if (contractBalances) {
					setContract({
						...contract,
						ETH: contractBalances.WETH,
						BTC: contractBalances.WBTC,
						WAN: contractBalances.WAN
					});
				}
			} catch (e) {
				console.log(e);
			}
		},
		//eslint-disable-next-line react-hooks/exhaustive-deps
		[ contractBalances ]
	);

	const settings = {
		infinite: false,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1
	};

	const handleAddWallet = _ => {
		setShow1(!show1);
	};

	const handleShow2 = _ => {
		setShow1(false);
		setTimeout(() => {
			setShow2(true);
		}, 100);
	};

	const handleShow1 = _ => {
		setShow2(false);
		setTimeout(() => {
			setShow1(true);
		}, 100);
	};

	return (
		<div className="wallets">
			<div className="top">
				<h2>Wallets</h2>
				<button className="add js-add-wallet" onClick={handleAddWallet}>
					<img src="./img/add.png" alt="dash" />
					<span>Add Wallet</span>
				</button>
			</div>
			<div className="crypto-wallets js-crypto-wallets">
				<Slider {...settings}>
					<div className="wallet eth">
						<div className="title">
							<img src="./img/eth-wallet.png" alt="dash" />
							<span>Details</span>
						</div>
						<p className="money">
							<span className="num">{contract.ETH}</span> <span className="currency">ETH</span>
						</p>
						<p className="currency-2">0.0000 btc</p>
					</div>
					<div className="wallet btc">
						<div className="title">
							<img src="./img/btc-wallet.png" alt="dash" />
							<span>Details</span>
						</div>
						<p className="money">
							<span className="num">{contract.BTC}</span> <span className="currency">BTC</span>
						</p>
						<p className="currency-2">{contract.BTC} btc</p>
					</div>
					<div className="wallet dash">
						<div className="title">
							<img src="./img/wanchain.png" alt="dash" />
							<span>Details</span>
						</div>
						<p className="money">
							<span className="num">{contract.WAN}</span> <span className="currency">WAN</span>
						</p>
						<p className="currency-2">0.0000 btc</p>
					</div>
				</Slider>
			</div>

			{show1 ? (
				<FadeIn transitionDuration={500}>
					<AddWallet1 show2={handleShow2} hide1={_ => setShow1(false)} />
				</FadeIn>
			) : null}

			{show2 ? (
				<FadeIn transitionDuration={500}>
					<AddWallet2 show1={handleShow1} hide2={_ => setShow2(false)} />
				</FadeIn>
			) : null}
		</div>
	);
};

export default Wallets;
