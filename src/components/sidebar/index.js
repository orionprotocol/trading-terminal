import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';

import './index.css';
import logo from '../../style/media/logo.png';
import night from '../../style/media/night.png';
import bitAside from '../../style/media/bit-aside.svg';
import ethAside from '../../style/media/eth-aside.svg';
import dashSmall from '../../style/media/dash-small.png';
import add from '../../style/media/close.png';
import { Icon } from 'antd';

import Router from './router';
import { Link } from 'react-router-dom';

export default function Sidebar() {
	const balances = useSelector(state => state.balances);

	const [ show, setShow ] = useState({
		sidebarLetters: 'close-sidebar',
		sidebarLogo: 'sidebar-logo-close'
	});
	const [ theme, setTheme ] = useState('wrapper light-mode');
	const [ activeComponent, setActiveComponent ] = useState({
		selected: 'selected-component',
		painted: [ 'active', '', '' ]
	});

	const openSidebar = () => {
		setShow({
			sidebarLetters: 'open-sidebar letters',
			sidebarLogo: 'sidebar-logo-open'
		});
	};
	const closeSidebar = () => {
		setShow({
			sidebarLetters: 'close-sidebar',
			sidebarLogo: 'sidebar-logo-close'
		});
	};
	const changeTheme = () => {
		if (theme === 'wrapper light-mode') {
			setTheme('wrapper dark-mode');
		} else {
			setTheme('wrapper light-mode');
		}
	};

	/* function getURL() {
        console.log("entro aca")
        let str = window.location.href;
        if(str.includes("dashboard")) {
           
        }
        if(str.includes("history")){
            setActiveComponent('selected-component history')
        }else if(str.includes("")){
            setActiveComponent('selected-component')
        }
    }
 */
	let btc = 0,
		eth = 0;
	if (balances.contractbalances) {
		btc = balances.contractbalances.WBTC;
		eth = balances.contractbalances.WETH;
	}

	return (
		<Fragment>
			<div className={theme}>
				<nav className="sidebar" onMouseEnter={openSidebar} onMouseLeave={closeSidebar}>
					<div className="sidebar-content">
						<div className="sidebar-logo-close">
							<a className="logo" href="/">
								<img alt="" src={logo} />
							</a>
						</div>
						<div className="sidebar-night-close" onClick={changeTheme}>
							<img alt="" src={night} />
							<span className={show.sidebarLetters} style={{ color: 'rgb(114,112,127)' }}>
								Dark Mode
							</span>
						</div>

						<div className="sidebar-navigation-icons-close">
							<div className={activeComponent.selected} />

							<div className="sidebar-navigation-tabs ">
								<Link
									className={`sidebar-nav-link ${activeComponent.painted[0]}`}
									to="/"
									onClick={() =>
										setActiveComponent({
											selected: 'selected-component ',
											painted: [ 'active', '', '' ]
										})}
								>
									<Icon type="home" className="sidebar-icons" />
									<span className={show.sidebarLetters}>Home</span>
								</Link>
							</div>
							<div className="sidebar-navigation-tabs">
								<Link
									className={`sidebar-nav-link ${activeComponent.painted[1]}`}
									to="/dashboard"
									onClick={() =>
										setActiveComponent({
											selected: 'selected-component dashboard',
											painted: [ '', 'active', '' ]
										})}
								>
									<Icon type="layout" className="sidebar-icons" />
									<span className={show.sidebarLetters}>Dashboard</span>
								</Link>
							</div>
							<div className="sidebar-navigation-tabs">
								<Link
									className={`sidebar-nav-link ${activeComponent.painted[2]}`}
									to="/history"
									onClick={() =>
										setActiveComponent({
											selected: 'selected-component history',
											painted: [ '', '', 'active' ]
										})}
								>
									<Icon type="history" className="sidebar-icons" />
									<span className={show.sidebarLetters}>History</span>
								</Link>
							</div>
						</div>

						<div className="sidebar-crypoto-icons-close">
							<div className="sidebar-coin">
								<img alt="" src={bitAside} />
								<span style={{ color: 'rgb(114,112,127)' }} className={show.sidebarLetters}>
									Bitcoin {btc}
								</span>
							</div>
							<div className="sidebar-coin">
								<img alt="" src={ethAside} />
								<span style={{ color: 'rgb(114,112,127)' }} className={show.sidebarLetters}>
									Ethereum {eth}
								</span>
							</div>
							<div className="sidebar-coin">
								<img alt="" src={dashSmall} />
								<span style={{ color: 'rgb(114,112,127)' }} className={show.sidebarLetters}>
									Dash
								</span>
							</div>
						</div>
						<div className="sidebar-wallet">
							<button className="sidebar-button-add">
								<img alt="" className="sidebar-add" src={add} />
								<span className={show.sidebarLetters} style={{ color: 'rgb(114,112,127)' }}>
									Add Wallet
								</span>
							</button>
						</div>
					</div>
				</nav>

				<div id="content">
					<Router />
				</div>
			</div>
		</Fragment>
	);
}
