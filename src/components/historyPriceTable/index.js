import React, { Fragment } from "react";
import { Row, Col, Icon, Select } from 'antd';
import PriceTable from './priceTable';
import './index.css'

const { Option } = Select;

const historyPriceTable = () => {

    let d = new Date();
	let dateTopriceCard = `${d.getDate()}.${d.getMonth()}.${d.getFullYear()}`;

	function handleChange(value) {
		console.log(`selected ${value}`);
	}

  return (
    <Fragment>
      <Row style={{ padding: "10px" }}>
        <Col span={6}>
          <button className="price-card-button">Orders</button>
          <button
            className="price-card-button"
            style={{ border: "none !important" }}
          >
            History
          </button>
        </Col>
        <Col span={8} style={{ marginTop: "3px" }}>
          <span>
            {dateTopriceCard} <Icon type="calendar" />
          </span>
          <span className="price-card-date-line">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <span style={{ marginLeft: "30px" }}>
            {dateTopriceCard} <Icon type="calendar" />
          </span>
        </Col>
        <Col span={10}>
          <Select
            className="price-card-selector"
            defaultValue="ETH"
            style={{ width: 80, padding: 0, border: "none" }}
            onChange={handleChange}
          >
            <Option value="ETH">ETH</Option>
            <Option value="ETH">ETH</Option>
          </Select>
          /
          <Select
            className="price-card-selector"
            defaultValue="BTC"
            style={{ width: 80, padding: 0, border: "none" }}
            onChange={handleChange}
          >
            <Option value="BTC">BTC</Option>
            <Option value="ETH">ETH</Option>
          </Select>
          <Select
            className="price-card-selector"
            defaultValue="ALL"
            style={{ width: 80, padding: 0, border: "none" }}
            onChange={handleChange}
          >
            <Option value="ALL">ALL</Option>
            <Option value="ALL">ALL</Option>
          </Select>
        </Col>
      </Row>
      <Row style={{ height: "33vh", overflowY: "auto" }}>
        <PriceTable />
      </Row>
    </Fragment>
  );
};

export default historyPriceTable;
