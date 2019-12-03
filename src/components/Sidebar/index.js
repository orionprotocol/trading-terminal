import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './index.css';

const Sidebar = _ => {
	const dispatch = useDispatch();
	const setMode = useCallback(payload => dispatch({ type: 'SetMode', payload }), [ dispatch ]);
	const { mode } = useSelector(state => state.general);

	useEffect(_ => {
		let lastmode = localStorage.getItem('mode');
		console.log(lastmode);

		// if (lastmode === 'Dark') setMode('Light');
		// if (lastmode === 'Light') setMode('Dark');
		// handleMode();
		// if (lastmode) {
		// 	setMode(lastmode);
		// } else setMode('Light');
		// console.log(lastmode);
		// handleMode(true);
		// setTimeout(() => {
		// 	handleMode();
		// 	console.log(mode);
		// }, 2000);
	}, []);

	// useEffect(
	// 	_ => {
	// 		handleMode();
	// 	},
	// 	[ mode ]
	// );

	const onMouseOver = _ => {
		document.querySelector('.js-sidebar-wrapper').classList.add('open');
	};

	const onMouseLeave = _ => {
		document.querySelector('.js-sidebar-wrapper').classList.remove('open');
	};

	const handleMode = first => {
		console.log('handleMode ', mode);

		if (mode === 'Light') {
			// console.log('MODE DARK');
			const moon = document.querySelector('#moon');
			moon.classList.add('active');

			const toggle = document.querySelector('.index');
			toggle.classList.add('dark-mode');

			const toggle2 = document.querySelector('.toggler.js-toggler-dark-mode');
			toggle2.classList.add('active');

			const orders = document.querySelector('.father.orders');
			orders.classList.add('dark-mode');

			if (typeof first === 'boolean') return;
			setMode('Dark');
		} else if (mode === 'Dark') {
			// console.log('MODE LIGHT');
			const moon = document.querySelector('#moon');
			moon.classList.remove('active');

			const toggle = document.querySelector('.index');
			toggle.classList.remove('dark-mode');

			const toggle2 = document.querySelector('.toggler.js-toggler-dark-mode');
			toggle2.classList.remove('active');

			const orders = document.querySelector('.father.orders');
			orders.classList.remove('dark-mode');

			if (typeof first === 'boolean') return;
			setMode('Light');
		}
	};

	return (
		<div onMouseLeave={onMouseLeave} onMouseOver={onMouseOver}>
			<div className="sidebar-line js-sidebar-line">
				<div className="line" />
			</div>
			<div className="sidebar-wrapper js-sidebar-wrapper">
				<div className="sidebar-content">
					<a className="logo" href="/">
						<img src="./img/logo.png" alt="home" />
					</a>
					<div className="links">
						<div className="dark-mode" id="moon">
							<div className="night">
								<img src="./img/night.png" alt="home" />
							</div>
							<div className="text mode-toggler">
								<span>Dark Mode</span>
								<div className="toggler js-toggler-dark-mode" onClick={handleMode}>
									<div className="toggler-way" />
									<div className="toggler-circle" />
								</div>
							</div>
						</div>
						<nav>
							<Link className="nav-link active" to="/home">
								<span className="icon-link-1 icon" />
								<span className="text">Home</span>
							</Link>

							<Link className="nav-link" to="/dashboard">
								<span className="icon-link-2 icon" />
								<span className="text">Dashboard</span>
							</Link>

							<Link className="nav-link" to="/history">
								<span className="icon-link-3 icon" />
								<span className="text">History</span>
							</Link>
						</nav>
						<div className="aside-coins">
							<div className="coin">
								<img src="./img/bit-aside.svg" alt="home" />
								<span className="text">Bitcoin</span>
							</div>
							<div className="coin">
								<img src="./img/eth-aside.svg" alt="home" />
								<span className="text">Ethereum</span>
							</div>
							<div className="coin">
								<img src="./img/dash-small.png" alt="home" />
								<span className="text">Dash</span>
							</div>
						</div>
						{/* <button className="add-wallet"> */}
						<Link className="add-wallet" to="/wallet">
							<img src="./img/close.png" alt="home" />
							<span>Add Wallet</span>
						</Link>

						{/* </button> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
