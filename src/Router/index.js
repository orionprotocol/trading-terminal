import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../pages/Home';
import Wallet from '../pages/Wallet';
import History from '../pages/History';
import Dahsboard from '../pages/Dashboard';

const Router = () => {
	return (
		<Fragment>
			<Switch>
				<Route path="/home" component={Home} />
				<Route path="/history" component={History} />
				<Route path="/dashboard" component={Dahsboard} />
				<Route path="/wallet" component={Wallet} />
				<Redirect from="/" to="/home" />
			</Switch>
		</Fragment>
	);
};

export default Router;
