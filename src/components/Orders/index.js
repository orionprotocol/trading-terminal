import React, { Fragment } from 'react';
import { Row, Col, Icon, Select, Layout } from 'antd';
// import OrdersTable from './OrdersTable';
import './index.css';
import './OrdersTable/index.css'

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
			<Layout className="father" style={{ backgroundColor: '#fff' }}>
				<Content style={{ margin: '10px 15px 0 0', overflow: 'initial' }}>
					<Row gutter={[ 8, 8 ]}>
						<Col span={24}>
							
								<Row style={{ padding: '10px' }}>
									<Col span={6}>
										<button className="price-card-button">Orders</button>
										<button className="price-card-button" style={{ border: 'none !important' }}>
											History
										</button>
									</Col>
									<Col span={8} style={{ marginTop: '3px' }}>
										<span>
											{dateTopriceCard} <Icon type="calendar" />
										</span>
										<span className="price-card-date-line">
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										</span>
										<span style={{ marginLeft: '30px' }}>
											{dateTopriceCard} <Icon type="calendar" />
										</span>
									</Col>
									<Col span={10}>
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
									</Col>
								</Row>
							
						</Col>
					</Row>
					<Row style={{ height: '13vh' }}>
					<div className="table-content">
						<div className="titles">
							<div className="title short"><span>Type</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
							<div className="title"><span>Pair</span><i className="fa fa-angle-down" aria-hidden="true"> </i></div>
							<div className="title time"><span>Time</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
							<div className="title"><span>Amount</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
							<div className="title"><span>Price</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
							<div className="title status"><span>Status</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
							<div className="title"><span>Total</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
						</div>
						<div className="lines">
							<div className="line">
								<div className="line-big">
									<div className="line-big-main js-line-big-main"><span className="cell short emp">Sell</span><span className="cell">ETH / BTC</span><span className="cell time"><span>09.09.2019</span> <span> 12:42:4</span></span><span className="cell">0,004422124</span><span className="cell">0,000042142</span><span className="cell filled status">Filled</span><span className="cell">1,4422124</span></div>
									<div className="subtable">
										<div className="subline">
											<div className="subtitles">
												<div className="subtitle"><span>Exchange</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
												<div className="subtitle right"><span>ID</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
												<div className="subtitle right"><span>Amount</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
												<div className="subtitle right"><span>Price</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
												<div className="subtitle right"><span>Status</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
											</div>
											<div className="subcontent">
												<div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right filled">Filled</span></div>
												<div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right open">Filled</span></div>
												<div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right cancel">Filled</span></div>
											</div>
										</div>
									</div>
								</div>
								<div className="line-small">
									<div className="cell cell-top"><span className="data">Sell</span><span className="data-eth">ETH / BTC</span><span className="filled status">Filled</span></div>
									<div className="cell"><span className="sub-title">Amount</span><span className="data-text">0.004422124</span><span className="data-text date">09.09.2019</span></div>
									<div className="cell"><span className="sub-title">Price</span><span className="data-text">0.004422124</span><span className="data-text date">12:42:09</span></div>
									<div className="cell"><span className="sub-title">Total</span><span className="data-text">0.004422124</span></div>
								</div>
							</div>
							<div className="line">
								<div className="line-big">
									<div className="line-big-main js-line-big-main"><span className="cell short emp">Sell</span><span className="cell">ETH / BTC</span><span className="cell time"><span>09.09.2019</span> <span> 12:42:4</span></span><span className="cell">0,004422124</span><span className="cell">0,000042142</span><span className="cell filled status">Filled</span><span className="cell">1,4422124</span></div>
									<div className="subtable">
										<div className="subline">
											<div className="subtitles">
												<div className="subtitle"><span>Exchange</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
												<div className="subtitle right"><span>ID</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
												<div className="subtitle right"><span>Amount</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
												<div className="subtitle right"><span>Price</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
												<div className="subtitle right"><span>Status</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
											</div>
											<div className="subcontent">
												<div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right filled">Filled</span></div>
												<div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right open">Filled</span></div>
												<div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right cancel">Filled</span></div>
											</div>
										</div>
									</div>
								</div>
								<div className="line-small">
									<div className="cell cell-top"><span className="data">Sell</span><span className="data-eth">ETH / BTC</span><span className="filled status">Filled</span></div>
									<div className="cell"><span className="sub-title">Amount</span><span className="data-text">0.004422124</span><span className="data-text date">09.09.2019</span></div>
									<div className="cell"><span className="sub-title">Price</span><span className="data-text">0.004422124</span><span className="data-text date">12:42:09</span></div>
									<div className="cell"><span className="sub-title">Total</span><span className="data-text">0.004422124</span></div>
								</div>
							</div>
							<div className="line">
								<div className="line-big">
									<div className="line-big-main js-line-big-main"><span className="cell short emp">Sell</span><span className="cell">ETH / BTC</span><span className="cell time"><span>09.09.2019</span> <span> 12:42:4</span></span><span className="cell">0,004422124</span><span className="cell">0,000042142</span><span className="cell filled status">Filled</span><span className="cell">1,4422124</span></div>
									<div className="subtable">
										<div className="subline">
											<div className="subtitles">
												<div className="subtitle"><span>Exchange</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
												<div className="subtitle right"><span>ID</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
												<div className="subtitle right"><span>Amount</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
												<div className="subtitle right"><span>Price</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
												<div className="subtitle right"><span>Status</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
											</div>
											<div className="subcontent">
												<div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right filled">Filled</span></div>
												<div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right open">Filled</span></div>
												<div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right cancel">Filled</span></div>
											</div>
										</div>
									</div>
								</div>
								<div className="line-small">
									<div className="cell cell-top"><span className="data">Sell</span><span className="data-eth">ETH / BTC</span><span className="filled status">Filled</span></div>
									<div className="cell"><span className="sub-title">Amount</span><span className="data-text">0.004422124</span><span className="data-text date">09.09.2019</span></div>
									<div className="cell"><span className="sub-title">Price</span><span className="data-text">0.004422124</span><span className="data-text date">12:42:09</span></div>
									<div className="cell"><span className="sub-title">Total</span><span className="data-text">0.004422124</span></div>
								</div>
							</div>
							<div className="line">
								<div className="line-big">
									<div className="line-big-main js-line-big-main"><span className="cell short emp">Sell</span><span className="cell">ETH / BTC</span><span className="cell time"><span>09.09.2019</span> <span> 12:42:4</span></span><span className="cell">0,004422124</span><span className="cell">0,000042142</span><span className="cell filled status">Filled</span><span className="cell">1,4422124</span></div>
									<div className="subtable">
										<div className="subline">
											<div className="subtitles">
												<div className="subtitle"><span>Exchange</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
												<div className="subtitle right"><span>ID</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
												<div className="subtitle right"><span>Amount</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
												<div className="subtitle right"><span>Price</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
												<div className="subtitle right"><span>Status</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
											</div>
											<div className="subcontent">
												<div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right filled">Filled</span></div>
												<div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right open">Filled</span></div>
												<div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right cancel">Filled</span></div>
											</div>
										</div>
									</div>
								</div>
								<div className="line-small">
									<div className="cell cell-top"><span className="data">Sell</span><span className="data-eth">ETH / BTC</span><span className="filled status">Filled</span></div>
									<div className="cell"><span className="sub-title">Amount</span><span className="data-text">0.004422124</span><span className="data-text date">09.09.2019</span></div>
									<div className="cell"><span className="sub-title">Price</span><span className="data-text">0.004422124</span><span className="data-text date">12:42:09</span></div>
									<div className="cell"><span className="sub-title">Total</span><span className="data-text">0.004422124</span></div>
								</div>
							</div>
							<div className="line">
								<div className="line-big">
									<div className="line-big-main js-line-big-main"><span className="cell short emp">Sell</span><span className="cell">ETH / BTC</span><span className="cell time"><span>09.09.2019</span> <span> 12:42:4</span></span><span className="cell">0,004422124</span><span className="cell">0,000042142</span><span className="cell filled status">Filled</span><span className="cell">1,4422124</span></div>
									<div className="subtable">
										<div className="subline">
											<div className="subtitles">
												<div className="subtitle"><span>Exchange</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
												<div className="subtitle right"><span>ID</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
												<div className="subtitle right"><span>Amount</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
												<div className="subtitle right"><span>Price</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
												<div className="subtitle right"><span>Status</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
											</div>
											<div className="subcontent">
												<div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right filled">Filled</span></div>
												<div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right open">Filled</span></div>
												<div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right cancel">Filled</span></div>
											</div>
										</div>
									</div>
								</div>
								<div className="line-small">
									<div className="cell cell-top"><span className="data">Sell</span><span className="data-eth">ETH / BTC</span><span className="filled status">Filled</span></div>
									<div className="cell"><span className="sub-title">Amount</span><span className="data-text">0.004422124</span><span className="data-text date">09.09.2019</span></div>
									<div className="cell"><span className="sub-title">Price</span><span className="data-text">0.004422124</span><span className="data-text date">12:42:09</span></div>
									<div className="cell"><span className="sub-title">Total</span><span className="data-text">0.004422124</span></div>
								</div>
							</div>
						</div>
					</div>
					</Row>
				</Content>
			</Layout>
		</Fragment>
	);
};

export default Orders;
