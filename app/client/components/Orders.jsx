import React from "react";
import ReactDOM from "react-dom";
import { MomentJS } from "./../../service/MomentJS";
import { Toastr } from "./../../service/Toastr";

const ordersTest = [
    {
        id: "090",
        status: "NEW",
        price: 0.0097,
        orderQty: 0.0023,
        side: "buy",
        filledQty: 0.00098,
        time: new Date().toLocaleString(),
        symbol: "XRP/BTC"
    },
    {
        id: "091",
        status: "NEW",
        price: 0.009,
        orderQty: 0.0029,
        side: "sell",
        filledQty: 0.00076,
        time: new Date().toLocaleString(),
        symbol: "WAVES/BTC"
    },
    {
        id: "092",
        status: "NEW",
        price: 0.0097,
        orderQty: 0.0023,
        side: "buy",
        filledQty: 0.00098,
        time: new Date().toLocaleString(),
        symbol: "ETH/BTC"
    },
    {
        id: "090",
        status: "NEW",
        price: 0.0097,
        orderQty: 0.0023,
        side: "buy",
        filledQty: 0.00098,
        time: new Date().toLocaleString(),
        symbol: "XRP/BTC"
    },
    {
        id: "091",
        status: "NEW",
        price: 0.009,
        orderQty: 0.0029,
        side: "sell",
        filledQty: 0.00076,
        time: new Date().toLocaleString(),
        symbol: "WAVES/BTC"
    },
    {
        id: "092",
        status: "NEW",
        price: 0.0097,
        orderQty: 0.0023,
        side: "buy",
        filledQty: 0.00098,
        time: new Date().toLocaleString(),
        symbol: "ETH/BTC"
    },
    {
        id: "090",
        status: "NEW",
        price: 0.0097,
        orderQty: 0.0023,
        side: "buy",
        filledQty: 0.00098,
        time: new Date().toLocaleString(),
        symbol: "XRP/BTC"
    },
    {
        id: "091",
        status: "NEW",
        price: 0.009,
        orderQty: 0.0029,
        side: "sell",
        filledQty: 0.00076,
        time: new Date().toLocaleString(),
        symbol: "WAVES/BTC"
    },
    {
        id: "092",
        status: "NEW",
        price: 0.0097,
        orderQty: 0.0023,
        side: "buy",
        filledQty: 0.00098,
        time: new Date().toLocaleString(),
        symbol: "ETH/BTC"
    },
    {
        id: "090",
        status: "NEW",
        price: 0.0097,
        orderQty: 0.0023,
        side: "buy",
        filledQty: 0.00098,
        time: new Date().toLocaleString(),
        symbol: "XRP/BTC"
    },
    {
        id: "091",
        status: "NEW",
        price: 0.009,
        orderQty: 0.0029,
        side: "sell",
        filledQty: 0.00076,
        time: new Date().toLocaleString(),
        symbol: "WAVES/BTC"
    },
    {
        id: "092",
        status: "NEW",
        price: 0.0097,
        orderQty: 0.0023,
        side: "buy",
        filledQty: 0.00098,
        time: new Date().toLocaleString(),
        symbol: "ETH/BTC"
    }
];

function compare(a, b) {
    if (a.symbol < b.symbol) {
        return -1;
    }
    if (a.symbol > b.symbol) {
        return 1;
    }
    return 0;
}

class Orders extends React.Component {
    constructor() {
        super();

        this.state = {
            buy: {},
            sell: {},
            firstSymbol: "ETH",
            secondSymbol: "BTC",
            ask: "0",
            bid: "0",
            last: "0",
            currentPrice: "0",
            count: "0",
            total: "0",
            styleOpen: [
                "fa-sort",
                "fa-sort",
                "fa-sort-down",
                "fa-sort",
                "fa-sort",
                "fa-sort",
                "fa-sort"
            ],
            styleHistory: [
                "fa-sort",
                "fa-sort",
                "fa-sort-down",
                "fa-sort",
                "fa-sort",
                "fa-sort",
                "fa-sort"
            ],
            orders: []
        };
        this.renderOpenOrders = this.renderOpenOrders.bind(this);
        this.renderSubOrders = this.renderSubOrders.bind(this);
        this.switchTable = this.switchTable.bind(this);
        this.renderHistoryOrders = this.renderHistoryOrders.bind(this);
    }

    switchTable(tableId) {
        $("#" + tableId).toggleClass("orders-table-hide");
    }

    componentDidMount = () => {
        // alert("MOunted");
        this.setState({
            orders: ordersTest
        });
    };

    componentWillReceiveProps = props => {
        // if (props.orders) {
        //     this.setState({
        //         orders: props.orders
        //     });
        // }
    };

    renderSubOrders(subOrders, order) {
        let renderSubOrders = [];
        for (let i = 0; i < subOrders.length; i++) {
            renderSubOrders.push(
                <tr key={i}>
                    <td style={{ width: "20%", padding: "5px" }}>
                        {subOrders[i].exchange}
                        <br />
                    </td>
                    <td style={{ width: "20%", padding: "5px" }}>
                        {subOrders[i].id}
                    </td>
                    <td style={{ width: "20%", padding: "5px" }}>
                        {parseFloat(subOrders[i].subOrdQty).toFixed(8)}
                    </td>
                    <td style={{ width: "20%", padding: "5px" }}>
                        {parseFloat(subOrders[i].price).toFixed(8)}
                    </td>
                    <td style={{ width: "20%", padding: "5px" }}>
                        {subOrders[i].status}
                    </td>
                </tr>
            );
        }
        return renderSubOrders;
    }

    renderOpenOrders(orders) {
        let renderOrders = [];
        for (let i = 0; i < orders.length; i++) {
            if (
                orders[i].status == "NEW" ||
                orders[i].status == "PARTIALLY_FILLED"
            ) {
                let side = "Sell";
                let styleSide = "#e5494d";
                let total = orders[i].price * orders[i].orderQty;
                if (orders[i].side == "buy") {
                    side = "Buy";
                    styleSide = "#1f5af6";
                }
                let rowId = "order-open" + orders[i].id;
                let tableId = "order-table-open" + orders[i].id;
                let orderQty = orders[i].orderQty;
                let filledQty = orders[i].filledQty;
                let percent = parseFloat((filledQty * 100) / orderQty).toFixed(
                    4
                );
                renderOrders.push(
                    <div
                        id={rowId}
                        key={i}
                        onClick={() => {
                            this.switchTable(tableId);
                        }}
                    >
                        <div className="row orders-row">
                            <div className="col-md-1">
                                <span style={{ color: styleSide }}>{side}</span>
                            </div>
                            <div className="col-md-1">{orders[i].symbol}</div>
                            <div className="col-md-2">{orders[i].time}</div>
                            <div className="col-md-2">
                                {parseFloat(orders[i].orderQty).toFixed(8)}
                            </div>
                            <div className="col-md-2">
                                {parseFloat(orders[i].price).toFixed(8)}
                            </div>
                            <div className="col-md-2">{percent}%</div>
                            <div className="col-md-2">
                                {parseFloat(total).toFixed(8)}
                            </div>
                        </div>
                        {/* <div id={tableId} className="row orders-table-hide">
                            <div className="col-md-12">
                                <table id="suborders">
                                    <thead>
                                        <tr>
                                            <th>Exchange</th>
                                            <th>ID</th>
                                            <th>Amount</th>
                                            <th>Price</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderSubOrders(
                                            orders[i].subOrders,
                                            orders[i]
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div> */}
                    </div>
                );
            }
        }
        return renderOrders;
    }

    renderHistoryOrders(orders) {
        let renderOrders = [];
        for (let i = 0; i < orders.length; i++) {
            let side = "Sell";
            let styleSide = "#e5494d";
            let total = orders[i].price * orders[i].orderQty;
            if (orders[i].side == "buy") {
                side = "Buy";
                styleSide = "#1f5af6";
            }
            let rowId = "order-history" + orders[i].id;
            let tableId = "order-table-history" + orders[i].id;
            let orderQty = orders[i].orderQty;
            let filledQty = orders[i].filledQty;
            let percent = (filledQty * 100) / orderQty;
            renderOrders.push(
                <div
                    id={rowId}
                    key={i}
                    onClick={() => {
                        this.switchTable(tableId);
                    }}
                >
                    <div className="row orders-row">
                        <div className="col-md-1">
                            <span style={{ color: styleSide }}>{side}</span>
                        </div>
                        <div className="col-md-1">{orders[i].symbol}</div>
                        <div className="col-md-2">
                            {new Date().toLocaleString()}
                        </div>
                        <div className="col-md-2">
                            {parseFloat(orders[i].orderQty).toFixed(8)}
                        </div>
                        <div className="col-md-2">
                            {parseFloat(orders[i].price).toFixed(8)}
                        </div>
                        <div className="col-md-2">{percent}%</div>
                        <div className="col-md-2">
                            {parseFloat(total).toFixed(8)}
                        </div>
                    </div>
                    {/* <div id={tableId} className="row orders-table-hide">
                        <div className="col-md-12">
                            <table id="suborders">
                                <thead>
                                    <tr>
                                        <th>Exchange</th>
                                        <th>ID</th>
                                        <th>Amount</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderSubOrders(
                                        orders[i].subOrders,
                                        orders[i]
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div> */}
                </div>
            );
        }
        return renderOrders;
    }
    handleClick = e => {
        //typeO symbolO timeO amountO priceO statusO totalO
        //typeH symbolH timeH amountH priceH statusH totalH

        let id = e.target.id;
        let idx = Number(id.split("-")[0]);

        if (/O$/.test(id)) {
            let newOrders = [];
            let newStyleOpen = [
                "fa-sort",
                "fa-sort",
                "fa-sort",
                "fa-sort",
                "fa-sort",
                "fa-sort",
                "fa-sort"
            ];
            let check = this.state.styleOpen[idx];

            if (check === "fa-sort" || check === "fa-sort-up") {
                newStyleOpen[idx] = "fa-sort-down";
            } else if (check === "fa-sort-down") {
                newStyleOpen[idx] = "fa-sort-up";
            }

            if (idx === 1) {
                newOrders = this.state.orders.sort(compare);
                console.log(newOrders);
            }
            this.setState({
                styleOpen: newStyleOpen,
                orders: newOrders
            });
        } else if (/H$/.test(id)) {
            let newStyleHistory = [
                "fa-sort",
                "fa-sort",
                "fa-sort",
                "fa-sort",
                "fa-sort",
                "fa-sort",
                "fa-sort"
            ];
            let check = this.state.styleHistory[idx];

            if (check === "fa-sort" || check === "fa-sort-up") {
                newStyleHistory[idx] = "fa-sort-down";
            } else if (check === "fa-sort-down") {
                newStyleHistory[idx] = "fa-sort-up";
            }
            this.setState({
                styleHistory: newStyleHistory
            });
        }
    };
    render() {
        let { orders } = this.state;
        let sO = this.state.styleOpen; // className of Open Orders
        let sH = this.state.styleHistory; // className of Order History
        return (
            <div className="panel panel-default orderform-panel">
                <div className="panel-heading" style={{ padding: "0px" }}>
                    <div
                        id="orders-open-tab"
                        className="col-xs-4 orders-tab orders-tab-active-open"
                    >
                        <a href="#" id="open-orders-link">
                            Open Orders
                        </a>
                    </div>
                    <div
                        id="orders-history-tab"
                        className="col-xs-4 orders-tab"
                    >
                        <a href="#" id="history-orders-link">
                            Order History
                        </a>
                    </div>
                </div>
                <div
                    id="orders-open-container"
                    className="row"
                    style={{
                        backgroundColor: "#fff",
                        borderRadius: "3px",
                        height: "300px"
                    }}
                >
                    <div className="col-md-12">
                        <div style={{ padding: "10px" }}>
                            <span
                                style={{
                                    color: "#4e5c6e",
                                    fontSize: "13px",
                                    fontWeight: "bold"
                                }}
                            >
                                Ордеры
                            </span>
                        </div>
                        <div>
                            <div
                                className="row"
                                style={{
                                    borderBottomStyle: "solid",
                                    borderBottomWidth: "1px",
                                    borderColor: "#dae1e9",
                                    borderTopStyle: "solid",
                                    borderTopWidth: "1px",
                                    color: "#7f8fa4",
                                    fontFamily: "'Roboto-Regular',sans-serif'",
                                    fontSize: "13px",
                                    paddingTop: "8px",
                                    paddingBottom: "8px"
                                }}
                            >
                                <div className="col-md-1">
                                    <span>Type</span>
                                    <i
                                        className={`fas ${sO[0]} orders-title`}
                                        id="0-typeO"
                                        onClick={this.handleClick}
                                    />
                                </div>
                                <div className="col-md-1">
                                    <span>Symbol</span>
                                    <i
                                        className={`fas ${sO[1]} orders-title`}
                                        id="1-symbolO"
                                        onClick={this.handleClick}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <span>Time</span>
                                    <i
                                        className={`fas ${sO[2]} orders-title`}
                                        id="2-timeO"
                                        onClick={this.handleClick}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <span>Amount</span>
                                    <i
                                        className={`fas ${sO[3]} orders-title`}
                                        id="3-amountO"
                                        onClick={this.handleClick}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <span>Price</span>
                                    <i
                                        className={`fas ${sO[4]} orders-title`}
                                        id="4-priceO"
                                        onClick={this.handleClick}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <span>Status</span>
                                    <i
                                        className={`fas ${sO[5]} orders-title`}
                                        id="5-statusO"
                                        onClick={this.handleClick}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <span>Total</span>
                                    <i
                                        className={`fas ${sO[6]} orders-title`}
                                        id="6-totalO"
                                        onClick={this.handleClick}
                                    />
                                </div>
                            </div>
                            <div
                                style={{
                                    overflowY: "scroll",
                                    overflowX: "hidden",
                                    maxHeight: "225px"
                                }}
                            >
                                {this.renderOpenOrders(orders)}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    id="orders-history-container"
                    className="row"
                    style={{
                        backgroundColor: "#fff",
                        borderRadius: "3px",
                        display: "none",
                        height: "300px"
                    }}
                >
                    <div className="col-md-12">
                        <div style={{ padding: "10px" }}>
                            <span
                                style={{
                                    color: "#4e5c6e",
                                    fontSize: "13px",
                                    fontWeight: "bold"
                                }}
                            >
                                Ордеры
                            </span>
                        </div>
                        <div>
                            <div
                                className="row"
                                style={{
                                    borderBottomStyle: "solid",
                                    borderBottomWidth: "1px",
                                    borderColor: "#dae1e9",
                                    borderTopStyle: "solid",
                                    borderTopWidth: "1px",
                                    color: "#7f8fa4",
                                    fontFamily: "'Roboto-Regular',sans-serif'",
                                    fontSize: "13px",
                                    paddingTop: "8px",
                                    paddingBottom: "8px"
                                }}
                            >
                                <div className="col-md-1">
                                    <span>Type</span>
                                    <i
                                        className={`fas ${sH[0]} orders-title`}
                                        id="0-typeH"
                                        onClick={this.handleClick}
                                    />
                                </div>
                                <div className="col-md-1">
                                    <span>Symbol</span>
                                    <i
                                        className={`fas ${sH[1]} orders-title`}
                                        id="1-symbolH"
                                        onClick={this.handleClick}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <span>Time</span>
                                    <i
                                        className={`fas ${sH[2]} orders-title`}
                                        id="2-timeH"
                                        onClick={this.handleClick}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <span>Amount</span>
                                    <i
                                        className={`fas ${sH[3]} orders-title`}
                                        id="3-amountH"
                                        onClick={this.handleClick}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <span>Price</span>
                                    <i
                                        className={`fas ${sH[4]} orders-title`}
                                        id="4-priceH"
                                        onClick={this.handleClick}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <span>Status</span>
                                    <i
                                        className={`fas ${sH[5]} orders-title`}
                                        id="5-statusH"
                                        onClick={this.handleClick}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <span>Total</span>
                                    <i
                                        className={`fas ${sH[6]} orders-title`}
                                        id="6-totalH"
                                        onClick={this.handleClick}
                                    />
                                </div>
                            </div>
                            <div
                                style={{
                                    overflowY: "scroll",
                                    overflowX: "hidden",
                                    maxHeight: "225px"
                                }}
                            >
                                {this.renderHistoryOrders(orders)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Orders;
