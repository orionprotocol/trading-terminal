import React, { Fragment } from 'react';
import { Row, Col, Layout, Card, Icon, Select } from 'antd';
import PriceTable from './priceTable';
import BuyAndSell from './buyAndSell';
import CommonInfo from './commonInfo';
import TradingViewWidget, { Themes, BarStyles } from 'react-tradingview-widget';
import useWindowDimensions from '../utils/useWindowDimensions'
import OrderBookBids from './orderBookBids'
import OrderBookAsk from './orderBookAsk'
import './index.css'
const { Content } = Layout;
const { Option } = Select;


export default function Home() {
	

	let d = new Date();
	let dateTopriceCard = `${d.getDate()}.${d.getMonth()}.${d.getFullYear()}`;
	function handleChange(value) {
		console.log(`selected ${value}`);
	}
	let chartContainerWidth = document.getElementById('chartContainer');
	let charContainerHeight = document.getElementById('chartContainer');
	let tradingChart = null;

	if (chartContainerWidth) chartContainerWidth = chartContainerWidth.offsetWidth;
	if (charContainerHeight) charContainerHeight = charContainerHeight.offsetHeight;

	if (typeof chartContainerWidth === 'number' && typeof charContainerHeight === 'number') {
		tradingChart = (
			<TradingViewWidget
				symbol="BINANCE:XRPBTC"
				theme={Themes.LIGHT}
				locale="en"
				width={chartContainerWidth - 10}
				height={charContainerHeight - 10}
				style={BarStyles.LINE}
			/>
		);
	}

	const { height, width } = useWindowDimensions(document.getElementById('chartContainer'),'cabra');
	
	console.log(height, width)

	return (
		<Fragment>
			<Layout className="father" style={{ backgroundColor: '#fff' }}>
				<Content style={{ margin: '10px 15px 0 0', overflow: 'initial' }}>
					<Row gutter={[ 8, 8 ]}>
						<Col span={5}>
							<Row gutter={[ 8, 8 ]}>
								<Col span={24}>
									<Card className="common-info-card">
										<CommonInfo />
									</Card>
								</Col>
								
								<Col span={24}>
									<Card className="buy-and-sell-card">
										<BuyAndSell />
									</Card>
								</Col>
							</Row>
						</Col>

						<Col span={13}>
							<Row gutter={[ 8, 8 ]}>
								<Col span={24} style={{ height: '56vh' }} id="chartContainer">
									{/*   <Card className="graph-card-table" > */}
									{tradingChart}
									{/*  </Card> */}
								</Col>
								<Col span={24}>
									<Card className="price-card-table">
										<Row style={{ padding: '10px' }}>
											<Col span={6}>
												<button className="price-card-button">Orders</button>
												<button
													className="price-card-button"
													style={{ border: 'none !important' }}
												>
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
										<Row style={{ height: '33vh', overflowY: 'auto' }}>
											<PriceTable />
										</Row>
									</Card>
								</Col>
							</Row>
						</Col>
						<Col span={6}>
							<Row gutter={[ 8, 8 ]}>
								<Col span={24}>
									<Card className="common-info-card" style={{ height: '97vh' }}>
									<p style={{ fontSize: '10px', fontWeight: '600' }}>ORDER BOOK</p>
										<OrderBookBids/>
										<div className="order-books-lastprice">
											<span className='last-price-number' >0.0174</span>
											<span className='last-price'>Last price</span>
										</div>
										<OrderBookAsk/>
									</Card>
								</Col>
							</Row>
						</Col>
					</Row>
				</Content>
			</Layout>
		</Fragment>
	);
}
