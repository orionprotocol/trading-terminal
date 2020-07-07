import React, { lazy, useState, Suspense } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../Loader';
import './index.css';

const BuyAndSellForm = lazy(() => import('./BuyAndSellForm'));
const YourProfit = lazy(() => import('./YourProfit'));

export default function Exchange() {
  const orderBook = useSelector((state) => state.general.orderBook);
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
              <BuyAndSellForm type={{ trade: activeTab.type, selection: activeButton.type }} />
            ) : null}
          </Suspense>
        </div>
      </div>
      <Suspense fallback={<Loader />}>{orderBook ? <YourProfit /> : null}</Suspense>
    </section>
  );
}
