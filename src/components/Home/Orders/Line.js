import React, { useEffect, useState, Fragment } from 'react';
import SlideToggle from 'react-slide-toggle';
import moment from 'moment';

const Line = props => {
	const [ state, setState ] = useState({ sub: [] });

	useEffect(_ => {
		let timestamp = Number(String(props.data.time).substring(0, 10));
		// let date = moment.unix(timestamp).format('MM-DD HH:mm:ss');
		// 09.09.2019 12:42:4
		let date = moment.unix(timestamp).format('DD.MM.YYYY');
		let time = moment.unix(timestamp).format('HH:mm:ss');

		setState({
			id: props.data.id,
			type: props.data.side[0].toUpperCase() + props.data.side.slice(1),
			pair: props.data.symbol.replace('-', ' / '),
			date,
			time,
			amount: props.data.orderQty,
			price: props.data.price,
			status: props.data.status[0].toUpperCase() + props.data.status.slice(1).toLowerCase(),
			total: (props.data.price * props.data.orderQty).toFixed(8),
			sub: props.data.subOrders
		});
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// console.log(props.type);
	return (
		<Fragment>
			{/* {props.type === 'open' ? null : ( */}
			<div className="line">
				<div className="line-big">
					<SlideToggle
						collapsed
						render={({ toggle, setCollapsibleElement }) => (
							<div className="my-collapsible">
								<div className="line-big-main js-line-big-main" onClick={toggle}>
									<span className="cell short emp">{state.type}</span>
									<span className="cell">{state.pair}</span>
									<span className="cell time">
										{state.date} {state.time}
									</span>
									<span className="cell">{state.amount}</span>
									<span className="cell">{state.price}</span>
									<span className="cell filled status">{state.status}</span>
									<span className="cell">{state.total}</span>
								</div>

								<div className="" ref={setCollapsibleElement}>
									<div className="subtable active" id="subtable0">
										<div className="subline">
											<div className="subtitles">
												<div className="subtitle">
													<span>Exchange</span>
													<i className="fa fa-angle-down" aria-hidden="true" />
												</div>
												<div className="subtitle right">
													<span>ID</span>
													<i className="fa fa-angle-down" aria-hidden="true" />
												</div>
												<div className="subtitle right">
													<span>Amount</span>
													<i className="fa fa-angle-down" aria-hidden="true" />
												</div>
												<div className="subtitle right">
													<span>Price</span>
													<i className="fa fa-angle-down" aria-hidden="true" />
												</div>
												<div className="subtitle right">
													<span>Status</span>
													<i className="fa fa-angle-down" aria-hidden="true" />
												</div>
											</div>

											<div className="subcontent">
												{state.sub.map(data => (
													<div className="subline-d">
														<span>{data.exchange}</span>
														<span className="right">{data.id}</span>
														<span className="right">{data.subOrdQty}</span>
														<span className="right">{data.price}</span>
														<span className="right filled">
															{data.status[0].toUpperCase() +
																data.status.slice(1).toLowerCase()}
														</span>
													</div>
												))}
											</div>
										</div>
									</div>
								</div>
							</div>
						)}
					/>
				</div>
				<div className="line-small">
					<div className="cell cell-top">
						<span className="data">{state.type}</span>
						<span className="data-eth">{state.pair}</span>
						<span className="filled status">{state.status}</span>
					</div>
					<div className="cell">
						<span className="sub-title">Amount</span>
						<span className="data-text">{state.amount}</span>
						<span className="data-text date">{state.date}</span>
					</div>
					<div className="cell">
						<span className="sub-title">Price</span>
						<span className="data-text">{state.price}</span>
						<span className="data-text date">{state.time}</span>
					</div>
					<div className="cell">
						<span className="sub-title">Total</span>
						<span className="data-text">{state.total}</span>
					</div>
				</div>
			</div>
			{/* )} */}
		</Fragment>
	);
};

export default Line;
