import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import './index.css';

// loadBenefits() {
// 	let url =
// 		urlBase +
// 		"/api/v1/order-benefits?symbol={symbol}&ordQty={ordQty}&side={side}"
// 			.replace("{symbol}", this.state.currentSymbol)
// 			.replace("{ordQty}", this.state.count)
// 			.replace("{side}", this.state.side);
// 	fetch(url, {
// 		credentials: "same-origin"
// 	})
// 		.then(results => {
// 			return results.json();
// 		})
// 		.then(data => {
// 			//console.log("Benefits: ", data)
// 			this.setState({ benefits: data });
// 		});
// }

const YourProfit = pros => {
	const { symbol, qtyForm, sideForm } = useSelector(state => state.general);

	useEffect(
		_ => {
			console.log(symbol, qtyForm, sideForm);
		},
		[ symbol, qtyForm, sideForm ]
	);

	return (
		<section className="your-profit">
			<div>
				<h2>Your Profit</h2>
			</div>
			<div className="your-profit-data" />
		</section>
	);
};

export default YourProfit;
