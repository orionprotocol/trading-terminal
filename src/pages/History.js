import React from 'react';
import TopMenu from '../components/TopMenu'
import Sidebar from '../components/Sidebar'

function History() {
	return (
    <div>
        <TopMenu/>
        <div class="history">
        <Sidebar/>

            <div class="my-container">
                <h1>Transaction History</h1>
                <div class="my-row">
                    <div class="history-table">
                        <p class="heading">Deposit History</p>
                        <div class="table-wrapper">
                            <div class="top">
                                <div class="date">
                                    <div class="date-1">
                                        <input class="datepicker-here pick" type="text"/><i class="fa fa-calendar-o" aria-hidden="true"></i>
                                    </div><span class="hr"></span>
                                    <div class="date-1">
                                        <input class="datepicker-here pick" type="text"/><i class="fa fa-calendar-o" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div class="all">
                                    <select class="currency-select-1" name>
                                        <option value="">BTC</option>
                                        <option value="">BTC</option>
                                    </select>
                                </div>
                                <div class="all status">
                                    <select class="currency-select-1" name>
                                        <option value="">Any Status</option>
                                        <option value="">Any Status</option>
                                    </select>
                                </div>
                            </div>
                            <div class="table-content">
                                <div class="titles">
                                    <div class="title"><span>Date</span><i class="fa fa-angle-down" aria-hidden="true"></i></div>
                                    <div class="title short"><span class="short">Asset</span><i class="fa fa-angle-down" aria-hidden="true"></i></div>
                                    <div class="title"><span>Amount</span><i class="fa fa-angle-down" aria-hidden="true"></i></div>
                                    <div class="title status"><span>Status</span><i class="fa fa-angle-down" aria-hidden="true"></i></div>
                                </div>
                                <div class="lines">
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell open status">Open</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell cancel status">Cancel</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                </div>
                            </div>
                            <div class="pagination"><i class="fa fa-angle-left arrow-prev" aria-hidden="true"></i><span class="num">1</span><span class="num active">2</span><span class="num">3</span><span class="num">...</span><span class="num">8</span><i class="fa fa-angle-right arrow-next" aria-hidden="true"></i></div>
                        </div>
                    </div>
                    <div class="history-table">
                        <p class="heading">Withdraw History</p>
                        <div class="table-wrapper">
                            <div class="top">
                                <div class="date">
                                    <div class="date-1">
                                        <input class="datepicker-here pick" type="text"/><i class="fa fa-calendar-o" aria-hidden="true"></i>
                                    </div><span class="hr"></span>
                                    <div class="date-1">
                                        <input class="datepicker-here pick" type="text"/><i class="fa fa-calendar-o" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div class="all">
                                    <select class="currency-select-1" name>
                                        <option value="">BTC</option>
                                        <option value="">BTC</option>
                                    </select>
                                </div>
                                <div class="all status">
                                    <select class="currency-select-1" name>
                                        <option value="">Any Status</option>
                                        <option value="">Any Status</option>
                                    </select>
                                </div>
                            </div>
                            <div class="table-content">
                                <div class="titles">
                                    <div class="title"><span>Date</span><i class="fa fa-angle-down" aria-hidden="true"></i></div>
                                    <div class="title short"><span class="short">Asset</span><i class="fa fa-angle-down" aria-hidden="true"></i></div>
                                    <div class="title"><span>Amount</span><i class="fa fa-angle-down" aria-hidden="true"></i></div>
                                    <div class="title status"><span>Status</span><i class="fa fa-angle-down" aria-hidden="true"></i></div>
                                </div>
                                <div class="lines">
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                    <div class="line"><span class="cell time">09.09.2019 12:42:41</span>
                                        <div class="cell short emp btc"><img src="./img/btc-color.png" alt="hist"/><span>BTC</span></div><span class="cell amount"><span class="title-m">Amount</span> <span>0.00448236</span></span><span class="cell filled status">Filled</span>
                                    </div>
                                </div>
                            </div>
                            <div class="pagination"><i class="fa fa-angle-left arrow-prev" aria-hidden="true"></i><span class="num">1</span><span class="num active">2</span><span class="num">3</span><span class="num">...</span><span class="num">8</span><i class="fa fa-angle-right arrow-next" aria-hidden="true"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
	);
}

export default History;
