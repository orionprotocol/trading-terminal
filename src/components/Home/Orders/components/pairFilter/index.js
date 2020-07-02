import React, { memo,useEffect,useState } from 'react';
/* REDUX */
import { useSelector } from 'react-redux';
import { Select  } from 'antd';
const { Option } = Select;
const A =['XRP','ETH','USDT']
const B=['BTC','USDT']
const index = memo(({allOrders,optsClass, handleChangeA, handleChangeB,filterPairA, filterPairB }) => {
    const { symbolA, symbolB,symbol,tickers } = useSelector(
        state => state.general
    );
    const [SelectorA, setSelectorA] = useState(<></>)
    const [SelectorB, setSelectorB] = useState(<></>)
   /*  console.log(filterPairA) */
useEffect(() => {
    console.log('Se hizo un cambio en el symbol',filterPairA)
    setSelectorA(null)
    setSelectorA( 
    <Select
        className="price-card-selector emp"
        value={filterPairA}
        style={{
            width: 80,
            padding: 0,
            border: 'none',
        }}
        onChange={e=>handleChangeA(e)}
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
}, [filterPairA]);

useEffect(() => {
    setSelectorB(null)
    setSelectorB( 
        <Select
            className="price-card-selector emp"
            value={filterPairB}
            style={{
                width: 80,
                padding: 0,
                border: 'none',
            }}
            onChange={e=>handleChangeB(e)}
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
}, [filterPairB]);

    return (
        <>
          {SelectorA}/{SelectorB} 
        </>
    );
});

export default index;