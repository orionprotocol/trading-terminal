import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const IndexNav = _ => {
	const { pair, exchange, chart, history, orderbook } = useSelector(state => state.responsive.home);
	const [ classes, setClasses ] = useState([]);
	const dispatch = useDispatch();

	const setActive = useCallback(_ => dispatch({ type: 'SetHomeActive' }), [ dispatch ]);
	const setPair = useCallback(_ => dispatch({ type: 'SetHomePair' }), [ dispatch ]);
	const setExchange = useCallback(_ => dispatch({ type: 'SetHomeExchange' }), [ dispatch ]);
	const setChart = useCallback(_ => dispatch({ type: 'SetHomeChart' }), [ dispatch ]);
	const setHistory = useCallback(_ => dispatch({ type: 'SetHomeHistory' }), [ dispatch ]);
	const setOrderbook = useCallback(_ => dispatch({ type: 'SetHomeOrderbook' }), [ dispatch ]);

	const update = _ => {
		setActive();
		setPair();
		let orderbook = document.querySelector('.right-panel.js-panel');
		if (orderbook) orderbook.classList.add('active');
	};

	useEffect(_ => {
		window.addEventListener('resize', _ => {
			if (window.innerWidth < 1300) {
				update();
			}
		});
		if (window.innerWidth < 1300) {
			update();
		}
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(
		_ => {
			const newClasses = [
				pair ? 'active' : '',
				exchange ? 'active' : '',
				chart ? 'active' : '',
				history ? 'active' : '',
				orderbook ? 'active' : ''
			];
			setClasses(newClasses);
		},
		[ pair, exchange, chart, history, orderbook ]
	);

	const handleChart = _ => {
		setChart();
		const div = document.querySelector('#chart-container');
		div.style.visibility = 'visible';
	};

	return (
		<div className="index-nav">
			<div className={`index-nav-item js-index-nav ${classes[0]}`} data-nav="pair" onClick={setPair}>
				<div className="icon">
					<span className="icon-mobile-1" />
				</div>
				<div className="text">Pair</div>
			</div>
			<div className={`index-nav-item js-index-nav ${classes[1]}`} data-nav="exchange" onClick={setExchange}>
				<div className="icon">
					<span className="icon-mobile-2" />
				</div>
				<div className="text">Exchange</div>
			</div>
			<div className={`index-nav-item js-index-nav ${classes[2]}`} data-nav="chart" onClick={handleChart}>
				<div className="icon">
					<span className="icon-mobile-3" />
				</div>
				<div className="text">Chart</div>
			</div>
			<div className={`index-nav-item js-index-nav ${classes[3]}`} data-nav="history" onClick={setHistory}>
				<div className="icon">
					<span className="icon-mobile-4" />
				</div>
				<div className="text">History</div>
			</div>
			<div className={`index-nav-item js-index-nav ${classes[4]}`} data-nav="orderbook" onClick={setOrderbook}>
				<div className="icon">
					<span className="icon-mobile-5" />
				</div>
				<div className="text">Orderbook</div>
			</div>
		</div>
	);
};

export default IndexNav;
