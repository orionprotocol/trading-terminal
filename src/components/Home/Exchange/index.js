import React, { lazy, useState, useEffect, Suspense } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../Loader';
import './index.scss';

const BuyAndSellForm = lazy(() => import('./BuyAndSellForm'));
const YourProfit = lazy(() => import('./YourProfit'));

export default function Exchange() {
  const mode = useSelector((state) => state.general.mode);
  const orderBook = useSelector((state) => state.general.orderBook);
  const symbolA = useSelector((state) => state.general.symbolA);
  const symbolB = useSelector((state) => state.general.symbolB);
  const supportTradingPairs = useSelector((state) => state.general.supportTradingPairs);
  const [activeTab, setActiveTab] = useState({
    buy: 'buy-tab active',
    sell: 'sell-tab',
    type: 'buy',
  });

  const [activeButton2, setactiveButton2] = useState({
    left: 'btn-opt active',
    rigth: 'btn-opt',
    type: 'market',
  });
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

  useEffect(() => {
    setformatingPair(initialState);
  }, [symbolA, symbolB]);

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
  }, [supportTradingPairs, formatingPair]);
  console.log(orderBook)
  if (orderBook===null) return null
  return (
    <div className='container-exchange'>
      <div className="exchange">
        <div
          className={`${activeTab.buy} ${mode}`}
          onClick={() =>
            setActiveTab({
              buy: 'buy-tab active',
              sell: 'sell-tab',
              type: 'buy',
            })
          }
        >
          Buy
        </div>
        <div
          className={`${activeTab.sell} ${mode}`}
          onClick={() =>
            setActiveTab({
              buy: 'buy-tab',
              sell: 'sell-tab active',
              type: 'sell',
            })
          }
        >
          Sell
        </div>

        <div className="content-buttons">
          <div className={`container-options-buttons ${mode}`}>
            <button
              className={`${activeButton2.left} `}
              onClick={() =>
                setactiveButton2({
                  left: 'btn-opt active',
                  rigth: 'btn-opt ',
                  type: 'market',
                })
              }
            >
              Market
            </button>
            <button
              className={`${activeButton2.rigth}`}
              onClick={() =>
                setactiveButton2({
                  left: 'btn-opt',
                  rigth: 'btn-opt active',
                  type: 'limit-order',
                })
              }
            >
              Limit order
            </button>
          </div>
        </div>

        <div className="buy-and-sell-form">
          <Suspense fallback={<Loader />}>
            {orderBook ? (
              <BuyAndSellForm
                formatingPair={formatingPair}
                type={{ trade: activeTab.type, selection: activeButton2.type }}
              />
            ) : null}
          </Suspense>
        </div>
      </div>

      <Suspense fallback="">{orderBook ? <YourProfit /> : null}</Suspense>
    </div>
  );
}
