import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import './index.css';
import BuyAndSellForm from './form';
import YourProfit from './YourProfit';

export default function Exchange() {
	const {  mode,orderBook } = useSelector((state) => state.general);
	const [ activeTab, setActiveTab ] = useState({ buy: 'buy-tab active', sell: 'sell-tab', type: 'buy' });
	const [ activeButton, setActiveButton ] = useState({
		left: 'market-button active',
		rigth: 'limit-order-button',
		type: 'market'
	});

	return (
		<section>
			<div id="exchange" className="">
				{/* <div className="div-add-wallet-btn">
					<span className="add-wallet-btn">Add Wallet</span>
				</div> */}
				{/* <div id="exchange" className="dark-mode"> */}
				<div>
					<div
						className={activeTab.buy}
						onClick={() => setActiveTab({ buy: 'buy-tab active', sell: 'sell-tab', type: 'buy' })}
					>
						Buy
					</div>
					<div
						className={activeTab.sell}
						onClick={() => setActiveTab({ buy: 'buy-tab', sell: 'sell-tab active', type: 'sell' })}
					>
						Sell
					</div>
				</div>
				<div style={{ paddingTop: '1%' }}>
					<div className="container-buttons-options">
						<div className="buttons-options">
							<button
								className={activeButton.left}
								onClick={() =>
									setActiveButton({
										left: 'market-button active',
										rigth: 'limit-order-button',
										type: 'market'
									})}
							>
								Market
							</button>
						</div>
						<div className="buttons-options">
							<button
								className={activeButton.rigth}
								onClick={() =>
									setActiveButton({
										left: 'market-button',
										rigth: 'limit-order-button active',
										type: 'limit-order'
									})}
							>
								Limit order
							</button>
						</div>
					</div>
				</div>
				<div className="buy-and-sell-form">
					{orderBook ? <BuyAndSellForm type={{ trade: activeTab.type, selection: activeButton.type }} />:
					
					<div className={`spinner ${mode === 'Light' ? '' : 'dark-mode'}`}>
						<div className="rect1"></div>
						<div className="rect2"></div>
						<div className="rect3"></div>
						<div className="rect4"></div>
						<div className="rect5"></div>
					</div>
				}
				</div>
			</div>
			{/* <YourProfit /> */}
		</section>
	);
}
