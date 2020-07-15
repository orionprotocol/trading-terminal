import React from 'react';
import TopMenu from '../components/TopMenu';
import Sidebar from '../components/Sidebar';
import SwapSelector from '../components/Swap';
import DatePicker from 'react-datepicker';
import '../css/common.scss';

class Swap extends React.Component {
    constructor( props ){
        super( props )
        this.state = {startDate: new Date()};
    }
    
    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    render() {
        return (
            <div className="page">
                <Sidebar />
                <div className="page__content">
                    <div className="page__box page__box_column">
                        <div className="page__title page__title_center">Choose swapping assets</div>
                        <div className="plate">
                            <form action="" className="form form_swap">
                                <div className="swapChoose">

                                    <div className="swapChoose__item">
                                        <div className="form__row">
                                            <div className="form__label">From:</div>
                                            <div className="form__field form__field_duble">
                                                <div className="formSelect">
                                                    <div className="formSelect__current">
                                                        <div className="formSelect__logo icon_binance"></div>
                                                        <div className="formSelect__name">RNC</div>
                                                        <i className="icon_carret"></i>
                                                    </div>
                                                    <div className="formSelect__drop">
                                                        <div className="formSelect__row">
                                                            <div className="formSelect__item">
                                                                <div className="formSelect__logo icon_binance"></div>
                                                                <div className="formSelect__name">RNC</div>
                                                            </div>
                                                            <div className="formSelect__item">
                                                                <div className="formSelect__logo icon_binance"></div>
                                                                <div className="formSelect__name">RNC</div>
                                                            </div>
                                                            <div className="formSelect__item">
                                                                <div className="formSelect__logo icon_binance"></div>
                                                                <div className="formSelect__name">RNC</div>
                                                            </div>
                                                        </div>
                                                        <div className="formSelect__search">
                                                            <input type="text" placeholder="Try “DAI”"/>
                                                            <i className="icon_search"></i>
                                                        </div>
                                                        <div className="formSelect__list">
                                                            <div className="formSelect__option">
                                                                <div className="formSelect__logo icon_binance"></div>
                                                                <div className="formSelect__name">RNC</div>
                                                            </div>
                                                            <div className="formSelect__option">
                                                                <div className="formSelect__logo icon_binance"></div>
                                                                <div className="formSelect__name">RNC</div>
                                                            </div>
                                                            <div className="formSelect__option">
                                                                <div className="formSelect__logo icon_binance"></div>
                                                                <div className="formSelect__name">RNC</div>
                                                            </div>
                                                            <div className="formSelect__option">
                                                                <div className="formSelect__logo icon_binance"></div>
                                                                <div className="formSelect__name">RNC</div>
                                                            </div>
                                                            <div className="formSelect__option">
                                                                <div className="formSelect__logo icon_binance"></div>
                                                                <div className="formSelect__name">RNC</div>
                                                            </div>
                                                            <div className="formSelect__option">
                                                                <div className="formSelect__logo icon_binance"></div>
                                                                <div className="formSelect__name">RNC</div>
                                                            </div>
                                                            <div className="formSelect__option">
                                                                <div className="formSelect__logo icon_binance"></div>
                                                                <div className="formSelect__name">RNC</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <input type="number" value="0"/>
                                            </div>
                                            <div className="form__sub">
                                                <span>Total available amount of ETH: 0,35288244</span>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="swapChoose__replace">
                                        <i className="icon_change"></i>
                                    </div>

                                    <div className="swapChoose__item">
                                        <div className="form__row">
                                            <div className="form__label">To:</div>
                                            <div className="form__field form__field_duble">
                                                <div className="formSelect">
                                                    <div className="formSelect__current">
                                                        <div className="formSelect__logo icon_binance"></div>
                                                        <div className="formSelect__name">RNC</div>
                                                        <i className="icon_carret"></i>
                                                    </div>
                                                    <div className="formSelect__drop">
                                                        <div className="formSelect__row">
                                                            <div className="formSelect__item">
                                                                <div className="formSelect__logo icon_binance"></div>
                                                                <div className="formSelect__name">RNC</div>
                                                            </div>
                                                            <div className="formSelect__item">
                                                                <div className="formSelect__logo icon_binance"></div>
                                                                <div className="formSelect__name">RNC</div>
                                                            </div>
                                                            <div className="formSelect__item">
                                                                <div className="formSelect__logo icon_binance"></div>
                                                                <div className="formSelect__name">RNC</div>
                                                            </div>
                                                        </div>
                                                        <div className="formSelect__search">
                                                            <input type="text" placeholder="Try “DAI”"/>
                                                            <i className="icon_search"></i>
                                                        </div>
                                                        <div className="formSelect__list">
                                                            <div className="formSelect__option">
                                                                <div className="formSelect__logo icon_binance"></div>
                                                                <div className="formSelect__name">RNC</div>
                                                            </div>
                                                            <div className="formSelect__option">
                                                                <div className="formSelect__logo icon_binance"></div>
                                                                <div className="formSelect__name">RNC</div>
                                                            </div>
                                                            <div className="formSelect__option">
                                                                <div className="formSelect__logo icon_binance"></div>
                                                                <div className="formSelect__name">RNC</div>
                                                            </div>
                                                            <div className="formSelect__option">
                                                                <div className="formSelect__logo icon_binance"></div>
                                                                <div className="formSelect__name">RNC</div>
                                                            </div>
                                                            <div className="formSelect__option">
                                                                <div className="formSelect__logo icon_binance"></div>
                                                                <div className="formSelect__name">RNC</div>
                                                            </div>
                                                            <div className="formSelect__option">
                                                                <div className="formSelect__logo icon_binance"></div>
                                                                <div className="formSelect__name">RNC</div>
                                                            </div>
                                                            <div className="formSelect__option">
                                                                <div className="formSelect__logo icon_binance"></div>
                                                                <div className="formSelect__name">RNC</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <input type="number" value="0" />
                                            </div>
                                            <div className="form__sub">
                                                <span>Total available amount of ETH: 0,35288244</span>
                                                <span> 1 DAI ~ 0.001745 ETH</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="swapChoose">
                                    <div className="swapChoose__item">
                                        <div className="form__info">
                                            <i className="icon_alert"></i> Price can be changed while processing your transaction. Select max price deviation in Advanced section
                                        </div>
                                    </div>
                                    <div className="swapChoose__replace">
                                    </div>
                                    <div className="swapChoose__item">
                                        <div className="formCollapse">
                                            <input type="checkbox" className="formCollapse__swicher" name="" id="collapsed"/>
                                            <label htmlFor="collapsed" className="formCollapse__toggle">
                                                Advanced
                                                <i className="icon_carret"></i>
                                            </label>
                                            <div className="formCollapse__content">
                                                <div className="form__row">
                                                    <label className="form__label form__label_small">Select fee type</label>
                                                    <div className="formGroup">
                                                        <label className="formCheck">
                                                            <input type="radio" name="feeType" id="" checked />
                                                            <span className="formCheck__name">Fast</span>
                                                        </label>
                                                        <label className="formCheck">
                                                            <input type="radio" name="feeType" id=""/>
                                                            <span className="formCheck__name">Normal</span>
                                                        </label>
                                                        <label className="formCheck">
                                                            <input type="radio" name="feeType" id=""/>
                                                            <span className="formCheck__name">Econom</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <hr className="form__hr"/>
                                                <div className="form__row">
                                                    <label className="form__label form__label_small">Select max price deviation</label>
                                                    <div className="formGroup">
                                                        <label className="formCheck">
                                                            <input type="radio" name="priceDeviation" id=""/>
                                                            <span className="formCheck__name">3%</span>
                                                        </label>
                                                        <label className="formCheck">
                                                            <input type="radio" name="priceDeviation" id=""/>
                                                            <span className="formCheck__name">Custom</span>
                                                            <input className="form__control formCheck__opt" type="text"/>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form__action">
                                    <button type="submit" className="btn btn_grade btn_lg">Swap Now</button>
                                </div>
                                <div className="form__terms">By Swapping, you agree to the <a href="">Terms and Conditions</a></div>
                            </form>
                        </div>

                        <div className="plate">
                            <div className="plate__title">Swap history</div>

                            <div className="swapHistory">
                                <div className="swapHistory__top">
                                    <div className="swapHistory__choose">
                                        <div className="form__field">
                                            <div className="formSelect">
                                                <div className="formSelect__current">
                                                    <div className="formSelect__name">RNC</div>
                                                    <i className="icon_carret"></i>
                                                </div>
                                                <div className="formSelect__drop">
                                                    <div className="formSelect__list">
                                                        <div className="formSelect__option">
                                                            <div className="formSelect__name">RNC</div>
                                                        </div>
                                                        <div className="formSelect__option">
                                                            <div className="formSelect__name">RNC</div>
                                                        </div>
                                                        <div className="formSelect__option">
                                                            <div className="formSelect__name">RNC</div>
                                                        </div>
                                                        <div className="formSelect__option">
                                                            <div className="formSelect__name">RNC</div>
                                                        </div>
                                                        <div className="formSelect__option">
                                                            <div className="formSelect__name">RNC</div>
                                                        </div>
                                                        <div className="formSelect__option">
                                                            <div className="formSelect__name">RNC</div>
                                                        </div>
                                                        <div className="formSelect__option">
                                                            <div className="formSelect__name">RNC</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <i className="icon_arrow"></i>
                                        <div className="form__field">
                                            <div className="formSelect">
                                                <div className="formSelect__current">
                                                    <div className="formSelect__name">RNC</div>
                                                    <i className="icon_carret"></i>
                                                </div>
                                                <div className="formSelect__drop">
                                                    <div className="formSelect__list">
                                                        <div className="formSelect__option">
                                                            <div className="formSelect__name">RNC</div>
                                                        </div>
                                                        <div className="formSelect__option">
                                                            <div className="formSelect__name">RNC</div>
                                                        </div>
                                                        <div className="formSelect__option">
                                                            <div className="formSelect__name">RNC</div>
                                                        </div>
                                                        <div className="formSelect__option">
                                                            <div className="formSelect__name">RNC</div>
                                                        </div>
                                                        <div className="formSelect__option">
                                                            <div className="formSelect__name">RNC</div>
                                                        </div>
                                                        <div className="formSelect__option">
                                                            <div className="formSelect__name">RNC</div>
                                                        </div>
                                                        <div className="formSelect__option">
                                                            <div className="formSelect__name">RNC</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swapHistory__dateGroupp">
                                        <div className="formDate">
                                            <DatePicker
                                                selected={this.state.startDate}
                                                onChange={this.handleChange}
                                                id="start-date"
                                            />
                                            <label for="start-date" className="icon_date"></label>
                                        </div>
                                        <div className="formDate__line"></div>
                                        <div className="formDate">
                                            <DatePicker
                                                selected={this.state.startDate}
                                                onChange={this.handleChange}
                                                id="end-date"
                                            />
                                            <label for="end-date" className="icon_date"></label>
                                        </div>
                                    </div>
                                </div>
                                <div className="swapTable">
                                    <div className="swapTable__row swapTable__header">
                                        <div className="swapTable__col">Date</div>
                                        <div className="swapTable__col">From</div>
                                        <div className="swapTable__col">To</div>
                                        <div className="swapTable__col">Average price</div>
                                        <div className="swapTable__col">Status</div>
                                    </div>
                                    <div className="swapTable__row">
                                        <div className="swapTable__col">
                                            <div className="swapTable__date">09.09.2019 12:42:41</div>
                                        </div>
                                        <div className="swapTable__col">
                                            <div className="swapTable__item swapTable__from">
                                                <i className="swapTable__coin icon_binance"></i>
                                                ETC
                                                <i className="swapTable__arrow icon_arrow"></i>
                                            </div>
                                        </div>
                                        <div className="swapTable__col">
                                            <div className="swapTable__item swapTable__to">
                                                <i className="swapTable__coin icon_binance"></i>
                                                ETC
                                            </div>
                                        </div>
                                        <div className="swapTable__col">~0.123</div>
                                        <div className="swapTable__col">
                                            <div className="swapTable__status swapTable__status_panding">
                                                Pending
                                                <i className="swapTable__toggle icon_carret"></i>
                                            </div>
                                        </div>
                                        <div className="swapTable__drop swapTable__drop_open">
                                            <div className="swapTable__row swapTable__header">
                                                <div className="swapTable__col">Side</div>
                                                <div className="swapTable__col">Exchange</div>
                                                <div className="swapTable__col">Amount</div>
                                                <div className="swapTable__col">Price</div>
                                                <div className="swapTable__col">Status</div>
                                            </div>
                                            <div className="swapTable__row">
                                                <div className="swapTable__col">
                                                    <span className="txt_danger">Sell</span>
                                                </div>
                                                <div className="swapTable__col">Binance</div>
                                                <div className="swapTable__col">0.05 ETC</div>
                                                <div className="swapTable__col">0.23</div>
                                                <div className="swapTable__col">Partial</div>
                                            </div>
                                            <div className="swapTable__row">
                                                <div className="swapTable__col">
                                                    <span className="txt_warning">Buy</span>
                                                </div>
                                                <div className="swapTable__col">Poloniex</div>
                                                <div className="swapTable__col">14 ORN</div>
                                                <div className="swapTable__col">0.24</div>
                                                <div className="swapTable__col">Partial</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swapTable__row">
                                        <div className="swapTable__col">
                                            <div className="swapTable__date">09.09.2019 12:42:41</div>
                                        </div>
                                        <div className="swapTable__col">
                                            <div className="swapTable__item swapTable__from">
                                                <i className="swapTable__coin icon_binance"></i>
                                                ETC
                                                <i className="swapTable__arrow icon_arrow"></i>
                                            </div>
                                        </div>
                                        <div className="swapTable__col">
                                            <div className="swapTable__item swapTable__to">
                                                <i className="swapTable__coin icon_binance"></i>
                                                ETC
                                            </div>
                                        </div>
                                        <div className="swapTable__col">~0.123</div>
                                        <div className="swapTable__col">
                                            <div className="swapTable__status swapTable__status_filled">
                                                Filled
                                                <i className="swapTable__toggle icon_carret"></i>
                                            </div>
                                        </div>
                                        <div className="swapTable__drop">
                                            <div className="swapTable__row swapTable__header">
                                                <div className="swapTable__col">Side</div>
                                                <div className="swapTable__col">Exchange</div>
                                                <div className="swapTable__col">Amount</div>
                                                <div className="swapTable__col">Price</div>
                                                <div className="swapTable__col">Status</div>
                                            </div>
                                            <div className="swapTable__row">
                                                <div className="swapTable__col">
                                                    <span className="txt_danger">Sell</span>
                                                </div>
                                                <div className="swapTable__col">Binance</div>
                                                <div className="swapTable__col">0.05 ETC</div>
                                                <div className="swapTable__col">0.23</div>
                                                <div className="swapTable__col">Partial</div>
                                            </div>
                                            <div className="swapTable__row">
                                                <div className="swapTable__col">
                                                    <span className="txt_warning">Buy</span>
                                                </div>
                                                <div className="swapTable__col">Poloniex</div>
                                                <div className="swapTable__col">14 ORN</div>
                                                <div className="swapTable__col">0.24</div>
                                                <div className="swapTable__col">Partial</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swapTable__row">
                                        <div className="swapTable__col">
                                            <div className="swapTable__date">09.09.2019 12:42:41</div>
                                        </div>
                                        <div className="swapTable__col">
                                            <div className="swapTable__item swapTable__from">
                                                <i className="swapTable__coin icon_binance"></i>
                                                ETC
                                                <i className="swapTable__arrow icon_arrow"></i>
                                            </div>
                                        </div>
                                        <div className="swapTable__col">
                                            <div className="swapTable__item swapTable__to">
                                                <i className="swapTable__coin icon_binance"></i>
                                                ETC
                                            </div>
                                        </div>
                                        <div className="swapTable__col">~0.123</div>
                                        <div className="swapTable__col">
                                            <div className="swapTable__status swapTable__status_panding">
                                                Pending
                                                <i className="swapTable__toggle icon_carret"></i>
                                            </div>
                                        </div>
                                        <div className="swapTable__drop">
                                            <div className="swapTable__row swapTable__header">
                                                <div className="swapTable__col">Side</div>
                                                <div className="swapTable__col">Exchange</div>
                                                <div className="swapTable__col">Amount</div>
                                                <div className="swapTable__col">Price</div>
                                                <div className="swapTable__col">Status</div>
                                            </div>
                                            <div className="swapTable__row">
                                                <div className="swapTable__col">
                                                    <span className="txt_danger">Sell</span>
                                                </div>
                                                <div className="swapTable__col">Binance</div>
                                                <div className="swapTable__col">0.05 ETC</div>
                                                <div className="swapTable__col">0.23</div>
                                                <div className="swapTable__col">Partial</div>
                                            </div>
                                            <div className="swapTable__row">
                                                <div className="swapTable__col">
                                                    <span className="txt_warning">Buy</span>
                                                </div>
                                                <div className="swapTable__col">Poloniex</div>
                                                <div className="swapTable__col">14 ORN</div>
                                                <div className="swapTable__col">0.24</div>
                                                <div className="swapTable__col">Partial</div>
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
}
//
// const Swap = memo(() => {
//
//     return (
//     );
// });

export default Swap;
