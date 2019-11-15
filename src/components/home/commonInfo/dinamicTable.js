import React, { Fragment } from 'react';
import { Table, Rate } from 'antd';
import bitCoin from '../../../style/media/btc-color.png';
import greenArrow from '../../../style/media/growth.png';
export default function DataTableCommonInfo() {
	const columns = [
		{
			title: 'Pair',
			dataIndex: 'pair',
			width: 110,
			sorter: (a, b) => a > b
		},
		{
			title: 'Last Pr.',
			dataIndex: 'lastpr',
			sorter: (a, b) => a.age - b.age
		},
		{
			title: '24h Vol',
			dataIndex: 'vol',
			sorter: (a, b) => a > b
		},
		{
			title: '24h Change',
			dataIndex: 'change',
			width: 140,
			sorter: (a, b) => a.age - b.age
		}
	];

	const data = [];
	for (let i = 0; i < 100; i++) {
		data.push({
			key: i,
			pair: (
				<div className="comon-info-cell">
					<img className="comon-info-img" src={bitCoin} alt="" />
					<div className="comon-info-text">
						<span className="comon-info-emp">BTC</span>
						<span className="comon-info-small">Bitcoin</span>
					</div>
				</div>
			),
			lastpr: (
				<div className="comon-info-cell">
					<div className="comon-info-text">
						<span className="comon-info-emp">0.0174</span>
						<span className="comon-info-small">$174.41</span>
					</div>
				</div>
			),
			vol: (
				<div className="comon-info-cell">
					<div className="comon-info-text">
						<span className="comon-info-emp">0.001500</span>
						<span className="comon-info-small">$53.41</span>
					</div>
				</div>
			),
			change: (
				<div className="comon-info-cell">
					<img src={greenArrow} alt="" />
					<p>
						<span className="comon-info-emp" style={{ fontSize: '24px' }}>
							+4,42
						</span>{' '}
						<span>%</span>
					</p>
					<div style={{ marginLeft: '5px', marginTop: '-8px' }}>
						<Rate id={i} count={1} style={{ color: 'rgb(0, 187, 255)' }} />
					</div>
				</div>
			)
		});
	}
	function onChange(pagination, filters, sorter, extra) {
		console.log('params', pagination, filters, sorter, extra);
	}
	return (
		<Fragment>
			<Table pagination={false} columns={columns} dataSource={data} onChange={onChange} scroll={{ y: 200 }} />
		</Fragment>
	);
}
