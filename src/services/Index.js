import React, { Fragment } from 'react';
import Sockets from './Sockets';
import Wanmask from './Wanmask';
import OrionWanchain from './OrionWanchain';

const Index = _ => {
	let render = <Fragment />;

	if (window.wan3 !== undefined) {
		render = (
			<Fragment>
				<OrionWanchain />
				<Sockets />
				<Wanmask />
			</Fragment>
		);
	} else {
		/* console.log('WansMask not installed'); */
	}

	return render;
};

export default Index;
