import React from "react";
import ReactDOM from "react-dom";
import { MomentJS } from "./../../service/MomentJS";
import { Toastr } from "./../../service/Toastr";
import { WavesOrder } from "./../../service/WavesOrder";
const wc = require("@waves/waves-crypto");

const urlBase = "https://demo.orionprotocol.io/backend";

class OrderForm extends React.Component {
    constructor() {
        super();
        this.state = {
            buy: {},
            sell: {},
            firstSymbol: "",
            secondSymbol: "",
            symbol: "",
            ask: "0",
            bid: "0",
            last: "0",
            totalPrice: 0.0000000001,
            orderType: "buy",
            active: [],
            balances: {},
            count: 0,
            available: 0
        };
        this.clickAsk = this.clickAsk.bind(this);
        this.clickBid = this.clickBid.bind(this);
        this.clickLast = this.clickLast.bind(this);
        this.postOrder = this.postOrder.bind(this);
        this.renderBenefits = this.renderBenefits.bind(this);
        this.renderPrice = this.renderPrice.bind(this);
        this.renderButtons = this.renderButtons.bind(this);
        this.loadTotalCost = this.loadTotalCost.bind(this);
        this.scheduleTotalCost = this.scheduleTotalCost.bind(this);
    }

    componentDidMount() {
        this.setState({
            currentPrice: this.props.ask,
            ask: this.props.ask,
            bid: this.props.bid,
            last: this.props.last
        });
        this.loadTotalCost();
        this.scheduleTotalCost();
        this.getBalances();

        let e = {
            target: { value: 0 }
        };
        this.props.changeCount(e);
    }

    componentWillReceiveProps = props => {

        if (props.count) {
            let count = props.count;
            if (!props.customCount) {
                count = parseFloat(this.props.count).toFixed(8);
            }
            this.setState({
                count
            });
        }

        if (props.pair) {
            let { pair } = props;
            let firstSymbol = "";
            let secondSymbol = "";
            let pairs = pair.split("-");
            firstSymbol = pairs[0];
            secondSymbol = pairs[1];

            // if(props.pair !== this.props.pair ){
            //     let e = {
            //         target: { value: 0 }
            //     };
            //     this.props.changeCount(e);
            //     console.log("Cambio de par");

            // }

            this.setState({
                firstSymbol,
                secondSymbol
            });

            let available = 0;
            if ( this.state.orderType === "buy" ) {

                if (this.state.balances[secondSymbol])
                    available = this.state.balances[secondSymbol];
                this.setState({ symbol: secondSymbol, available });
            } else if ( this.state.orderType === "sell" ) {
                if (this.state.balances[firstSymbol])
                    available = this.state.balances[firstSymbol];
                this.setState({ symbol: firstSymbol, available });
            }
        }
    };

    getBalances = _ => {
        let seed = localStorage.getItem("seed") || "";
        let address = wc.address(seed, "T");
        if (address) {
            // let url = `${window.location.hostname}`
            let url = `https://demo.orionprotocol.io:2083/api/balance/${address}`;
            fetch(url, {
                credentials: "same-origin"
            })
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    this.setState({ balances: data });
                })
                .catch(e => {
                    console.log(e);
                });
        }
    };

    clickAsk(value) {
        this.props.changeCurrentPrice(value);
    }

    clickBid(value) {
        this.props.changeCurrentPrice(value);
    }

    clickLast(value) {
        this.props.changeCurrentPrice(value);
    }

    postOrder(symbol, side) {
        console.log("POST " + this.props.count);
        if (!this.props.count || this.props.count == 0) {
            Toastr.showError("Amount is empty");
            return;
        }
        let address = localStorage.getItem("address") || "";
        if (!address) {
            Toastr.showError("Please set your address in settings");
            return;
        }
        let price = this.props.currentPrice;
        if (this.props.marketType == "market") {
            price =
                side === "buy"
                    ? Number(this.state.totalPrice * (1.01).toFixed(8))
                    : Number(this.state.totalPrice * (0.99).toFixed(8));
        }

        if (this.props.marketType == "limit") {
            if (!this.props.currentPrice || this.props.currentPrice == 0) {
                Toastr.showError("Price is empty");
                return;
            }
        }

        let seed = localStorage.getItem("seed") || "";
        const wavesOrder = WavesOrder.toWavesOrder(
            symbol,
            side,
            price,
            this.props.count,
            seed
        );
        //console.log(WavesOrder.orionUrl);
        fetch(`${WavesOrder.orionUrl}/api/order`, {
            credentials: "same-origin",
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(wavesOrder)
        })
            .then(results => {
                return results.json();
            })
            .then(data => {
                if (data.code && data.code == "1010") {
                    Toastr.showError(
                        "No brokers were found to execute your order"
                    );
                    return;
                } else if (data.code && data.code == "1000") {
                    Toastr.showError("Not enough tradable balance.");
                    return;
                } else {
                    Toastr.showSuccess("Order has been created");
                    this.props.loadOrderHistory(this.props.pair);
                }
            });
    }

    scheduleTotalCost() {
        let loadTotalCost = this.loadTotalCost;
        setInterval(function() {
            loadTotalCost();
        }, 1000);
    }

    loadTotalCost() {
        if (this.props.marketType == "market" && this.props.count > 0) {
            let url =
                urlBase +
                "/api/v1/order-route" +
                "?symbol={symbol}&ordQty={ordQty}&side={side}"
                    .replace("{symbol}", this.props.pair)
                    .replace("{ordQty}", this.props.count)
                    .replace("{side}", this.props.side);
            fetch(url, {
                credentials: "same-origin"
            })
                .then(results => {
                    return results.json();
                })
                .then(data => {

                    this.setState({
                        totalPrice: data.totalPrice,
                        totalCost: data.totalCost
                    });
                    this.props.loadBenefits();
                });
        }
    }

    renderBenefits(benefit) {
        let rendered = (
            <div style={{ minHeight: "50px", maxHeight: "50px" }}>
                <div>+ {benefit.benefitPct}%</div>
                <div>+ {benefit.benefitBtc} BTC</div>
            </div>
        );
        return rendered;
    }

    renderPrice(currentPrice, secondSymbol, ask, bid, lastPrice) {
        if (this.props.marketType == "limit") {
            return (
                <div className="orderform-input-container">
                    <div className="row">
                        <div className="col-md-1" style={{ padding: "0px" }}>
                            <span className="orderform-label">Price</span>
                        </div>
                        <div className="col-md-offset-6 col-xs-1">
                            <span
                                onClick={() => {
                                    this.clickAsk(ask);
                                }}
                                className="orderform-pointer orderform-label"
                            >
                                Ask
                            </span>
                        </div>
                        <div className="col-xs-1">
                            <span
                                onClick={() => {
                                    this.clickBid(bid);
                                }}
                                className="orderform-pointer orderform-label"
                            >
                                Bid
                            </span>
                        </div>
                        <div className="col-xs-1">
                            <span
                                onClick={() => {
                                    this.clickLast(lastPrice);
                                }}
                                className="orderform-pointer orderform-label"
                            >
                                Last
                            </span>
                        </div>
                    </div>
                    <div className="row orderform-content-container">
                        <div className="col-xs-6">
                            <input
                                type="number"
                                name="price"
                                id="price"
                                tabIndex="1"
                                className="orderform-input"
                                value={currentPrice}
                                onChange={this.props.changeCurrentPrice}
                                placeholder="0"
                            />
                        </div>
                        <div className="col-xs-6 orderform-input-symbol-container">
                            {secondSymbol}
                        </div>
                    </div>
                </div>
            );
        }
    }

    renderButtons(firstSymbol, pair) {
        let marginTop = "20px";
        if (this.props.marketType == "market") {
            marginTop = "0px";
        }
        return (
            <div>
                <div
                    id="buy-form"
                    className="orderform-input-container"
                    style={{ marginTop: marginTop }}
                >
                    <div className="row">
                        <div className="col-md-12" style={{ padding: "0 16px;", marginTop: "12px" }}>
                            <button
                                onClick={() => {
                                    this.postOrder(pair, "buy");
                                }}
                                type="button"
                                className="btn btn-primary orderform-button orderform-button-buy"
                            >
                                Buy {firstSymbol}
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    id="sell-form"
                    className="orderform-input-container"
                    style={{ marginTop: marginTop, display: "none" }}
                >
                    <div className="row">
                        <div className="col-md-12" style={{ padding: "0 16px;", marginTop: "12px"  }}>
                            <button
                                onClick={() => {
                                    this.postOrder(pair, "sell");
                                }}
                                type="button"
                                className="btn btn-primary orderform-button orderform-button-sell"
                            >
                                Sell {firstSymbol}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleClick = (id, firstSymbol, symbol) => {

        let active = [];
        active[id] = true;
        this.setState({ active });
        let amount = 0;
        switch (id) {
            case 0:
                amount = this.state.available * 0.25;
                break;
            case 1:
                amount = this.state.available * 0.5;
                break;
            case 2:
                amount = this.state.available * 0.75;
                break;
            case 3:
                amount = this.state.available;
                break;
            default:
                break;
        }

        setTimeout(() => {
            if(firstSymbol !== symbol){
                //console.log(amount)
                amount = amount / this.state.totalPrice;
                amount = amount.toFixed(8);
                //console.log(amount, this.state.totalPrice)
            }
            let e = {
                target: { value: amount }
            };
            this.props.changeCount(e);
        }, 500);

    };

    handleChangeType = type => {
        // console.log(type);
        this.setState({ active: [] });
        let e = {
            target: { value: "0" }
        };
        //console.log(e);
        this.props.changeCount(e);
    };

    handleChange = e => {
        let newState = this.state;
        newState[e.target.id] = e.target.value;
        this.setState(newState)
    }

    render() {
        let pair = this.props.pair;
        let firstSymbol = "";
        let secondSymbol = "";
        if (pair) {
            let pairs = pair.split("-");
            firstSymbol = pairs[0];
            secondSymbol = pairs[1];
        }

        //console.log(this.state.firstSymbol, this.state.secondSymbol);
        let lastPrice = this.props.last;
        let ask = this.props.ask;
        let bid = this.props.bid;

        let { count } = this.state;

        let currentPrice = this.props.currentPrice;
        let total = this.props.total.toFixed(8);
        if (this.props.marketType == "market") {
            total = this.state.totalCost;
        }


        let benefits = this.props.benefits;

        let available = 0;
        let symbol = "";

        if (this.state.orderType === "buy") symbol = secondSymbol;
        else symbol = firstSymbol;

        if (this.state.balances[symbol])
            available = this.state.balances[symbol];

        //console.log(this.state.symbol, this.state.available);

        return (
            <div className="row">
                <div className="col-md-6 orderform">
                    <div className="custom-panel panel-default orderform-panel custom-panel2">
                        <div
                            className="panel-heading"
                            style={{ padding: "0px" }}
                        >
                            <div
                                id="buy-header"
                                className="col-xs-6 orderform-header orderform-buy-active"
                            >
                                <a
                                    onClick={() => {
                                        this.props.setSide("buy");
                                        this.setState({ orderType: "buy" });
                                        this.handleChangeType("buy");
                                    }}
                                    href="#"
                                    id="buy-form-link"
                                >
                                    BUY
                                </a>
                            </div>
                            <div
                                id="sell-header"
                                className="col-xs-6 orderform-header"
                            >
                                <a
                                    onClick={() => {
                                        this.props.setSide("sell");
                                        this.setState({ orderType: "sell" });
                                        this.handleChangeType("sell");
                                    }}
                                    href="#"
                                    id="sell-form-link"
                                >
                                    SELL
                                </a>
                            </div>
                        </div>
                        <div className="orderform-container">
                            <div className="row" >
                                <div className="col-lg-12">
                                    <div style={{ display: "block" }}>
                                        <div style={{ marginTop: "5px" }}>
                                            <div className="row">
                                                <div
                                                    className="col-xs-6"
                                                    style={{ padding: "0px" }}
                                                >
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            onChange={() => {
                                                                this.props.changeMarketType(
                                                                    "market"
                                                                );
                                                            }}
                                                            name="inlineRadioOptions"
                                                            id="inlineRadio1"
                                                            checked={
                                                                this.props
                                                                    .marketType ===
                                                                "market"
                                                            }
                                                            value="option1"
                                                        />
                                                        <label
                                                            style={{
                                                                marginLeft:
                                                                    "10px"
                                                            }}
                                                            className="form-check-label"
                                                            htmlFor="inlineRadio1"
                                                        >
                                                            Market
                                                        </label>
                                                    </div>
                                                </div>
                                                <div
                                                    className="col-xs-6"
                                                    style={{ padding: "0px" }}
                                                >
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            onChange={() => {
                                                                this.props.changeMarketType(
                                                                    "limit"
                                                                );
                                                            }}
                                                            name="inlineRadioOptions"
                                                            id="inlineRadio2"
                                                            checked={
                                                                this.props
                                                                    .marketType ===
                                                                "limit"
                                                            }
                                                            value="option2"
                                                        />
                                                        <label
                                                            style={{
                                                                marginLeft:
                                                                    "10px"
                                                            }}
                                                            className="form-check-label"
                                                            htmlFor="inlineRadio2"
                                                        >
                                                            Limit order
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="row">
                                            <div
                                                className="col-md-12"
                                                style={{ padding: "0px" }}
                                            >
                                                <span className="orderform-label">
                                                    Amount
                                                </span>
                                            </div>
                                        </div>
                                        <div className="row orderform-content-container">
                                            <div className="col-xs-6">
                                                <input
                                                    type="number"
                                                    name="count"
                                                    id="count"
                                                    tabIndex="1"
                                                    className="orderform-input"
                                                    value={count}
                                                    onChange={ e => {
                                                        this.handleChange(e)
                                                        this.props.changeCount(e)
                                                    }}
                                                    placeholder="0"
                                                />
                                            </div>
                                            <div
                                                className="col-xs-6 orderform-input-symbol-container"
                                                onClick={_ =>
                                                    this.handleClick(3)
                                                }
                                            >
                                                {firstSymbol}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div
                                                className="col-md-6 col-xs-6"
                                                style={{ padding: "0px" }}
                                            >
                                                <span className="orderform-label">
                                                    Available
                                                </span>
                                            </div>
                                            <div
                                                className="col-md-6 col-xs-6 text-right"
                                                style={{ padding: "0px" }}
                                            >
                                                <span className="">
                                                    {available + " " + symbol}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {this.renderPrice(
                                        currentPrice,
                                        secondSymbol,
                                        ask,
                                        bid,
                                        lastPrice
                                    )}
                                    <div className="orderform-input-container">
                                        <div className="row button-container">
                                            <div
                                                className="col-md-3 col-xs-3"
                                                style={{ padding: "0px" }}
                                            >
                                                <button
                                                    onClick={_ =>
                                                        this.handleClick(0, firstSymbol, symbol)
                                                    }
                                                    className={
                                                        typeof this.state
                                                            .active[0] !==
                                                        "undefined"
                                                            ? "active"
                                                            : null
                                                    }
                                                >
                                                    25%
                                                </button>
                                            </div>
                                            <div
                                                className="col-md-3 col-xs-3"
                                                style={{ padding: "0px" }}
                                            >
                                                <button
                                                    onClick={_ =>
                                                        this.handleClick(1, firstSymbol, symbol)
                                                    }
                                                    className={
                                                        typeof this.state
                                                            .active[1] !==
                                                        "undefined"
                                                            ? "active"
                                                            : null
                                                    }
                                                >
                                                    50%
                                                </button>
                                            </div>
                                            <div
                                                className="col-md-3 col-xs-3"
                                                style={{ padding: "0px" }}
                                            >
                                                <button
                                                    onClick={_ =>
                                                        this.handleClick(2, firstSymbol, symbol)
                                                    }
                                                    className={
                                                        typeof this.state
                                                            .active[2] !==
                                                        "undefined"
                                                            ? "active"
                                                            : null
                                                    }
                                                >
                                                    75%
                                                </button>
                                            </div>
                                            <div
                                                className="col-md-3 col-xs-3"
                                                style={{ padding: "0px" }}
                                            >
                                                <button
                                                    onClick={_ =>
                                                        this.handleClick(3, firstSymbol, symbol)
                                                    }
                                                    className={
                                                        typeof this.state
                                                            .active[3] !==
                                                        "undefined"
                                                            ? "active"
                                                            : null
                                                    }
                                                >
                                                    100%
                                                </button>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div
                                                className="col-md-12"
                                                style={{ padding: "0px" }}
                                            >
                                                <span className="orderform-label">
                                                    Total
                                                </span>
                                            </div>
                                        </div>
                                        <div className="row orderform-content-container">
                                            <div className="col-xs-6">
                                                <input
                                                    type="number"
                                                    name="total"
                                                    id="amount"
                                                    tabIndex="1"
                                                    className="orderform-input"
                                                    value={total}
                                                    placeholder="0"
                                                />
                                            </div>
                                            <div className="col-xs-6 orderform-input-symbol-container">
                                                {secondSymbol}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {this.renderButtons(firstSymbol, pair)}

                                <div style={{ padding: "5px" }}>
                                    <div
                                        className="row"
                                        style={{ fontSize: "11px" }}
                                    >
                                        <div
                                            className="col-xs-4"
                                            style={{
                                                padding: "0px",
                                                textAlign: "center",
                                                marginTop: "15px",
                                                borderRight:
                                                    "2px solid rgb(237, 240, 244)"
                                            }}
                                        >
                                            <div
                                                style={{
                                                    borderBottom:
                                                        "2px solid rgb(237, 240, 244)"
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        color:
                                                            "rgb(240, 185, 11)",
                                                        fontWeight: "bold"
                                                    }}
                                                >
                                                    BINANCE
                                                </span>
                                            </div>
                                            <div
                                                style={{
                                                    color: "#41c300",
                                                    fontSize: "10px"
                                                }}
                                            >
                                                {this.renderBenefits(
                                                    benefits.binance
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className="col-xs-4"
                                            style={{
                                                padding: "0px",
                                                textAlign: "center",
                                                marginTop: "15px",
                                                borderRight:
                                                    "2px solid rgb(237, 240, 244)"
                                            }}
                                        >
                                            <div
                                                style={{
                                                    borderBottom:
                                                        "2px solid rgb(237, 240, 244)"
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        color: "#0a6970",
                                                        fontWeight: "bold"
                                                    }}
                                                >
                                                    POLONIEX
                                                </span>
                                            </div>
                                            <div
                                                style={{
                                                    color: "#41c300",
                                                    fontSize: "10px"
                                                }}
                                            >
                                                {this.renderBenefits(
                                                    benefits.poloniex
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className="col-xs-4"
                                            style={{
                                                padding: "0px",
                                                textAlign: "center",
                                                marginTop: "15px"
                                            }}
                                        >
                                            <div
                                                style={{
                                                    borderBottom:
                                                        "2px solid rgb(237, 240, 244)"
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        color: "#0084d4",
                                                        fontWeight: "bold"
                                                    }}
                                                >
                                                    BITTREX
                                                </span>
                                            </div>
                                            <div
                                                style={{
                                                    color: "#41c300",
                                                    fontSize: "10px"
                                                }}
                                            >
                                                {this.renderBenefits(
                                                    benefits.bittrex
                                                )}
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

export default OrderForm;
