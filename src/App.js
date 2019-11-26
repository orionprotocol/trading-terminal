import React, { Fragment } from 'react';
import Router from './Router';
import Services from './services';

function App() {
	return (
		<Fragment>
			<Services />
			<Router />
		</Fragment>
	);
}

export default App;
