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

function compareValues(key, order = "asc") {
    try {
        return function(a, b) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                // property doesn't exist on either object
                return 0;
            }
            const varA =
                typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
            const varB =
                typeof b[key] === "string" ? b[key].toUpperCase() : b[key];
            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return order == "desc" ? comparison * -1 : comparison;
        };
    } catch (e) {
        console.log(e);
    }
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
        // alert("Mounted");
        // let orders = this.computeOrders(ordersTest);
        // this.setState({
        //     orders
        // });
    };

    computeOrders = orders =>
        orders.map(order => {
            let total = order.price * order.orderQty;
            let orderQty = order.orderQty;
            let filledQty = order.filledQty;
            let percent = parseFloat((filledQty * 100) / orderQty).toFixed(4);
            order.total = total;
            order.percent = percent;
            return order;
        });

    componentWillReceiveProps = props => {
        if (props.orders) {
            let orders = this.computeOrders(props.orders);
            this.setState({
                orders
            });
        }
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
                // let total = orders[i].price * orders[i].orderQty;
                if (orders[i].side == "buy") {
                    side = "Buy";
                    styleSide = "#1f5af6";
                }
                let rowId = "order-open" + orders[i].id;
                let tableId = "order-table-open" + orders[i].id;
                // let orderQty = orders[i].orderQty;
                // let filledQty = orders[i].filledQty;
                // let percent = parseFloat((filledQty * 100) / orderQty).toFixed(
                //     4
                // );
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
                            <div className="col-md-2">{orders[i].percent}%</div>
                            <div className="col-md-2">
                                {parseFloat(orders[i].total).toFixed(8)}
                            </div>
                        </div>
                        <div id={tableId} className="row orders-table-hide">
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
                        </div>
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
            //let total = orders[i].price * orders[i].orderQty;
            if (orders[i].side == "buy") {
                side = "Buy";
                styleSide = "#1f5af6";
            }
            let rowId = "order-history" + orders[i].id;
            let tableId = "order-table-history" + orders[i].id;
            // let orderQty = orders[i].orderQty;
            // let filledQty = orders[i].filledQty;
            // let percent = (filledQty * 100) / orderQty;
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
                        <div className="col-md-2">{orders[i].percent}%</div>
                        <div className="col-md-2">
                            {parseFloat(orders[i].total).toFixed(8)}
                        </div>
                    </div>
                    <div id={tableId} className="row orders-table-hide">
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
                    </div>
                </div>
            );
        }
        return renderOrders;
    }

    handleClick = e => {
        //typeO symbolO timeO amountO priceO statusO totalO - Open orders
        //typeH symbolH timeH amountH priceH statusH totalH - History Orders

        let id = e.target.id;
        let idx = Number(id.split("-")[0]);
        let key = id.split("-")[1];
        let newOrders = [];

        if (/O$/.test(id)) {
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

                newOrders = this.state.orders.sort(compareValues(key, "desc"));
            } else if (check === "fa-sort-down") {
                newStyleOpen[idx] = "fa-sort-up";
                newOrders = this.state.orders.sort(compareValues(key, "asc"));
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
                newOrders = this.state.orders.sort(compareValues(key, "desc"));
            } else if (check === "fa-sort-down") {
                newStyleHistory[idx] = "fa-sort-up";
                newOrders = this.state.orders.sort(compareValues(key, "asc"));
            }

            this.setState({
                styleHistory: newStyleHistory,
                orders: newOrders
            });
        }
    };
    
    render() {
        let { orders } = this.state;
        let sO = this.state.styleOpen; // className of Open Orders
        let sH = this.state.styleHistory; // className of Order History
        return (
            <div className="custom-panel panel-default orderform-panel">
                <div className="panel-heading" style={{ padding: "0px" }}>
                    <div
                        id="orders-open-tab"
                        className="col-xs-4 orders-tab orders-tab-active-open"
                    >
                        <a href="#" id="open-orders-link" >
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
                        height: "54vh"
                    }}
                >
                    <div className="col-md-12">
                        <div style={{ padding: "0px 10px 5px 10px" }}>
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
                                    fontSize: "12px",
                                    paddingTop: "8px",
                                    paddingBottom: "8px"
                                }}
                            >
                                <div className="col-md-1 col-xs-1 customCol">
                                    <span>
                                        Type
                                        <i
                                            className={`fas ${sO[0]} orders-title`}
                                            id="0-side-O"
                                            onClick={this.handleClick}
                                        />
                                    </span>  

                                </div>
                                <div className="col-md-2 col-xs-2 customCol">
                                    <span>
                                        Symbol
                                        <i
                                            className={`fas ${sO[1]} orders-title`}
                                            id="1-symbol-O"
                                            onClick={this.handleClick}
                                        /> 
                                    </span>
                                </div>
                                <div className="col-md-2 col-xs-2 customCol">
                                    <span>
                                        Time 
                                        <i
                                            className={`fas ${sO[2]} orders-title`}
                                            id="2-time-O"
                                            onClick={this.handleClick}
                                        />
                                    </span>
                                    
                                </div>
                                <div className="col-md-2 col-xs-2 customCol">
                                    <span>
                                        Amount
                                        <i
                                            className={`fas ${sO[3]} orders-title`}
                                            id="3-orderQty-O"
                                            onClick={this.handleClick}
                                        />
                                    </span>
                                   
                                </div>
                                <div className="col-md-2 col-xs-1 customCol">
                                    <span>
                                        Price
                                        <i
                                            className={`fas ${sO[4]} orders-title`}
                                            id="4-price-O"
                                            onClick={this.handleClick}
                                        />
                                    </span>
                                    
                                </div>
                                <div className="col-md-2 col-xs-2 customCol">
                                    <span>
                                        Status
                                        <i
                                            className={`fas ${sO[5]} orders-title`}
                                            id="5-percent-O"
                                            onClick={this.handleClick}
                                        />
                                    </span>
                                </div>
                                <div className="col-md-1 col-xs-1 customCol">
                                    <span>
                                        Total
                                        <i
                                            className={`fas ${sO[6]} orders-title`}
                                            id="6-total-O"
                                            onClick={this.handleClick}
                                        />
                                    </span>
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
                        height: "54vh"
                    }}
                >
                    <div className="col-md-12">
                        <div style={{ padding: "0px 10px 5px 10px" }}>
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
                                    fontSize: "12px",
                                    paddingTop: "8px",
                                    paddingBottom: "8px"
                                }}
                            >
                                <div className="col-md-1 col-xs-1 customCol">
                                    <span >
                                        Type
                                        <i
                                            className={`fas ${sH[0]} orders-title`}
                                            id="0-side-H"
                                            onClick={this.handleClick}
                                        />
                                    </span>
                                </div>
                                <div className="col-md-2 col-xs-2 customCol">
                                    <span>
                                        Symbol
                                        <i
                                            className={`fas ${sH[1]} orders-title`}
                                            id="1-symbol-H"
                                            onClick={this.handleClick}
                                        />
                                    </span>
                                </div>
                                <div className="col-md-2 col-xs-2 customCol">
                                    <span>
                                        Time
                                        <i
                                            className={`fas ${sH[2]} orders-title`}
                                            id="2-time-H"
                                            onClick={this.handleClick}
                                        />
                                    </span>
                                </div>
                                <div className="col-md-2 col-xs-2 customCol">
                                    <span>
                                        Amount
                                        <i
                                            className={`fas ${sH[3]} orders-title`}
                                            id="3-orderQty-H"
                                            onClick={this.handleClick}
                                        />
                                    </span>
                                </div>
                                <div className="col-md-2 col-xs-1 customCol">
                                    <span>
                                        Price
                                        <i
                                            className={`fas ${sH[4]} orders-title`}
                                            id="4-price-H"
                                            onClick={this.handleClick}
                                        />
                                    </span>
                                </div>
                                <div className="col-md-2 col-xs-2 customCol">
                                    <span>
                                        Status
                                        <i
                                            className={`fas ${sH[5]} orders-title`}
                                            id="5-percent-H"
                                            onClick={this.handleClick}
                                        />
                                    </span>
                                </div>
                                <div className="col-md-1 col-xs-1 customCol">
                                    <span>
                                        Total
                                        <i
                                            className={`fas ${sH[6]} orders-title`}
                                            id="6-total-H"
                                            onClick={this.handleClick}
                                        />
                                    </span>
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
