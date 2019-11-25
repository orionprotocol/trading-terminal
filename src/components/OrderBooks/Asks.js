import React, { useState, useEffect } from 'react';

function chooseOrderBookLine(data, type) {
	if (type === 'asks') {
		// let price = data.price;
		// let count = 0;
		// let total = 0;
		// let asks = this.state.data.asks;
		// for (let i = 0; i < asks.length; i++) {
		// 	if (asks[i].price <= price) {
		// 		count = count + asks[i].size;
		// 		total = total + asks[i].total;
		// 	}
		// }
		// if (this.state.customCount) {
		// 	this.setState({ currentPrice: price, total: total }, () => {
		// 		this.loadBenefits();
		// 	});
		// } else {
		// 	this.setState({ currentPrice: price, count: count, total: total }, () => {
		// 		this.loadBenefits();
		// 	});
		// }

		// $('#buy-form-link').trigger('click');
		return;
	}
}

function calculateTotalAsks(array) {
	for (let i = array.length - 1; i >= 0; i--) {
		if (i + 1 >= array.length) {
			array[i].total = array[i].price * array[i].size;
		} else {
			array[i].total = array[i + 1].total + array[i].price * array[i].size;
		}
	}
	return array;
}
function calculatePercent(max, value) {
	return 100 * value / max;
}

function renderAsks(data) {
	let renderData = [];
	let key = 0;
	if (data && data.asks && data.asks.length > 0) {
		let asks = data.asks;
		calculateTotalAsks(asks);
		const maxAsk = asks.reduce(function(prev, current) {
			return prev.total > current.total ? prev : current;
		});
		for (let i = 0; i < asks.length; i++, key++) {
			let exchanges = asks[i].exchanges || [];
			const percent = calculatePercent(maxAsk.total, asks[i].total).toFixed(6);
			let percentStyle = percent + '%';
			let imgExchanges = [];
			for (let j = 0; j < exchanges.length; j++) {
				let imagePath = 'img/exchanges/{exchange}.png'.replace('{exchange}', exchanges[j]);
				let key = 'asks' + i + '' + j;
				imgExchanges.push(<img key={key} style={{ height: '15px', width: '15px' }} src={imagePath} />);
			}
			renderData.push(
				// <tr
				//     onClick={() => {
				//         chooseOrderBookLine(asks[i], "asks");
				//     }}
				//     style={{ lineHeight: "20px" }}
				//     key={key}
				// >
				//     <td style={{ width: "27%" }}>
				//         {asks[i].price.toFixed(8)}
				//     </td>
				//     {this.renderSize(asks[i], exchange)}
				//     <td style={{ width: "27%" }}>
				//         <div
				//             style={{
				//                 width: "100%",
				//                 paddingTop: "1px",
				//                 paddingBottom: "1px"
				//             }}
				//         >
				//             <div
				//                 style={{
				//                     width: percentStyle,
				//                     backgroundColor: "#FCECEC"
				//                 }}
				//             >
				//                 {asks[i].total.toFixed(9)}
				//             </div>
				//         </div>
				//     </td>
				//     {this.renderOrderbookExchange(modal, divExchanges)}
				// </tr>

				<div className="order">
					{/* TOTAL - Max width 100% */}
					<span className="progress-light l-red" style={{ width: percentStyle }} />
					{/* Max width 27% */}
					<span className="progress-light d-red" style={{ width: '1%' }} />
					<span className="cell emp">{asks[i].price.toFixed(8)}</span>
					<span className="cell">{asks[i].size.toFixed(3)}</span>
					<span className="cell">{asks[i].total.toFixed(8)}</span>
					<div className="cell exch">
						<div className="exch-content js-exch-content">
							{imgExchanges}
							<img className="arrow" src="./img/arrow-down.svg" alt="home" />
						</div>
						<div className="exch-drop js-exch-drop">
							<div className="drop">
								<img src="./img/bitcoin.png" alt="home" />
								<span>Exchange 1</span>
							</div>
							<div className="drop">
								<img src="./img/eth.png" alt="home" />
								<span>Exchange 2</span>
							</div>
							<div className="drop">
								<img src="./img/bitcoin.png" alt="home" />
								<span>Exchange 3</span>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
	return renderData;
}

const Asks = props => {
	const [ asks, setAsks ] = useState();

	useEffect(
		_ => {
			if (props.data) {
				setAsks(renderAsks(props.data));
			}
		},
		[ props ]
	);

	return (
		<div className="order-book">
			<div className="orders">{asks}</div>
		</div>
	);
};

export default Asks;
