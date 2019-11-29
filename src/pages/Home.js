import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import TopMenu from '../components/TopMenu';
import IndexNav from '../components/Home/IndexNav';
import Sidebar from '../components/Sidebar';
import OrderBooks from '../components/Home/OrderBooks';
import Orders from '../components/Home/Orders';
import CommonInfo from '../components/Home/CommonInfo';
import Exchange from '../components/Home/Exchange';

function addClass() {
	let e = document.querySelector('.left-panel.js-panel');
	if (e) e.classList.add('active');

	let orderbook = document.querySelector('.right-panel.js-panel');
	if (orderbook) orderbook.classList.add('active');
}

function removeClass() {
	let e = document.querySelector('.left-panel.js-panel');
	if (e) e.classList.remove('active');

	let orderbook = document.querySelector('.right-panel.js-panel');
	if (orderbook) orderbook.classList.remove('active');
}

function Home() {
	const { orderbook, active, pair, exchange, chart } = useSelector(state => state.responsive.home);

	useEffect(() => {
		window.addEventListener('resize', _ => {
			if (window.innerWidth > 1130) removeClass();
			else addClass();
		});

		if (window.innerWidth > 1130) removeClass();
		else addClass();
	}, []);

	return (
		<div className="">
			<TopMenu />

			<IndexNav />

			<div className="index">
				<Sidebar />

				<div className="my-container">
					<div className="my-row">
						<div className="left-panel js-panel">
							{!active || (active && pair) ? <CommonInfo /> : null}

							{!active || (active && exchange) ? <Exchange /> : null}
						</div>
						{!active || (active && chart) ? (
							<div className="center-panel js-panel">
								<div className="image js-chart js-panel-item">
									<div id="chart-container" />
								</div>

								{active ? null : <Orders />}
							</div>
						) : null}

						{!active || (active && orderbook) ? <OrderBooks /> : null}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
