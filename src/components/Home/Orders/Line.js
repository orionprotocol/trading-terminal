import React from 'react';
import SlideToggle from 'react-slide-toggle';

const Line = _ => {
	return (
		<div className="line">
			<div className="line-big">
				<SlideToggle
					collapsed
					render={({ toggle, setCollapsibleElement }) => (
						<div className="my-collapsible">
							<div className="line-big-main js-line-big-main" onClick={toggle}>
								<span className="cell short emp">Sell</span>
								<span className="cell">ETH / BTC</span>
								<span className="cell time">
									<span>09.09.2019</span>
									<span> 12:42:4</span>
								</span>
								<span className="cell">0,004422124</span>
								<span className="cell">0,000042142</span>
								<span className="cell filled status">Filled</span>
								<span className="cell">1,4422124</span>
							</div>

							<div className="" ref={setCollapsibleElement}>
								<div className="subtable active" id="subtable0">
									<div className="subline">
										<div className="subtitles">
											<div className="subtitle">
												<span>Exchange</span>
												<i className="fa fa-angle-down" aria-hidden="true" />
											</div>
											<div className="subtitle right">
												<span>ID</span>
												<i className="fa fa-angle-down" aria-hidden="true" />
											</div>
											<div className="subtitle right">
												<span>Amount</span>
												<i className="fa fa-angle-down" aria-hidden="true" />
											</div>
											<div className="subtitle right">
												<span>Price</span>
												<i className="fa fa-angle-down" aria-hidden="true" />
											</div>
											<div className="subtitle right">
												<span>Status</span>
												<i className="fa fa-angle-down" aria-hidden="true" />
											</div>
										</div>

										<div className="subcontent">
											<div className="subline-d">
												<span>BINANCE</span>
												<span className="right">241</span>
												<span className="right">24214,41</span>
												<span className="right">0,0000421421</span>
												<span className="right filled">Filled</span>
											</div>
											<div className="subline-d">
												<span>BINANCE</span>
												<span className="right">241</span>
												<span className="right">24214,41</span>
												<span className="right">0,0000421421</span>
												<span className="right open">Filled</span>
											</div>
											<div className="subline-d">
												<span>BINANCE</span>
												<span className="right">241</span>
												<span className="right">24214,41</span>
												<span className="right">0,0000421421</span>
												<span className="right cancel">Filled</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				/>
			</div>
			<div className="line-small">
				<div className="cell cell-top">
					<span className="data">Sell</span>
					<span className="data-eth">ETH / BTC</span>
					<span className="filled status">Filled</span>
				</div>
				<div className="cell">
					<span className="sub-title">Amount</span>
					<span className="data-text">0.004422124</span>
					<span className="data-text date">09.09.2019</span>
				</div>
				<div className="cell">
					<span className="sub-title">Price</span>
					<span className="data-text">0.004422124</span>
					<span className="data-text date">12:42:09</span>
				</div>
				<div className="cell">
					<span className="sub-title">Total</span>
					<span className="data-text">0.004422124</span>
				</div>
			</div>
		</div>
	);
};

export default Line;
