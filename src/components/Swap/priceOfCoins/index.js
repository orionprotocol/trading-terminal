import React, { memo, useState, useEffect } from 'react';
import { reformatNameCoins } from '../../../components/funtions/formatCoinName';
import { useSelector } from 'react-redux';
let price = require('crypto-price');

const index = memo(({ swapCoins,errorMessage,seterrorMessage }) => {
    const { tickers,changeInTickers } = useSelector(state => state.general);
    const [priceOfCoins, setpriceOfCoins] = useState({});
    const [loadingPrice, setloadingPrice] = useState(false);

    const getPriceOfTokens = result => {
        price
            .getCryptoPrice(
                reformatNameCoins(swapCoins.to),
                reformatNameCoins(swapCoins.from)
            )
            .then(res2 => {
                // Base for ex - USD, Crypto for ex - ETH
                result.to = res2.price;
                setpriceOfCoins(result);
                setloadingPrice(true);
            })
            .catch(err2 => {
                seterrorMessage({ error: true, msg: `You can't swap  between the same tokens!` })
                console.log(err2);
            });
    };
   /*  const getPriceToken = result => {
       result.to=tickers[`${swapCoins.from.replace('W', '')}-${swapCoins.to.replace('W', '')}`].lastPrice
       result.usd=`= ${tickers[`${swapCoins.from.replace('W', '')}-USDT`].lastPrice} USD`
       setpriceOfCoins(result);
       setloadingPrice(true);
    }; */

    console.log(tickers, `${swapCoins.from.replace('W', '')}-${swapCoins.to.replace('W', '')}`)
    useEffect(() => {
        seterrorMessage({ error: false, msg: '' })
        setloadingPrice(false);
        let result = {
            from: 1,
            to: 0,
            usd: 0,
        };
/* 
        if(Object.keys(tickers).length!==0){
            if(tickers[`${swapCoins.from.replace('W', '')}-${swapCoins.to.replace('W', '')}`]===undefined){
                seterrorMessage({ error: true, msg: `You can't not swap this pairs right now!` })
              
            }else if(swapCoins.from.replace('W', '')===swapCoins.to.replace('W', '')){
                seterrorMessage({ error: true, msg: `You can't swap  between the same tokens!` })
               console.log('entro aca?')
            }else if(swapCoins.from === 'USDT'){
                result = {
                    from: 1,
                    to: tickers[`${swapCoins.to.replace('W', '')}-${swapCoins.from.replace('W', '')}`].lastPrice,
                    usd: null,
                }
                setpriceOfCoins(result)
                setloadingPrice(true);
            }else{
                if(tickers[`${swapCoins.from.replace('W', '')}-${swapCoins.to.replace('W', '')}`]){
                    getPriceToken(result)
                }
            }
            
        }  */
       
        if (swapCoins.from === 'USDT') {
            result.usd = null;
            getPriceOfTokens(result);
        } else {
            price
                .getCryptoPrice('USD', reformatNameCoins(swapCoins.from))
                .then(res => {
                    result.usd = `= ${res.price} USD`;
                    getPriceOfTokens(result);
                })
                .catch(err => {
                    console.log(err);
                    seterrorMessage({ error: true, msg: 'Cannot find your price' })
                });
        }
    }, [swapCoins/* ,Object.keys(tickers).length */]);

    return (
        <div className="price-container">
            <div className="text">
                {loadingPrice ? (
                    `${priceOfCoins.from} ${swapCoins.from} = ${priceOfCoins.to} ${swapCoins.to}  ${priceOfCoins.usd !== null ? priceOfCoins.usd : ''}`
                ) : null}
            </div>
        </div>
    );
});

export default index;
