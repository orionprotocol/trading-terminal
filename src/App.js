import React, { Fragment } from 'react';
import Router from './PrincipalRouter';
// import Sockets from './services/Sockets';
// import Wanmask from './services/Wanmask';
import Services from './services/Index';

function App() {
	return (
		<Fragment>
			{/* <Sockets/>
        <Wanmask/> */}
			<Services />
			<Router />
		</Fragment>
	);
}

export default App;
