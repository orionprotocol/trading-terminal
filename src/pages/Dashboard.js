import React from 'react';
import TopMenu from '../components/TopMenu';
import Sidebar from '../components/Sidebar';
import Wallets from '../components/Dashboard/Wallets';
import TotalBalances from '../components/Dashboard/TotalBalances';
import WalletsTable from '../components/Dashboard/WalletsTable';

function Dashboard() {
	return (
		<div>
			<TopMenu />
			<div className="dashboard">
				<Sidebar />

				<div className="my-container">
					<div className="my-row">
						<TotalBalances />
						<div className="wrapper">
							<Wallets />
							<WalletsTable />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
