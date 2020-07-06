import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TVChart from '../components/TVChartContainer';
import TopMenu from '../components/TopMenu';
import IndexNav from '../components/Home/IndexNav';
import Sidebar from '../components/Sidebar';
import OrderBooks from '../components/Home/OrderBooks';
import Orders from '../components/Home/Orders';
import CommonInfo from '../components/Home/CommonInfo';
import Exchange from '../components/Home/Exchange';

function addClass() {
    let e = document.querySelector('.left-panel.js-panel');
    if (e) e.classList.add('active');

    let orderbook = document.querySelector('.right-panel.js-panel');
    if (orderbook) orderbook.classList.add('active');
}

function removeClass() {
    let e = document.querySelector('.left-panel.js-panel');
    if (e) e.classList.remove('active');

    let orderbook = document.querySelector('.right-panel.js-panel');
    if (orderbook) orderbook.classList.remove('active');
}

function Home(props) {
    /* REDUX */
    const dispatch = useDispatch();
    const { orderbook, active, pair, exchange, chart, history } = useSelector(
        state => state.responsive.home
    );
/*     const { mode, symbol, supportTradingPairs } = useSelector(state => state.general); */

    const setSymbol = useCallback(
        payload => dispatch({ type: 'SetSymbol', payload }),
        [dispatch]
    );
    const setSymbolA = useCallback(
        data => dispatch({ type: 'SetSymbolA', payload: data }),
        [dispatch]
    );
    const setSymbolB = useCallback(
        data => dispatch({ type: 'SetSymbolB', payload: data }),
        [dispatch]
    );
    /* REDUX */
    useEffect(() => {
        let aux = props.history.location.pathname.split('/');
        if (aux.length === 3) {
            aux = aux[2].split('_');
            if (
                props.history.location.pathname.includes('trade') &&
                aux.length === 2
            ) {
                setSymbolA(aux[0]);
                setSymbolB(aux[1]);
                setSymbol(`${aux[0]}-${aux[1]}`);
            }
        }
    }, [props.history.location.pathname]);

    useEffect(() => {
        window.addEventListener('resize', _ => {
            if (window.innerWidth > 1130) removeClass();
            else addClass();
        });

        if (window.innerWidth > 1130) removeClass();
        else addClass();
    }, []);

    // useEffect(
    //     _ => {
    //         const { pathname } = window.location;

    //         if (pathname.includes('trade')) {
    //             window.renderChart('all', symbol, mode);
    //         }
    //     },
    //     //eslint-disable-next-line react-hooks/exhaustive-deps
    //     [window.location.pathname, mode, symbol]
    // );

    return (
        <div className="">
            <TopMenu />
            <IndexNav />
            <div className="index">
                <Sidebar history={props.history} />


                <div className="my-container">
                    <div className="my-row">
                        <div className="left-panel js-panel">
                            {!active || (active && pair) ? (
                                <CommonInfo History={props} />
                            ) : null}

                            {!active || (active && exchange) ? (
                                <Exchange />
                            ) : null}
                        </div>

                        {/* Large */}
                        {!active ? (
                            <div className="center-panel js-panel">
                                <TVChart />
                                <Orders />
                            </div>
                        ) : null}

                        {/* Small */}
                        {(active && chart) || (active && history) ? (
                            <div >
                                {active && chart ? (
                                    <TVChart />
                                ) : null}

                                {active && history ? <Orders /> : null}
                            </div>
                        ) : null}

                        {!active || (active && orderbook) ? (<OrderBooks />) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
