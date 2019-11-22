import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Sidebar = _ => {
	const onMouseOver = _ => {
		document.querySelector('.js-sidebar-wrapper').classList.add('open');
	};

	const onMouseLeave = _ => {
		document.querySelector('.js-sidebar-wrapper').classList.remove('open');
	};
	return (
		<div onMouseLeave={onMouseLeave} onMouseOver={onMouseOver}>
			<div className="wrapper-pair js-wrapper-pair" />
			<div className="sidebar-line js-sidebar-line">
				<div className="line" />
			</div>
			<div className="sidebar-wrapper js-sidebar-wrapper">
				<div className="sidebar-content">
					<a className="logo" href>
						<img src="./img/logo.png" alt="home" />
					</a>
					<div className="links">
						<div className="dark-mode">
							<div className="night">
								<img src="./img/night.png" alt="home" />
							</div>
							<div className="text mode-toggler">
								<span>Dark Mode</span>
								<div className="toggler js-toggler-dark-mode">
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
