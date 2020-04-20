import React, { memo, useState, useEffect } from 'react';
import { reformatNameCoins } from '../../../components/funtions/formatCoinName';
let price = require('crypto-price');

const index = memo(({ swapCoins,errorMessage,seterrorMessage }) => {
    const [priceOfCoins, setpriceOfCoins] = useState({});
    const [loadingPrice, setloadingPrice] = useState(false);
/*     const [error, setError] = useState('');
    const { tickers } = useSelector(state => state.general); */
    // console.log(tickers,swapCoins)

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
    useEffect(() => {
        seterrorMessage({ error: false, msg: '' })
        setloadingPrice(false);
        let result = {
            from: 1,
            to: 0,
            usd: 0,
        };
        //price.getCryptoPrice('Price To Get', 'base coin eg. 1BTC')
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
    }, [swapCoins]);

    return (
        <div className="price-container">
            <div className="text">
                {loadingPrice ? (
                    `${priceOfCoins.from} ${swapCoins.from} = ${
                        priceOfCoins.to
                    } ${swapCoins.to}  ${
                        priceOfCoins.usd !== null ? priceOfCoins.usd : ''
                    }`
                ) : null}
            </div>
        </div>
    );
});

export default index;
