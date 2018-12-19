import React from 'react';
import ReactDOM from 'react-dom';
import {MomentJS} from './../../service/MomentJS'

class MainDashboard extends React.Component {

    constructor() {
        super();
        this.state = {
            pairs: [],
            currentSymbol: '',
            ws: null,
            data: null,
            lastPrice: 0,
            lastPriceStyle: '#000'
        }
        this.loadAllPairs = this.loadAllPairs.bind(this);
        this.renderPairs = this.renderPairs.bind(this);
        this.loadSnapshot = this.loadSnapshot.bind(this);
        this.connect = this.connect.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.handleNewData = this.handleNewData.bind(this);
        this.sort = this.sort.bind(this);
        this.changeCurrentSymbol = this.changeCurrentSymbol.bind(this);
        this.calculateTotal = this.calculateTotal.bind(this);
        this.calculatePercent = this.calculatePercent.bind(this);
        this.renderAsks = this.renderAsks.bind(this);
        this.renderBids = this.renderBids.bind(this);
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
                this.loadSnapshot(this.state.currentSymbol, 10);
                this.connect();
            })
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
                this.setState({data: data})
            })
        }
    }

    sort(a, b) {
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
        this.setState({currentSymbol: symbol},()=>{
            this.disconnect();
            this.loadSnapshot(symbol, 10)
            this.connect();
        })

    }

    calculateTotal(array) {
        for (let i = 0; i < array.length; i++) {
            if (i - 1 < 0) {
                array[i].total = array[i].price * array[i].size;

            } else {
                array[i].total = array[i - 1].total + array[i].price * array[i].size
            }
        }
        return array;
    }

    calculatePercent(max, value) {
        return 100 * value / max
    }

    renderAsks() {
        let renderData = [];
        let key = 0;
        if (this.state.data) {
            let asks = this.state.data.asks;
            this.calculateTotal(asks);
            const maxAsk = asks.reduce(function (prev, current) {
                return (prev.total > current.total) ? prev : current
            })
            for (let i = 0; i < asks.length; i++, key++) {
                const percent = this.calculatePercent(maxAsk.total, asks[i].total).toFixed(6);
                let percentStyle = percent + '%';
                renderData.push(
                    <tr style={{lineHeight: '20px'}} key={key}>
                        <td>{asks[i].price.toFixed(8)}</td>
                        <td style={{color: '#e5494d'}}>{asks[i].size.toFixed(6)}</td>
                        <td>
                            <div style={{width: '100%', paddingTop: '1px', paddingBottom: '1px'}}>
                                <div style={{
                                    width: percentStyle,
                                    backgroundColor: '#FCECEC'
                                }}>{asks[i].total.toFixed(6)}</div>
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
            this.calculateTotal(bids);
            const maxBid = bids.reduce(function (prev, current) {
                return (prev.total > current.total) ? prev : current
            })
            for (let i = 0; i < bids.length; i++, key++) {
                const percent = this.calculatePercent(maxBid.total, bids[i].total).toFixed(6);
                let percentStyle = percent + '%';
                renderData.push(
                    <tr style={{lineHeight: '20px'}} key={key}>
                        <td>{bids[i].price.toFixed(8)}</td>
                        <td style={{color: '#2051d3'}}>{bids[i].size.toFixed(6)}</td>
                        <td>
                            <div style={{width: '100%', paddingTop: '1px', paddingBottom: '1px'}}>
                                <div style={{
                                    width: percentStyle,
                                    backgroundColor: '#EEF2FD'
                                }}>{bids[i].total.toFixed(6)}</div>
                            </div>
                        </td>
                    </tr>
                )
            }
        }
        return renderData;

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
        stateAsks = stateAsks.sort(this.sort).slice(0, 20)
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
        stateBids = stateBids.sort(this.sort).slice(0, 20)
        let lastPriceStyle = "#e5494d";
        if (maxBid.price > this.state.lastPrice) {
            lastPriceStyle = "#2051d3";
        }
        this.setState({
            data: {asks: stateAsks, bids: stateBids},
            lastPrice: maxBid.price,
            lastPriceStyle: lastPriceStyle
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


    render() {
        return (
            <div>
                <div className="row">
                    <div style={{borderColor: '#edf0f4', borderWidth: '2px', borderStyle: 'solid', marginLeft: '10px'}}
                         className="col-md-2">
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
                    <div style={{borderColor: '#edf0f4', borderWidth: '2px', borderStyle: 'solid', marginLeft: '20px'}}
                         className="col-md-4">
                        <div style={{
                            padding: '10px',
                            borderBottomColor: '#edf0f4',
                            borderBottomWidth: '1px',
                            borderBottomStyle: 'solid'
                        }}>
                            <span style={{
                                color: '#4e5c6e',
                                fontSize: '13px'
                            }}>Биржевой стакан / {this.state.currentSymbol}</span>
                        </div>
                        <div>
                            <table style={{
                                width: '100%',
                                borderCollapse: 'collapse'
                            }}>
                                <thead>
                                <tr style={{color: '#7f8fa4', fontSize: '11px', lineHeight: '25px'}}>
                                    <td style={{borderBottom: ' 1px solid #edf0f4', width: '33%'}}>Цена</td>
                                    <td style={{borderBottom: ' 1px solid #edf0f4', width: '35%'}}>Кол-во</td>
                                    <td style={{borderBottom: ' 1px solid #edf0f4', width: '32%'}}>Сумма</td>
                                </tr>
                                </thead>
                            </table>
                        </div>
                        <div id="asks" style={{height: '225px', overflowY: 'scroll'}}>
                            <table style={{
                                width: '100%'
                            }}>
                                <tbody style={{fontSize: '11px', color: '#263241'}}>
                                {this.renderAsks()}
                                </tbody>
                            </table>
                        </div>
                        <div style={{padding: '7px', fontSize: '11px'}}>
                            <span style={{color: '#263241'}}>
                                ПОСЛЕДНЯЯ ЦЕНА: <span
                                style={{color: this.state.lastPriceStyle}}>{this.state.lastPrice.toFixed(8)}</span>
                            </span>
                        </div>
                        <div id="bids" style={{height: '225px', overflowY: 'scroll'}}>
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
            </div>
        );
    }
}
;

export default MainDashboard;