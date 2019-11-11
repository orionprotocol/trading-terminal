import React, { Fragment } from 'react';
import { Row, Col, Layout } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
export default function Home() {
	return (
		<Fragment>
			<Layout style={{ backgroundColor: '#fff' }}>
				<Content style={{ margin: '24px 25px 0 0', overflow: 'initial' }}>
					<Row gutter={[ 8, 8 ]}>
						{/* <Col style={{backgroundColor:"blue"}} span={6} >
                        Este es el home papu
                        </Col>
                        <Col style={{backgroundColor:"yellow"}} span={12} >
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
                        </Col>
                        <Col style={{backgroundColor:"red"}} span={6} >
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
	);
}
