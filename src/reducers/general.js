const element = document.querySelector("#chart-data");

const initialState = {
    symbol: "ETH-BTC",
    mode: "Light",
    symbolA: "ETH",
    symbolB: "BTC",
    lastPrice: 0,
    orderBook: null,
    high: 0,
    low: 0,
    vol: 0,
    change: 0,
    orderData: {}, // { amount: 0, price: 0, total: 0 }
    qtyForm: 0,
    sideForm: "buy",
    assets: [],
    tickers: {}
};

export default (state = initialState, { type, ...action }) => {
    let newSymbol = "";
    switch (type) {
        case "SetQtyForm":
            return { ...state, qtyForm: action.payload };
        case "SetSideForm":
            return { ...state, sideForm: action.payload };
        case "SetOrderData":
            return { ...state, orderData: action.payload };
        case "SetMode":
            element.dataset.mode = action.payload;
            localStorage.setItem("mode", action.payload);
            return { ...state, mode: action.payload };
        case "SetChange":
            return { ...state, change: action.payload };
        case "SetHigh":
            return { ...state, high: action.payload };
        case "SetLow":
            return { ...state, low: action.payload };
        case "SetVol":
            return { ...state, vol: action.payload };
        case "SetLastPrice":
            newSymbol = `${action.payload}-${state.symbolB}`;
            return {
                ...state,
                lastPrice: action.payload
            };
        case "SetSymbolA":
            newSymbol = `${action.payload}-${state.symbolB}`;
            element.dataset.symbol = newSymbol;
            return {
                ...state,
                symbolA: action.payload,
                symbol: newSymbol
            };
        case "SetSymbolB":
            newSymbol = `${state.symbolA}-${action.payload}`;
            element.dataset.symbol = newSymbol;
            return {
                ...state,
                symbolB: action.payload,
                symbol: newSymbol
            };
        case "SetSymbol":
            element.dataset.symbol = action.payload;
            return { ...state, symbol: action.payload };
        case "SetOrderBook":
            return { ...state, orderBook: action.payload };
        case "SetAssets":
            return { ...state, assets: action.payload };
        case "SetTickers":
            return { ...state, tickers: action.payload };
        default:
            return state;
    }
};
