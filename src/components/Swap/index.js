import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import './swapSelector.scss'
import CoinPrice from './priceOfCoins'
import SwapSelectors from './swapSelector'
const index = memo(() => {
    const { mode } = useSelector(state => state.general);
    const [swapCoins, setswapCoins] = useState({
        from: 'ETH',
        to: 'WBTC'
    })
    const [swapValue, setswapValue] = useState({
        from: 0,
        to: 0
    })
  
    return (
        
        <div className= {`swap-container ${mode === 'Light'? "": "dark-mode"}`}>
            <div className="swap-card">
                <SwapSelectors swapCoins={swapCoins}setswapCoins={setswapCoins} swapValue={swapValue} setswapValue={setswapValue} />
                <CoinPrice swapCoins={swapCoins}/>
                <button className='swap-button'>
                    <h6>SWAP</h6>
                </button>
            </div>
        </div>
    );
});

export default index;