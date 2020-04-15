import React, { memo, useState } from 'react';
import './swapSelector.scss'
import CoinPrice from './priceOfCoins'
import SwapSelectors from './swapSelector'
const index = memo(() => {
    const [swapCoins, setswapCoins] = useState({
        from: 'ETH',
        to: 'WBTC'
    })
    const [swapValue, setswapValue] = useState({
        from: 0,
        to: 0
    })
  
    return (
        <div className='swap-container'>
            <div className="swap-card">
                <SwapSelectors swapCoins={swapCoins}setswapCoins={setswapCoins} swapValue={swapValue} setswapValue={setswapValue} />
                <CoinPrice swapCoins={swapCoins}/>

            </div>
        </div>
    );
});

export default index;