import React, { Fragment } from 'react';
import DatePicker from 'react-datepicker';
import { Icon, Select } from 'antd';
import { useSelector } from 'react-redux';

import './index.css';

const { Option } = Select;

export default function Deposits() {
	const { mode } = useSelector((state) => state.general);

	const deposits = [];

	for (let i = 0; i < 10; i++) {
		deposits.push(
			<Fragment key={i + 'ss'}>
				<div className="line">
					<span className="cell time">09.09.2019 12:42:41</span>
					<div className="cell short emp btc">
						<img src="./img/btc-color.png" alt="hist" />
						<span>BTC</span>
					</div>
					<span className="cell amount">
						<span className="title-m">Amount</span> <span>0.00448236</span>
					</span>
					<span className="cell filled status">Filled</span>
				</div>
				<div className="line">
					<span className="cell time">09.09.2019 12:42:41</span>
					<div className="cell short emp btc">
						<img src="./img/btc-color.png" alt="hist" />
						<span>BTC</span>
					</div>
					<span className="cell amount">
						<span className="title-m">Amount</span> <span>0.00448236</span>
					</span>
					<span className="cell open status">Open</span>
				</div>
				<div className="line">
					<span className="cell time">09.09.2019 12:42:41</span>
					<div className="cell short emp btc">
						<img src="./img/btc-color.png" alt="hist" />
						<span>BTC</span>
					</div>
					<span className="cell amount">
						<span className="title-m">Amount</span> <span>0.00448236</span>
					</span>
					<span className="cell cancel status">Cancel</span>
				</div>
			</Fragment>
		);
	}

	const optsClass = mode === 'Light' ? 'option-select emp' : 'dark-mode option-select emp';

	return (
		<div className="history-table">
			<p className="heading">Deposit History</p>
			<div className="table-wrapper">
				<div className="top">
					<div className="date">
						<div className="date-1">
							<DatePicker
								// selected={startDateA}
								// onChange={(date) => setStartDateA(date)}
								calendarClassName="date"
								dateFormat="dd.MM.Y"
								// onChangeRaw={handleDateChangeRaw}
							/>
							<span className="date-icon">
								<Icon type="calendar" />
							</span>
						</div>
						<span className="hr" />
						<div className="date-1">
							<DatePicker
								// selected={startDateA}
								// onChange={(date) => setStartDateA(date)}
								calendarClassName="date"
								dateFormat="dd.MM.Y"
								// onChangeRaw={handleDateChangeRaw}
							/>
							<span className="date-icon">
								<Icon type="calendar" />
							</span>
						</div>
					</div>
					<div className="all">
						<Select
							className="price-card-selector emp"
							defaultValue="BTC"
							style={{ width: 80, padding: 0, border: 'none' }}
							// onChange={handleChangeA}
						>
							<Option value="BTC" className={optsClass}>
								BTC
							</Option>
							<Option value="ETH" className={optsClass}>
								ETH
							</Option>
							<Option value="XRP" className={optsClass}>
								XRP
							</Option>
						</Select>
					</div>
					<div className="all status">
						<Select
							className="price-card-selector emp"
							defaultValue="Any"
							style={{ width: 100, padding: 0, border: 'none' }}
							// onChange={handleChangeA}
						>
							<Option value="Any" className={optsClass}>
								Any Status
							</Option>
							<Option value="Any 2" className={optsClass}>
								Any Status 2
							</Option>
						</Select>
					</div>
				</div>
				<div className="table-content">
					<div className="titles">
						<div className="title">
							<span>Date</span>
							<i className="fa fa-angle-down" aria-hidden="true" />
						</div>
						<div className="title short">
							<span className="short">Asset</span>
							<i className="fa fa-angle-down" aria-hidden="true" />
						</div>
						<div className="title">
							<span>Amount</span>
							<i className="fa fa-angle-down" aria-hidden="true" />
						</div>
						<div className="title status">
							<span>Status</span>
							<i className="fa fa-angle-down" aria-hidden="true" />
						</div>
					</div>
					<div className="lines">{deposits}</div>
				</div>
				<div className="pagination">
					<i className="fa fa-angle-left arrow-prev" aria-hidden="true" />
					<span className="num">1</span>
					<span className="num active">2</span>
					<span className="num">3</span>
					<span className="num">...</span>
					<span className="num">8</span>
					<i className="fa fa-angle-right arrow-next" aria-hidden="true" />
				</div>
			</div>
		</div>
	);
}
