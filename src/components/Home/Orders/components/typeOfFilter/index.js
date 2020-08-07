import React, { memo } from 'react';
import {Col} from 'antd';
import './typefilter.scss'

const index = memo(({ handleType,mode }) => {
    return (
        <div className="content-buttons-filter">
          <div className={`container-options-buttons ${mode}`}>
            <button
              className={`btn-opt`}
              id='btn-left-type-filter'
              onClick={_ => handleType('open')}
            >
              Orders
            </button>
            <button
              className={`btn-opt active`}
              id='btn-rigth-type-filter'
              onClick={_=>handleType('history')
              }
            >
              History
            </button>
          </div>
        </div>
      
    );
});

export default index;