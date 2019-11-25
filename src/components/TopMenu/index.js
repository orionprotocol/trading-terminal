import React from 'react';

const TopMenu = _ => {
	return (
		<div className="top-menu">
			<div className="links">
				<a className="logo" href="/">
					<img src="./img/logo.png" alt="home" />
				</a>
				<a className="nav-link active" href="/">
					<span className="icon-link-1 icon" />
				</a>
				<a className="nav-link" href="/">
					<span className="icon-link-2 icon" />
				</a>
				<a className="nav-link" href="/">
					<span className="icon-link-3 icon" />
				</a>
				<a className="nav-link" href="/">
					<span className="icon-link-1 icon" />
				</a>
				<a className="nav-link" href="/">
					<span className="icon-link-1 icon" />
				</a>
			</div>
			<div className="add">+</div>
		</div>
	);
};

export default TopMenu;
