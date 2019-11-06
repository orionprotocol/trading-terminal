import { hashOrder, signOrder, tokensAddress, validateSolidity } from '../client/components/wanmask.js';
import { orionUrl } from '../constants.js';
import { Toastr } from './Toastr';

const Assets = {
	toLongValue: function(val, decimals = 8) {
		return Number((Number(val) * Math.pow(10, decimals)).toFixed(0));
	}
};

class WanchainOrder {
	static defaultMatcherFee = 300000;
	static defaultExpiration = 29 * 24 * 60 * 60 * 1000;
	static matcherPublicKey = '0x43064dc5a24570dac874dc8cdd18089cd64e4988';
	static orionUrl = orionUrl;
	// static orionUrl = `https://${window.location.hostname}/wanchain`;
	// baseAsset, es el que el cliente tiene; quoteAsset, es el activo que quiere
	// en compra tiene c2 y quiere c1
	// en venta tiene c1 y quiere c2

	static async toWanchainOrder(symbols, side, price, amount) {
		if (wan3.eth.accounts[0] == null) {
			return;
		}

		const senderAddress = localStorage.getItem('currentAccount');
		let baseAsset,
			quoteAsset = null;
		const nowTimestamp = Date.now();
		let sideBoolean = false;

		side = side.toLowerCase();

		baseAsset = tokensAddress[symbols[0].toUpperCase()];
		quoteAsset = tokensAddress[symbols[1].toUpperCase()];

		const order = {
			senderAddress: senderAddress,
			matcherAddress: WanchainOrder.matcherPublicKey,
			baseAsset: baseAsset,
			quoteAsset: quoteAsset,
			matcherFeeAsset: side === 'buy' ? quoteAsset : baseAsset,
			amount: Assets.toLongValue(amount),
			price: Assets.toLongValue(price),
			matcherFee: 300000,
			nonce: nowTimestamp,
			expiration: nowTimestamp + 29 * 24 * 60 * 60 * 1000,
			side: side //true = buy, false = sell
		};

		let signedOrder = await signOrder(order);

		order.signature = signedOrder;

		// console.log(order);
		// console.log('----- Message: ', hashOrder(order));
		// console.log('----- Signature: ', signedOrder);
		// console.log('----- Signed By: ', senderAddress);

		let validation = await validateSolidity(order, signedOrder);

		if (validation) {
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
					// console.log(data);
					if (data.code !== undefined) {
						console.log(data);
						Toastr.showError(data.msg);
					} else {
						Toastr.showSuccess('Order has been created');
						// this.props.loadOrderHistory(this.props.pair);
					}
				})
				.catch(e => {
					console.log('Error to submit order: ', e);
				});
		} else {
			console.log('Order validation failed', validation);
			Toastr.showError('Order validation failed');
		}

		return signedOrder;
	}
}

module.exports = {
	WanchainOrder,
	Assets
};
