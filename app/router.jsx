import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import MainDasboard from './client/pages/main_dashboard';
import Balance from './client/pages/balances';
import DepositHistory from './client/pages/deposit_history';
import ChartExample from './client/pages/ChartExample';
import Modals from './client/pages/Modals';
import WanMask from './client/components/WanMask.jsx';

import Menu from './client/pages/parts/menu';

class Router extends React.Component {
	render = () => {
		return (
			<div>
				<BrowserRouter>
					<div className="row customRow">
						<Menu />
						<div className="col-md-11 mainContent" style={{ paddingLeft: '20px' }}>
							<Switch>
								<Route exact path="/" render={props => <MainDasboard {...props} />} />
							</Switch>
							<Switch>
								<Route exact path="/balance" render={props => <Balance {...props} />} />
							</Switch>
							<Switch>
								<Route exact path="/deposit" render={props => <DepositHistory {...props} />} />
							</Switch>
							<Switch>
								<Route exact path="/chart" render={props => <ChartExample {...props} />} />
							</Switch>
							<Switch>
								<Route exact path="/modal" render={props => <Modals {...props} />} />
							</Switch>
						</div>
					</div>
				</BrowserRouter>

				<div>
					<WanMask />
				</div>
			</div>
		);
	};
}

export default Router;
