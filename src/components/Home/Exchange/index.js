import React from 'react';

const Exchange = _ => {
	return (
		<div className="buy-sell js-panel-item js-exchange">
			<div className="top">
				<button className="js-buy-sell active" data-content="buy-content">
					Buy
				</button>
				<button className="js-buy-sell sell-btn" data-content="sell-content">
					Sell
				</button>
			</div>
			<div className="main-content">
				<div className="buy-content js-buy-sell-content">
					<div className="big-toggler">
						<button className="active">Market</button>
						<button>Limit order</button>
					</div>
					<div className="amount">
						<span className="placeholder">Amount</span>
						<input type="text" />
						<span className="currency">ETH</span>
						<div className="available">
							<span>Available</span>
							<span>0.10099921 BTC</span>
						</div>
					</div>
					<div className="btns">
						<button>25%</button>
						<button>50%</button>
						<button>75%</button>
						<button>100%</button>
					</div>
					<div className="amount total">
						<span className="placeholder">Total</span>
						<input type="text" readOnly={true} />
						<span className="currency">BTC</span>
					</div>
					<div className="buy-btn">
						<button className="buy">Buy ETH</button>
					</div>
				</div>
				<div className="sell-content js-buy-sell-content">
					<div className="big-toggler">
						<button className="active">Market</button>
						<button>Limit order</button>
					</div>
					<div className="amount">
						<span className="placeholder">Amount</span>
						<input type="text" />
						<span className="currency">ETH</span>
						<div className="available">
							<span>Available</span>
							<span>0.10099921 BTC</span>
						</div>
					</div>
					<div className="btns">
						<button>25%</button>
						<button>50%</button>
						<button>75%</button>
						<button>100%</button>
					</div>
					<div className="amount total">
						<span className="placeholder">Total</span>
						<input type="text" readOnly={true} />
						<span className="currency">BTC</span>
					</div>
					<div className="buy-btn">
						<button className="buy">Buy ETH</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Exchange;
