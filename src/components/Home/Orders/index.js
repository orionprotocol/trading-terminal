import React, { Fragment } from 'react';
import { Row, Col, Icon, Select, Layout } from 'antd';
// import OrdersTable from './OrdersTable';
import './index.css';
import './table.css';
import Line from './Line';

const { Option } = Select;
const { Content } = Layout;

const Orders = _ => {
	let d = new Date();
	let dateTopriceCard = `${d.getDate()}.${d.getMonth()}.${d.getFullYear()}`;

	function handleChange(value) {
		console.log(`selected ${value}`);
	}

	return (
		<Fragment>
			<Layout className="father orders">
				<Content style={{ margin: '10px 15px 0 0', overflow: 'initial' }}>
					<Row gutter={[ 8, 8 ]}>
						<Col span={24}>
							<Row style={{ paddingTop: '5px', paddingLeft: '15px' }}>
								<Col xs={24} md={6}>
									<button className="price-card-button">Orders</button>
									<button className="price-card-button" style={{ border: 'none !important' }}>
										History
									</button>
								</Col>
								<Col xs={24} md={8} style={{ marginTop: '3px' }}>
									<div className="orders-dates">
										<span>
											{dateTopriceCard} <Icon type="calendar" />
										</span>
										<span className="price-card-date-line">
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										</span>
										<span style={{ marginLeft: '30px' }}>
											{dateTopriceCard} <Icon type="calendar" />
										</span>
									</div>
								</Col>
								<Col xs={24} md={10}>
									<div className="orders-selects">
										<Select
											className="price-card-selector"
											defaultValue="ETH"
											style={{ width: 80, padding: 0, border: 'none' }}
											onChange={handleChange}
										>
											<Option value="ETH">ETH</Option>
											<Option value="ETH">ETH</Option>
										</Select>
										/
										<Select
											className="price-card-selector"
											defaultValue="BTC"
											style={{ width: 80, padding: 0, border: 'none' }}
											onChange={handleChange}
										>
											<Option value="BTC">BTC</Option>
											<Option value="ETH">ETH</Option>
										</Select>
										<Select
											className="price-card-selector"
											defaultValue="ALL"
											style={{ width: 80, padding: 0, border: 'none' }}
											onChange={handleChange}
										>
											<Option value="ALL">ALL</Option>
											<Option value="ALL">ALL</Option>
										</Select>
									</div>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row style={{ paddingLeft: 15, paddingBottom: 10 }}>
						{/* <OrdersTable /> */}
						<div className="table-content">
							<div className="titles">
								<div className="title short">
									<span>Type</span>
									<i className="fa fa-angle-down" aria-hidden="true" />
								</div>
								<div className="title">
									<span>Pair</span>
									<i className="fa fa-angle-down" aria-hidden="true">
										{' '}
									</i>
								</div>
								<div className="title time">
									<span>Time</span>
									<i className="fa fa-angle-down" aria-hidden="true" />
								</div>
								<div className="title">
									<span>Amount</span>
									<i className="fa fa-angle-down" aria-hidden="true" />
								</div>
								<div className="title">
									<span>Price</span>
									<i className="fa fa-angle-down" aria-hidden="true" />
								</div>
								<div className="title status">
									<span>Status</span>
									<i className="fa fa-angle-down" aria-hidden="true" />
								</div>
								<div className="title">
									<span>Total</span>
									<i className="fa fa-angle-down" aria-hidden="true" />
								</div>
							</div>
							<div className="lines">
								<Line />
								<Line />
								<Line />
								<Line />
								<Line />
								<Line />
							</div>
						</div>
					</Row>
				</Content>
			</Layout>
		</Fragment>
	);
};

export default Orders;
