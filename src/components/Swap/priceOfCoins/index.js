import React, { memo,useState,useEffect } from 'react';
import {reformatNameCoins} from '../../../components/funtions/formatCoinName'
let price = require('crypto-price');

const index = memo(({swapCoins}) => {
    const [priceOfCoins, setpriceOfCoins] = useState({})
    const [loadingPrice, setloadingPrice] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        setError(``)
        setloadingPrice(false)
        let result={
            from: 1,
            to: 0,
            usd:0
        }
        //price.getCryptoPrice('Price To Get', 'base coin eg. 1BTC')
        price.getCryptoPrice('USD',reformatNameCoins(swapCoins.from) ).then(res => {
            result.usd=res.price
     
            price.getCryptoPrice(reformatNameCoins(swapCoins.to), reformatNameCoins(swapCoins.from)).then(res2 => { // Base for ex - USD, Crypto for ex - ETH 
                result.to=res2.price
                setpriceOfCoins(result)
                setloadingPrice(true)
            
            }).catch(err2 => {
                setError(`You can't swap  between the same tokens!`)
                console.log(err2, "dio Error")
            })
        }).catch(err => {
            setError(err)
            console.log(err)
            console.log(err, "dio Error 1")
        })
    
    }, [swapCoins]);

    return (
        <div className="price-container">
            <div className="text">
                {loadingPrice ? `${priceOfCoins.from} ${swapCoins.from} = ${priceOfCoins.to} ${swapCoins.to} = ${priceOfCoins.usd} USD` : <span>{error}</span>}
            </div>
        </div>
    );
});

export default index;