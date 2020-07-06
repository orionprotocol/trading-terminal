import React, { memo } from 'react';
import {Col} from 'antd';

const index = memo(({ handleType }) => {
    return (
        <Col xs={24} md={6}>
            <button
                className="price-card-button emp"
                id="open-price-card-button"
                onClick={_ => handleType('open')}
            >
                Orders
        </button>
            <button
                className="price-card-button active emp"
                id="history-price-card-button"
                style={{ border: 'none !important' }}
                onClick={_ => handleType('history')}
            >
                History
        </button>
        </Col>
    );
});

export default index;