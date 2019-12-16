import { signOrder, tokensAddress, validateSolidity } from './Wanmask';

const Assets = {
	toLongValue: function(val, decimals = 8) {
		return Number((Number(val) * Math.pow(10, decimals)).toFixed(0));
	}
};

class WanchainOrder {
	static defaultMatcherFee = 300000;
	static defaultExpiration = 29 * 24 * 60 * 60 * 1000;
	static matcherPublicKey = '0x43064dc5a24570dac874dc8cdd18089cd64e4988';
	static orionUrl = process.env.REACT_APP_ORION_WAN;
	// static orionUrl = `https://${window.location.hostname}/wanchain`;
	// baseAsset, es el que el cliente tiene; quoteAsset, es el activo que quiere
	// en compra tiene c2 y quiere c1
	// en venta tiene c1 y quiere c2

	static async toWanchainOrder(symbols, side, price, amount) {
		return new Promise(async (resolve, reject) => {
			if (window.wan3.eth.accounts[0] == null) {
				reject();
			}

			const senderAddress = localStorage.getItem('currentAccount');
			let baseAsset,
				quoteAsset = null;
			const nowTimestamp = Date.now();

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
						if (data.code !== undefined) {
							reject(data);
						} else {
							resolve('Order has been created');
						}
					})
					.catch(e => {
						reject(e);
					});
			} else {
				reject([ 'Order validation failed', validation ]);
			}

			// return signedOrder;
		});
	}
}

export { WanchainOrder, Assets };
