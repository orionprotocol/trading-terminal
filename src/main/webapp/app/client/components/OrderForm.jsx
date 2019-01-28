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
            last: '0'
        }
        this.clickAsk = this.clickAsk.bind(this);
        this.clickBid = this.clickBid.bind(this);
        this.clickLast = this.clickLast.bind(this);
        this.postOrder = this.postOrder.bind(this);
        this.renderBenefits = this.renderBenefits.bind(this);
    }

    componentDidMount() {
        this.setState({
            currentPrice: this.props.ask,
            ask: this.props.ask,
            bid: this.props.bid,
            last: this.props.last
        })
    }

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
        console.log("POST " + this.props.count)
        if (!this.props.count || this.props.count == 0) {
            Toastr.showError("Введите количество")
            return;
        }
        if (!this.props.currentPrice || this.props.currentPrice == 0) {
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
                    clientId: '3NAwZFEJ2KULyknQjGqYr9bMeN2VyGYq4SF2',
                    symbol: symbol,
                    side: side,
                    orderQty: this.props.count,
                    price: this.props.currentPrice
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

    renderBenefits(benefit) {
        let rendered =
            <div style={{overflow:'scroll',minHeight:'50px',maxHeight:'50px'}}>
                <div style={{overflow:'scroll'}}>
                    + {benefit.benefitPct}%
                </div>
                <div style={{overflow:'scroll'}}>
                    + {benefit.benefitBtc} BTC
                </div>
            </div>
        return rendered;
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

        let count = this.props.count;
        let currentPrice = this.props.currentPrice;
        let total = this.props.total;

        let benefits = this.props.benefits;

        return (
            <div className="row">
                <div className="col-md-6 orderform">
                    <div className="panel panel-default orderform-panel">
                        <div className="panel-heading" style={{padding: '0px'}}>
                            <div id="buy-header" className="col-xs-6 orderform-header orderform-buy-active">
                                <a onClick={() => {
                                    this.props.setSide('buy')
                                }} href="#" id="buy-form-link">КУПИТЬ</a>
                            </div>
                            <div id="sell-header" className="col-xs-6 orderform-header">
                                <a onClick={() => {
                                    this.props.setSide('sell')
                                }} href="#" id="sell-form-link">ПРОДАТЬ</a>
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
                                                           value={count}
                                                           onChange={this.props.changeCount}
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
                                                           value={currentPrice}
                                                           onChange={this.props.changeCurrentPrice}
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
                                                           value={total}
                                                           placeholder="0"/>
                                                </div>
                                                <div className="col-md-6 orderform-input-symbol-container">
                                                    {secondSymbol}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row" style={{fontSize: '11px', marginTop: '10px'}}>
                                        <div className="col-md-4" style={{
                                            padding: '0px',
                                            textAlign: 'center',
                                            borderRight: '2px solid rgb(237, 240, 244)'
                                        }}>
                                            <div style={{borderBottom: '2px solid rgb(237, 240, 244)'}}>
                                                <span style={{
                                                    color: 'rgb(240, 185, 11)',
                                                    fontWeight: 'bold'
                                                }}>BINANCE</span>
                                            </div>
                                            <div style={{color: '#41c300', fontSize: '10px',overflow:'scroll'}}>
                                                {this.renderBenefits(benefits.binance)}
                                            </div>
                                        </div>
                                        <div className="col-md-4" style={{
                                            padding: '0px',
                                            textAlign: 'center',
                                            borderRight: '2px solid rgb(237, 240, 244)'
                                        }}>
                                            <div style={{borderBottom: '2px solid rgb(237, 240, 244)'}}>
                                                <span style={{color: '#0a6970', fontWeight: 'bold'}}>POLONIEX</span>
                                            </div>
                                            <div style={{color: '#41c300', fontSize: '10px',overflow:'scroll'}}>
                                                {this.renderBenefits(benefits.poloniex)}
                                            </div>
                                        </div>
                                        <div className="col-md-4" style={{padding: '0px', textAlign: 'center'}}>
                                            <div style={{borderBottom: '2px solid rgb(237, 240, 244)'}}>
                                                <span style={{color: '#0084d4', fontWeight: 'bold'}}>BITTREX</span>
                                            </div>
                                            <div style={{color: '#41c300', fontSize: '10px',overflow:'scroll'}}>
                                                {this.renderBenefits(benefits.bittrex)}
                                            </div>
                                        </div>
                                    </div>
                                    <div id="buy-form" className="orderform-input-container"
                                         style={{marginTop: '40px'}}>
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
                                         style={{marginTop: '40px', display: 'none'}}>
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