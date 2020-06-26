import React, { lazy } from "react";

const Sidebar = lazy(() =>
  import(/* webpackChunkName: 'Sidebar' */ "../components/Sidebar")
);

function Wallet() {
  return (
    <div>
      <div class="wallet-page">
        <Sidebar />

        <div class="my-container">
          <div class="my-row">
            <div class="wallet-info">
              <img class="icon" src="/img/big-eth.png" alt="wallet" />
              <p class="num averta">
                <span>$</span> 1,241.24
              </p>
              <div class="copy">
                <input
                  class="copy-link js-copy-text"
                  type="text"
                  readonly="true"
                  value="fijhklfjhkldfghljghljghdlfghldfkjhgld"
                />
                <button class="btn-copy js-copy">Copy</button>
              </div>
            </div>
            <div class="wrapper">
              <div class="wallets-table">
                <div class="search">
                  <div class="input">
                    <input type="text" placeholder="Search" />
                    <img src="/img/search.svg" alt="wallet" />
                  </div>
                  <div class="toggler-wrap">
                    <span class="text">Show Zero</span>
                    <div class="toggler js-toggler">
                      <div class="toggler-way"></div>
                      <div class="toggler-circle"></div>
                    </div>
                  </div>
                </div>
                <div class="titles">
                  <div class="title">
                    <span>Token</span>
                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                  </div>
                  <div class="title">
                    <span>Wallet</span>
                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                  </div>
                  <div class="title">
                    <span>Contract</span>
                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                  </div>
                  <div class="title">
                    <span>In open order</span>
                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                  </div>
                  <div class="title actions">
                    <span>Actions</span>
                  </div>
                </div>
                <div class="lines">
                  <div class="line">
                    <div class="cell emp coins">
                      <img src="/img/btc-color.png" alt="wallet" />
                      <span>BTC</span>
                    </div>
                    <span class="cell">
                      <span class="title-m">Wallet</span> 1.46780990
                    </span>
                    <span class="cell">
                      <span class="title-m">Contract</span> 1.46780990
                    </span>
                    <span class="cell">
                      <span class="title-m">In open order</span> 0.26000000
                    </span>
                    <div class="cell actions">
                      <button class="action">
                        {" "}
                        <img src="/img/arrow.png" alt="wallet" />
                        <span>Deposit</span>
                      </button>
                      <button class="action withdraw">
                        <img src="/img/arrow.png" alt="wallet" />
                        <span>Withdraw</span>
                      </button>
                      <button class="action">
                        {" "}
                        <img src="/img/trade.png" alt="wallet" />
                        <span>Trade</span>
                      </button>
                    </div>
                  </div>
                  <div class="line">
                    <div class="cell emp coins">
                      <img src="/img/btc-color.png" alt="wallet" />
                      <span>BTC</span>
                    </div>
                    <span class="cell">
                      <span class="title-m">Wallet</span> 1.46780990
                    </span>
                    <span class="cell">
                      <span class="title-m">Contract</span> 1.46780990
                    </span>
                    <span class="cell">
                      <span class="title-m">In open order</span> 0.26000000
                    </span>
                    <div class="cell actions">
                      <button class="action">
                        {" "}
                        <img src="/img/arrow.png" alt="wallet" />
                        <span>Deposit</span>
                      </button>
                      <button class="action withdraw">
                        <img src="/img/arrow.png" alt="wallet" />
                        <span>Withdraw</span>
                      </button>
                      <button class="action">
                        {" "}
                        <img src="/img/trade.png" alt="wallet" />
                        <span>Trade</span>
                      </button>
                    </div>
                  </div>
                  <div class="line">
                    <div class="cell emp coins">
                      <img src="/img/btc-color.png" alt="wallet" />
                      <span>BTC</span>
                    </div>
                    <span class="cell">
                      <span class="title-m">Wallet</span> 1.46780990
                    </span>
                    <span class="cell">
                      <span class="title-m">Contract</span> 1.46780990
                    </span>
                    <span class="cell">
                      <span class="title-m">In open order</span> 0.26000000
                    </span>
                    <div class="cell actions">
                      <button class="action">
                        {" "}
                        <img src="/img/arrow.png" alt="wallet" />
                        <span>Deposit</span>
                      </button>
                      <button class="action withdraw">
                        <img src="/img/arrow.png" alt="wallet" />
                        <span>Withdraw</span>
                      </button>
                      <button class="action">
                        {" "}
                        <img src="/img/trade.png" alt="wallet" />
                        <span>Trade</span>
                      </button>
                    </div>
                  </div>
                  <div class="line">
                    <div class="cell emp coins">
                      <img src="/img/btc-color.png" alt="wallet" />
                      <span>BTC</span>
                    </div>
                    <span class="cell">
                      <span class="title-m">Wallet</span> 1.46780990
                    </span>
                    <span class="cell">
                      <span class="title-m">Contract</span> 1.46780990
                    </span>
                    <span class="cell">
                      <span class="title-m">In open order</span> 0.26000000
                    </span>
                    <div class="cell actions">
                      <button class="action">
                        {" "}
                        <img src="/img/arrow.png" alt="wallet" />
                        <span>Deposit</span>
                      </button>
                      <button class="action withdraw">
                        <img src="/img/arrow.png" alt="wallet" />
                        <span>Withdraw</span>
                      </button>
                      <button class="action">
                        {" "}
                        <img src="/img/trade.png" alt="wallet" />
                        <span>Trade</span>
                      </button>
                    </div>
                  </div>
                  <div class="line">
                    <div class="cell emp coins">
                      <img src="/img/btc-color.png" alt="wallet" />
                      <span>BTC</span>
                    </div>
                    <span class="cell">
                      <span class="title-m">Wallet</span> 1.46780990
                    </span>
                    <span class="cell">
                      <span class="title-m">Contract</span> 1.46780990
                    </span>
                    <span class="cell">
                      <span class="title-m">In open order</span> 0.26000000
                    </span>
                    <div class="cell actions">
                      <button class="action">
                        {" "}
                        <img src="/img/arrow.png" alt="wallet" />
                        <span>Deposit</span>
                      </button>
                      <button class="action withdraw">
                        <img src="/img/arrow.png" alt="wallet" />
                        <span>Withdraw</span>
                      </button>
                      <button class="action">
                        {" "}
                        <img src="/img/trade.png" alt="wallet" />
                        <span>Trade</span>
                      </button>
                    </div>
                  </div>
                  <div class="line">
                    <div class="cell emp coins">
                      <img src="/img/btc-color.png" alt="wallet" />
                      <span>BTC</span>
                    </div>
                    <span class="cell">
                      <span class="title-m">Wallet</span> 1.46780990
                    </span>
                    <span class="cell">
                      <span class="title-m">Contract</span> 1.46780990
                    </span>
                    <span class="cell">
                      <span class="title-m">In open order</span> 0.26000000
                    </span>
                    <div class="cell actions">
                      <button class="action">
                        {" "}
                        <img src="/img/arrow.png" alt="wallet" />
                        <span>Deposit</span>
                      </button>
                      <button class="action withdraw">
                        <img src="/img/arrow.png" alt="wallet" />
                        <span>Withdraw</span>
                      </button>
                      <button class="action">
                        {" "}
                        <img src="/img/trade.png" alt="wallet" />
                        <span>Trade</span>
                      </button>
                    </div>
                  </div>
                  <div class="line">
                    <div class="cell emp coins">
                      <img src="/img/btc-color.png" alt="wallet" />
                      <span>BTC</span>
                    </div>
                    <span class="cell">
                      <span class="title-m">Wallet</span> 1.46780990
                    </span>
                    <span class="cell">
                      <span class="title-m">Contract</span> 1.46780990
                    </span>
                    <span class="cell">
                      <span class="title-m">In open order</span> 0.26000000
                    </span>
                    <div class="cell actions">
                      <button class="action">
                        {" "}
                        <img src="/img/arrow.png" alt="wallet" />
                        <span>Deposit</span>
                      </button>
                      <button class="action withdraw">
                        <img src="/img/arrow.png" alt="wallet" />
                        <span>Withdraw</span>
                      </button>
                      <button class="action">
                        {" "}
                        <img src="/img/trade.png" alt="wallet" />
                        <span>Trade</span>
                      </button>
                    </div>
                  </div>
                  <div class="line">
                    <div class="cell emp coins">
                      <img src="/img/btc-color.png" alt="wallet" />
                      <span>BTC</span>
                    </div>
                    <span class="cell">
                      <span class="title-m">Wallet</span> 1.46780990
                    </span>
                    <span class="cell">
                      <span class="title-m">Contract</span> 1.46780990
                    </span>
                    <span class="cell">
                      <span class="title-m">In open order</span> 0.26000000
                    </span>
                    <div class="cell actions">
                      <button class="action">
                        {" "}
                        <img src="/img/arrow.png" alt="wallet" />
                        <span>Deposit</span>
                      </button>
                      <button class="action withdraw">
                        <img src="/img/arrow.png" alt="wallet" />
                        <span>Withdraw</span>
                      </button>
                      <button class="action">
                        {" "}
                        <img src="/img/trade.png" alt="wallet" />
                        <span>Trade</span>
                      </button>
                    </div>
                  </div>
                  <div class="line">
                    <div class="cell emp coins">
                      <img src="/img/btc-color.png" alt="wallet" />
                      <span>BTC</span>
                    </div>
                    <span class="cell">
                      <span class="title-m">Wallet</span> 1.46780990
                    </span>
                    <span class="cell">
                      <span class="title-m">Contract</span> 1.46780990
                    </span>
                    <span class="cell">
                      <span class="title-m">In open order</span> 0.26000000
                    </span>
                    <div class="cell actions">
                      <button class="action">
                        {" "}
                        <img src="/img/arrow.png" alt="wallet" />
                        <span>Deposit</span>
                      </button>
                      <button class="action withdraw">
                        <img src="/img/arrow.png" alt="wallet" />
                        <span>Withdraw</span>
                      </button>
                      <button class="action">
                        {" "}
                        <img src="/img/trade.png" alt="wallet" />
                        <span>Trade</span>
                      </button>
                    </div>
                  </div>
                  <div class="line">
                    <div class="cell emp coins">
                      <img src="/img/btc-color.png" alt="wallet" />
                      <span>BTC</span>
                    </div>
                    <span class="cell">
                      <span class="title-m">Wallet</span> 1.46780990
                    </span>
                    <span class="cell">
                      <span class="title-m">Contract</span> 1.46780990
                    </span>
                    <span class="cell">
                      <span class="title-m">In open order</span> 0.26000000
                    </span>
                    <div class="cell actions">
                      <button class="action">
                        {" "}
                        <img src="/img/arrow.png" alt="wallet" />
                        <span>Deposit</span>
                      </button>
                      <button class="action withdraw">
                        <img src="/img/arrow.png" alt="wallet" />
                        <span>Withdraw</span>
                      </button>
                      <button class="action">
                        {" "}
                        <img src="/img/trade.png" alt="wallet" />
                        <span>Trade</span>
                      </button>
                    </div>
                  </div>
                  <div class="line">
                    <div class="cell emp coins">
                      <img src="/img/btc-color.png" alt="wallet" />
                      <span>BTC</span>
                    </div>
                    <span class="cell">
                      <span class="title-m">Wallet</span> 1.46780990
                    </span>
                    <span class="cell">
                      <span class="title-m">Contract</span> 1.46780990
                    </span>
                    <span class="cell">
                      <span class="title-m">In open order</span> 0.26000000
                    </span>
                    <div class="cell actions">
                      <button class="action">
                        {" "}
                        <img src="/img/arrow.png" alt="wallet" />
                        <span>Deposit</span>
                      </button>
                      <button class="action withdraw">
                        <img src="/img/arrow.png" alt="wallet" />
                        <span>Withdraw</span>
                      </button>
                      <button class="action">
                        {" "}
                        <img src="/img/trade.png" alt="wallet" />
                        <span>Trade</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
