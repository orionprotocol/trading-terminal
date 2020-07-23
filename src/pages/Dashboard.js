import React, { lazy, useEffect } from 'react';
import { Col, Row } from 'antd';
import Wallets from '../components/Dashboard/Wallets';
import TotalBalances from '../components/Dashboard/TotalBalances';
import WalletsTable from '../components/Dashboard/WalletsTable';

const Sidebar = lazy(() => import(/* webpackChunkName: 'Sidebar' */ '../components/Sidebar'));

function Dashboard(props) {
  return (
    <div className="dashboard">
      <Sidebar history={props.history} />

      <Row className="dashboard-container" gutter={[8]}>
        <TotalBalances />
        <Col xs={24} lg={18}>
          <Row className="wrapper">
            <Wallets />
            <WalletsTable history={props.history} />
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
