import React, { memo } from 'react';
import { Select } from 'antd';
import './status.scss'
const { Option } = Select;
const status = [
  'All',
  'NEW',
  'PARTIALLY_FILLED',
  'FILLED',
  'PARTIALLY_CANCELLED',
  'CANCELLED',
  'REJECTED',
];

const StatusFilter = ({ dropdownStyle, optsClass, handleChangeC, setstatusFilterSelection, mode }) => {
  return (
    <div className={`container-status ${mode}`}>
      <Select
      className="selector"
      defaultValue="All"
      onChange={handleChangeC}
      dropdownStyle={dropdownStyle}
    >
      {status.map((res, key) => {
        let name = res.toLowerCase().replace('_', ' ');
        let nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);
        return (
          <Option
            key={key}
            value={`${res}`}
            className={optsClass}
            onClick={() => setstatusFilterSelection(res)}
          >
            {nameCapitalized}
          </Option>
        );
      })}
    </Select>
    </div>
    
  );
};

export default memo(StatusFilter);
