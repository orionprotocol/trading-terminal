import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dark, Light } from '../funtions/handleMode';
import FadeIn from 'react-fade-in';
import AddWallet1 from '../AddWallet/AddWallet1';
import AddWallet2 from '../AddWallet/AddWallet2';
import './index.css';

const Sidebar = (props) => {
	const dispatch = useDispatch();

	const setMode = useCallback((payload) => dispatch({ type: 'SetMode', payload }), [ dispatch ]);

	const setWanmaskConnect = useCallback((payload) => dispatch({ type: 'SetWanmaskConnect', payload }), [ dispatch ]);

	const setMetamaskConnect = useCallback((payload) => dispatch({ type: 'SetMetamaskConnect', payload }), [
		dispatch
	]);

	const { mode } = useSelector((state) => state.general);
	const [ actives, setActives ] = useState([ 'active', '', '' ]);
	const { wanActive, walletOpt, wanmaskConnected, metamaskConnected } = useSelector((state) => state.wallet);
	const [ walletActive, setWalletActive ] = useState(false);
	const [ addWalletOpt, setAddWalletOpt ] = useState(false);

	const [ show1, setShow1 ] = useState(false);
	const [ show2, setShow2 ] = useState(false);

	// const history = useHistory();

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

	useEffect(
		(_) => {
			setWalletActive(wanActive);
			// switch (walletOpt) {
			// 	case 'wanchain':
			// 		setWalletActive(wanActive);
			// 		break;

			// 	default:
			// 		setWalletActive(false);
			// 		break;
			// }

			// const { pathname } = window.location;
			// if (!wanActive && pathname !== '/home') {
			// 	history.push('/home');
			// }

			const wanmask = localStorage.getItem('wanmaskConnected') === 'true' ? true : false;
			const metamask = localStorage.getItem('metamaskConnected') === 'true' ? true : false;

			if (wanmask || wanmaskConnected) {
				setAddWalletOpt(true);
				setWanmaskConnect(true);
				setWalletActive(true);
			}

			if (metamask || metamaskConnected) {
				setAddWalletOpt(true);
				setMetamaskConnect(true);
				setWalletActive(true);
			}
		},
		//eslint-disable-next-line react-hooks/exhaustive-deps
		[ wanActive, walletOpt, wanmaskConnected, metamaskConnected ]
	);

	useEffect((_) => {
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

	const onMouseOver = (_) => {
		document.querySelector('.js-sidebar-wrapper').classList.add('open');

		const div = document.querySelector('#js-wrapper-pair');
		if (div) div.classList.add('active');
	};

	const onMouseLeave = (_) => {
		document.querySelector('.js-sidebar-wrapper').classList.remove('open');

		const div = document.querySelector('#js-wrapper-pair');
		if (div) div.classList.remove('active');
	};

	const handleMode = (_) => {
		if (mode === 'Light') {
			Dark();
			setMode('Dark');
		} else if (mode === 'Dark') {
			Light();
			setMode('Light');
		}
	};

	const handleAddWallet = (_) => {
		setShow1(!show1);
	};

	return (
		<div onMouseLeave={onMouseLeave} onMouseOver={onMouseOver}>
			<div className="sidebar-line js-sidebar-line">
				<div className="line" />
			</div>

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
								<span className="text">Trading Terminal</span>
							</Link>

							{walletActive ? (
								<Link className={`nav-link ${actives[1]}`} to="/dashboard">
									<span className="icon-link-2 icon" />
									<span className="text">Dashboard</span>
								</Link>
							) : null}

							<Link className={`nav-link ${actives[2]}`} to="/history">
								<span className="icon-link-3 icon" />
								<span className="text">History</span>
							</Link>
						</nav>
						<div className="aside-coins">
							{wanmaskConnected ? (
								<div className="coin">
									<img src="./img/wanchain2.png" alt="home" />
									<span className="text">Wanchain</span>
								</div>
							) : null}
							{metamaskConnected ? (
								<div className="coin">
									<img src="./img/eth-aside.svg" alt="home" />
									<span className="text">Ethereum</span>
								</div>
							) : null}
							{/*
							<div className="coin">
								<img src="./img/bit-aside.svg" alt="home" />
								<span className="text">Bitcoin</span>
							</div>
							
							<div className="coin">
								<img src="./img/dash-small.png" alt="home" />
								<span className="text">Dash</span>
							</div> */}
						</div>
						{/* <button className="add-wallet"> */}
						{/* <Link className="add-wallet" to="/wallet"> */}
						<Link className="add-wallet" to="#">
							<img src="./img/close.png" alt="home" />

							{addWalletOpt ? (
								<span className="" onClick={handleAddWallet}>
									Add Wallet
								</span>
							) : (
								<span className="add-wallet-btn" onClick={handleAddWallet}>
									Add Wallet
								</span>
							)}
						</Link>

						{/* </button> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
