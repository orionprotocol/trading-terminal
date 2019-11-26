import React, { useEffect, useState } from 'react';

function calculateTotalBids(array) {
	for (let i = 0; i < array.length; i++) {
		if (i - 1 < 0) {
			array[i].total = array[i].price * array[i].size;
		} else {
			array[i].total = array[i - 1].total + array[i].price * array[i].size;
		}
	}
	return array;
}

function calculatePercent(max, value) {
	return 100 * value / max;
}

// function chooseOrderBookLine(data, type) {
// 	if (type === 'bids') {
// 		// let price = data.price;
// 		// this.setState({ currentPrice: price });
// 		// $("#sell-form-link").trigger("click");
// 		// let count = 0;
// 		// let total = 0;
// 		// let bids = this.state.data.bids;
// 		// for (let i = 0; i < bids.length; i++) {
// 		//     if (bids[i].price >= price) {
// 		//         count = count + bids[i].size;
// 		//         total = total + bids[i].total;
// 		//     }
// 		// }
// 		// if (this.state.customCount) {
// 		//     this.setState({ currentPrice: price, total: total }, () => {
// 		//         this.loadBenefits();
// 		//     });
// 		// } else {
// 		//     this.setState(
// 		//         { currentPrice: price, count: count, total: total },
// 		//         () => {
// 		//             this.loadBenefits();
// 		//         }
// 		//     );
// 		// }
// 		return;
// 	}
// }

// function renderSize(data, exchange) {
// 	if (exchange === 'binance' && data.dynamic !== 0) {
// 		// console.log("EXCHANGE " + exchange + " DYNAMIC " + data.dynamic);
// 	}
// 	let colorClassName = 'exchange-size-default-color';
// 	if (!data.dynamic) {
// 		colorClassName = 'exchange-size-default-color';
// 	} else {
// 		if (data.dynamic === 0) {
// 			colorClassName = 'exchange-size-default-color';
// 		}
// 		if (data.dynamic === 1) {
// 			colorClassName = 'exchange-size-increase-color';
// 		}
// 		if (data.dynamic === -1) {
// 			colorClassName = 'exchange-size-decrease-color';
// 		}
// 	}
// 	data.dynamic = 0;
// 	return (
// 		<td className={colorClassName} style={{ width: '27%' }}>
// 			{data.size.toFixed(3)}
// 		</td>
// 	);
// }

function renderBids(data) {
	let renderData = [];
	let key = 0;
	if (data && data.bids && data.bids.length > 0) {
		const bids = data.bids;
		calculateTotalBids(bids);
		const maxBid = bids.reduce(function(prev, current) {
			return prev.total > current.total ? prev : current;
		});
		for (let i = 0; i < bids.length; i++, key++) {
			let exchanges = bids[i].exchanges || [];
			const percent = calculatePercent(maxBid.total, bids[i].total).toFixed(6);
			let percentStyle = percent + '%';
			let imgExchanges = [];
			for (let j = 0; j < exchanges.length; j++) {
				let imagePath = 'img/exchanges/{exchange}.png'.replace('{exchange}', exchanges[j]);
				let key = i + '' + j;
				imgExchanges.push(
					<img key={key} style={{ height: '15px', width: '15px' }} src={imagePath} alt={exchanges[j]} />
				);
			}

			renderData.push(
				<div className="order" key={key}>
					{/* TOTAL - Max width 100% */}
					<span className="progress-light l-green" style={{ width: percentStyle }} />
					{/* Max width 27% */}
					<span className="progress-light d-green" style={{ width: '1%' }} />
					<span className="cell emp">{bids[i].price.toFixed(8)}</span>
					<span className="cell">{bids[i].size.toFixed(3)}</span>
					<span className="cell">{bids[i].total.toFixed(8)}</span>
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

const Bids = props => {
	const [ bids, setBids ] = useState();

	useEffect(
		_ => {
			if (props.data) {
				setBids(renderBids(props.data));
			}
		},
		[ props ]
	);

	return (
		<div className="order-book">
			<p className="heading">Order Book</p>
			<div className="titles">
				<span className="title">Price</span>
				<span className="title">Amount</span>
				<span className="title">Total</span>
				<span className="title exch">Exch</span>
			</div>
			<div className="orders">{bids}</div>
			<div className="last-price">
				<span className="cell">0,0174</span>
				<span className="last">Last Price</span>
			</div>
		</div>
	);
};

export default Bids;
