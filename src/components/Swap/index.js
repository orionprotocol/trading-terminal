import React, { memo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './swapSelector.scss';
import CoinPrice from './priceOfCoins';
import SwapSelectors from './swapSelector';
import { EthereumOrder } from '../../services/EthereumOrder';
import openNotification from '../../components/Notification';
const index = memo(() => {
    const { mode, assets: allAssets } = useSelector(state => state.general);
    const balances = useSelector(state => state.balances);
    const { assets } = useSelector(state => state.wallet);
    const { metamaskConnected, fortmaticConnected } = useSelector(
        state => state.wallet
    );
    const { tickers } = useSelector(state => state.general);
    
    const [swapCoins, setswapCoins] = useState({
        from: 'ETH',
        to: 'WBTC',
    });
    const [swapValue, setswapValue] = useState({
        from: 0,
        to: 0,
    });
    // console.log(assets, tickers, 'tickers');
    const [errorMessage, seterrorMessage] = useState({ error: false, msg: '' });
    const [symbolsB, setSymbolsB] = useState([]);

useEffect(() => {
    const checkAmountAvailable=()=>{
        for (let x in balances.contractBalances){
            if(swapCoins.from===x){
                if(swapValue.from>balances.contractBalances[x]){
                    seterrorMessage({ error: true, msg: `Your don't have enough ${x} in your wallet, to perform this action` })
                }else{
                    seterrorMessage({ error: false, msg: '' })
                }
                
                
            }
        }
    }
    checkAmountAvailable()
}, [swapValue.from]);
console.log(balances.contractBalances)
    useEffect(
        _ => {
            if (allAssets.assets1 && allAssets.assets1.length > 0) {
                const { assets1 } = allAssets;

                const symbsb = assets1.map(e => {
                    if (assets[e.toUpperCase()]) {
                        return assets[e.toUpperCase()];
                    } else {
                        return e;
                    }
                });

                setSymbolsB(symbsb);
            }
        },
        [allAssets, assets]
    );

    const setTypeOfTrade = () => {
        let regex = new RegExp(symbolsB.join('|'));
        if (regex.test(swapCoins.from)) {
           return 'buy'
        } else{
            return 'sell';
        }
    };

    const setSymbols = () => {
        let symbolA, symbolB;
        let regex = new RegExp(symbolsB.join('|'));
        if (regex.test(swapCoins.from)) {
            symbolA = swapCoins.to;
            symbolB = swapCoins.from;
        } else if (regex.test(swapCoins.to)) {
            symbolA = swapCoins.from;
            symbolB = swapCoins.to;
        }
          return [symbolA, symbolB]; 
    };
 
    const setPrice = () => {
        /* In here this logic only will work if the coins have names without the W in his name */
            let from = swapCoins.from.replace('W',''),to = swapCoins.to.replace('W','');
            for ( let x in tickers){
                if( x.includes(from) && x.includes(to)) return tickers[x].lastPrice
            }
    }

    
 /*   console.log(setTypeOfTrade(),setSymbols(),setPrice(),balances.contractBalances,`${swapValue.from} es mayor a ${balances.contractBalances} =  ${swapValue.from>balances.contractBalances}`) */
 
    const swap = async () => {
        try {
            /*    console.log(orderSymbols, type.trade, price, values.amount); */

            let ethereumOrderMessage = '';

            if (fortmaticConnected) {
                let ethereumOrder = new EthereumOrder('fortmatic');
                ethereumOrderMessage = await ethereumOrder
                    .toEthereumOrder(
                      setSymbols(),
                     setTypeOfTrade(),
                     setPrice(),
                     swapValue.from 
                     )
                    ();
            } else if (metamaskConnected) {
                let ethereumOrder = new EthereumOrder('metamask');
                ethereumOrderMessage = await ethereumOrder
                    .toEthereumOrder(
                   setSymbols(),
                    setTypeOfTrade(),
                    setPrice(),
                    swapValue.from)
                    ();
            }

            openNotification({
                message: ethereumOrderMessage,
            });
        } catch (e) {
            console.log('error', e);

            if (e.msg) {
                openNotification({
                    message: e.msg,
                });
            }
        }
    };

    return (
        <div
            className={`swap-container ${mode === 'Light' ? '' : 'dark-mode'}`}
        >
            <div className="swap-card">
                <SwapSelectors
                    swapCoins={swapCoins}
                    setswapCoins={setswapCoins}
                    swapValue={swapValue}
                    setswapValue={setswapValue}
                />
                <CoinPrice swapCoins={swapCoins} errorMessage={errorMessage} seterrorMessage={seterrorMessage}/>
                   <span className="error"> {errorMessage.error ?errorMessage.msg:null}</span>
                <button disabled={errorMessage.error} className="swap-button" onClick={swap}>
                    <h6>SWAP</h6>
                </button>
            </div>
        </div>
    );
});

export default index;
