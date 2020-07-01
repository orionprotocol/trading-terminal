import React, { memo,useEffect,useState } from 'react';
/* REDUX */
import { useSelector } from 'react-redux';
import { Select  } from 'antd';
const { Option } = Select;
const A =['XRP','ETH']
const B=['BTC','USDT']
const index = memo(({optsClass, handleChangeA, handleChangeB}) => {
    const { symbolA, symbolB,tickers } = useSelector(
        state => state.general
    );
    const [SelectorA, setSelectorA] = useState(<></>)
    const [SelectorB, setSelectorB] = useState(<></>)
useEffect(() => {
    setSelectorA( 
    <Select
        className="price-card-selector emp"
        defaultValue={`${symbolA}`}
        style={{
            width: 80,
            padding: 0,
            border: 'none',
        }}
        onChange={handleChangeA}
    >
        {A.map((res,key)=>{
            return(
                <Option
                value={`${res}`}
                className={optsClass}
                key={key}
            >
                {res}
            </Option>  
            )
        })}
    </Select>
    )
}, [symbolA]);

useEffect(() => {
    setSelectorB( 
        <Select
            className="price-card-selector emp"
            defaultValue={`${symbolB}`}
            style={{
                width: 80,
                padding: 0,
                border: 'none',
            }}
            onChange={handleChangeA}
        >
            {B.map((res,key)=>{
                return(
                    <Option
                    value={`${res}`}
                    className={optsClass}
                    key={key}
                >
                    {res}
                </Option>  
                )
            })}
        </Select>
        )
}, [symbolB]);

    return (
        <>
          {SelectorA}/{SelectorB} 
        </>
    );
});

export default index;