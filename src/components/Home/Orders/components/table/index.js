import React, { memo } from 'react';
import { Col } from 'antd';

const index = memo(({ handleSort, classes, state }) => {
  return (
    <Col className="table-content" xs={24}>
      <div className="titles">
        <div className="title short" onClick={(_) => handleSort('type')}>
          <span>Type</span>
          <i className={`fa ${classes.type}`} aria-hidden="true" />
        </div>
        <div className="title" onClick={(_) => handleSort('pair')}>
          <span>Pair</span>
          <i className={`fa ${classes.pair}`} aria-hidden="true">
            {' '}
          </i>
        </div>
        <div className="title time" onClick={(_) => handleSort('time')}>
          <span>Time</span>
          <i className={`fa ${classes.time}`} aria-hidden="true" />
        </div>
        <div className="title" onClick={(_) => handleSort('amount')}>
          <span>Amount</span>
          <i className={`fa ${classes.amount}`} aria-hidden="true" />
        </div>
        <div className="title" onClick={(_) => handleSort('price')}>
          <span>Price</span>
          <i className={`fa ${classes.price}`} aria-hidden="true" />
        </div>
        <div className="title status" onClick={(_) => handleSort('status')}>
          <span>Status</span>
          <i className={`fa ${classes.status}`} aria-hidden="true" />
        </div>
        <div className="title" onClick={(_) => handleSort('total')}>
          <span>Total</span>
          <i className={`fa ${classes.total}`} aria-hidden="true" />
        </div>
      </div>

      <div className="lines">{state.renderOrders}</div>
    </Col>
  );
});

export default index;
