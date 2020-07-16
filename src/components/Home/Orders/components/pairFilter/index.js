import React, { memo, useEffect, useState } from 'react';
/* REDUX */
import { Select } from 'antd';
import './index.scss';
const { Option } = Select;
const A = ['XRP', 'ETH', 'USDT', 'ERD'];
const B = ['BTC', 'USDT'];
const index = memo(
  ({ dropdownStyle, optsClass, handleChangeA, handleChangeB, filterPairA, filterPairB ,mode }) => {
    const [SelectorA, setSelectorA] = useState(<></>);
    const [SelectorB, setSelectorB] = useState(<></>);
    useEffect(() => {
      console.log('Se hizo un cambio en el symbol', filterPairA);
      setSelectorA(null);
      setSelectorA(
        <Select
          
          value={filterPairA}
          className="selector"
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
          className="selector"
          value={filterPairB}
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
      <div className={`container-pair ${mode}`}>
        {SelectorA}
        <div className="pair-filter separator">/</div>
        {SelectorB}
      </div>
    );
  }
);

export default index;
