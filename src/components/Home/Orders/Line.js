import React, { useEffect, useState, Fragment } from 'react';
import SlideToggle from 'react-slide-toggle';
import dayjs from 'dayjs';
import Subtable from './Subtable';

const Line = ({ formatingPair, type, data }) => {
  const [state, setState] = useState({ sub: [] });

  useEffect((_) => {
    let timestamp = Number(String(data.time).substring(0, 10));
    // let date = moment.unix(timestamp).format('MM-DD HH:mm:ss');
    // 09.09.2019 12:42:4
    let date = dayjs.unix(timestamp).format('DD.MM.YYYY');
    let time = dayjs.unix(timestamp).format('HH:mm:ss');

    setState({
      id: data.id,
      type: data.side[0].toUpperCase() + data.side.slice(1),
      pair: data.symbol.replace('-', ' / '),
      date,
      time,
      amount: data.orderQty.toFixed(formatingPair.qtyPrecision),
      price: data.price.toFixed(formatingPair.pricePrecision),
      status: data.status[0].toUpperCase() + data.status.slice(1).toLowerCase(),
      total: (data.price * data.orderQty).toFixed(formatingPair.quoteAssetPrecision),
      sub: data.subOrders,
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayStatus = (status) => {
    switch (status) {
      case 'New':
        return 'New';
      case 'Partially_filled':
        return 'Partial';
      case 'Filled':
        return 'Filled';
      case 'Canceled':
        return 'Canceled';
      default:
        return status;
    }
  };
  // console.log(props.type);
  return (
    <Fragment>
      {/* {props.type === 'open' ? null : ( */}
      <div className="line">
        <div className="line-big">
          <SlideToggle
            collapsed
            render={({ toggle, setCollapsibleElement }) => (
              <div className="my-collapsible">
                <div className="line-big-main js-line-big-main" onClick={toggle}>
                  <span className="cell short emp">{state.type}</span>
                  <span className="cell">{state.pair}</span>
                  <span className="cell time">
                    {state.date} {state.time}
                  </span>
                  <span className="cell">{state.amount}</span>
                  <span className="cell">{state.price}</span>
                  <span className="cell filled status">{displayStatus(state.status)}</span>
                  <span className="cell">{state.total}</span>
                </div>

                <div className="" ref={setCollapsibleElement}>
                  <Subtable data={state.sub} />
                </div>
              </div>
            )}
          />
        </div>
        <div className="line-small">
          <div className="cell cell-top">
            <span className="data">{state.type}</span>
            <span className="data-eth">{state.pair}</span>
            <span className="filled status">{state.status}</span>
          </div>
          <div className="cell">
            <span className="sub-title">Amount</span>
            <span className="data-text">{state.amount}</span>
            <span className="data-text date">{state.date}</span>
          </div>
          <div className="cell">
            <span className="sub-title">Price</span>
            <span className="data-text">{state.price}</span>
            <span className="data-text date">{state.time}</span>
          </div>
          <div className="cell">
            <span className="sub-title">Total</span>
            <span className="data-text">{state.total}</span>
          </div>
        </div>
      </div>
      {/* )} */}
    </Fragment>
  );
};

export default Line;
