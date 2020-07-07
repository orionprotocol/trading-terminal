import React, { memo } from 'react';
import { Select } from 'antd';
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

const StatusFilter = ({ dropdownStyle, optsClass, handleChangeC, setstatusFilterSelection }) => {
  return (
    <Select
      className="price-card-selector emp"
      defaultValue="All"
      style={{
        width: 155,
        padding: '2px',
        border: 'none',
      }}
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
  );
};

export default memo(StatusFilter);
