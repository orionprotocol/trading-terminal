import React, { memo } from 'react';
import TopMenu from '../components/TopMenu';
import Sidebar from '../components/Sidebar';
import SwapSelector from '../components/Swap';
import '../css/common.scss';

const Swap = memo(() => {
    return (
        <div className="page">
            <Sidebar />
            <div className="page__content">
                <div className="page__box page__box_column">
                    <div className="page__title page__title_center">Choose swapping assets</div>
                    <div className="plate plate_center">
                        <form action="" className="form">
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

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Swap;
