import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Select } from 'antd';
import './selector.scss' 
import { reformatNameCoins } from '../../funtions/formatCoinName'
let price = require('crypto-price');
const { Option } = Select;

const index = memo(({ swapCoins, setswapCoins, swapValue, setswapValue }) => {
    const { mode } = useSelector(state => state.general);
    const { assets } = useSelector(state => state.wallet);

    /*    price.getCryptoPrice(reformatNameCoins(swapCoins.to), reformatNameCoins(swapCoins.from)).then(res2 => { // Base for ex - USD, Crypto for ex - ETH 
           result.to=res2.price
           setpriceOfCoins(result)
           setloadingPrice(true)
       
       }).catch(err2 => {
           setError(`You can't swap  between the same tokens!`)
           console.log(err2, "dio Error")
       }) */


    const optsClass =
        mode === 'Light' ? 'option-select emp' : 'dark-mode option-select emp';
    let coins = []
    for (let key in assets) {
        coins.push(assets[key])
    }
    let options = coins.map((res, key) => {
        return (
            <Option key={key} value={res} className={optsClass}>
                <div className="image">
                    <img style={{ height: '25px' }} src={`./img/${res.toLowerCase()}-wallet.png`} alt={res} />
                </div>
                <div className="text">
                    {res}
                </div>
            </Option>
        )
    })
    const swapCointTypes = () => {
        let from = {
            coin: swapCoins.to,
            value: swapValue.to
        }, to = {
            coin: swapCoins.from,
            value: swapValue.from
        }
        setswapCoins({ from: from.coin, to: to.coin })
        setswapValue({ from: from.value, to: to.value })
    }

    const handleChangeFrom = e => {
        let value = e.target.value
        setswapValue({ ...swapValue, from: parseFloat(value) ? parseFloat(value) : 0 })
        let aux = {
            from: 0,
            to: 0
        }
        aux.from = parseFloat(value) ? parseFloat(value) : 0
        if (value !== '') {
            //price.getCryptoPrice('Price To Get', 'base coin eg. 1BTC')
            price.getCryptoPrice(reformatNameCoins(swapCoins.to), reformatNameCoins(swapCoins.from)).then(res => {
                /* res.price */
                console.log(res, value, "respuesta")
                aux.to = parseFloat(value).toFixed(8) * res.price
                setswapValue(aux)
            }).catch(err2 => {
                console.log(err2, "dio Error")
            })
        } else {
            setswapValue(aux)
        }
    }

    const handleChangeTo = e => {
        let value = e.target.value
        setswapValue({ ...swapValue, to: parseFloat(value) ? parseFloat(value) : 0 })
        let aux = {
            from: 0,
            to: 0
        }
        aux.to = parseFloat(value) ? parseFloat(value) : 0
        if (value !== '') {
            //price.getCryptoPrice('Price To Get', 'base coin eg. 1BTC')
            price.getCryptoPrice(reformatNameCoins(swapCoins.to), reformatNameCoins(swapCoins.from)).then(res => {
                /* res.price */
                console.log(res, value, "respuesta")
                aux.from = parseFloat(value).toFixed(8) / res.price
                setswapValue(aux)
            }).catch(err2 => {
                console.log(err2, "dio Error")
            })
        } else {
            setswapValue(aux)
        }
    }




    return (
        <div className="selectors-container ${mode === 'Light'} ">
            <div className="swap-selectors">
                <div className="title">
                    <h6>From:</h6>
                </div>
                <div className="selector">
                    <Select
                        className="price-card-selector emp "
                        value={swapCoins.from}
                        style={{ width: '100%', padding: 0, border: 'none' }}
                        onChange={e => setswapCoins({ ...swapCoins, from: e })}
                    >
                        {options}
                    </Select>
                    <input className='input' type='number' value={swapValue.from} onChange={e => handleChangeFrom(e)} />
                </div>
            </div>
            <div className="swap-icon" onClick={swapCointTypes}>
                <i className="fas fa-exchange-alt"></i>
            </div>
            <div className="swap-selectors">
                <div className="title">
                    <h6>To:</h6>
                </div>
                <div className="selector">
                    <Select
                        className="price-card-selector emp"
                        value={swapCoins.to}
                        style={{ width: '100%', padding: 0, border: 'none' }}
                        onChange={e => setswapCoins({ ...swapCoins, to: e })}
                    >
                        {options}
                    </Select>
                    <input className='input' type="number" value={swapValue.to} onChange={e => handleChangeTo(e)} />
                </div>
            </div>
        </div>
    );
});

export default index;