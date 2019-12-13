import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TopMenu = _ => {
	const [ actives, setActives ] = useState([ 'active', '', '' ]);

	useEffect(
		_ => {
			const { pathname } = window.location;

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
		},
		//eslint-disable-next-line react-hooks/exhaustive-deps
		[ window.location.pathname ]
	);

	return (
		<div className="top-menu">
			<div className="links">
				<Link className="logo" to="/home">
					<img src="./img/logo.png" alt="home" />
				</Link>
				<Link className={`nav-link ${actives[0]}`} to="/home">
					<span className="icon-link-1 icon" />
				</Link>
				<Link className={`nav-link ${actives[1]}`} to="/dashboard">
					<span className="icon-link-2 icon" />
				</Link>
				<Link className={`nav-link ${actives[2]}`} to="/history">
					<span className="icon-link-3 icon" />
				</Link>
			</div>
			<div className="add">+</div>
		</div>
	);
};

export default TopMenu;
