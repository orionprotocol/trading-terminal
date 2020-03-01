import React from 'react';
import coins from 'coinlist';

export default function index({ asset, handlePair }) {
	// console.log(coins.get(asset).name);
	return (
		<div className="line" onClick={(_) => handlePair(asset)}>
			<div className="cell">
				<img className="img" src={`./img/${asset.toLowerCase()}.png`} alt="home" />
				<div className="text">
					<span className="emp">{asset}</span>
					<span className="small">{coins.get(asset).name}</span>
				</div>
			</div>
			<div className="cell short">
				<span className="title-m">Last Pr.</span>
				<div className="text">
					<span className="emp">0.0000</span>
					<span className="small">$000.00</span>
				</div>
			</div>
			<div className="cell short">
				<span className="title-m">24h Change</span>
				<div className="text">
					<span className="emp">0.0000</span>
					<span className="small">$00.00</span>
				</div>
			</div>
			<div className="cell chg">
				<img src="./img/growth.png" alt="home" />
				<p>
					<span className="emp">+0,00</span> <span>%</span>
				</p>
				<div className="star js-star">
					<i className="fa fa-star-o" aria-hidden="true" />
				</div>
			</div>
		</div>
	);
}
