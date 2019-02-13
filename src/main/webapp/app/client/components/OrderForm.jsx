import React from 'react';
import ReactDOM from 'react-dom';
import {MomentJS} from './../../service/MomentJS'
import {Toastr} from './../../service/Toastr'
import {WavesOrder} from './../../service/WavesOrder'

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
            totalPrice: 0.0000000001
        }
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
        })
        this.loadTotalCost();
        this.scheduleTotalCost();
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
            Toastr.showError("Amount is empty")
            return;
        }
        let address = localStorage.getItem('address') || '';
        if (!address) {
            Toastr.showError("Заполните address в настройках в меню.")
            return;
        }
        let price = this.props.currentPrice;
        if (this.props.marketType == 'market') {
            price = this.state.totalPrice;
        }

        if(this.props.marketType == 'limit'){
            if (!this.props.currentPrice || this.props.currentPrice == 0) {
                Toastr.showError("Price is empty")
                return;
            }
        }

        const wavesOrder = WavesOrder.toWavesOrder(symbol, side, price, this.props.count);
        fetch(`${WavesOrder.orionUrl}/api/order`,
            {
                credentials: 'same-origin',
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(wavesOrder)
            }
        ).then(results => {
            return results.json();
        }).then(data => {
            if (data.code && data.code == "1010") {
                Toastr.showError("No brokers were found to execute your order");
                return;
            }
            Toastr.showSuccess("Order has been created");
            this.props.loadOrderHistory(this.props.pair)
        })
    }

    scheduleTotalCost() {
        let loadTotalCost = this.loadTotalCost;
        setInterval(function () {
            loadTotalCost();
        }, 1000);
    }

    loadTotalCost() {
        if (this.props.marketType == 'market' && this.props.count > 0) {
            let url = "/api/v1/order-route" +
                "?symbol={symbol}&ordQty={ordQty}&side={side}"
                    .replace("{symbol}", this.props.pair)
                    .replace("{ordQty}", this.props.count)
                    .replace("{side}", this.props.side)
            fetch(url, {
                    credentials: 'same-origin',
                }
            ).then(results => {
                return results.json();
            }).then(data => {
                this.setState({totalPrice: data.totalPrice, totalCost: data.totalCost});
                this.props.loadBenefits();
            })
        }
    }

    renderBenefits(benefit) {
        let rendered =
            <div style={{overflow: 'scroll', minHeight: '50px', maxHeight: '50px'}}>
                <div style={{overflow: 'scroll'}}>
                    + {benefit.benefitPct}%
                </div>
                <div style={{overflow: 'scroll'}}>
                    + {benefit.benefitBtc} BTC
                </div>
            </div>
        return rendered;
    }

    renderPrice(currentPrice, secondSymbol, ask, bid, lastPrice) {
        if (this.props.marketType == "limit") {
            return (
                <div className="orderform-input-container">
                    <div className="row">
                        <div className="col-md-1" style={{padding: '0px'}}>
                            <span className="orderform-label">Price</span>
                        </div>
                        <div className="col-md-offset-6 col-md-1">
                            <span onClick={() => {
                                this.clickAsk(ask)
                            }} className="orderform-pointer orderform-label">Ask</span>
                        </div>
                        <div className="col-md-1">
                            <span onClick={() => {
                                this.clickBid(bid)
                            }} className="orderform-pointer orderform-label">Bid</span>
                        </div>
                        <div className="col-md-1">
                            <span onClick={() => {
                                this.clickLast(lastPrice)
                            }} className="orderform-pointer orderform-label">Last</span>
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
            );
        }
    }

    renderButtons(firstSymbol, pair) {
        let marginTop = '20px';
        if (this.props.marketType == 'market') {
            marginTop = "75px";
        }
        return (
            <div>
                <div id="buy-form" className="orderform-input-container"
                     style={{marginTop: marginTop}}>
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
                     style={{marginTop: marginTop, display: 'none'}}>
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
        );
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
        if (!this.props.customCount) {
            count = parseFloat(this.props.count).toFixed(8);
        }
        let currentPrice = this.props.currentPrice;
        let total = this.props.total.toFixed(8);
        if (this.props.marketType == 'market') {
            total = this.state.totalCost;
        }

        let benefits = this.props.benefits;

        return (
            <div className="row">
                <div className="col-md-6 orderform">
                    <div className="panel panel-default orderform-panel">
                        <div className="panel-heading" style={{padding: '0px'}}>
                            <div id="buy-header" className="col-xs-6 orderform-header orderform-buy-active">
                                <a onClick={() => {
                                    this.props.setSide('buy')
                                }} href="#" id="buy-form-link">BUY</a>
                            </div>
                            <div id="sell-header" className="col-xs-6 orderform-header">
                                <a onClick={() => {
                                    this.props.setSide('sell')
                                }} href="#" id="sell-form-link">SELL</a>
                            </div>
                        </div>
                        <div className="orderform-container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div style={{display: 'block'}}>
                                        <div style={{marginTop: '15px'}}>
                                            <div className="row">
                                                <div className="col-md-6" style={{padding: '0px'}}>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio"
                                                               onChange={() => {
                                                                   this.props.changeMarketType("market")
                                                               }}
                                                               name="inlineRadioOptions" id="inlineRadio1"
                                                               checked={this.props.marketType === "market"}
                                                               value="option1"/>
                                                        <label style={{marginLeft: '10px'}} className="form-check-label"
                                                               htmlFor="inlineRadio1">Market</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6" style={{padding: '0px'}}>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio"
                                                               onChange={() => {
                                                                   this.props.changeMarketType("limit")
                                                               }}
                                                               name="inlineRadioOptions" id="inlineRadio2"
                                                               checked={this.props.marketType === "limit"}
                                                               value="option2"/>
                                                        <label style={{marginLeft: '10px'}} className="form-check-label"
                                                               htmlFor="inlineRadio2">Limit order</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="row">
                                            <div className="col-md-12" style={{padding: '0px'}}>
                                                <span className="orderform-label">Amount</span>
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
                                    {this.renderPrice(currentPrice, secondSymbol, ask, bid, lastPrice)}
                                    <div className="orderform-input-container">
                                        <div className="row">
                                            <div className="col-md-12" style={{padding: '0px'}}>
                                                <span className="orderform-label">Total</span>
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
                                <div style={{padding: '10px'}}>
                                    <div className="row" style={{fontSize: '11px'}}>
                                        <div className="col-md-4" style={{
                                            padding: '0px',
                                            textAlign: 'center',
                                            marginTop: '15px',
                                            borderRight: '2px solid rgb(237, 240, 244)'
                                        }}>
                                            <div style={{borderBottom: '2px solid rgb(237, 240, 244)'}}>
                                                <span style={{
                                                    color: 'rgb(240, 185, 11)',
                                                    fontWeight: 'bold'
                                                }}>BINANCE</span>
                                            </div>
                                            <div style={{color: '#41c300', fontSize: '10px', overflow: 'scroll'}}>
                                                {this.renderBenefits(benefits.binance)}
                                            </div>
                                        </div>
                                        <div className="col-md-4" style={{
                                            padding: '0px',
                                            textAlign: 'center',
                                            marginTop: '15px',
                                            borderRight: '2px solid rgb(237, 240, 244)'
                                        }}>
                                            <div style={{borderBottom: '2px solid rgb(237, 240, 244)'}}>
                                                <span style={{color: '#0a6970', fontWeight: 'bold'}}>POLONIEX</span>
                                            </div>
                                            <div style={{color: '#41c300', fontSize: '10px', overflow: 'scroll'}}>
                                                {this.renderBenefits(benefits.poloniex)}
                                            </div>
                                        </div>
                                        <div className="col-md-4"
                                             style={{padding: '0px', textAlign: 'center', marginTop: '15px',}}>
                                            <div style={{borderBottom: '2px solid rgb(237, 240, 244)'}}>
                                                <span style={{color: '#0084d4', fontWeight: 'bold'}}>BITTREX</span>
                                            </div>
                                            <div style={{color: '#41c300', fontSize: '10px', overflow: 'scroll'}}>
                                                {this.renderBenefits(benefits.bittrex)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {this.renderButtons(firstSymbol, pair)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default OrderForm;