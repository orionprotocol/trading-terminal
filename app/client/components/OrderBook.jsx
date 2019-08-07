import React from "react";
import ReactDOM from "react-dom";

class OrderBook extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.renderExchangeColumn = this.renderExchangeColumn.bind(this);
        this.renderHeight = this.renderHeight.bind(this);
        this.renderOrderBookHeader = this.renderOrderBookHeader.bind(this);
    }

    componentDidMount() {
        const alignId = this.props.alignId;

        $("body").attr(alignId, "true");
        // BINANCE GENERAL
        $("#" + this.props.asks).on("scroll", function() {
            $("body").attr(alignId, "false");
        });
        $("#" + this.props.bids).on("scroll", function() {
            $("body").attr(alignId, "false");
        });

        $("#" + alignId).on("click", function() {
            $("body").attr(alignId, "true");
            $("#" + this.props.asks).scrollTop(1000);
            $("#" + this.props.bids).scrollTop(0);
        });
    }

    renderExchangeColumn() {
        if (!this.props.modal) {
            return (
                <td
                    style={{ borderBottom: " 1px solid #edf0f4", width: "19%" }}
                >
                    Exchange
                </td>
            );
        }
    }

    renderHeight() {
        if (this.props.modalOrdBook) {
            return {
                overflowY: "scroll",
                overflowX: "hidden",
                height: this.props.modalOrdBook
            };
        } else {
            return {
                overflowY: "scroll",
                overflowX: "hidden",
                height: this.props.generalHeight
            };
        }
    }

    renderOrderBookHeader() {
        const alignId = this.props.alignId;
        const headerSize = this.props.modal ? "11px" : "13px";
        if (this.props.modal) {
            // let imagePath = "/resources/img/orderbook/{exchangeImage}".replace("{exchangeImage}", this.props.exchangeImage);
            let imagePath = "img/orderbook/{exchangeImage}".replace(
                "{exchangeImage}",
                this.props.exchangeImage
            );
            return (
                <div className="row" style={{ padding: "10px" }}>
                    <div className="col-md-10">
                        <img style={{ width: "80px" }} src={imagePath} />
                    </div>
                    <div className="col-md-2">
                        <span
                            id={alignId}
                            style={{ color: "#4e5c6e", cursor: "pointer" }}
                            className="glyphicon glyphicon glyphicon-sort"
                            aria-hidden="true"
                        />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="row" style={{ padding: "10px" }}>
                    <div className="col-md-10">
                        <span
                            style={{
                                color: "#4e5c6e",
                                fontSize: headerSize
                            }}
                        >
                            Aggregated OrderBook / {this.props.currentSymbol}
                        </span>
                    </div>
                    <div className="col-md-2">
                        <span
                            id={alignId}
                            style={{ color: "#4e5c6e", cursor: "pointer" }}
                            className="glyphicon glyphicon glyphicon-sort"
                            aria-hidden="true"
                        />
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                {this.renderOrderBookHeader()}
                <div
                    style={{
                        borderBottomColor: "#edf0f4",
                        borderBottomWidth: "1px",
                        borderBottomStyle: "solid"
                    }}
                />
                <div>
                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse"
                        }}
                    >
                        <thead>
                            <tr
                                style={{
                                    color: "#7f8fa4",
                                    fontSize: "11px",
                                    lineHeight: "25px"
                                }}
                            >
                                <td
                                    style={{
                                        borderBottom: " 1px solid #edf0f4",
                                        width: "27%"
                                    }}
                                >
                                    Price
                                </td>
                                <td
                                    style={{
                                        borderBottom: " 1px solid #edf0f4",
                                        width: "27%"
                                    }}
                                >
                                    Amount
                                </td>
                                <td
                                    style={{
                                        borderBottom: " 1px solid #edf0f4",
                                        width: "27%"
                                    }}
                                >
                                    Total
                                </td>
                                {this.renderExchangeColumn()}
                            </tr>
                        </thead>
                    </table>
                </div>
                <div id={this.props.asks} style={this.renderHeight()}>
                    <table
                        className="orderbook-rows"
                        style={{
                            width: "100%"
                        }}
                    >
                        <tbody style={{ fontSize: "11px", color: "#263241" }}>
                            {this.props.renderAsks(
                                this.props.modal,
                                this.props.exchange,
                                this.props.data
                            )}
                        </tbody>
                    </table>
                </div>
                <div
                    style={{
                        padding: "7px",
                        fontSize: "11px",
                        borderBottomColor: "#edf0f4",
                        borderBottomWidth: "1px",
                        borderBottomStyle: "solid",
                        borderTopColor: "#edf0f4",
                        borderTopWidth: "1px",
                        borderTopStyle: "solid",
                        marginTop: "8px"
                    }}
                >
                    <span style={{ color: "#263241" }}>
                        Last Price:{" "}
                        <span style={{ color: this.props.lastPriceStyle }}>
                            {this.props.lastPrice.toFixed(8)}
                        </span>
                    </span>
                </div>
                <div id={this.props.bids} style={this.renderHeight()}>
                    <table
                        className="orderbook-rows"
                        style={{
                            width: "100%"
                        }}
                    >
                        <tbody style={{ fontSize: "11px", color: "#263241" }}>
                            {this.props.renderBids(
                                this.props.modal,
                                this.props.exchange,
                                this.props.data
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default OrderBook;
