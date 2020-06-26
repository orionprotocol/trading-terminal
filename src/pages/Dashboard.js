import React, { lazy, useEffect } from "react";
import Wallets from "../components/Dashboard/Wallets";
import TotalBalances from "../components/Dashboard/TotalBalances";
import WalletsTable from "../components/Dashboard/WalletsTable";

const Sidebar = lazy(() =>
  import(/* webpackChunkName: 'Sidebar' */ "../components/Sidebar")
);

function Dashboard(props) {
  useEffect((_) => {
    // setInterval(async () => {
    // 	const accounts = await window.ethereum.enable();
    // 	console.log('accounts', accounts);
    // }, 1000);
  });
  return (
    <div>
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
