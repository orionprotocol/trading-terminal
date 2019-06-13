import { order } from "@waves/waves-transactions";

const Assets = {
    WAVES: "WAVES",
    BTC: "EBJDs3MRUiK35xbj59ejsf5Z4wH9oz6FuHvSCHVQqZHS",
    ETH: "25BEcPNiopW1ioBveCZTaDTVPci2o9ZLkqCELHC2GYoZ",
    XRP: "GqudznuaRtCKRKfEJu7WJyVxpFEwU1TNLtd7yUuwaP7R",

    toSymbolAsset: function(asset) {
        switch (asset) {
            case "EBJDs3MRUiK35xbj59ejsf5Z4wH9oz6FuHvSCHVQqZHS":
                return "BTC";
            case "25BEcPNiopW1ioBveCZTaDTVPci2o9ZLkqCELHC2GYoZ":
                return "ETH";
            case "GqudznuaRtCKRKfEJu7WJyVxpFEwU1TNLtd7yUuwaP7R":
                return "XRP";
            default:
                return "WAVES";
        }
    },
    toAssetPair: function(symbol) {
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
    static matcherPublicKey = "8QUAqtTckM5B8gvcuP7mMswat9SjKUuafJMusEoSn1Gy";
    //static orionUrl = `http://${window.location.hostname}:3001`;
    static orionUrl = "https://demo.orionprotocol.io:2083";

    static toWavesOrder(symbol, side, price, amount, seed) {
        const assetPair = Assets.toAssetPair(symbol);
        const params = {
            amount: Assets.toLongValue(amount, 8),
            price: Assets.toLongValue(price, 8),
            amountAsset: assetPair[0],
            priceAsset: assetPair[1],
            matcherPublicKey: WavesOrder.matcherPublicKey,
            orderType: side.toLowerCase()
        };
        const signedOrder = order(params, seed);
        return signedOrder;
    }
}

module.exports = {
    WavesOrder: WavesOrder,
    Assets: Assets
};
