import React from 'react';
import ReactDOM from 'react-dom';
import {MomentJS} from './../../service/MomentJS'
import {Toastr} from './../../service/Toastr'

class OrderForm extends React.Component {

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
        this.changeCurrentPrice = this.changeCurrentPrice.bind(this);
        this.clickAsk = this.clickAsk.bind(this);
        this.clickBid = this.clickBid.bind(this);
        this.clickLast = this.clickLast.bind(this);
        this.changeCount = this.changeCount.bind(this);
        this.recalculateTotal = this.recalculateTotal.bind(this);
        this.postOrder = this.postOrder.bind(this);
    }

    componentDidMount() {
        this.setState({
            currentPrice: this.props.ask,
            ask: this.props.ask,
            bid: this.props.bid,
            last: this.props.last
        })
    }

    changeCount(e) {
        if (e.target.value >= 0) {
            this.setState({count: e.target.value}, () => {
                this.recalculateTotal();
            })
        }
    }

    changeCurrentPrice(e) {
        if (e.target.value >= 0) {
            this.setState({currentPrice: e.target.value}, () => {
                this.recalculateTotal();
            })
        }
    }

    clickAsk(value) {
        this.setState({currentPrice: value}, () => {
            this.recalculateTotal();
        })
    }

    clickBid(value) {
        this.setState({currentPrice: value}, () => {
            this.recalculateTotal();
        })
    }

    clickLast(value) {
        this.setState({currentPrice: value}, () => {
            this.recalculateTotal();
        })
    }

    recalculateTotal() {
        let total = this.state.count * this.state.currentPrice;
        this.setState({total: total})
    }

    postOrder(symbol, side) {
        console.log("POST")
        if (!this.state.count || this.state.count == 0) {
            Toastr.showError("Введите количество")
            return;
        }
        if (!this.state.currentPrice || this.state.currentPrice == 0) {
            Toastr.showError("Введите цену")
            return;
        }
        fetch('/order',
            {
                credentials: 'same-origin',
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clientId: '3P6G8AxXyq8KvppcMGXdggEXFsucJWZ48Dv',
                    symbol: symbol,
                    side: side,
                    orderQty: this.state.count,
                    price: this.state.currentPrice
                })
            }
        ).then(results => {
            return results.json();
        }).then(data => {
            if (data.code && data.code == "1010") {
                Toastr.showError("Для ордера не было создано подордеров")
                return;
            }
            Toastr.showSuccess("Ордер создан")
            this.props.loadOrderHistory(this.props.pair)
        })

    }


    render() {
        let pair = this.props.pair;
        let firstSymbol = '';
        let secondSymbol = '';
        if (pair) {
            let pairs = pair.split("-");
            firstSymbol = pairs[0];
            secondSymbol = pairs[1];
        }
        let lastPrice = this.props.last;
        let ask = this.props.ask;
        let bid = this.props.bid;
        return (
            <div className="row">
                <div className="col-md-6 orderform">
                    <div className="panel panel-default orderform-panel">
                        <div className="panel-heading" style={{padding: '0px'}}>
                            <div id="buy-header" className="col-xs-6 orderform-header orderform-buy-active">
                                <a href="#" id="buy-form-link">КУПИТЬ</a>
                            </div>
                            <div id="sell-header" className="col-xs-6 orderform-header">
                                <a href="#" id="sell-form-link">ПРОДАТЬ</a>
                            </div>
                        </div>
                        <div className="orderform-container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div style={{display: 'block'}}>
                                        <div className="">
                                            <div className="row">
                                                <div className="col-md-12" style={{padding: '0px'}}>
                                                    <span className="orderform-label">Количество</span>
                                                </div>
                                            </div>
                                            <div className="row orderform-content-container">
                                                <div className="col-md-6">
                                                    <input type="number" name="count" id="amount" tabIndex="1"
                                                           className="orderform-input"
                                                           value={this.state.count}
                                                           onChange={this.changeCount}
                                                           placeholder="0"/>
                                                </div>
                                                <div className="col-md-6 orderform-input-symbol-container">
                                                    {firstSymbol}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="orderform-input-container">
                                            <div className="row">
                                                <div className="col-md-1" style={{padding: '0px'}}>
                                                    <span className="orderform-label">Цена</span>
                                                </div>
                                                <div className="col-md-offset-6 col-md-1">
                                                    <span onClick={() => {
                                                        this.clickAsk(ask)
                                                    }}
                                                          className="orderform-pointer orderform-label">Ask</span>
                                                </div>
                                                <div className="col-md-1">
                                                    <span onClick={() => {
                                                        this.clickBid(bid)
                                                    }}
                                                          className="orderform-pointer orderform-label">Bid</span>
                                                </div>
                                                <div className="col-md-1">
                                                    <span onClick={() => {
                                                        this.clickLast(lastPrice)
                                                    }}
                                                          className="orderform-pointer orderform-label">Last</span>
                                                </div>
                                            </div>
                                            <div className="row orderform-content-container">
                                                <div className="col-md-6">
                                                    <input type="number" name="price" id="price" tabIndex="1"
                                                           className="orderform-input"
                                                           value={this.state.currentPrice}
                                                           onChange={this.changeCurrentPrice}
                                                           placeholder="0"/>
                                                </div>
                                                <div className="col-md-6 orderform-input-symbol-container">
                                                    {secondSymbol}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="orderform-input-container">
                                            <div className="row">
                                                <div className="col-md-12" style={{padding: '0px'}}>
                                                    <span className="orderform-label">Сумма</span>
                                                </div>
                                            </div>
                                            <div className="row orderform-content-container">
                                                <div className="col-md-6">
                                                    <input type="number" name="total" id="amount" tabIndex="1"
                                                           className="orderform-input"
                                                           value={this.state.total}
                                                           placeholder="0"/>
                                                </div>
                                                <div className="col-md-6 orderform-input-symbol-container">
                                                    {secondSymbol}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="buy-form" className="orderform-input-container"
                                         style={{marginTop: '20px'}}>
                                        <div className="row">
                                            <div className="col-md-12" style={{padding: '0px'}}>
                                                <button onClick={() => {
                                                    this.postOrder(pair, 'buy')
                                                }} type="button"
                                                        className="btn btn-primary orderform-button orderform-button-buy">
                                                    Купить {firstSymbol}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="sell-form" className="orderform-input-container"
                                         style={{marginTop: '20px', display: 'none'}}>
                                        <div className="row">
                                            <div className="col-md-12" style={{padding: '0px'}}>
                                                <button onClick={() => {
                                                    this.postOrder(pair, 'sell')
                                                }} type="button"
                                                        className="btn btn-primary orderform-button orderform-button-sell">
                                                    Продать {firstSymbol}
                                                </button>
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
};


export default OrderForm;