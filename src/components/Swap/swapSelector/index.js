import React, { memo } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Select } from "antd";
import "./selector.scss";
import { reformatNameCoins } from "../../funtions/formatCoinName";
let price = require("crypto-price");
const { Option } = Select;

const index = memo(({ swapCoins, setswapCoins, swapValue, setswapValue }) => {
  const { mode } = useSelector((state) => state.general);
  const { assets } = useSelector((state) => state.wallet);
  const balances = useSelector((state) => state.balances);
  console.log(balances);

  let coins = [];
  for (let key in assets) {
    coins.push(assets[key]);
  }

  const options = (name) => {
    let options = coins.map((res, key) => {
      return (
        <div
          className="custom-select-option"
          key={key}
          onClick={(_) => {
            swapCoins[name] !== res &&
              setswapCoins({ ...swapCoins, [name]: res });
          }}
        >
          <div className="image">
            <img
              style={{ height: "25px" }}
              src={`./img/${res.toLowerCase()}-wallet.png`}
              alt={res}
            />
          </div>
          <div className="text">{res}</div>
        </div>
      );
    });
    return options;
  };
  const selectedOption = (name) => {
    let aux = coins.filter((coin) => coin === swapCoins[name]);
    return (
      <div className={`selectedOption`}>
        <div className="pair-container">
          <div className="image">
            <img
              style={{ height: "25px" }}
              src={`./img/${aux[0].toLowerCase()}-wallet.png`}
              alt={aux}
            />
          </div>
          <div className="text">{aux}</div>
        </div>

        <div className="arrow-container">
          <FontAwesomeIcon icon="angle-down" />
        </div>
      </div>
    );
  };

  const swapCointTypes = () => {
    let from = {
        coin: swapCoins.to,
        value: swapValue.to,
      },
      to = {
        coin: swapCoins.from,
        value: swapValue.from,
      };
    setswapCoins({ from: from.coin, to: to.coin });
    setswapValue({ from: from.value, to: to.value });
  };

  const handleChangeFrom = (e) => {
    let value = e.target.value;
    setswapValue({
      ...swapValue,
      from: parseFloat(value) ? parseFloat(value) : 0,
    });
    let aux = {
      from: 0,
      to: 0,
    };
    aux.from = parseFloat(value) ? parseFloat(value) : 0;
    if (value !== "") {
      //price.getCryptoPrice('Price To Get', 'base coin eg. 1BTC')
      price
        .getCryptoPrice(
          reformatNameCoins(swapCoins.to),
          reformatNameCoins(swapCoins.from)
        )
        .then((res) => {
          /* res.price */
          console.log(res, value, "respuesta");
          aux.to = parseFloat(value).toFixed(8) * res.price;
          setswapValue(aux);
        })
        .catch((err2) => {
          console.log(err2, "dio Error");
        });
    } else {
      setswapValue(aux);
    }
  };

  const handleChangeTo = (e) => {
    let value = e.target.value;
    setswapValue({
      ...swapValue,
      to: parseFloat(value) ? parseFloat(value) : 0,
    });
    let aux = {
      from: 0,
      to: 0,
    };
    aux.to = parseFloat(value) ? parseFloat(value) : 0;
    if (value !== "") {
      //price.getCryptoPrice('Price To Get', 'base coin eg. 1BTC')
      price
        .getCryptoPrice(
          reformatNameCoins(swapCoins.to),
          reformatNameCoins(swapCoins.from)
        )
        .then((res) => {
          /* res.price */
          console.log(res, value, "respuesta");
          aux.from = parseFloat(value).toFixed(8) / res.price;
          setswapValue(aux);
        })
        .catch((err2) => {
          console.log(err2, "dio Error");
        });
    } else {
      setswapValue(aux);
    }
  };

  return (
    <div className={`selectors-container ${mode}`}>
      <div className="swap-selectors">
        <div className="title">
          <h6>From:</h6>
        </div>
        <div className="selector">
          <div className="compound-input">
            <div className="left">
              <div className="custom-select-input">
                {selectedOption("from")}
                <div className="options">{options("from")}</div>
              </div>
            </div>
            <div className="right">
              <input
                className="input-swap-selector"
                type="number"
                value={swapValue.from}
                onChange={(e) => handleChangeFrom(e)}
              />
            </div>
          </div>
          {balances.contractBalances &&
            `Total Available Amount of ${swapCoins.from}: ${
              balances.contractBalances[swapCoins.from]
            }`}
        </div>
      </div>

      {/* -------------------------------------------------------- */}
      <div className="swap-icon" onClick={swapCointTypes}>
        <FontAwesomeIcon icon="exchange-alt" />
      </div>
      {/* -------------------------------------------------------- */}

      <div className="swap-selectors">
        <div className="title">
          <h6>To:</h6>
        </div>
        <div className="compound-input">
          <div className="left">
            <div className="custom-select-input">
              {selectedOption("to")}
              <div className="options">{options("to")}</div>
            </div>
          </div>
          <div className="right">
            <input
              className="input-swap-selector"
              type="number"
              value={swapValue.to}
              onChange={(e) => handleChangeTo(e)}
            />
          </div>
        </div>
        {balances.contractBalances &&
          `Total Available Amount of ${swapCoins.to}: ${
            balances.contractBalances[swapCoins.to]
          }`}
      </div>
    </div>
  );
});

export default index;
