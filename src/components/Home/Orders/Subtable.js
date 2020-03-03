import React, { useState, useEffect } from 'react';
import compareValues from '../../funtions/compareValues';

const Subtable = props => {
	const [ subOrders, setSubOrders ] = useState([]);

	const [ classes, setClasses ] = useState({
		exchange: 'fa-angle-down',
		id: 'fa-angle-down',
		amount: 'fa-angle-down',
		price: 'fa-angle-down',
		status: 'fa-angle-down'
	});

	useEffect(
		_ => {
			if (Array.isArray(props.data)) {
				setSubOrders([ ...props.data ]);
			}
		},
		[ props ]
	);

	const handleSort = type => {
		let newClasses = {};
		let sortType = 'asc';
		for (let e in classes) {
			if (e === type) {
				if (classes[e] === 'fa-angle-down') {
					newClasses[e] = 'fa-angle-up';
				} else {
					newClasses[e] = 'fa-angle-down';
					sortType = 'desc';
				}
			} else {
				newClasses[e] = 'fa-angle-down';
			}
		}
		setClasses(newClasses);

		let sortKey = '';
		let subOrdersSorted = [];
		switch (type) {
			case 'exchange':
				sortKey = 'exchange';
				subOrdersSorted = subOrders.sort(compareValues(sortKey, sortType));
				setSubOrders([ ...subOrdersSorted ]);
				break;
			case 'id':
				sortKey = 'id';
				subOrdersSorted = subOrders.sort(compareValues(sortKey, sortType));
				setSubOrders([ ...subOrdersSorted ]);
				break;
			case 'amount':
				sortKey = 'subOrdQty';
				subOrdersSorted = subOrders.sort(compareValues(sortKey, sortType));
				setSubOrders([ ...subOrdersSorted ]);
				break;
			case 'price':
				sortKey = 'price';
				subOrdersSorted = subOrders.sort(compareValues(sortKey, sortType));
				setSubOrders([ ...subOrdersSorted ]);
				break;
			case 'status':
				sortKey = 'status';
				subOrdersSorted = subOrders.sort(compareValues(sortKey, sortType));
				setSubOrders([ ...subOrdersSorted ]);
				break;
			default:
				break;
		}
	};

	const displayStatus = (status) => {
		switch (status) {
			case 'NEW':
				return "New";
			case 'Partially_filled':
				return 'Partial';
			case 'Filled':
				return 'Filled';
			case 'Canceled':
				return 'Canceled';
			default:
				return "New";
		}
	};

	return (
		<div className="subtable active" id="subtable0">
			<div className="subline">
				<div className="subtitles">
					<div className="subtitle" onClick={_ => handleSort('exchange')}>
						<span>Exchange</span>
						<i className={`fa ${classes.exchange}`} aria-hidden="true" />
					</div>
					<div className="subtitle right" onClick={_ => handleSort('id')}>
						<span>ID</span>
						<i className={`fa ${classes.id}`} aria-hidden="true" />
					</div>
					<div className="subtitle right" onClick={_ => handleSort('amount')}>
						<span>Amount</span>
						<i className={`fa ${classes.amount}`} aria-hidden="true" />
					</div>
					<div className="subtitle right" onClick={_ => handleSort('price')}>
						<span>Price</span>
						<i className={`fa ${classes.price}`} aria-hidden="true" />
					</div>
					<div className="subtitle right" onClick={_ => handleSort('status')}>
						<span>Status</span>
						<i className={`fa ${classes.status}`} aria-hidden="true" />
					</div>
				</div>

				<div className="subcontent">
					{subOrders.map((data, i) => (
						<div className="subline-d" key={i}>
							<span>{data.exchange}</span>
							<span className="right">{data.id}</span>
							<span className="right">{data.subOrdQty}</span>
							<span className="right">{data.price}</span>
							<span className="right filled">
								{displayStatus(data.status)}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Subtable;
