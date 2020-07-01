import React, { memo } from 'react';
import { Select } from 'antd';
const { Option } = Select;
const status = ["All", "NEW", "PARTIALLY_FILLED", "FILLED", "PARTIALLY_CANCELLED","CANCELLED","REJECTED"]
const index = memo(({ optsClass, handleChangeC,setstatusFilterSelection }) => {

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
            let name = res.toLowerCase().replace('_',' ')
            let nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1)
                return (
                    <Option
                        key={key}
                        value={`${res}`}
                        className={optsClass}
                        onClick={()=>setstatusFilterSelection(res)}
                    >
                        {nameCapitalized}
                    </Option>
                )
            })}
        </Select>
    );
});

export default index;