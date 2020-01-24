import React from 'react';
import TopMenu from '../components/TopMenu';
import Sidebar from '../components/Sidebar';

import Deposits from '../components/History/Deposits';
import Withdraws from '../components/History/Withdraws';

function History() {
	return (
		<div>
			<TopMenu />
			<div className="history">
				<Sidebar />

				<div className="my-container">
					<h1>Transaction History</h1>
					<div className="my-row">
						<Deposits />
						<Withdraws />
					</div>
				</div>
			</div>
		</div>
	);
}

export default History;
