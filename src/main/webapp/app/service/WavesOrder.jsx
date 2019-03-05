import {order} from '@waves/waves-transactions';

const Assets = {
    WAVES: '',
    BTC: 'EBJDs3MRUiK35xbj59ejsf5Z4wH9oz6FuHvSCHVQqZHS',
    ETH: 'BrmjyAWT5jjr3Wpsiyivyvg5vDuzoX2s93WgiexXetB3',

    toSymbolAsset: function(asset) {
        switch (asset) {
            case 'EBJDs3MRUiK35xbj59ejsf5Z4wH9oz6FuHvSCHVQqZHS':
                return 'BTC';
            case 'BrmjyAWT5jjr3Wpsiyivyvg5vDuzoX2s93WgiexXetB3':
                return 'ETH';
            default:
                return 'WAVES';
        }
    },
    toAssetPair: function (symbol) {
        let pairs = symbol.split("-");
        return [this[pairs[0]], this[pairs[1]]];
    },

    toLongValue: function(val, decimals) {
        return Number((Number(val) * Math.pow(10, decimals)).toFixed(0));
    }
};

class WavesOrder {
    static defaultMatcherFee = 300000;
    static defaultExpiration = 29 * 24 * 60 * 60 * 1000;
    static matcherPublicKey = '8QUAqtTckM5B8gvcuP7mMswat9SjKUuafJMusEoSn1Gy';
    static seed = '***REMOVED***';
    static orionUrl = 'http://127.0.0.1:3001';

    static toWavesOrder(symbol, side, price, amount) {
        const assetPair = Assets.toAssetPair(symbol);
        const params = {
            amount: Assets.toLongValue(amount, 8),
            price: Assets.toLongValue(price, 8),
            amountAsset: assetPair[0],
            priceAsset: assetPair[1],
            matcherPublicKey: WavesOrder.matcherPublicKey,
            orderType: side.toLowerCase()
        };
        const signedOrder = order(params, WavesOrder.seed);
        return signedOrder;
    }
}

module.exports = {
    WavesOrder: WavesOrder,
    Assets: Assets
};