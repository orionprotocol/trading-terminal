import React, { memo } from 'react';
import { Select } from 'antd';
const { Option } = Select;
const status = ["All", "Open", "Filled", "Partial", "Cancelled"]
const index = memo(({ optsClass, handleChangeC }) => {

    return (
        <Select
            className="price-card-selector emp"
            defaultValue="All"
            style={{
                width: 100,
                padding: 0,
                border: 'none',
            }}
            onChange={handleChangeC}
        >
            {status.map((res, key) => {
                return (
                    <Option
                        key={key}
                        value={`${res}`}
                        className={optsClass}
                    >
                        {res}
                    </Option>
                )
            })}
        </Select>
    );
});

export default index;