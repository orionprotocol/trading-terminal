import React from 'react'
import './index.css'

const Orders = _ => {

    return (
        <div className="table js-history js-panel-item">
        <div className="top">
            <div className="big-toggler"><span className="active">Orders</span><span>History</span></div>
            <div className="date">
                <div className="date-1">
                    <input className="datepicker-here pick" type="text"/><i className="fa fa-calendar-o" aria-hidden="true"></i>
                </div><span className="hr"></span>
                <div className="date-1">
                    <input className="datepicker-here pick" type="text"/><i className="fa fa-calendar-o" aria-hidden="true"></i>
                </div>
            </div>
            <div className="currency-all">
                <div className="currency">
                    <select className="currency-select-1" name="sel">
                        <option value="">ETH</option>
                        <option value="">ETH</option>
                    </select>
                    <span className="sep">/</span>
                    <select className="currency-select-1" name="sel">
                        <option value="">BTC</option>
                        <option value="">ETH</option>
                    </select>
                </div>
                <div className="all">
                    <select className="currency-select-1" name="sel">
                        <option value="">All</option>
                        <option value="">All</option>
                    </select>
                </div>
            </div>
        </div>
        <div className="table-content">
            <div className="titles">
                <div className="title short"><span>Type</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                <div className="title"><span>Pair</span><i className="fa fa-angle-down" aria-hidden="true"> </i></div>
                <div className="title time"><span>Time</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                <div className="title"><span>Amount</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                <div className="title"><span>Price</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                <div className="title status"><span>Status</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                <div className="title"><span>Total</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
            </div>
            <div className="lines">
                <div className="line">
                    <div className="line-big">
                        <div className="line-big-main js-line-big-main"><span className="cell short emp">Sell</span><span className="cell">ETH / BTC</span><span className="cell time"><span>09.09.2019</span> <span> 12:42:4</span></span><span className="cell">0,004422124</span><span className="cell">0,000042142</span><span className="cell filled status">Filled</span><span className="cell">1,4422124</span></div>
                        <div className="subtable">
                            <div className="subline">
                                <div className="subtitles">
                                    <div className="subtitle"><span>Exchange</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                    <div className="subtitle right"><span>ID</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                    <div className="subtitle right"><span>Amount</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                    <div className="subtitle right"><span>Price</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                    <div className="subtitle right"><span>Status</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                </div>
                                <div className="subcontent">
                                    <div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right filled">Filled</span></div>
                                    <div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right open">Filled</span></div>
                                    <div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right cancel">Filled</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="line-small">
                        <div className="cell cell-top"><span className="data">Sell</span><span className="data-eth">ETH / BTC</span><span className="filled status">Filled</span></div>
                        <div className="cell"><span className="sub-title">Amount</span><span className="data-text">0.004422124</span><span className="data-text date">09.09.2019</span></div>
                        <div className="cell"><span className="sub-title">Price</span><span className="data-text">0.004422124</span><span className="data-text date">12:42:09</span></div>
                        <div className="cell"><span className="sub-title">Total</span><span className="data-text">0.004422124</span></div>
                    </div>
                </div>
                <div className="line">
                    <div className="line-big">
                        <div className="line-big-main js-line-big-main"><span className="cell short emp">Sell</span><span className="cell">ETH / BTC</span><span className="cell time"><span>09.09.2019</span> <span> 12:42:4</span></span><span className="cell">0,004422124</span><span className="cell">0,000042142</span><span className="cell filled status">Filled</span><span className="cell">1,4422124</span></div>
                        <div className="subtable">
                            <div className="subline">
                                <div className="subtitles">
                                    <div className="subtitle"><span>Exchange</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                    <div className="subtitle right"><span>ID</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                    <div className="subtitle right"><span>Amount</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                    <div className="subtitle right"><span>Price</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                    <div className="subtitle right"><span>Status</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                </div>
                                <div className="subcontent">
                                    <div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right filled">Filled</span></div>
                                    <div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right open">Filled</span></div>
                                    <div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right cancel">Filled</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="line-small">
                        <div className="cell cell-top"><span className="data">Sell</span><span className="data-eth">ETH / BTC</span><span className="filled status">Filled</span></div>
                        <div className="cell"><span className="sub-title">Amount</span><span className="data-text">0.004422124</span><span className="data-text date">09.09.2019</span></div>
                        <div className="cell"><span className="sub-title">Price</span><span className="data-text">0.004422124</span><span className="data-text date">12:42:09</span></div>
                        <div className="cell"><span className="sub-title">Total</span><span className="data-text">0.004422124</span></div>
                    </div>
                </div>
                <div className="line">
                    <div className="line-big">
                        <div className="line-big-main js-line-big-main"><span className="cell short emp">Sell</span><span className="cell">ETH / BTC</span><span className="cell time"><span>09.09.2019</span> <span> 12:42:4</span></span><span className="cell">0,004422124</span><span className="cell">0,000042142</span><span className="cell filled status">Filled</span><span className="cell">1,4422124</span></div>
                        <div className="subtable">
                            <div className="subline">
                                <div className="subtitles">
                                    <div className="subtitle"><span>Exchange</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                    <div className="subtitle right"><span>ID</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                    <div className="subtitle right"><span>Amount</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                    <div className="subtitle right"><span>Price</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                    <div className="subtitle right"><span>Status</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                </div>
                                <div className="subcontent">
                                    <div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right filled">Filled</span></div>
                                    <div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right open">Filled</span></div>
                                    <div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right cancel">Filled</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="line-small">
                        <div className="cell cell-top"><span className="data">Sell</span><span className="data-eth">ETH / BTC</span><span className="filled status">Filled</span></div>
                        <div className="cell"><span className="sub-title">Amount</span><span className="data-text">0.004422124</span><span className="data-text date">09.09.2019</span></div>
                        <div className="cell"><span className="sub-title">Price</span><span className="data-text">0.004422124</span><span className="data-text date">12:42:09</span></div>
                        <div className="cell"><span className="sub-title">Total</span><span className="data-text">0.004422124</span></div>
                    </div>
                </div>
                <div className="line">
                    <div className="line-big">
                        <div className="line-big-main js-line-big-main"><span className="cell short emp">Sell</span><span className="cell">ETH / BTC</span><span className="cell time"><span>09.09.2019</span> <span> 12:42:4</span></span><span className="cell">0,004422124</span><span className="cell">0,000042142</span><span className="cell filled status">Filled</span><span className="cell">1,4422124</span></div>
                        <div className="subtable">
                            <div className="subline">
                                <div className="subtitles">
                                    <div className="subtitle"><span>Exchange</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                    <div className="subtitle right"><span>ID</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                    <div className="subtitle right"><span>Amount</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                    <div className="subtitle right"><span>Price</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                    <div className="subtitle right"><span>Status</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                </div>
                                <div className="subcontent">
                                    <div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right filled">Filled</span></div>
                                    <div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right open">Filled</span></div>
                                    <div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right cancel">Filled</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="line-small">
                        <div className="cell cell-top"><span className="data">Sell</span><span className="data-eth">ETH / BTC</span><span className="filled status">Filled</span></div>
                        <div className="cell"><span className="sub-title">Amount</span><span className="data-text">0.004422124</span><span className="data-text date">09.09.2019</span></div>
                        <div className="cell"><span className="sub-title">Price</span><span className="data-text">0.004422124</span><span className="data-text date">12:42:09</span></div>
                        <div className="cell"><span className="sub-title">Total</span><span className="data-text">0.004422124</span></div>
                    </div>
                </div>
                <div className="line">
                    <div className="line-big">
                        <div className="line-big-main js-line-big-main"><span className="cell short emp">Sell</span><span className="cell">ETH / BTC</span><span className="cell time"><span>09.09.2019</span> <span> 12:42:4</span></span><span className="cell">0,004422124</span><span className="cell">0,000042142</span><span className="cell filled status">Filled</span><span className="cell">1,4422124</span></div>
                        <div className="subtable">
                            <div className="subline">
                                <div className="subtitles">
                                    <div className="subtitle"><span>Exchange</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                    <div className="subtitle right"><span>ID</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                    <div className="subtitle right"><span>Amount</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                    <div className="subtitle right"><span>Price</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                    <div className="subtitle right"><span>Status</span><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                </div>
                                <div className="subcontent">
                                    <div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right filled">Filled</span></div>
                                    <div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right open">Filled</span></div>
                                    <div className="subline-d"><span>BINANCE</span><span className="right">241</span><span className="right">24214,41</span><span className="right">0,0000421421</span><span className="right cancel">Filled</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="line-small">
                        <div className="cell cell-top"><span className="data">Sell</span><span className="data-eth">ETH / BTC</span><span className="filled status">Filled</span></div>
                        <div className="cell"><span className="sub-title">Amount</span><span className="data-text">0.004422124</span><span className="data-text date">09.09.2019</span></div>
                        <div className="cell"><span className="sub-title">Price</span><span className="data-text">0.004422124</span><span className="data-text date">12:42:09</span></div>
                        <div className="cell"><span className="sub-title">Total</span><span className="data-text">0.004422124</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Orders