import React, { Fragment } from 'react';
import Sockets from './Sockets';
import WanmaskVerification from './WanmaskVerification';
import OrionWanchain from './OrionWanchain';

const Index = _ => {
	let render = <Fragment />;

	if (window.wan3 !== undefined) {
		render = (
			<Fragment>
				<OrionWanchain />
				<Sockets />
				<WanmaskVerification />
			</Fragment>
		);
	} else {
		console.log('WansMask not installed');
		render = <Sockets />;
	}

	// render = <Sockets />;

	return render;
};

export default Index;
