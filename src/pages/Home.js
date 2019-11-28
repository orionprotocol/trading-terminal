import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import TopMenu from '../components/TopMenu';
import IndexNav from '../components/Home/IndexNav';
import Sidebar from '../components/Sidebar';
import OrderBooks from '../components/Home/OrderBooks';
import Orders from '../components/Home/Orders';
import CommonInfo from '../components/Home/CommonInfo';
import Exchange from '../components/Home/Exchange';
// import { setSymbol } from '../chartData';

function addClass() {
	let e = document.querySelector('.js-panel');
	if (e) e.classList.remove('active');

	let orderbook = document.querySelector('.right-panel.js-panel.active');
	if (orderbook) orderbook.classList.remove('active');
}

function Home() {
	const { orderbook, active, pair, exchange } = useSelector(state => state.responsive.home);
	// const dispatch = useDispatch();

	// const setSymbol = useCallback(data => dispatch({ type: 'SetSymbol', payload: data }), [ dispatch ]);

	// console.log('home symbol', symbol)

	useEffect(() => {
		window.addEventListener('resize', _ => {
			if (window.innerWidth > 1130) addClass();
		});

		if (window.innerWidth > 1130) addClass();
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
							{!active || (active && pair) ? <CommonInfo /> : null}

							{!active || (active && exchange) ? <Exchange /> : null}
						</div>
						<div className="center-panel js-panel">
							{!active ? (
								<div className="image js-chart js-panel-item">
									<div id="chart-container" />
								</div>
							) : null}

							{active ? (
								<div className="image js-chart js-panel-item">
									<div id="chart-container" />
								</div>
							) : null}

							{active ? null : <Orders />}
						</div>

						{!active || (active && orderbook) ? <OrderBooks /> : null}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
