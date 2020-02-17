import React, { useEffect } from 'react';
import TopMenu from '../components/TopMenu';
import Sidebar from '../components/Sidebar';
import Wallets from '../components/Dashboard/Wallets';
import TotalBalances from '../components/Dashboard/TotalBalances';
import WalletsTable from '../components/Dashboard/WalletsTable';

function Dashboard(props) {
	useEffect((_) => {
		// setInterval(async () => {
		// 	const accounts = await window.ethereum.enable();
		// 	console.log('accounts', accounts);
		// }, 1000);
	});
	return (
		<div>
			<TopMenu />
			<div className="dashboard">
				<Sidebar history={props.history} />

				<div className="my-container">
					<div className="my-row">
						<TotalBalances />
						<div className="wrapper">
							<Wallets />
							<WalletsTable history={props.history} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
