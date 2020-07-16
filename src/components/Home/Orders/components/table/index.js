import React, { memo } from 'react';
import { Col } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const index = memo(({ handleSort, classes, renderOrders }) => {
  return (
    <Col className="table-content" style={{padding:'15px'}} xs={24}>
      <div className="titles">
        <div className="title short" onClick={(_) => handleSort('type')}>
          <span>Type</span>
          <FontAwesomeIcon icon={classes.type} />
        </div>
        <div className="title" onClick={(_) => handleSort('pair')}>
          <span>Pair</span>
          <FontAwesomeIcon icon={classes.pair} />
        </div>
        <div className="title time" onClick={(_) => handleSort('time')}>
          <span>Time</span>
          <FontAwesomeIcon icon={classes.time} />
        </div>
        <div className="title" onClick={(_) => handleSort('amount')}>
          <span>Amount</span>
          <FontAwesomeIcon icon={classes.amount} />
        </div>
        <div className="title" onClick={(_) => handleSort('price')}>
          <span>Price</span>
          <FontAwesomeIcon icon={classes.price} />
        </div>
        <div className="title status" onClick={(_) => handleSort('status')}>
          <span>Status</span>
          <FontAwesomeIcon icon={classes.status} />
        </div>
        <div className="title" onClick={(_) => handleSort('total')}>
          <span>Total</span>
          <FontAwesomeIcon icon={classes.total} />
        </div>
      </div>

      <div className="lines">{renderOrders}</div>
    </Col>
  );
});

export default index;
