import React, { memo,Fragment,useState ,useEffect} from 'react';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import './lastprice.scss'
const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(number);
  };
  const formatFunction = (vol) => {
    let volumen;
    let sizeOfNumber = vol.toString().replace('.', '').length - 3;
    if (vol <= 999) {
      volumen = `${vol}`;
    } else if (vol > 999 && vol <= 999999) {
      volumen = `${(vol / Math.pow(10, sizeOfNumber)).toFixed(2)} K`;
    } else if (vol > 999999 && vol <= 999999999) {
      volumen = `${(vol / Math.pow(10, sizeOfNumber)).toFixed(2)} M`;
    } else if (vol > 999999999) {
      volumen = `${(vol / Math.pow(10, sizeOfNumber)).toFixed(2)} B`;
    }
    return volumen;
  }; 
const index = memo(() => {
    /* Redux */
    const mode = useSelector((state) => state.general.mode);
    const lastPrice = useSelector((state) => state.general.lastPrice);
    const high = useSelector((state) => state.general.high);
    const low = useSelector((state) => state.general.low);
    const vol = useSelector((state) => state.general.vol);
    const change = useSelector((state) => state.general.change);
    const symbolA = useSelector((state) => state.general.symbolA);
    const symbolB = useSelector((state) => state.general.symbolB);
    const tickers = useSelector((state) => state.general.tickers);
    const supportTradingPairs = useSelector((state) => state.general.supportTradingPairs);
    /* Redux */
    const initialState = {
        minQty: 0,
        maxQty: 0,
        minPrice: 0,
        maxPrice: 0,
        pricePrecision: 0,
        qtyPrecision: 0,
        baseAssetPrecision: 0,
        quoteAssetPrecision: 0,
      };
    const [formatingPair, setformatingPair] = useState(initialState);
    
    const [dollars, setDollars] = useState({});

/* Format function */
useEffect(() => {
    if (supportTradingPairs.length > 0) {
      if (formatingPair.pricePrecision === 0 && formatingPair.maxPrice === 0) {
        supportTradingPairs.forEach((pair) => {
          if (pair.symbolA === symbolA && pair.symbolB === symbolB) {
            setformatingPair({
              ...formatingPair,
              minQty: pair.minQty,
              maxQty: pair.maxQty,
              minPrice: pair.minPrice,
              maxPrice: pair.maxPrice,
              pricePrecision: pair.pricePrecision,
              qtyPrecision: pair.qtyPrecision,
              baseAssetPrecision: pair.baseAssetPrecision,
              quoteAssetPrecision: pair.quoteAssetPrecision,
            });
          }
        });
      }
    }
  }, [supportTradingPairs, lastPrice, high, low]);
/* End of format function */

/* Set dolar function */
useEffect(
    (_) => {
      if (symbolB === 'USDT') {
        return;
      } else {
        /*  console.log(tickers[`${symbolB}-USDT`]) */
        if (tickers[`${symbolB}-USDT`] !== undefined) {
          let last = (tickers[`${symbolB}-USDT`].lastPrice * lastPrice).toFixed(2);
          let h = (tickers[`${symbolB}-USDT`].lastPrice * high).toFixed(2);
          let l = (tickers[`${symbolB}-USDT`].lastPrice * low).toFixed(2);
          let v = (tickers[`${symbolB}-USDT`].lastPrice * Number(vol)).toFixed(2);

          last = formatNumber(last);
          h = formatNumber(h);
          l = formatNumber(l);
          setDollars({ ...dollars, last, low: l, high: h, vol: formatFunction(v) });
        }
      }
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [lastPrice, high, low, vol]
  );
/* End of set dollar function */

    return (
    <Row className={`container-lastprice-mobile ${mode}`}>
         <div className="last-price">
          <span className="title">Last price:</span>
         {/*  <div className="value"> */}
            <span className="emp">
              {lastPrice.toFixed(formatingPair.pricePrecision)}
              {symbolB === 'USDT' && '$'}
            </span>
            {symbolB !== 'USDT' && <span className="dollars">${dollars.last}</span>}
         {/*  </div> */}
        </div>
        <div className="change">
          <span className="title">24h change</span>
          <Fragment>
            {change >= 0 ? (
              <Fragment>
                <img src="/img/growth.png" style={{ width: '10px', height: '10px' }} alt="home" />
                <p className="emp">
                  {change} <span>%</span>
                </p>
              </Fragment>
            ) : (
              <Fragment>
                <img
                  src="/img/red-arrow.png"
                  style={{ width: '10px', height: '10px' }}
                  alt="home"
                />
                <p className="emp">
                  {change} <span>%</span>
                </p>
              </Fragment>
            )}
          </Fragment>
        </div>
    </Row>
    );
});

export default index;