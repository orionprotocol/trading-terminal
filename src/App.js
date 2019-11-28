import React, { Fragment } from 'react';
import Router from './Router';
import Services from './services';

import './css/chart.css';
import './css/orderbook.css';

function App() {
	return (
		<Fragment>
			<Services />
			<Router />
		</Fragment>
	);
}

export default App;
