import { hashOrder, signOrder, tokensAddress } from '../client/components/wanmask.js';

const Assets = {};

class WanchainOrder {
	static defaultMatcherFee = 300000;
	static defaultExpiration = 29 * 24 * 60 * 60 * 1000;
	static matcherPublicKey = '0x1e7b4238bab7d3f5e8d09a18b44c295228b80643';
	//static orionUrl = `http://${window.location.hostname}:3001`;
	// static orionUrl = "https://demo.orionprotocol.io:2083";
	// baseAsset, es el que el cliente tiene; quoteAsset, es el activo que quiere
	// en compra tiene c2 y quiere c1
	// en venta tiene c1 y quiere c2

	static async toWanchainOrder(symbols, side, price, amount) {
		const senderAddress = localStorage.getItem('currentAccount');
		let baseAsset,
			quotetAsset = null;
		const nowTimestamp = Date.now();
		let sideBoolean = false;

		side = side.toLowerCase();

		if (side === 'buy') {
			baseAsset = tokensAddress[symbols[1].toUpperCase()];
			quotetAsset = tokensAddress[symbols[0].toUpperCase()];
			sideBoolean = true;
		} else if (side === 'sell') {
			baseAsset = tokensAddress[symbols[1].toUpperCase()];
			quotetAsset = tokensAddress[symbols[0].toUpperCase()];
		}

		const params = {
			senderAddress: senderAddress,
			matcherAddress: WanchainOrder.matcherPublicKey,
			baseAsset: baseAsset,
			quotetAsset: quotetAsset,
			matcherFeeAsset: baseAsset,
			amount: amount,
			price: price,
			matcherFee: 300000,
			nonce: nowTimestamp,
			expiration: nowTimestamp + 29 * 24 * 60 * 60 * 1000,
			side: sideBoolean //true = buy, false = sell
		};

		let signedOrder = await signOrder(params);
		console.log('----- Message: ', hashOrder(params));
		console.log('----- Signature: ', signedOrder);
		console.log('----- Signed By: ', senderAddress);

		return signedOrder;
	}
}

module.exports = {
	WanchainOrder,
	Assets
};
