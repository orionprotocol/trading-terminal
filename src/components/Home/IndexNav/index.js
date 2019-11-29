import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const IndexNav = _ => {
	const { pair, exchange, chart, history, orderbook } = useSelector(state => state.responsive.home);
	const { symbol } = useSelector(state => state.general);
	const [ classes, setClasses ] = useState([]);
	const dispatch = useDispatch();

	const setActive = useCallback(payload => dispatch({ type: 'SetHomeActive', payload }), [ dispatch ]);
	const setPair = useCallback(_ => dispatch({ type: 'SetHomePair' }), [ dispatch ]);
	const setExchange = useCallback(_ => dispatch({ type: 'SetHomeExchange' }), [ dispatch ]);
	const setChart = useCallback(_ => dispatch({ type: 'SetHomeChart' }), [ dispatch ]);
	const setHistory = useCallback(_ => dispatch({ type: 'SetHomeHistory' }), [ dispatch ]);
	const setOrderbook = useCallback(_ => dispatch({ type: 'SetHomeOrderbook' }), [ dispatch ]);
	const setSymbol = useCallback(payload => dispatch({ type: 'SetSymbol', payload }), [ dispatch ]);

	const update = _ => {
		setPair();
		let orderbook = document.querySelector('.right-panel.js-panel');
		if (orderbook) orderbook.classList.add('active');
	};

	useEffect(_ => {
		window.addEventListener('resize', _ => {
			if (window.innerWidth < 1130) {
				setActive(true);
				update();
			} else {
				setActive(false);
			}
		});
		if (window.innerWidth < 1130) {
			update();
			setActive(true);
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

			const div = document.querySelector('#chart-container');
			if (div) {
				if (chart) {
					div.style.visibility = 'visible';
					setSymbol(symbol);
				} else div.style.visibility = 'hidden';
			}
		},
		//eslint-disable-next-line react-hooks/exhaustive-deps
		[ pair, exchange, chart, history, orderbook ]
	);

	const handleChart = _ => {
		setChart();
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
