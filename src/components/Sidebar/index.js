import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dark, Light } from '../funtions/handleMode';
import './index.css';

const Sidebar = _ => {
	const dispatch = useDispatch();
	const setMode = useCallback(payload => dispatch({ type: 'SetMode', payload }), [ dispatch ]);
	const { mode } = useSelector(state => state.general);
	const [ actives, setActives ] = useState([ 'active', '', '' ]);

	useEffect(_ => {
		let lastmode = localStorage.getItem('mode');

		if (lastmode === 'Dark') {
			Dark();
			setMode('Dark');
		} else {
			Light();
			setMode('Light');
		}

		let { pathname } = window.location;

		switch (pathname) {
			case '/home':
				setActives([ 'active', '', '' ]);
				break;
			case '/dashboard':
				setActives([ '', 'active', '' ]);
				break;
			case '/history':
				setActives([ '', '', 'active' ]);
				break;
			default:
				break;
		}
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onMouseOver = _ => {
		document.querySelector('.js-sidebar-wrapper').classList.add('open');
	};

	const onMouseLeave = _ => {
		document.querySelector('.js-sidebar-wrapper').classList.remove('open');
	};

	const handleMode = _ => {
		if (mode === 'Light') {
			Dark();
			setMode('Dark');
		} else if (mode === 'Dark') {
			Light();
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
							<Link className={`nav-link ${actives[0]}`} to="/home">
								<span className="icon-link-1 icon" />
								<span className="text">Home</span>
							</Link>

							<Link className={`nav-link ${actives[1]}`} to="/dashboard">
								<span className="icon-link-2 icon" />
								<span className="text">Dashboard</span>
							</Link>

							<Link className={`nav-link ${actives[2]}`} to="/history">
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
