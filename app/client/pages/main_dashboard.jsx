import React from "react";
import ReactDOM from "react-dom";
import { MomentJS } from "./../../service/MomentJS";
import OrderForm from "./../../client/components/OrderForm";
import Orders from "./../../client/components/Orders";
import Chart from "./../../client/components/Chart";
import OrderBook from "./../../client/components/OrderBook";
import { Modal } from "react-bootstrap";
import { Toastr } from "../../service/Toastr";

const FULL_HEIGHT = 430;
const urlBase = "https://demo.orionprotocol.io/backend";

class MainDashboard extends React.Component {
    constructor() {
        super();
        let height = window.innerHeight;
        let tableHeight = (height / 2 / 3).toFixed(0) + "px";
        console.log("TABLE HEIGHT " + tableHeight);
        this.state = {
            pairs: [],
            currentSymbol: "XRP-BTC",
            ws: null,
            data: {
                lastPrice: 0,
                lastPriceStyle: "#000",
                ask: 0,
                bid: 0
            },
            orders: [],
            currentPrice: "0",
            count: 1,
            customCount: false,
            total: 0,
            side: "buy",
            benefits: {
                binance: {},
                bittrex: {},
                poloniex: {}
            },
            binance: {
                lastPrice: 0,
                lastPriceStyle: "#000",
                ask: 0,
                bid: 0
            },
            bittrex: {
                lastPrice: 0,
                lastPriceStyle: "#000",
                ask: 0,
                bid: 0
            },
            poloniex: {
                lastPrice: 0,
                lastPriceStyle: "#000",
                ask: 0,
                bid: 0
            },
            loadChart: false,
            showModal: false,
            tableHeight: tableHeight,
            formHeight: FULL_HEIGHT,
            windowSize: {
                orderBookHeader: 39,
                lastPriceSize: 32,
                tableHeader: 25
            },
            modalDisplay: "none",
            marketType: "market"
        };
        this.loadAllPairs = this.loadAllPairs.bind(this);
        this.renderPairs = this.renderPairs.bind(this);
        this.loadSnapshot = this.loadSnapshot.bind(this);
        this.connect = this.connect.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.updateOrderBookData = this.updateOrderBookData.bind(this);
        this.handleNewExchangeData = this.handleNewExchangeData.bind(this);
        this.sortAsks = this.sortAsks.bind(this);
        this.sortBids = this.sortBids.bind(this);
        this.changeCurrentSymbol = this.changeCurrentSymbol.bind(this);
        this.calculateTotalBids = this.calculateTotalBids.bind(this);
        this.calculateTotalAsks = this.calculateTotalAsks.bind(this);
        this.calculatePercent = this.calculatePercent.bind(this);
        this.renderAsks = this.renderAsks.bind(this);
        this.renderBids = this.renderBids.bind(this);
        this.loadOrderHistory = this.loadOrderHistory.bind(this);
        this.handleJqeuryScroll = this.handleJqeuryScroll.bind(this);
        this.chooseOrderBookLine = this.chooseOrderBookLine.bind(this);
        this.loadOrderBooks = this.loadOrderBooks.bind(this);
        this.changeCurrentPrice = this.changeCurrentPrice.bind(this);
        this.changeCount = this.changeCount.bind(this);
        this.recalculateTotal = this.recalculateTotal.bind(this);
        this.loadBenefits = this.loadBenefits.bind(this);
        this.renderSize = this.renderSize.bind(this);
        this.setSide = this.setSide.bind(this);
        this.renderOrderbookExchange = this.renderOrderbookExchange.bind(this);
        this.showModal = this.showModal.bind(this);
        this.renderChart = this.renderChart.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.loadExchangeSnapshot = this.loadExchangeSnapshot.bind(this);
        this.changeMarketType = this.changeMarketType.bind(this);
    }

    setSide(side) {
        this.setState({ side: side }, () => {
            this.loadBenefits();
        });
    }

    showModal() {
        console.log("SHOW MODAL");
        this.setState({ modalDisplay: "block", showModal: true }, () => {
            setTimeout(() => {
                this.setState({ loadChart: true });
            }, 100);
        });
    }

    closeModal() {
        this.setState({
            modalDisplay: "none",
            showModal: false,
            loadChart: false
        });
    }

    changeCount(e) {
        if (e.target.value) {
            if (e.target.value >= 0) {
                this.setState(
                    { count: e.target.value, customCount: true },
                    () => {
                        this.recalculateTotal();
                        this.loadBenefits();
                    }
                );
            }
        } else {
            this.setState({ count: e.target.value, customCount: false }, () => {
                this.recalculateTotal();
                this.loadBenefits();
            });
        }
    }

    changeMarketType(type) {
        this.setState({ marketType: type });
    }

    componentDidMount() {
        this.loadAllPairs();
        const formHeight = document.getElementById("order-form").clientHeight;
        this.setState({
            formHeight: formHeight
        });
    }

    loadAllPairs() {
        let url = urlBase + "/api/v1/pairs/list";
        fetch(url, {
            credentials: "same-origin"
        })
            .then(results => {
                return results.json();
            })
            .then(data => {
                this.setState({ pairs: data, currentSymbol: data[0] }, () => {
                    this.loadBenefits();
                    this.connect();
                    this.loadOrderHistory(data[0]);
                    setInterval(() => {
                        this.loadOrderHistory(this.state.currentSymbol);
                    }, 2000);
                    //LOAD BINANCE
                    this.loadOrderBooks();
                });
            });
    }

    loadOrderBooks() {
        this.loadSnapshot(this.state.currentSymbol, 20);
        this.loadExchangeSnapshot(
            "BINANCE",
            this.state.currentSymbol,
            20,
            data => {
                this.setState({
                    binance: {
                        ...data,
                        ...{
                            lastPrice: 0,
                            lastPriceStyle: "#000"
                        }
                    }
                });
            }
        );
        this.loadExchangeSnapshot(
            "BITTREX",
            this.state.currentSymbol,
            20,
            data => {
                this.setState({
                    bittrex: {
                        ...data,
                        ...{
                            lastPrice: 0,
                            lastPriceStyle: "#000"
                        }
                    }
                });
            }
        );
        this.loadExchangeSnapshot(
            "POLONIEX",
            this.state.currentSymbol,
            20,
            data => {
                this.setState({
                    poloniex: {
                        ...data,
                        ...{
                            lastPrice: 0,
                            lastPriceStyle: "#000"
                        }
                    }
                });
            }
        );
    }

    loadBenefits() {
        let url =
            urlBase +
            "/api/v1/order-benefits?symbol={symbol}&ordQty={ordQty}&side={side}"
                .replace("{symbol}", this.state.currentSymbol)
                .replace("{ordQty}", this.state.count)
                .replace("{side}", this.state.side);
        fetch(url, {
            credentials: "same-origin"
        })
            .then(results => {
                return results.json();
            })
            .then(data => {
                //console.log("Benefits: ", data)
                this.setState({ benefits: data });
            });
    }

    loadOrderHistory(symbol) {
        let address = localStorage.getItem("address") || "";
        if (address) {
            let url =
                urlBase +
                "/api/v1/orderHistory?symbol=" +
                symbol +
                "&address=" +
                address;
            fetch(url, {
                credentials: "same-origin"
            })
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    this.setState({ orders: data });
                });
        }
    }

    loadSnapshot(symbol, depth) {
        if (symbol && depth) {
            let url =
                urlBase +
                "/api/v1/orderBook?symbol={SYMBOL}&depth={DEPTH}"
                    .replace("{SYMBOL}", symbol)
                    .replace("{DEPTH}", depth);
            fetch(url, {
                credentials: "same-origin"
            })
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    this.setState({
                        data: {
                            ...data,
                            lastPrice: 0,
                            lastPriceStyle: "#000",
                            ask: data.asks[data.asks.length - 1].price,
                            bid: data.bids[0].price
                        }
                    });
                });
        }
    }

    loadExchangeSnapshot(exchange, symbol, depth, callback) {
        if (symbol && depth) {
            let url =
                urlBase +
                "/api/v1/exchange/orderBook?symbol={SYMBOL}&depth={DEPTH}&exchange={EXCHANGE}"
                    .replace("{SYMBOL}", symbol)
                    .replace("{DEPTH}", depth)
                    .replace("{EXCHANGE}", exchange);
            fetch(url, {
                credentials: "same-origin"
            })
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    callback(data);
                });
        }
    }

    sortAsks(a, b) {
        if (a.price > b.price) {
            return 1;
        }
        if (a.price < b.price) {
            return -1;
        }
        return 0;
    }

    sortBids(a, b) {
        if (a.price > b.price) {
            return -1;
        }
        if (a.price < b.price) {
            return 1;
        }
        return 0;
    }

    renderPairs() {
        const pairs = this.state.pairs;
        let renderPairs = [];
        for (let i = 0; i < pairs.length; i++) {
            renderPairs.push(
                <tr
                    style={{
                        lineHeight: "20px",
                        fontSize: "12px",
                        cursor: "pointer"
                    }}
                    key={i}
                >
                    <td
                        onClick={() => {
                            this.changeCurrentSymbol(pairs[i]);
                        }}
                    >
                        {pairs[i]}
                    </td>
                </tr>
            );
        }
        return renderPairs;
    }

    changeCurrentSymbol(symbol) {
        this.setState({ currentSymbol: symbol }, () => {
            this.disconnect();
            this.connect();
            this.loadOrderHistory(symbol);
            this.loadBenefits();
            this.loadOrderBooks();
        });
    }

    calculateTotalBids(array) {
        for (let i = 0; i < array.length; i++) {
            if (i - 1 < 0) {
                array[i].total = array[i].price * array[i].size;
            } else {
                array[i].total =
                    array[i - 1].total + array[i].price * array[i].size;
            }
        }
        return array;
    }

    calculateTotalAsks(array) {
        for (let i = array.length - 1; i >= 0; i--) {
            if (i + 1 >= array.length) {
                array[i].total = array[i].price * array[i].size;
            } else {
                array[i].total =
                    array[i + 1].total + array[i].price * array[i].size;
            }
        }
        return array;
    }

    calculatePercent(max, value) {
        return (100 * value) / max;
    }

    chooseOrderBookLine(data, type) {
        if (type == "asks") {
            let price = data.price;
            let count = 0;
            let total = 0;
            let asks = this.state.data.asks;
            for (let i = 0; i < asks.length; i++) {
                if (asks[i].price <= price) {
                    count = count + asks[i].size;
                    total = total + asks[i].total;
                }
            }
            if (this.state.customCount) {
                this.setState({ currentPrice: price, total: total }, () => {
                    this.loadBenefits();
                });
            } else {
                this.setState(
                    { currentPrice: price, count: count, total: total },
                    () => {
                        this.loadBenefits();
                    }
                );
            }

            $("#buy-form-link").trigger("click");
            return;
        }
        if (type == "bids") {
            let price = data.price;
            this.setState({ currentPrice: price });
            $("#sell-form-link").trigger("click");
            let count = 0;
            let total = 0;
            let bids = this.state.data.bids;
            for (let i = 0; i < bids.length; i++) {
                if (bids[i].price >= price) {
                    count = count + bids[i].size;
                    total = total + bids[i].total;
                }
            }
            if (this.state.customCount) {
                this.setState({ currentPrice: price, total: total }, () => {
                    this.loadBenefits();
                });
            } else {
                this.setState(
                    { currentPrice: price, count: count, total: total },
                    () => {
                        this.loadBenefits();
                    }
                );
            }
            return;
        }
    }

    renderOrderbookExchange(modal, divExchanges) {
        if (!modal) {
            return (
                <td style={{ width: "19%" }}>
                    <div className="row" style={{ paddingLeft: "15px" }}>
                        {divExchanges}
                    </div>
                </td>
            );
        }
    }

    renderSize(data, exchange) {
        if (exchange == "binance" && data.dynamic != 0) {
            console.log("EXCHANGE " + exchange + " DYNAMIC " + data.dynamic);
        }
        let colorClassName = "exchange-size-default-color";
        if (!data.dynamic) {
            colorClassName = "exchange-size-default-color";
        } else {
            if (data.dynamic == 0) {
                colorClassName = "exchange-size-default-color";
            }
            if (data.dynamic == 1) {
                colorClassName = "exchange-size-increase-color";
            }
            if (data.dynamic == -1) {
                colorClassName = "exchange-size-decrease-color";
            }
        }
        data.dynamic = 0;
        return (
            <td className={colorClassName} style={{ width: "27%" }}>
                {data.size.toFixed(3)}
            </td>
        );
    }

    renderAsks(modal, exchange, data) {
        let renderData = [];
        let key = 0;
        if (data && data.asks && data.asks.length > 0) {
            let asks = data.asks;
            this.calculateTotalAsks(asks);
            const maxAsk = asks.reduce(function(prev, current) {
                return prev.total > current.total ? prev : current;
            });
            for (let i = 0; i < asks.length; i++, key++) {
                let exchanges = asks[i].exchanges || [];
                const percent = this.calculatePercent(
                    maxAsk.total,
                    asks[i].total
                ).toFixed(6);
                let percentStyle = percent + "%";
                let divExchanges = [];
                for (let j = 0; j < exchanges.length; j++) {
                    let imagePath = "img/exchanges/{exchange}.png".replace(
                        "{exchange}",
                        exchanges[j]
                    );
                    let key = exchange + "" + i + "" + j;
                    divExchanges.push(
                        <div
                            key={key}
                            className="col-xs-1"
                            style={{ paddingLeft: "1px" }}
                        >
                            <img
                                style={{ height: "15px", width: "15px" }}
                                src={imagePath}
                            />
                        </div>
                    );
                }
                renderData.push(
                    <tr
                        onClick={() => {
                            this.chooseOrderBookLine(asks[i], "asks");
                        }}
                        style={{ lineHeight: "20px" }}
                        key={key}
                    >
                        <td style={{ width: "27%" }}>
                            {asks[i].price.toFixed(8)}
                        </td>
                        {this.renderSize(asks[i], exchange)}
                        <td style={{ width: "27%" }}>
                            <div
                                style={{
                                    width: "100%",
                                    paddingTop: "1px",
                                    paddingBottom: "1px"
                                }}
                            >
                                <div
                                    style={{
                                        width: percentStyle,
                                        backgroundColor: "#FCECEC"
                                    }}
                                >
                                    {asks[i].total.toFixed(9)}
                                </div>
                            </div>
                        </td>
                        {this.renderOrderbookExchange(modal, divExchanges)}
                    </tr>
                );
            }
        }
        return renderData;
    }

    renderBids(modal, exchange, data) {
        let renderData = [];
        let key = 0;
        if (data && data.bids && data.bids.length > 0) {
            const bids = data.bids;
            this.calculateTotalBids(bids);
            const maxBid = bids.reduce(function(prev, current) {
                return prev.total > current.total ? prev : current;
            });
            for (let i = 0; i < bids.length; i++, key++) {
                let exchanges = bids[i].exchanges || [];
                const percent = this.calculatePercent(
                    maxBid.total,
                    bids[i].total
                ).toFixed(6);
                let percentStyle = percent + "%";
                let divExchanges = [];
                for (let j = 0; j < exchanges.length; j++) {
                    let imagePath = "img/exchanges/{exchange}.png".replace(
                        "{exchange}",
                        exchanges[j]
                    );
                    let key = i + "" + j;
                    divExchanges.push(
                        <div
                            key={key}
                            className="col-xs-1"
                            style={{ paddingLeft: "5px" }}
                        >
                            <img
                                style={{ height: "15px", width: "15px" }}
                                src={imagePath}
                            />
                        </div>
                    );
                }
                renderData.push(
                    <tr
                        onClick={() => {
                            this.chooseOrderBookLine(bids[i], "bids");
                        }}
                        style={{ lineHeight: "20px" }}
                        key={key}
                    >
                        <td style={{ width: "27%" }}>
                            {bids[i].price.toFixed(8)}
                        </td>
                        {this.renderSize(bids[i], exchange)}
                        <td style={{ width: "27%" }}>
                            <div
                                style={{
                                    width: "100%",
                                    paddingTop: "1px",
                                    paddingBottom: "1px"
                                }}
                            >
                                <div
                                    style={{
                                        width: percentStyle,
                                        backgroundColor: "#EEF2FD"
                                    }}
                                >
                                    {bids[i].total.toFixed(9)}
                                </div>
                            </div>
                        </td>
                        {this.renderOrderbookExchange(modal, divExchanges)}
                    </tr>
                );
            }
        }
        return renderData;
    }

    handleJqeuryScroll(asks, bids, scroll) {
        let enableScroll = $("body").attr(scroll);
        if (enableScroll == "true") {
            $(asks).scrollTop(1000);
            $(bids).scrollTop(0);
        }
    }

    handleNewExchangeData(data) {
        // console.log("AGGREGATED ASKS " + JSON.stringify(data.aggregatedAsks));
        // console.log("AGGREGATED BIDS " + JSON.stringify(data.aggregatedBids));

        // console.log("EXCHANGE ASKS " + JSON.stringify(data.exchangeAsks));
        // console.log("EXCHANGE BIDS " + JSON.stringify(data.exchangeBids));
        let aggregatedData = {
            asks: data.aggregatedAsks,
            bids: data.aggregatedBids
        };
        let exchangeData = {
            asks: data.exchangeAsks,
            bids: data.exchangeBids
        };
        try {
            this.updateOrderBookData(
                aggregatedData,
                "all",
                this.state.data,
                (asks, bids, maxBid, lastPriceStyle) => {
                    this.handleJqeuryScroll(
                        "#asks-general",
                        "#bids-general",
                        "orderbook-general"
                    );
                    this.handleJqeuryScroll(
                        "#modal-asks-general",
                        "#modal-bids-general",
                        "modal-orderbook-general"
                    );
                    this.setState({
                        data: {
                            asks: asks,
                            bids: bids,
                            lastPrice: maxBid.price,
                            lastPriceStyle: lastPriceStyle,
                            ask: this.state.data.asks[
                                this.state.data.asks.length - 1
                            ].price,
                            bid: this.state.data.bids[0].price
                        }
                    });
                }
            );
        } catch (e) {
            console.log(e);
        }
        if (this.state.showModal) {
            try {
                this.updateOrderBookData(
                    exchangeData,
                    "binance",
                    this.state.binance,
                    (asks, bids, maxBid, lastPriceStyle) => {
                        this.handleJqeuryScroll(
                            "#modal-asks-bnn",
                            "#modal-bids-bnn",
                            "modal-orderbook-binance"
                        );
                        this.setState({
                            binance: {
                                asks: asks,
                                bids: bids,
                                lastPrice: maxBid.price,
                                lastPriceStyle: lastPriceStyle,
                                ask: asks[asks.length - 1].price,
                                bid: bids[0].price
                            }
                        });
                    }
                );
            } catch (e) {
                console.log(e);
            }
        }
        if (this.state.showModal) {
            try {
                this.updateOrderBookData(
                    exchangeData,
                    "bittrex",
                    this.state.bittrex,
                    (asks, bids, maxBid, lastPriceStyle) => {
                        this.handleJqeuryScroll(
                            "#modal-asks-btr",
                            "#modal-bids-btr",
                            "modal-orderbook-bittrex"
                        );
                        this.setState({
                            bittrex: {
                                asks: asks,
                                bids: bids,
                                lastPrice: maxBid.price,
                                lastPriceStyle: lastPriceStyle,
                                ask: asks[asks.length - 1].price,
                                bid: bids[0].price
                            }
                        });
                    }
                );
            } catch (e) {
                console.log(e);
            }
        }
        if (this.state.showModal) {
            try {
                this.updateOrderBookData(
                    exchangeData,
                    "poloniex",
                    this.state.poloniex,
                    (asks, bids, maxBid, lastPriceStyle) => {
                        this.handleJqeuryScroll(
                            "#modal-asks-plnx",
                            "#modal-bids-plnx",
                            "modal-orderbook-poloniex"
                        );
                        this.setState({
                            poloniex: {
                                asks: asks,
                                bids: bids,
                                lastPrice: maxBid.price,
                                lastPriceStyle: lastPriceStyle,
                                ask: asks[asks.length - 1].price,
                                bid: bids[0].price
                            }
                        });
                    }
                );
            } catch (e) {
                console.log(e);
            }
        }
    }

    updateOrderBookData(data, exchange, stateData, callback) {
        const asks = data.asks;
        let stateAsks = stateData.asks;
        for (let i = 0; i < asks.length; i++) {
            let exchanges = asks[i].exchanges || [];
            if (exchange != "all") {
                let needExchange = false;
                for (let k = 0; k < exchanges.length; k++) {
                    if (exchanges[k] == exchange) {
                        needExchange = true;
                    }
                }
                if (!needExchange) {
                    continue;
                }
            }
            let updated = false;
            for (let j = 0; j < stateAsks.length; j++) {
                if (asks[i].price == stateAsks[j].price) {
                    if (parseFloat(asks[i].size) == 0) {
                        stateAsks.splice(j, 1);
                    } else {
                        stateAsks[j].dynamic = 0;
                        if (stateAsks[j].size > asks[i].size) {
                            stateAsks[j].dynamic = -1;
                        }
                        if (stateAsks[j].size < asks[i].size) {
                            stateAsks[j].dynamic = 1;
                        }
                        stateAsks[j].size = asks[i].size;
                    }
                    updated = true;
                    break;
                }
            }
            if (!updated && asks[i].size != 0) {
                asks[i].dynamic = 1;
                stateAsks.push(asks[i]);
            }
        }
        stateAsks = stateAsks.sort(this.sortAsks).slice(0, 20);
        stateAsks = stateAsks.sort(this.sortBids);
        const bids = data.bids;
        let stateBids = stateData.bids;
        for (let i = 0; i < bids.length; i++) {
            let exchanges = bids[i].exchanges || [];
            if (exchange != "all") {
                let needExchange = false;
                for (let k = 0; k < exchanges.length; k++) {
                    if (exchanges[k] == exchange) {
                        needExchange = true;
                    }
                }
                if (!needExchange) {
                    continue;
                }
            }
            let updated = false;
            for (let j = 0; j < stateBids.length; j++) {
                if (bids[i].price == stateBids[j].price) {
                    if (parseFloat(bids[i].size) == 0) {
                        stateBids.splice(j, 1);
                    } else {
                        stateBids[j].dynamic = 0;
                        if (stateBids[j].size > bids[i].size) {
                            stateBids[j].dynamic = -1;
                        }
                        if (stateBids[j].size < bids[i].size) {
                            stateBids[j].dynamic = 1;
                        }
                        stateBids[j].size = bids[i].size;
                    }
                    updated = true;
                    break;
                }
            }
            if (!updated && bids[i].size != 0) {
                bids[i].dynamic = 1;
                stateBids.push(bids[i]);
            }
        }
        const maxBid = stateBids.reduce(function(prev, current) {
            return prev.price > current.price ? prev : current;
        });
        stateBids = stateBids.sort(this.sortBids).slice(0, 20);
        let lastPriceStyle = "#e5494d";
        if (maxBid.price > data.lastPrice) {
            lastPriceStyle = "#2051d3";
        }
        callback(stateAsks, stateBids, maxBid, lastPriceStyle);
    }

    //TODO:on page close disconect
    connect() {
        let url = `wss://demo.orionprotocol.io/backend/{SYMBOL}`.replace(
            "{SYMBOL}",
            this.state.currentSymbol
        );

        // let url = `ws://demo.orionprotocol.io/{SYMBOL}`.replace(
        //     "{SYMBOL}",
        //     this.state.currentSymbol
        // );
        //let ws = new WebSocket(url);
        let ws = new window.WebsocketHeartbeatJs({
            url,
            pingTimeout: 5000, 
            pongTimeout: 5000,
        });
        this.setState({ ws });
        let handleNewData = this.handleNewExchangeData;
        ws.onmessage = function(data) {
            // console.log("new data, orderbook socket")
            handleNewData(JSON.parse(data.data));
        };
        
        console.log("Connected to " + url);
    }

    disconnect() {
        if (this.state.ws != null) {
            this.state.ws.close()
            this.setState({ ws: null });    
        }
        console.log("Disconnected");
    }

    changeCurrentPrice(e) {
        console.log("Change price")
        // if (e.target.value >= 0) {
        //     this.setState({ currentPrice: e.target.value }, () => {
        //         this.recalculateTotal();
        //     });
        // }
    }

    recalculateTotal() {
        console.log("Computing...")
        // let total = this.state.count * this.state.currentPrice;
        // this.setState({ total });
    }

    renderChart(
        id,
        exchange,
        height,
        symbol,
        showModal,
        loadChart,
        imageName,
        marginTop,
        isModal
    ) {
        return (
            <Chart
                symbol={symbol}
                height={height}
                id={id}
                modal={showModal}
                loadChart={loadChart}
                imageName={imageName}
                marginTop={marginTop}
                exchange={exchange}
                isModal={isModal}
            />
        );
    }

    render() {
        const windowHeight = window.innerHeight;
        const chartHeight = windowHeight * 0.5;
        const topHeight = windowHeight - this.state.formHeight;
        const ordBookHeight =
            (topHeight -
                this.state.windowSize.orderBookHeader -
                this.state.windowSize.lastPriceSize -
                this.state.windowSize.tableHeader) /
            2;
        const modalOrdBook = (windowHeight / 2) * 0.3;
        const showModal = this.state.showModal;
        return (
            <div
                style={{
                    fontWeight: 200
                }}
            >
                <div className="row customRow2" style={{marginTop: "2px", height: "57vh"}}>
                    <div1
                        id="pairs"
                        style={{
                            borderColor: "#edf0f4",
                            borderWidth: "2px",
                            borderStyle: "solid",
                            // height: topHeight,
                            height: "57vh",
                            backgroundColor: "#fff"
                        }}
                        className="col-md-2 col-xs-12"
                    >
                        <div
                            style={{
                                padding: "10px",
                                borderBottomColor: "#edf0f4",
                                borderBottomWidth: "1px",
                                borderBottomStyle: "solid"
                            }}
                        >
                            <div className="row">
                                <div
                                    className="col-xs-2 col-md-3"
                                    style={{padding: "0.3vw"}}
                                >
                                    <span
                                        style={{
                                            color: "#4e5c6e",
                                            fontSize: "13px"
                                        }}
                                    >
                                        WatchList
                                    </span>
                                </div>
                                <div className="col-xs-2 col-md-6 col-md-offset-1">
                                    <button
                                        style={{
                                            borderRadius: "25px",
                                            backgroundColor: "rgb(31, 90, 246)"
                                        }}
                                        className="btn btn-primary customBtn"
                                        onClick={this.showModal}
                                    >
                                        Aggregated
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <table style={{ width: "100%", color: "#263241", overflowY: "scroll", overflowX: "hidden" }}>
                                <tbody>{this.renderPairs()}</tbody>
                            </table>
                        </div>
                    </div1>
                    <div className="col-md-7 col-xs-12" style={{padding: "0 2px"}}>
                        <Chart
                            loadChart={true}
                            symbol={this.state.currentSymbol}
                            modal={false}
                            exchange="all"
                            isModal={false}
                            marginTop="0px"
                            // height="500"
                            id="general_chart"
                        />
                    </div>
                    <div
                        style={{
                            borderColor: "#edf0f4",
                            borderWidth: "2px",
                            borderStyle: "solid",
                            height: "57vh",
                            // height: "50%",
                            // height: {height},
                            backgroundColor: "#fff"
                        }}
                        className="col-md-3 col-xs-12"
                    >
                        <OrderBook
                            asks="asks-general"
                            bids="bids-general"
                            modal={false}
                            exchange="all"
                            alignId="orderbook-general"
                            imageWidth="80px"
                            exchangeImage="all.svg"
                            generalHeight={ordBookHeight}
                            currentSymbol={this.state.currentSymbol}
                            renderAsks={this.renderAsks}
                            renderBids={this.renderBids}
                            data={this.state.data}
                            lastPriceStyle={this.state.data.lastPriceStyle}
                            lastPrice={this.state.data.lastPrice}
                        />
                    </div>
                </div>
                <div
                    className="row customRow2"
                    style={{ marginTop: "3px" }}
                >
                    <div
                        id="orders2"
                        className="col-md-9 col-xs-12"

                    >
                        <Orders orders={this.state.orders} />
                    </div>
                    <div
                        id="order-form"
                        className="col-md-3 col-xs-12"
                        style={{ padding: "0px", margin: "0px",marginLeft: "2px" }}
                    >
                        <OrderForm
                            ref={orderForm => (this.orderForm = orderForm)}
                            changeCount={this.changeCount}
                            changeCurrentPrice={this.changeCurrentPrice}
                            benefits={this.state.benefits}
                            setSide={this.setSide}
                            count={this.state.count}
                            customCount={this.state.customCount}
                            currentPrice={this.state.currentPrice}
                            total={this.state.total}
                            loadOrderHistory={this.loadOrderHistory}
                            pair={this.state.currentSymbol}
                            ask={this.state.data.ask}
                            bid={this.state.data.bid}
                            last={this.state.data.lastPrice}
                            side={this.state.side}
                            marketType={this.state.marketType}
                            loadBenefits={this.loadBenefits}
                            changeMarketType={this.changeMarketType}
                        />
                    </div>
                </div>
                <div
                    id="exchangeModal"
                    className="modal"
                    style={{ display: this.state.modalDisplay }}
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <span onClick={this.closeModal} className="close">
                                &times;
                            </span>
                            <h2>Modal Header</h2>
                        </div>
                        <div className="modal-body">
                            <div style={{ backgroundColor: "#fff" }}>
                                <div>
                                    <div
                                        className="row row-eq-height"
                                        style={{ height: chartHeight }}
                                    >
                                        <div className="col-md-8">
                                            <div
                                                style={{
                                                    float: "left",
                                                    width: "50%"
                                                }}
                                            >
                                                {this.renderChart(
                                                    "first_chart",
                                                    "all",
                                                    chartHeight,
                                                    this.state.currentSymbol,
                                                    showModal,
                                                    this.state.loadChart,
                                                    "all.svg",
                                                    "0px",
                                                    true
                                                )}
                                            </div>
                                            <div
                                                style={{
                                                    float: "left",
                                                    width: "50%"
                                                }}
                                            >
                                                {this.renderChart(
                                                    "second_chart",
                                                    "bittrex",
                                                    chartHeight,
                                                    this.state.currentSymbol,
                                                    showModal,
                                                    this.state.loadChart,
                                                    "bittrex.jpg",
                                                    "0px",
                                                    true
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="row">
                                                <div
                                                    className="col-md-6"
                                                    style={{
                                                        borderColor: "#edf0f4",
                                                        borderWidth: "2px",
                                                        borderStyle: "solid",
                                                        height: "50%",
                                                        // height: {height},
                                                        backgroundColor: "#fff"
                                                    }}
                                                >
                                                    <OrderBook
                                                        asks="modal-asks-general"
                                                        bids="modal-bids-general"
                                                        modal={true}
                                                        exchange="all"
                                                        exchangeImage="all.svg"
                                                        alignId="modal-orderbook-general"
                                                        currentSymbol={
                                                            this.state
                                                                .currentSymbol
                                                        }
                                                        data={this.state.data}
                                                        modalOrdBook={
                                                            ordBookHeight
                                                        }
                                                        renderAsks={
                                                            this.renderAsks
                                                        }
                                                        renderBids={
                                                            this.renderBids
                                                        }
                                                        lastPriceStyle={
                                                            this.state.data
                                                                .lastPriceStyle
                                                        }
                                                        lastPrice={
                                                            this.state.data
                                                                .lastPrice
                                                        }
                                                    />
                                                </div>
                                                <div
                                                    className="col-md-6"
                                                    style={{
                                                        borderColor: "#edf0f4",
                                                        borderWidth: "2px",
                                                        borderStyle: "solid",
                                                        height: "50%",
                                                        // height: {height},
                                                        backgroundColor: "#fff"
                                                    }}
                                                >
                                                    <OrderBook
                                                        asks="modal-asks-btr"
                                                        bids="modal-bids-btr"
                                                        modal={true}
                                                        exchange="bittrex"
                                                        exchangeImage="bittrex.jpg"
                                                        alignId="modal-orderbook-bittrex"
                                                        currentSymbol={
                                                            this.state
                                                                .currentSymbol
                                                        }
                                                        data={
                                                            this.state.bittrex
                                                        }
                                                        modalOrdBook={
                                                            ordBookHeight
                                                        }
                                                        renderAsks={
                                                            this.renderAsks
                                                        }
                                                        renderBids={
                                                            this.renderBids
                                                        }
                                                        lastPriceStyle={
                                                            this.state.bittrex
                                                                .lastPriceStyle
                                                        }
                                                        lastPrice={
                                                            this.state.bittrex
                                                                .lastPrice
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row row-eq-height">
                                        <div className="col-md-8">
                                            <div
                                                style={{
                                                    float: "left",
                                                    width: "50%"
                                                }}
                                            >
                                                {this.renderChart(
                                                    "third_chart",
                                                    "binance",
                                                    chartHeight,
                                                    this.state.currentSymbol,
                                                    showModal,
                                                    this.state.loadChart,
                                                    "binance.svg",
                                                    "10px",
                                                    true
                                                )}
                                            </div>
                                            <div
                                                style={{
                                                    float: "left",
                                                    width: "50%"
                                                }}
                                            >
                                                {this.renderChart(
                                                    "fourth_chart",
                                                    "poloniex",
                                                    chartHeight,
                                                    this.state.currentSymbol,
                                                    showModal,
                                                    this.state.loadChart,
                                                    "poloniex.png",
                                                    "10px",
                                                    true
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="row">
                                                <div
                                                    className="col-md-6"
                                                    style={{
                                                        borderColor: "#edf0f4",
                                                        borderWidth: "2px",
                                                        borderStyle: "solid",
                                                        height: "50%",
                                                        // height: {height},
                                                        backgroundColor: "#fff"
                                                    }}
                                                >
                                                    <OrderBook
                                                        asks="modal-asks-bnn"
                                                        bids="modal-bids-bnn"
                                                        currentSymbol={
                                                            this.state
                                                                .currentSymbol
                                                        }
                                                        modal={true}
                                                        exchange="binance"
                                                        exchangeImage="binance.svg"
                                                        alignId="modal-orderbook-binance"
                                                        data={
                                                            this.state.binance
                                                        }
                                                        modalOrdBook={
                                                            ordBookHeight
                                                        }
                                                        renderAsks={
                                                            this.renderAsks
                                                        }
                                                        renderBids={
                                                            this.renderBids
                                                        }
                                                        lastPriceStyle={
                                                            this.state.binance
                                                                .lastPriceStyle
                                                        }
                                                        lastPrice={
                                                            this.state.binance
                                                                .lastPrice
                                                        }
                                                    />
                                                </div>
                                                <div
                                                    className="col-md-6"
                                                    style={{
                                                        borderColor: "#edf0f4",
                                                        borderWidth: "2px",
                                                        borderStyle: "solid",
                                                        height: "50%",
                                                        // height: {height},
                                                        backgroundColor: "#fff"
                                                    }}
                                                >
                                                    <OrderBook
                                                        asks="modal-asks-plnx"
                                                        bids="modal-bids-plnx"
                                                        currentSymbol={
                                                            this.state
                                                                .currentSymbol
                                                        }
                                                        modal={true}
                                                        exchange="poloniex"
                                                        exchangeImage="poloniex.png"
                                                        alignId="modal-orderbook-poloniex"
                                                        data={
                                                            this.state.poloniex
                                                        }
                                                        modalOrdBook={
                                                            ordBookHeight
                                                        }
                                                        renderAsks={
                                                            this.renderAsks
                                                        }
                                                        renderBids={
                                                            this.renderBids
                                                        }
                                                        lastPriceStyle={
                                                            this.state.poloniex
                                                                .lastPriceStyle
                                                        }
                                                        lastPrice={
                                                            this.state.poloniex
                                                                .lastPrice
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default MainDashboard;
