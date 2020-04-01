import Contract, { tokensAddress } from './Contract';

const Assets = {
    toLongValue: function(val, decimals = 8) {
        return Number((Number(val) * Math.pow(10, decimals)).toFixed(0));
    }
};

class EthereumOrder {
    static defaultMatcherFee = 300000;
    static defaultExpiration = 29 * 24 * 60 * 60 * 1000;
    static matcherPublicKey = '0xfbCAd2c3A90FBD94C335FBdF8E22573456Da7F68';
    // static orionUrl = process.env.REACT_APP_ORION_WAN;
    static orionUrl = process.env.REACT_APP_ORION_WAN;
    // baseAsset, es el que el cliente tiene; quoteAsset, es el activo que quiere
    // en compra tiene c2 y quiere c1
    // en venta tiene c1 y quiere c2

    constructor(provider) {
        const contract = new Contract(provider);

        this.signOrder = contract.signOrder;
        this.hashOrder = contract.hashOrder;
        this.validateSolidity = contract.validateSolidity;
    }

    toEthereumOrder = async (symbols, side, price, amount) => {
        return new Promise(async (resolve, reject) => {
            if (!window.ethereum) {
                reject();
            }

            const senderAddress = localStorage.getItem('ethAddress');
            let baseAsset,
                quoteAsset = null;
            const nowTimestamp = Date.now();

            side = side.toLowerCase();
            if (symbols[0].toUpperCase() === 'ETH') {
                baseAsset = '0x0000000000000000000000000000000000000000';
            } else {
                baseAsset = tokensAddress[symbols[0].toUpperCase()];
            }
            quoteAsset = tokensAddress[symbols[1].toUpperCase()];

            const order = {
                senderAddress: senderAddress,
                matcherAddress: EthereumOrder.matcherPublicKey,
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

            let signedOrder = await this.signOrder(order);

            order.signature = signedOrder;

            console.log(order);
            console.log('----- Message: ', this.hashOrder(order));
            console.log('----- Signature: ', signedOrder);
            console.log('----- Signed By: ', senderAddress);

            let validation = await this.validateSolidity(order, signedOrder);
            // console.log('validation', validation);
            // resolve('');
            // return;

            if (validation) {
                fetch(`${EthereumOrder.orionUrl}/api/order`, {
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
                reject(['Order validation failed', validation]);
            }

            // return signedOrder;
        });
    };
}

export { EthereumOrder, Assets };
