import React, { memo } from 'react';
import { Select  } from 'antd';
const { Option } = Select;
const index = memo(({optsClass, handleChangeA, handleChangeB}) => {
    return (
        <>
            <Select
                className="price-card-selector emp"
                defaultValue="ETH"
                style={{
                    width: 80,
                    padding: 0,
                    border: 'none',
                }}
                onChange={handleChangeA}
            >
                <Option
                    value="ETH"
                    className={optsClass}
                >
                    ETH
                                            </Option>
                <Option
                    value="XRP"
                    className={optsClass}
                >
                    XRP
                                            </Option>
            </Select>
                                        /
            <Select
                className="price-card-selector emp"
                defaultValue="BTC"
                style={{
                    width: 80,
                    padding: 0,
                    border: 'none',
                }}
                onChange={handleChangeB}
            >
                <Option
                    value="BTC"
                    className={optsClass}
                >
                    BTC
                                            </Option>
            </Select>
        </>
    );
});

export default index;