import React, { lazy, useState, useEffect, Suspense } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../Loader';
import './index.css';

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
  const [activeButton, setActiveButton] = useState({
    left: 'market-button active',
    rigth: 'limit-order-button',
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

  return (
    <section>
      <div className="exchange">
        <div>
          <div
            className={activeTab.buy}
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
            className={activeTab.sell}
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
        </div>
        <div style={{ paddingTop: '1%' }}>
          <div className="container-buttons-options">
            <div className="buttons-options">
              <button
                className={activeButton.left}
                onClick={() =>
                  setActiveButton({
                    left: 'market-button active',
                    rigth: 'limit-order-button',
                    type: 'market',
                  })
                }
              >
                Market
              </button>
            </div>
            <div className="buttons-options">
              <button
                className={activeButton.rigth}
                onClick={() =>
                  setActiveButton({
                    left: 'market-button',
                    rigth: 'limit-order-button active',
                    type: 'limit-order',
                  })
                }
              >
                Limit order
              </button>
            </div>
          </div>
        </div>
        <div className="buy-and-sell-form">
          <Suspense fallback={<Loader />}>
            {orderBook ? (
              <BuyAndSellForm
                formatingPair={formatingPair}
                type={{ trade: activeTab.type, selection: activeButton.type }}
              />
            ) : null}
          </Suspense>
        </div>
      </div>
      <Suspense fallback={<Loader />}>{orderBook ? <YourProfit /> : null}</Suspense>
    </section>
  );
}
