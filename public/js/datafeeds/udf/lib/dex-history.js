const POLL_DELAY = 3000;

const DEFAULT_SYMBOL_INFO = {
    session: '24x7',
    exchange: 'DEX',
    listed_exchange: 'DEX',
    timezone: 'Europe/London',

    minmov: 1,

    has_intraday: true,
    // intraday_multipliers: ['5'],
    supported_resolutions: ['15', '30', '60', '240', '1D', '1W'],
    has_seconds: false,
    // seconds_multipliers: ['5'],
    has_daily: true,
    has_weekly_and_monthly: true,
    has_empty_bars: true,
    force_session_rebuild: false,
    has_no_volume: false,
    data_status: 'pulsed'
};

class SymbolInfoService {

    get(symbolName, exchange) {
        const [partOne, partTwo] = symbolName.split('-');

        if (!partOne || !partTwo) {
            return Promise.reject();
        } else {
            return this._createSymbolInfo(partOne, partTwo, exchange);
        }
    }

    _createSymbolInfo(assetOneId, assetTwoId, exchange) {

        const ticker = `${assetOneId}${assetTwoId}`;
        const symbolName = `${assetOneId}/${assetTwoId}`;

        return Promise.resolve({
            ...DEFAULT_SYMBOL_INFO,
            pricescale: Math.pow(10, 8),
            volume_precision: 8,
            exchange: exchange,
            description: symbolName,
            name: symbolName, ticker,
        });
    }

}

const symbolInfoService = new SymbolInfoService();

class CandlesService {

    constructor(exchange) {
        this._lastTime = 0;
        this._subscriber = null;
        this._exchange = exchange;
    }

    onReady(callback) {
        setTimeout(() => callback({
                supported_resolutions: ['15', '30', '60', '240', '1D', '1W'],
                supports_time: true,
                supports_marks: false,
                supports_timescale_marks: false
            }), 0
        );
    }

    resolveSymbol(symbolName, resolve, reject) {
        if (symbolName.match(/^DEX:/)) {
            return;
        }

        symbolInfoService.get(symbolName, this._exchange)
            .then(resolve)
            .catch(reject); // TODO
    }

    getBars(symbolInfo, resolution, from, to = (Date.now() / 1000), onHistoryCallback, onErrorCallback) {
        //from = CandlesService.convertToMilliseconds(from);
        //to = CandlesService.convertToMilliseconds(to);
        const handleCandles = (candles) => {
                candles = CandlesService.filterCandlesByTime(
                    candles,
                    from,
                    to
                );

                if (candles.length) {
                    this._updateLastTime(candles);
                    onHistoryCallback(candles);
                } else {
                    onHistoryCallback([], {
                        noData: true
                    });
                }
            }
        ;
        CandlesService._getAndHandleCandles(
            symbolInfo,
            from,
            to,
            resolution,
            handleCandles,
            onErrorCallback
        );
    }

    subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
        this._subscriber = subscriberUID;

        const from = this._lastTime;
        const to = Math.round(Date.now() / 1000);

        const handleCandles = (candles) => {
            if (this._subscriber !== subscriberUID) {
                return;
            }

            this.subscribeBars(
                symbolInfo,
                resolution,
                onRealtimeCallback,
                subscriberUID,
                onResetCacheNeededCallback
            );

            if (candles.length > 1) {
                this._updateLastTime(candles);
                CandlesService
                    .filterCandlesByTime(candles, from, to)
                    .forEach(onRealtimeCallback);
            }
        };

        var timerId = setTimeout(() => {
                CandlesService._getAndHandleCandles(
                    symbolInfo,
                    this._lastTime,
                    Math.round(Date.now() / 1000),
                    resolution,
                    handleCandles
                );
            },
            POLL_DELAY)
        ;
    }

    calculateHistoryDepth(resolution, resolutionBack, intervalBack) {
        switch (resolution) {
            case "30":
                return {
                    resolutionBack: 'D',
                    intervalBack: 10
                };
            case "60":
                return {
                    resolutionBack: 'D',
                    intervalBack: 20
                };
            default:
                return undefined;
        }
    };

    unsubscribeBars(subscriberUID) {
        if (this._subscriber === subscriberUID) {
            this._subscriber = null;
        }
    }

    _updateLastTime(candles) {
        const lastTime = candles[candles.length - 2].timeStart;
        if (this._lastTime >= lastTime) {
            return false;
        }
        this._lastTime = lastTime;
    }

    static filterCandlesByTime(candles = [], from, to) {
        return candles
            .filter(({time}) => time <= to && time >= from
            )
            .map(candle => {
                candle.time = candle.timeStart * 1000;
                return candle;
            })
            ;
    }

    static _getAndHandleCandles(symbolInfo, from, to, resolution, handleCandles, handleError) {
        CandlesService._getCandles(
            symbolInfo,
            from,
            to,
            resolution)
            .then(handleCandles)
            .catch(handleError);
    }

    static _getCandles(symbolInfo, from, to, resolution) {
        const amountId = 'WAVES';
        const priceId = '8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS';
        const interval = CandlesService._normalizeInterval(resolution);
        const baseUrl = 'https://api.wavesplatform.com';
        const exchange = symbolInfo.exchange;
        //const path = `${baseUrl}/candles/${amountId}/${priceId}`;
        const path = 'https://candles.orionprotocol.io/api/v1/candles';
        const fetchPath = exchange == 'all' ? `${path}?symbol=${symbolInfo.ticker}&timeStart=${from}&timeEnd=${to}&interval=${interval}` : `${path}?symbol=${symbolInfo.ticker}&timeStart=${from}&timeEnd=${to}&interval=${interval}&exchange=${exchange}`;
        return fetch(fetchPath).then((res) => res.json()).then((res) => res.candles);
    }

    static _normalizeInterval(interval) {
        const char = interval.charAt(interval.length - 1);
        const n = interval.substr(0, interval.length - 1);
        switch (char.toLowerCase()) {
            case 'd':
                return (n ? n : '1') + 'd';
            case 'w':
                return (n ? n : '1') + 'w';
            default:
                if (!isNaN(+interval) && +interval >= 60) {
                    return (+interval / 60).toFixed(0) + 'h';
                } else {
                    return interval + 'm';
                }

        }
    }

    static convertToMilliseconds(seconds) {
        return seconds * 1000;
    }

}
