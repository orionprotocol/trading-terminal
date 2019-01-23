import React from 'react';
import ReactDOM from 'react-dom';
import {MomentJS} from './../../service/MomentJS'
import OrderForm from './../../client/components/OrderForm'
import Orders from './../../client/components/Orders'

class MainDashboard extends React.Component {

    constructor() {
        super();
        let height = window.innerHeight;
        let tableHeight = ((height / 2) / 3).toFixed(0) + "px";
        console.log("TABLE HEIGHT " + tableHeight)
        this.state = {
            pairs: [],
            currentSymbol: '',
            ws: null,
            data: null,
            lastPrice: 0,
            lastPriceStyle: '#000',
            ask: 0,
            bid: 0,
            orders: [],
            parentCount: null,
            parentPrice: null,
            parentType: null,
            currentPrice: '0',
            count: '1',
            total: '0',
            side: 'buy',
            benefits: {
                binance: {},
                bittrex: {},
                poloniex: {}
            },
            tableHeight: tableHeight
    }
        this.loadAllPairs = this.loadAllPairs.bind(this);
        this.renderPairs = this.renderPairs.bind(this);
        this.loadSnapshot = this.loadSnapshot.bind(this);
        this.connect = this.connect.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.handleNewData = this.handleNewData.bind(this);
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

        this.changeCurrentPrice = this.changeCurrentPrice.bind(this);
        this.changeCount = this.changeCount.bind(this);
        this.recalculateTotal = this.recalculateTotal.bind(this);
        this.loadBenefits = this.loadBenefits.bind(this);
        this.setSide = this.setSide.bind(this);

    }

    setSide(side) {
        this.setState({side: side}, () => {
            this.loadBenefits();
        })
    }

    changeCount(e) {
        if (e.target.value >= 0) {
            this.setState({count: e.target.value}, () => {
                this.recalculateTotal();
                this.loadBenefits();
            })
        }
    }

    componentDidMount() {
        this.loadAllPairs();
    }

    loadAllPairs() {
        fetch('/pairs/list',
            {
                credentials: 'same-origin',
            }
        ).then(results => {
            return results.json();
        }).then(data => {
            this.setState({pairs: data, currentSymbol: data[0]}, () => {
                this.loadSnapshot(this.state.currentSymbol, 20);
                this.loadBenefits();
                this.connect();
                this.loadOrderHistory(data[0])
                setInterval(() => {
                    this.loadOrderHistory(this.state.currentSymbol)
                }, 10000);
            })
        })
    }

    loadBenefits() {
        let url = "/order-benefits?symbol={symbol}&ordQty={ordQty}&side={side}"
            .replace("{symbol}", this.state.currentSymbol)
            .replace("{ordQty}", this.state.count)
            .replace("{side}", this.state.side)
        fetch(url,
            {
                credentials: 'same-origin',
            }
        ).then(results => {
            return results.json();
        }).then(data => {
            this.setState({benefits: data})
        })
    }

    loadOrderHistory(symbol) {
        fetch('/orderHistory?symbol=' + symbol,
            {
                credentials: 'same-origin',
            }
        ).then(results => {
            return results.json();
        }).then(data => {
            this.setState({orders: data})
        })
    }

    loadSnapshot(symbol, depth) {
        if (symbol && depth) {
            let url = "/api/v1/orderBook?symbol={SYMBOL}&depth={DEPTH}".replace("{SYMBOL}", symbol).replace("{DEPTH}", depth);
            fetch(url,
                {
                    credentials: 'same-origin',
                }
            ).then(results => {
                return results.json();
            }).then(data => {
                this.setState({
                    data: data, ask: data.asks[data.asks.length - 1].price,
                    bid: data.bids[0].price
                })
            })
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
                <tr style={{lineHeight: '20px', fontSize: '12px', cursor: 'pointer'}} key={i}>
                    <td onClick={() => {
                        this.changeCurrentSymbol(pairs[i])
                    }}>{pairs[i]}</td>
                </tr>
            )
        }
        return renderPairs;
    }

    changeCurrentSymbol(symbol) {
        this.setState({currentSymbol: symbol}, () => {
            this.disconnect();
            this.loadSnapshot(symbol, 20)
            this.connect();
            this.loadOrderHistory(symbol);
            this.loadBenefits();
        })

    }

    calculateTotalBids(array) {
        for (let i = 0; i < array.length; i++) {
            if (i - 1 < 0) {
                array[i].total = array[i].price * array[i].size;

            } else {
                array[i].total = array[i - 1].total + array[i].price * array[i].size
            }
        }
        return array;
    }

    calculateTotalAsks(array) {
        for (let i = array.length - 1; i >= 0; i--) {
            if (i + 1 >= array.length) {
                array[i].total = array[i].price * array[i].size;
            } else {
                array[i].total = array[i + 1].total + array[i].price * array[i].size
            }
        }
        return array;
    }

    calculatePercent(max, value) {
        return 100 * value / max
    }

    chooseOrderBookLine(data, type) {
        if (type == 'asks') {
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
            this.setState({currentPrice: price, count: count, total: total});
            $("#buy-form-link").trigger("click");
            return;
        }
        if (type == 'bids') {
            let price = data.price;
            this.setState({currentPrice: price})
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
            this.setState({currentPrice: price, count: count, total: total});
            return;
        }
    }

    renderAsks() {
        let renderData = [];
        let key = 0;
        if (this.state.data) {
            let asks = this.state.data.asks;
            this.calculateTotalAsks(asks);
            const maxAsk = asks.reduce(function (prev, current) {
                return (prev.total > current.total) ? prev : current
            })
            for (let i = 0; i < asks.length; i++, key++) {
                const percent = this.calculatePercent(maxAsk.total, asks[i].total).toFixed(6);
                let percentStyle = percent + '%';
                let divExchanges = [];
                let exchanges = asks[i].exchanges || [];
                for (let j = 0; j < exchanges.length; j++) {
                    let imagePath = "/resources/img/exchanges/{exchange}.png".replace("{exchange}", exchanges[j]);
                    let key = i + '' + j;
                    divExchanges.push(
                        <div key={key} className="col-md-1" style={{paddingLeft: '5px'}}>
                            <img style={{height: '15px', width: '15px'}} src={imagePath}>
                            </img>
                        </div>
                    )
                }
                renderData.push(
                    <tr onClick={() => {
                        this.chooseOrderBookLine(asks[i], 'asks')
                    }} style={{lineHeight: '20px'}} key={key}>
                        <td style={{width: '27%'}}>{asks[i].price.toFixed(8)}</td>
                        <td style={{width: '27%', color: '#e5494d'}}>{asks[i].size.toFixed(3)}</td>
                        <td style={{width: '27%'}}>
                            <div style={{width: '100%', paddingTop: '1px', paddingBottom: '1px'}}>
                                <div style={{
                                    width: percentStyle,
                                    backgroundColor: '#FCECEC'
                                }}>{asks[i].total.toFixed(9)}</div>
                            </div>
                        </td>
                        <td style={{width: '19%'}}>
                            <div className="row" style={{paddingLeft: '15px'}}>
                                {divExchanges}
                            </div>
                        </td>
                    </tr>
                )
            }
        }
        return renderData;
    }

    renderBids() {
        let renderData = [];
        let key = 0;
        if (this.state.data) {
            const bids = this.state.data.bids;
            this.calculateTotalBids(bids);
            const maxBid = bids.reduce(function (prev, current) {
                return (prev.total > current.total) ? prev : current
            })
            for (let i = 0; i < bids.length; i++, key++) {
                const percent = this.calculatePercent(maxBid.total, bids[i].total).toFixed(6);
                let percentStyle = percent + '%';
                let divExchanges = [];
                let exchanges = bids[i].exchanges || [];
                for (let j = 0; j < exchanges.length; j++) {
                    let imagePath = "/resources/img/exchanges/{exchange}.png".replace("{exchange}", exchanges[j]);
                    let key = i + '' + j;
                    divExchanges.push(
                        <div key={key} className="col-md-1" style={{paddingLeft: '5px'}}>
                            <img style={{height: '15px', width: '15px'}} src={imagePath}>
                            </img>
                        </div>
                    )
                }
                renderData.push(
                    <tr onClick={() => {
                        this.chooseOrderBookLine(bids[i], 'bids')
                    }} style={{lineHeight: '20px'}} key={key}>
                        <td style={{width: '27%'}}>{bids[i].price.toFixed(8)}</td>
                        <td style={{color: '#2051d3', width: '27%'}}>{bids[i].size.toFixed(3)}</td>
                        <td style={{width: '27%'}}>
                            <div style={{width: '100%', paddingTop: '1px', paddingBottom: '1px'}}>
                                <div style={{
                                    width: percentStyle,
                                    backgroundColor: '#EEF2FD'
                                }}>{bids[i].total.toFixed(9)}</div>
                            </div>
                        </td>
                        <td style={{width: '19%'}}>
                            <div className="row" style={{paddingLeft: '15px'}}>
                                {divExchanges}
                            </div>
                        </td>
                    </tr>
                )
            }
        }
        return renderData;
    }

    handleJqeuryScroll() {
        let enableScroll = $('body').attr('enableScroll');
        console.log(enableScroll)
        if (enableScroll == 'true') {
            $('#asks').scrollTop(1000);
            $('#bids').scrollTop(0);
        }
    }

    handleNewData(data) {
        const asks = data.asks;
        let stateAsks = this.state.data.asks;
        for (let i = 0; i < asks.length; i++) {
            let updated = false;
            for (let j = 0; j < stateAsks.length; j++) {
                if (asks[i].price == stateAsks[j].price) {
                    if (asks[i].size == 0) {
                        stateAsks.splice(j, 1);
                    } else {
                        stateAsks[j].size = asks[i].size;
                    }
                    updated = true;
                    break;
                }
            }
            if (!updated && asks[i].size != 0) {
                stateAsks.push(asks[i]);
            }
        }
        stateAsks = stateAsks.sort(this.sortAsks).slice(0, 20)
        stateAsks = stateAsks.sort(this.sortBids);
        const bids = data.bids;
        let stateBids = this.state.data.bids;
        for (let i = 0; i < bids.length; i++) {
            let updated = false;
            for (let j = 0; j < stateBids.length; j++) {
                if (bids[i].price == stateBids[j].price) {
                    if (bids[i].size == 0) {
                        stateBids.splice(j, 1);
                    } else {
                        stateBids[j].size = bids[i].size;
                    }
                    updated = true;
                    break;
                }
            }
            if (!updated && bids[i].size != 0) {
                stateBids.push(bids[i]);
            }
        }
        const maxBid = stateBids.reduce(function (prev, current) {
            return (prev.price > current.price) ? prev : current
        })
        stateBids = stateBids.sort(this.sortBids).slice(0, 20)
        let lastPriceStyle = "#e5494d";
        if (maxBid.price > this.state.lastPrice) {
            lastPriceStyle = "#2051d3";
        }
        this.handleJqeuryScroll();
        this.setState({
            data: {asks: stateAsks, bids: stateBids},
            lastPrice: maxBid.price,
            lastPriceStyle: lastPriceStyle,
            ask: stateAsks[stateAsks.length - 1].price,
            bid: stateBids[0].price
        })
    }

    //TODO:on page close disconect
    connect() {
        let url = 'ws://***REMOVED***/{SYMBOL}'.replace("{SYMBOL}", this.state.currentSymbol);
        let ws = new WebSocket(url);
        this.setState({ws: ws})
        let handleNewData = this.handleNewData;
        ws.onmessage = function (data) {
            handleNewData(JSON.parse(data.data));
        }
        console.log("Connected to " + url)
    }

    disconnect() {
        if (this.state.ws != null) {
            this.state.ws.close();
        }
        console.log("Disconnected");
    }


    changeCurrentPrice(e) {
        if (e.target.value >= 0) {
            this.setState({currentPrice: e.target.value}, () => {
                this.recalculateTotal();
            })
        }
    }

    recalculateTotal() {
        let total = this.state.count * this.state.currentPrice;
        this.setState({total: total})
    }


    render() {
        return (
            <div style={{
                fontWeight: 200
            }}>
                <div className="row row-eq-height">
                    <div
                        id="pairs"
                        style={{
                        borderColor: '#edf0f4',
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        // height: {height},
                        backgroundColor: '#fff'
                    }} className="col-md-2">
                        <div style={{
                            padding: '10px',
                            borderBottomColor: '#edf0f4',
                            borderBottomWidth: '1px',
                            borderBottomStyle: 'solid'
                        }}>
                            <span style={{color: '#4e5c6e', fontSize: '13px'}}>Пара</span>
                        </div>
                        <div>
                            <table style={{width: '100%', color: '#263241'}}>
                                <tbody>
                                {this.renderPairs()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div style={{
                        borderColor: '#edf0f4',
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        height: '50%',
                        // height: {height},
                        backgroundColor: '#fff'
                    }}
                         className="col-md-offset-7 col-md-3">
                        <div className="row" style={{padding: '10px'}}>
                            <div className="col-md-10">
                            <span style={{
                                color: '#4e5c6e',
                                fontSize: '13px'
                            }}>Биржевой стакан / {this.state.currentSymbol}</span>
                            </div>
                            <div className="col-md-2">
                                <span id="orderbook-align" style={{color: '#4e5c6e', cursor: 'pointer'}}
                                      className="glyphicon glyphicon glyphicon-sort" aria-hidden="true"></span>
                            </div>
                        </div>
                        <div style={{
                            borderBottomColor: '#edf0f4',
                            borderBottomWidth: '1px',
                            borderBottomStyle: 'solid'
                        }}>
                        </div>
                        <div>
                            <table style={{
                                width: '100%',
                                borderCollapse: 'collapse'
                            }}>
                                <thead>
                                <tr style={{color: '#7f8fa4', fontSize: '11px', lineHeight: '25px'}}>
                                    <td style={{borderBottom: ' 1px solid #edf0f4', width: '27%'}}>Цена</td>
                                    <td style={{borderBottom: ' 1px solid #edf0f4', width: '27%'}}>Кол-во</td>
                                    <td style={{borderBottom: ' 1px solid #edf0f4', width: '27%'}}>Сумма</td>
                                    <td style={{borderBottom: ' 1px solid #edf0f4', width: '19%'}}>Биржа</td>
                                </tr>
                                </thead>
                            </table>
                        </div>
                        <div id="asks" style={{overflowY: 'scroll'}}>
                            <table style={{
                                width: '100%'
                            }}>
                                <tbody style={{fontSize: '11px', color: '#263241'}}>
                                {this.renderAsks()}
                                </tbody>
                            </table>
                        </div>
                        <div style={{
                            padding: '7px', fontSize: '11px',
                            borderBottomColor: '#edf0f4',
                            borderBottomWidth: '1px',
                            borderBottomStyle: 'solid',
                            borderTopColor: '#edf0f4',
                            borderTopWidth: '1px',
                            borderTopStyle: 'solid'
                        }}>
                            <span style={{color: '#263241'}}>
                                ПОСЛЕДНЯЯ ЦЕНА: <span
                                style={{color: this.state.lastPriceStyle}}>{this.state.lastPrice.toFixed(8)}</span>
                            </span>
                        </div>
                        <div id="bids" style={{overflowY: 'scroll'}}>
                            <table style={{
                                width: '100%'
                            }}>
                                <tbody style={{fontSize: '11px', color: '#263241'}}>
                                {this.renderBids()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="row row-eq-height" style={{marginTop: '10px'}}>
                    <div className="col-md-9" style={{height: '100%', marginRight: '10px'}}>
                        <Orders orders={this.state.orders}/>
                    </div>
                    <div id="order-form" className="col-md-3" style={{padding: '0px', margin: '0px'}}>
                        <OrderForm changeCount={this.changeCount} changeCurrentPrice={this.changeCurrentPrice}
                                   benefits={this.state.benefits}
                                   setSide={this.setSide}
                                   count={this.state.count} currentPrice={this.state.currentPrice}
                                   total={this.state.total}
                                   loadOrderHistory={this.loadOrderHistory} pair={this.state.currentSymbol}
                                   ask={this.state.ask} bid={this.state.bid}
                                   last={this.state.lastPrice}/>
                    </div>
                </div>
            </div>
        );
    }
}
;

export default MainDashboard;