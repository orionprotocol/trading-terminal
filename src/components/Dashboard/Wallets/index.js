import React from 'react';
import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

const Wallets = _ => {
	var settings = {
		// dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		centerMargin: '100px'
	};

	return (
		<div class="wallets">
			<div class="top">
				<h2>Wallets</h2>
				<button class="add js-add-wallet">
					<img src="./img/add.png" alt="dash" />
					<span>Add Wallet</span>
				</button>
			</div>
			<div class="crypto-wallets js-crypto-wallets">
				<Slider {...settings}>
					<div class="wallet eth">
						<div class="title">
							<img src="./img/eth-wallet.png" alt="dash" />
							<span>Details</span>
						</div>
						<p class="money">
							<span class="num">12.008895</span> <span class="currency">ETH</span>
						</p>
						<p class="currency-2">0.260000 btc</p>
					</div>
					<div class="wallet btc">
						<div class="title">
							<img src="./img/btc-wallet.png" alt="dash" />
							<span>Details</span>
						</div>
						<p class="money">
							<span class="num">12.008895</span> <span class="currency">ETH</span>
						</p>
						<p class="currency-2">0.260000 btc</p>
					</div>
					<div class="wallet dash">
						<div class="title">
							<img src="./img/dash-wallet.png" alt="dash" />
							<span>Details</span>
						</div>
						<p class="money">
							<span class="num">12.008895</span> <span class="currency">dash</span>
						</p>
						<p class="currency-2">0.260000 btc</p>
					</div>
				</Slider>
			</div>
		</div>
	);
};

export default Wallets;
