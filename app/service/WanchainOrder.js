import { hashOrder, signOrder, tokensAddress } from '../client/components/wanmask.js';

const Assets = {
	toLongValue: function(val, decimals) {
		return Number((Number(val) * Math.pow(10, decimals)).toFixed(0));
	}
};

class WanchainOrder {
	static defaultMatcherFee = 300000;
	static defaultExpiration = 29 * 24 * 60 * 60 * 1000;
	static matcherPublicKey = '0x1e7b4238bab7d3f5e8d09a18b44c295228b80643';
	static orionUrl = `http://${window.location.hostname}:3001`;
	// static orionUrl = "https://demo.orionprotocol.io:2083";
	// baseAsset, es el que el cliente tiene; quoteAsset, es el activo que quiere
	// en compra tiene c2 y quiere c1
	// en venta tiene c1 y quiere c2

	static async toWanchainOrder(symbols, side, price, amount) {
		const senderAddress = localStorage.getItem('currentAccount');
		let baseAsset,
			quoteAsset = null;
		const nowTimestamp = Date.now();
		let sideBoolean = false;

		side = side.toLowerCase();

		if (side === 'buy') {
			baseAsset = tokensAddress[symbols[1].toUpperCase()];
			quoteAsset = tokensAddress[symbols[0].toUpperCase()];
		} else if (side === 'sell') {
			baseAsset = tokensAddress[symbols[1].toUpperCase()];
			quoteAsset = tokensAddress[symbols[0].toUpperCase()];
		}

		const order = {
			senderAddress: senderAddress,
			matcherAddress: WanchainOrder.matcherPublicKey,
			baseAsset: baseAsset,
			quoteAsset: quoteAsset,
			matcherFeeAsset: baseAsset,
			amount: Assets.toLongValue(amount),
			price: Assets.toLongValue(price),
			matcherFee: 350000000,
			nonce: nowTimestamp,
			expiration: nowTimestamp + 29 * 24 * 60 * 60,
			side: side //true = buy, false = sell
		};

		let signedOrder = await signOrder(order);

		order.signature = signedOrder;

		console.log(order);
		console.log('----- Message: ', hashOrder(order));
		console.log('----- Signature: ', signedOrder);
		console.log('----- Signed By: ', senderAddress);

		fetch(`${WanchainOrder.orionUrl}/api/order`, {
			credentials: 'same-origin',
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(order)
		})
			.then(results => {
				return results.json();
			})
			.then(data => {
				console.log(data);
				// if (data.code && data.code == "1010") {
				// 	Toastr.showError(
				// 		"No brokers were found to execute your order"
				// 	);
				// 	return;
				// } else if (data.code && data.code == "1000") {
				// 	Toastr.showError("Not enough tradable balance.");
				// 	return;
				// } else {
				// 	Toastr.showSuccess("Order has been created");
				// 	this.props.loadOrderHistory(this.props.pair);
				// }
			});

		return signedOrder;
	}
}

module.exports = {
	WanchainOrder,
	Assets
};
