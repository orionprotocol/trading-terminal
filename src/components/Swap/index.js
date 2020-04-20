import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import './swapSelector.scss'
import CoinPrice from './priceOfCoins'
import SwapSelectors from './swapSelector'
import { EthereumOrder } from '../../services/EthereumOrder';
import openNotification from '../../components/Notification';
const index = memo(() => {
    const { mode } = useSelector(state => state.general);
    const balances = useSelector(state => state.balances);
    const { assets } = useSelector(state => state.wallet);
    const { metamaskConnected, fortmaticConnected } = useSelector(
        state => state.wallet
    );
    const { tickers } = useSelector(
        state => state.general
    );
    /* console.log(assets,balances.contractBalances,metamaskConnected,fortmaticConnected,tickers) */
    const [swapCoins, setswapCoins] = useState({
        from: 'ETH',
        to: 'WBTC'
    })
    const [swapValue, setswapValue] = useState({
        from: 0,
        to: 0
    })
/*       console.log(assets,tickers, "tickers")  */
    const [errorMessage, seterrorMessage] = useState({ error: false, msg: '' })

    const setTypeOfTrade = () => {
        switch (swapCoins.from) {
            case "WBTC":
                return 'buy'
            case "USDT":
                return 'buy'
            default:
                return 'sell';
        }
    }

    const setSymbols = () => {
        let symbolA, symbolB;
        if (/USDT|WBTC/i.test(swapCoins.from)) {
            symbolA = swapCoins.to
            symbolB = swapCoins.from
        } else if (/USDT|WBTC/i.test(swapCoins.to)) {
            symbolA = swapCoins.from
            symbolB = swapCoins.to
        }
        return [symbolA, symbolB]
    }

    const setPrice = () => {
        /* In here this logic only will work if the coins have names without the W in his name */
            let from = swapCoins.from.replace('W',''),to = swapCoins.to.replace('W','');
            for ( let x in tickers){
                if( x.includes(from) && x.includes(to)) return tickers[x].lastPrice
            }
    }
   
 
    const swap = async () => {

        try {
            /*    console.log(orderSymbols, type.trade, price, values.amount); */

            let ethereumOrderMessage = '';

            if (fortmaticConnected) {
                let ethereumOrder = new EthereumOrder('fortmatic');
                ethereumOrderMessage = await ethereumOrder.toEthereumOrder(
                    /*  setSymbols(),
                     setTypeOfTrade(),
                     setPrice(),
                     values.amount */
                );
            } else if (metamaskConnected) {
                let ethereumOrder = new EthereumOrder('metamask');
                ethereumOrderMessage = await ethereumOrder.toEthereumOrder(
                    /*  setSymbols(),
                    setTypeOfTrade(),
                    setPrice(),
                    values.amount */
                );
            }

            /*       loadOrderHistory(); */
            /* 
                        setValues({
                            ...values,
                            amount: '',
                            price: ''
                        });
                        setTotal(0); */

            openNotification({
                message: ethereumOrderMessage
            });
        } catch (e) {
            console.log('error', e);

            if (e.msg) {
                openNotification({
                    message: e.msg
                });
            }
        }

    }

    return (
        <div className={`swap-container ${mode === 'Light' ? "" : "dark-mode"}`}>
            <div className="swap-card">
                <SwapSelectors swapCoins={swapCoins} setswapCoins={setswapCoins} swapValue={swapValue} setswapValue={setswapValue} />
                <CoinPrice swapCoins={swapCoins} />

                <button className='swap-button' onClick={swap}>
                    <h6>SWAP</h6>
                </button>
            </div>
        </div>
    );
});

export default index;