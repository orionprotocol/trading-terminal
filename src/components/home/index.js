import React, {Fragment} from 'react'
import {Row,Col, Layout,Card, Icon,Select } from 'antd'
import PriceTable from './priceTable'
import BuyAndSell from './buyAndSell'
import TradingViewWidget, { Themes } from 'react-tradingview-widget';

const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;

export default function Home (){
    let d = new Date();
    let dateTopriceCard= `${d.getDate()}.${d.getMonth()}.${d.getFullYear()}`
    function handleChange(value) {
        console.log(`selected ${value}`);
      }
      
    return(
        <Fragment>
            <Layout style={{ backgroundColor:"#fff" }}> 
                <Content style={{ margin: '24px 25px 0 0', overflow: 'initial' }}>
                    <Row  gutter={[8, 8]}>
                            
                        <Col span={5} >
                            <Row gutter={[8, 8]}>
                                <Col span={24}>
                                    <Card className="stats-card">
                                    asd
                                    </Card>
                                </Col>
                                <Col span={24}>
                                    <Card className="buy-and-sell-card">
                                        <BuyAndSell/>
                                    </Card>
                                </Col>
                                
                                
                            </Row>
                            
                        </Col>

                        <Col  span={13} >
                            <Row gutter={[8, 8]}>
                                <Col span={24}>
                                    <Card className="graph-card-table" >
                                    <TradingViewWidget
                                        symbol="XRP-BTC"
                                        theme={Themes.LIGHT}
                                        locale="en"
                                        width='100%'
                                        height='394' 
                                        /* height='394' */
                                       /*  height='448' */
                                        style='2'
                                    />
                                    </Card>
                                </Col>
                                <Col span={24} >
                                    <Card className="price-card-table">
                                        <Row style={{padding:'10px'}}>
                                        <Col span={6} >
                                    
                                                <button className='price-card-button'>Orders</button>
                                                <button className='price-card-button' style={{border:'none !important'}} >History</button>
                                        </Col>
                                        <Col span={8} style={{marginTop:'3px'}}>
                                                <span >{dateTopriceCard} <Icon type="calendar" /></span>
                                                <span className="price-card-date-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                <span style={{marginLeft:'30px'}} >{dateTopriceCard} <Icon type="calendar" /></span>

                                        </Col>
                                        <Col span={10}>
                                            <Select className="price-card-selector" defaultValue="ETH" style={{ width: 80,padding:0,border:'none' }} onChange={handleChange}>
                                                <Option value="ETH">ETH</Option>
                                                <Option value="ETH">ETH</Option>
                                            </Select>
                                            /
                                            <Select className="price-card-selector" defaultValue="BTC" style={{ width: 80,padding:0,border:'none' }} onChange={handleChange}>
                                                <Option value="BTC">BTC</Option>
                                                <Option value="ETH">ETH</Option>
                                            </Select>
                                            <Select className="price-card-selector" defaultValue="ALL" style={{ width: 80,padding:0,border:'none' }} onChange={handleChange}>
                                                <Option value="ALL">ALL</Option>
                                                <Option value="ALL">ALL</Option>
                                            </Select>

                                        </Col>
                                        </Row>
                                        <Row  style={{height:'33vh',overflowY: 'auto'}}>
                                            <PriceTable/>
                                        </Row>
                                        
                                    </Card>
                                   
                                    
                                </Col>
                            </Row>
                            
                        </Col>
                        {/* <Col style={{backgroundColor:"red"}} span={6} >
                            <Row gutter={[8, 8]}>
                                <Col >
                                    aasdasd
                                </Col>
                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col >
                                    aasdasd
                                </Col>
                            </Row>
                        </Col> */}
                    </Row>
                </Content>
            </Layout>
            
        </Fragment>
    )
} 