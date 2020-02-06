import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import TopMenu from '../components/TopMenu';
import IndexNav from '../components/Home/IndexNav';
import Sidebar from '../components/Sidebar';
import OrderBooks from '../components/Home/OrderBooks';
import Orders from '../components/Home/Orders';
import CommonInfo from '../components/Home/CommonInfo';
import Exchange from '../components/Home/Exchange';
import AddWallet1 from '../components/Dashboard/AddWallet/AddWallet1';
import AddWallet2 from '../components/Dashboard/AddWallet/AddWallet2';
import FadeIn from 'react-fade-in';

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

function Home(props) {
	const { orderbook, active, pair, exchange, chart, history } = useSelector((state) => state.responsive.home);
	const { mode, symbol } = useSelector((state) => state.general);

	const [ show1, setShow1 ] = useState(false);
	const [ show2, setShow2 ] = useState(false);

	const handleShow2 = (_) => {
		setShow1(false);
		setTimeout(() => {
			setShow2(true);
		}, 100);
	};

	const handleShow1 = (_) => {
		setShow2(false);
		setTimeout(() => {
			setShow1(true);
		}, 100);
	};

	const handleAddWallet = (_) => {
		setShow1(!show1);
	};

	useEffect(() => {
		window.addEventListener('resize', (_) => {
			if (window.innerWidth > 1130) removeClass();
			else addClass();
		});

		if (window.innerWidth > 1130) removeClass();
		else addClass();
	}, []);

	useEffect(
		(_) => {
			const { pathname } = window.location;

			if (pathname === '/home') {
				window.renderChart('all', symbol, mode);
			}
		},
		//eslint-disable-next-line react-hooks/exhaustive-deps
		[ window.location.pathname, mode, symbol ]
	);

	return (
		<div className="">
			<TopMenu />

			<IndexNav />

			<div className="index">
				<Sidebar handleAddWallet={handleAddWallet} history={props.history} />

				{show1 ? (
					<FadeIn transitionDuration={10}>
						<AddWallet1 show2={handleShow2} hide1={(_) => setShow1(false)} />
					</FadeIn>
				) : null}

				{show2 ? (
					<FadeIn transitionDuration={10}>
						<AddWallet2 show1={handleShow1} hide2={(_) => setShow2(false)} />
					</FadeIn>
				) : null}

				<div className="my-container">
					<div className="my-row">
						<div className="left-panel js-panel">
							{!active || (active && pair) ? <CommonInfo /> : null}

							{!active || (active && exchange) ? <Exchange /> : null}
							{/* <Exchange /> */}
						</div>

						{/* Large */}
						{!active ? (
							<div className="center-panel js-panel">
								<div className="image js-chart js-panel-item">
									<div id="chart-container" />
								</div>

								<Orders />
							</div>
						) : null}

						{/* Small */}
						{(active && chart) || (active && history) ? (
							<div className="center-panel js-panel">
								{active && chart ? (
									<div className="image js-chart js-panel-item">
										<div id="chart-container" />
									</div>
								) : null}

								{active && history ? <Orders /> : null}
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
