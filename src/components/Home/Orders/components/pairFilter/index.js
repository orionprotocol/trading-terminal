import React, { memo, useEffect, useState } from 'react';
/* REDUX */
import { Select } from 'antd';
import './index.scss';
const { Option } = Select;
const A = ['XRP', 'ETH', 'USDT', 'ERD'];
const B = ['BTC', 'USDT'];
const index = memo(
  ({ dropdownStyle, optsClass, handleChangeA, handleChangeB, filterPairA, filterPairB }) => {
    const [SelectorA, setSelectorA] = useState(<></>);
    const [SelectorB, setSelectorB] = useState(<></>);
    useEffect(() => {
      console.log('Se hizo un cambio en el symbol', filterPairA);
      setSelectorA(null);
      setSelectorA(
        <Select
          className="price-card-selector emp"
          value={filterPairA}
          style={{
            width: 80,
            padding: '2px',
            border: 'none',
          }}
          onChange={(e) => handleChangeA(e)}
          dropdownStyle={dropdownStyle}
        >
          {A.map((res, key) => {
            return (
              <Option value={`${res}`} className={optsClass} key={key}>
                {res}
              </Option>
            );
          })}
        </Select>
      );
    }, [filterPairA, optsClass]);

    useEffect(() => {
      setSelectorB(null);
      setSelectorB(
        <Select
          className="price-card-selector emp"
          value={filterPairB}
          style={{
            width: 80,
            padding: '2px',
            border: 'none',
          }}
          onChange={(e) => handleChangeB(e)}
          dropdownStyle={dropdownStyle}
        >
          {B.map((res, key) => {
            return (
              <Option value={`${res}`} className={optsClass} key={key}>
                {res}
              </Option>
            );
          })}
        </Select>
      );
    }, [filterPairB, optsClass]);
    return (
      <>
        {SelectorA}
        <div className="pair-filter separator">/</div>
        {SelectorB}
      </>
    );
  }
);

export default index;
