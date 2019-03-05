import React from 'react';
import ReactDOM from 'react-dom';
import {MomentJS} from './../../service/MomentJS'
import {Toastr} from './../../service/Toastr'

class Orders extends React.Component {

    constructor() {
        super();
        this.state = {
            buy: {},
            sell: {},
            firstSymbol: 'ETH',
            secondSymbol: 'BTC',
            ask: '0',
            bid: '0',
            last: '0',
            currentPrice: '0',
            count: '0',
            total: '0'
        }
        this.renderOpenOrders = this.renderOpenOrders.bind(this);
        this.renderSubOrders = this.renderSubOrders.bind(this);
        this.switchTable = this.switchTable.bind(this);
        this.renderHistoryOrders = this.renderHistoryOrders.bind(this);
    }

    switchTable(tableId) {
        $('#' + tableId).toggleClass('orders-table-hide')
    }

    componentDidMount() {

    }

    renderSubOrders(subOrders, order) {
        let renderSubOrders = [];
        for (let i = 0; i < subOrders.length; i++) {
            renderSubOrders.push(
                <tr key={i}>
                    <td style={{width: '20%', padding: '5px'}}>
                        {subOrders[i].exchange}<br/>
                    </td>
                    <td style={{width: '20%', padding: '5px'}}>
                        {subOrders[i].id}
                    </td>
                    <td style={{width: '20%', padding: '5px'}}>
                        {parseFloat(subOrders[i].subOrdQty).toFixed(8)}
                    </td>
                    <td style={{width: '20%', padding: '5px'}}>
                        {parseFloat(subOrders[i].price).toFixed(8)}
                    </td>
                    <td style={{width: '20%', padding: '5px'}}>
                        {subOrders[i].status}
                    </td>
                </tr>
            )
        }
        return renderSubOrders;
    }

    renderOpenOrders(orders) {
        let renderOrders = [];
        for (let i = 0; i < orders.length; i++) {
            if (orders[i].status == "NEW" || orders[i].status == "PARTIALLY_FILLED") {
                let side = "Sell"
                let styleSide = "#e5494d";
                let total = orders[i].price * orders[i].orderQty;
                if (orders[i].side == 'buy') {
                    side = "Buy";
                    styleSide = "#1f5af6";
                }
                let rowId = "order-open" + orders[i].id;
                let tableId = "order-table-open" + orders[i].id;
                let orderQty = orders[i].orderQty;
                let filledQty = orders[i].filledQty;
                let percent = filledQty * 100 / orderQty;
                renderOrders.push(
                    <div id={rowId} key={i} onClick={() => {
                        this.switchTable(tableId)
                    }}>
                        <div className="row orders-row">
                            <div className="col-md-2">
                                <span style={{color: styleSide}}>{side}</span>
                            </div>
                            <div className="col-md-2">
                                {orders[i].symbol}
                            </div>
                            <div className="col-md-2">
                                {parseFloat(orders[i].orderQty).toFixed(8)}
                            </div>
                            <div className="col-md-2">
                                {parseFloat(orders[i].price).toFixed(8)}
                            </div>
                            <div className="col-md-2">
                                {percent}%
                            </div>
                            <div className="col-md-2">
                                {parseFloat(total).toFixed(8)}
                            </div>
                        </div>
                        <div id={tableId} className="row orders-table-hide">
                            <div className="col-md-12">
                                <table id="suborders">
                                    <thead>
                                    <tr>
                                        <th>
                                            Exchange
                                        </th>
                                        <th>
                                            ID
                                        </th>
                                        <th>
                                            Amount
                                        </th>
                                        <th>
                                            Price
                                        </th>
                                        <th>
                                            Status
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.renderSubOrders(orders[i].subOrders, orders[i])}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>)
            }
        }
        return renderOrders;
    }

    renderHistoryOrders(orders) {
        let renderOrders = [];
        for (let i = 0; i < orders.length; i++) {
            let side = "Sell"
            let styleSide = "#e5494d";
            let total = orders[i].price * orders[i].orderQty;
            if (orders[i].side == 'buy') {
                side = "Buy";
                styleSide = "#1f5af6";
            }
            let rowId = "order-history" + orders[i].id;
            let tableId = "order-table-history" + orders[i].id;
            let orderQty = orders[i].orderQty;
            let filledQty = orders[i].filledQty;
            let percent = filledQty * 100 / orderQty;
            renderOrders.push(
                <div id={rowId} key={i} onClick={() => {
                    this.switchTable(tableId)
                }}>
                    <div className="row orders-row">
                        <div className="col-md-2">
                            <span style={{color: styleSide}}>{side}</span>
                        </div>
                        <div className="col-md-2">
                            {orders[i].symbol}
                        </div>
                        <div className="col-md-2">
                            {parseFloat(orders[i].orderQty).toFixed(8)}
                        </div>
                        <div className="col-md-2">
                            {parseFloat(orders[i].price).toFixed(8)}
                        </div>
                        <div className="col-md-2">
                            {percent}%
                        </div>
                        <div className="col-md-2">
                            {parseFloat(total).toFixed(8)}
                        </div>
                    </div>
                    <div id={tableId} className="row orders-table-hide">
                        <div className="col-md-12">
                            <table id="suborders">
                                <thead>
                                <tr>
                                    <th>
                                        Exchange
                                    </th>
                                    <th>
                                        ID
                                    </th>
                                    <th>
                                        Amount
                                    </th>
                                    <th>
                                        Price
                                    </th>
                                    <th>
                                        Status
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.renderSubOrders(orders[i].subOrders, orders[i])}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>)
        }
        return renderOrders;
    }


    render() {
        let orders = this.props.orders;
        return (
            <div className="panel panel-default orderform-panel">
                <div className="panel-heading" style={{padding: '0px'}}>
                    <div id="orders-open-tab" className="col-xs-4 orders-tab orders-tab-active-open">
                        <a href="#" id="open-orders-link">Open Orders</a>
                    </div>
                    <div id="orders-history-tab" className="col-xs-4 orders-tab">
                        <a href="#" id="history-orders-link">Order History</a>
                    </div>
                </div>
                <div id="orders-open-container" className="row"
                     style={{backgroundColor: '#fff', borderRadius: '3px', height: '300px'}}>
                    <div className="col-md-12">
                        <div style={{padding: '10px'}}>
                        <span style={{color: '#4e5c6e', fontSize: '13px', fontWeight: 'bold'}}>
                            Ордеры
                        </span>
                        </div>
                        <div>
                            <div className="row" style={{
                                borderBottomStyle: 'solid',
                                borderBottomWidth: '1px',
                                borderColor: '#dae1e9',
                                borderTopStyle: 'solid',
                                borderTopWidth: '1px',
                                color: '#7f8fa4',
                                fontFamily: "'Roboto-Regular',sans-serif'",
                                fontSize: '13px',
                                paddingTop: '8px',
                                paddingBottom: '8px'
                            }}>
                                <div className="col-md-2">
                                    Type
                                </div>
                                <div className="col-md-2">
                                    Symbol
                                </div>
                                <div className="col-md-2">
                                    Amount
                                </div>
                                <div className="col-md-2">
                                    Price
                                </div>
                                <div className="col-md-2">
                                    Status
                                </div>
                                <div className="col-md-2">
                                    Total
                                </div>
                            </div>
                            <div style={{overflowY: 'scroll', overflowX: 'hidden', maxHeight: '225px'}}>
                                {this.renderOpenOrders(orders)}
                            </div>
                        </div>
                    </div>
                </div>
                <div id="orders-history-container" className="row"
                     style={{backgroundColor: '#fff', borderRadius: '3px', display: 'none', height: '300px'}}>
                    <div className="col-md-12">
                        <div style={{padding: '10px'}}>
                        <span style={{color: '#4e5c6e', fontSize: '13px', fontWeight: 'bold'}}>
                            Ордеры
                        </span>
                        </div>
                        <div>
                            <div className="row" style={{
                                borderBottomStyle: 'solid',
                                borderBottomWidth: '1px',
                                borderColor: '#dae1e9',
                                borderTopStyle: 'solid',
                                borderTopWidth: '1px',
                                color: '#7f8fa4',
                                fontFamily: "'Roboto-Regular',sans-serif'",
                                fontSize: '13px',
                                paddingTop: '8px',
                                paddingBottom: '8px'
                            }}>
                                <div className="col-md-2">
                                    Type
                                </div>
                                <div className="col-md-2">
                                    Symbol
                                </div>
                                <div className="col-md-2">
                                    Amount
                                </div>
                                <div className="col-md-2">
                                    Price
                                </div>
                                <div className="col-md-2">
                                    Status
                                </div>
                                <div className="col-md-2">
                                    Total
                                </div>
                            </div>
                            <div style={{overflowY: 'scroll', overflowX: 'hidden', maxHeight: '225px'}}>
                                {this.renderHistoryOrders(orders)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};


export default Orders;