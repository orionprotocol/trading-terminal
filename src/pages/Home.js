import React, { useEffect } from 'react';

import TopMenu from '../components/TopMenu';
import IndexNav from '../components/IndexNav';
import Sidebar from '../components/Sidebar';
import OrderBooks from '../components/Home/OrderBooks';
import Orders from '../components/Home/Orders';
import CommonInfo from '../components/Home/CommonInfo';
// import { setSymbol } from '../chartData';

function Home() {
	// const { symbol } = useSelector(state => state.general);
	// const dispatch = useDispatch();

	// const setSymbol = useCallback(data => dispatch({ type: 'SetSymbol', payload: data }), [ dispatch ]);

	// console.log('home symbol', symbol)

	useEffect(() => {
		if (window.innerWidth > 1130) {
			let e = document.querySelector('.js-panel');
			e.classList.remove('active');
		}
	}, []);

	// const handleClick = symbol => {
	// 	setSymbol(symbol);
	// };

	return (
		<div className="">
			<TopMenu />

			<IndexNav />

			<div className="index">
				<Sidebar />

				<div className="my-container">
					<div className="my-row">
						<div className="left-panel js-panel active">
							<CommonInfo />

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
						</div>
						<div className="center-panel js-panel">
							<div className="image js-chart js-panel-item">
								{/* <button onClick={_ => handleClick('XRP-BTC')}>XRP-BTC</button>
								<button onClick={_ => handleClick('ETH-BTC')}>ETH-BTC</button> */}
								<div id="chart-container" style={{ height: '56.5vh' }} />
							</div>
							<Orders />
						</div>
						<OrderBooks />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
