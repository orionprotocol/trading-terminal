import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Formik, Form, Field } from "formik";
import validate from "./validation";
import { useSelector, useDispatch } from "react-redux";
// import { WanchainOrder } from '../../../../services/WanchainOrder';
import { EthereumOrder } from "../../../../services/EthereumOrder";
import { loadOrderHistory } from "../../Orders/index";
import openNotification from "../../../Notification";

// type: { trade: 'buy' or 'sell, selection: 'market' or 'limit-order'}
export default function BuyAndSellForm({ type, formatingPair }) {
  /*  console.log(formatingPair) */
  /* REDUX */
  const dispatch = useDispatch();

  const lastPrice = useSelector((state) => state.general.lastPrice);
  const orderData = useSelector((state) => state.general.orderData);
  const symbol = useSelector((state) => state.general.symbol);
  const symbolA = useSelector((state) => state.general.symbolA);
  const symbolB = useSelector((state) => state.general.symbolB);
  const orderBook = useSelector((state) => state.general.orderBook);
  const metamaskConnected = useSelector(
    (state) => state.wallet.metamaskConnected
  );
  const fortmaticConnected = useSelector(
    (state) => state.wallet.fortmaticConnected
  );
  const coinbaseConnected = useSelector(
    (state) => state.wallet.coinbaseConnected
  );
  const balances = useSelector((state) => state.balances);

  const setQtyForm = useCallback(
    (data) => dispatch({ type: "SetQtyForm", payload: data }),
    [dispatch]
  );

  const setAddWallet = useCallback(
    (data) => dispatch({ type: "SetAddWallet", payload: data }),
    [dispatch]
  );
  /* REDUX */
  // const setSideForm = useCallback((data) => dispatch({ type: 'SetSideForm', payload: data }), [ dispatch ]);

  /*  console.log(type.trade)
     if(orderBook){
         console.log( orderBook.aggregatedAsks,orderBook.aggregatedBids )
     } */
  const [values, setValues] = useState({
    amount: "",
    available: "0",
    price: "",
    percent: "",
    total: "",
  });

  const [availableA, setAvailableA] = useState(0);
  const [availableB, setAvailableB] = useState(0);
  const [available, setAvailable] = useState(0);
  const [total, setTotal] = useState(0);
  const [dotRepeatBehavior, setdotRepeatBehavior] = useState(false);
  const [dotRepeatBehaviorPrice, setdotRepeatBehaviorPrice] = useState(false);
  // const [ prevType, setPrevType ] = useState('');

  /* This useEffect is made to change the de dotRepeatBehavior if the amount change */
  const iterating_price_for_total = (array, amount, type) => {
    let cost = 0;
    let totalPrice = 0;
    let remanent = 0;
    let percent = 0.03;
    if (type === "sell") percent = -0.03;
    if (amount === "") return [0, 0];
    remanent = parseFloat(amount);
    for (let x = 0; x < array.length; x++) {
      if (remanent - array[x].size <= 0) {
        cost += remanent * array[x].price;
        return [cost, array[x].price * (1 + percent)];
      } else if (remanent - array[x].size > 0) {
        cost += array[x].size * array[x].price;
        remanent -= array[x].size;
      }
    }
    if (array[array.length - 1]) {
      if (array[array.length - 1].price) {
        cost += remanent * array[array.length - 1].price;
      } else {
        cost += 0;
      }
    } else {
      cost += 0;
    }

    return [cost, array[array.length - 1].price * (1 + percent)];
  };

  useEffect(() => {
    if (type.selection !== "limit-order") {
      const [marketTotal, marketPrice] = iterating_price_for_total(
        orderBook.aggregatedAsks,
        values.amount,
        type.trade
      );
      setValues({
        ...values,
        price: marketPrice.toFixed(formatingPair.pricePrecision),
        total: marketTotal.toFixed(
          Math.min(
            formatingPair.quoteAssetPrecision,
            formatingPair.pricePrecision + formatingPair.qtyPrecision
          )
        ),
      });
      setTotal(
        marketTotal.toFixed(
          Math.min(
            formatingPair.quoteAssetPrecision,
            formatingPair.pricePrecision + formatingPair.qtyPrecision
          )
        )
      );
    }
  }, [
    orderBook.aggregatedAsks,
    orderBook.aggregatedBids,
    values.amount,
    type.selection,
    formatingPair,
  ]);
  /* This useEffect works to change the total price when u switch from market to limit order */
  useEffect(() => {
    if (type.selection === "limit-order") {
      if (values.price !== "" && values.amount !== "") {
        setTotal(
          (values.amount * values.price).toFixed(
            Math.min(
              formatingPair.quoteAssetPrecision,
              formatingPair.pricePrecision + formatingPair.qtyPrecision
            )
          )
        );
      }
    }
  }, [type.selection, values.amount, values.price, formatingPair]);

  useEffect(
    (_) => {
      if (orderData["price"]) {
        setValues({
          ...values,
          amount: orderData.amount.toFixed(formatingPair.qtyPrecision),
          price: parseFloat(orderData.price).toFixed(
            formatingPair.pricePrecision
          ),
        });
        setTotal(
          orderData.total.toFixed(
            Math.min(
              formatingPair.quoteAssetPrecision,
              formatingPair.pricePrecision + formatingPair.qtyPrecision
            )
          )
        );
      }
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [orderData, formatingPair]
  );

  useEffect(
    (_) => {
      const { contractBalances } = balances;
      if (contractBalances) {
        for (let key in contractBalances) {
          switch (key) {
            // case 'WETH':
            // 	if (symbolA === 'ETH') setAvailableA(contractBalances[key]);
            // 	else if (symbolB === 'ETH') setAvailableB(contractBalances[key]);
            // 	break;
            case "WBTC":
              if (symbolA === "BTC") setAvailableA(contractBalances[key]);
              else if (symbolB === "BTC") setAvailableB(contractBalances[key]);
              break;
            case "WXRP":
              if (symbolA === "XRP") setAvailableA(contractBalances[key]);
              else if (symbolB === "XRP") setAvailableB(contractBalances[key]);
              break;
            default:
              if (symbolA === key) setAvailableA(contractBalances[key]);
              else if (symbolB === key) setAvailableB(contractBalances[key]);
              break;
          }
        }
      }
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [balances, symbol]
  );

  useEffect(
    (_) => {
      if (type.trade === "buy") {
        setAvailable(availableB);
      } else if (type.trade === "sell") {
        setAvailable(availableA);
      }

      // if (prevType !== type.trade) {
      // 	setPrevType(type.trade);
      // 	setValues({
      // 		...values,
      // 		amount: '',
      // 		price: ''
      // 	});
      // 	setTotal(0);
      // 	setSideForm(type.trade);
      // 	setQtyForm(0);
      // }
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [type, availableA, availableB]
  );

  const handlePercent = (percent) => {
    if (type.trade === "sell") {
      setQtyForm((available * percent).toFixed(formatingPair.qtyPrecision));
      setValues({
        ...values,
        amount: (available * percent).toFixed(formatingPair.qtyPrecision),
      });
      setTotal(
        (available * percent * lastPrice).toFixed(
          Math.min(
            formatingPair.quoteAssetPrecision,
            formatingPair.pricePrecision + formatingPair.qtyPrecision
          )
        )
      );
    } else {
      setQtyForm(
        ((available * percent) / lastPrice).toFixed(formatingPair.qtyPrecision)
      );
      setValues({
        ...values,
        amount: ((available * percent) / lastPrice).toFixed(
          formatingPair.qtyPrecision
        ),
      });
      setTotal(
        (available * percent).toFixed(
          Math.min(
            formatingPair.quoteAssetPrecision,
            formatingPair.pricePrecision + formatingPair.qtyPrecision
          )
        )
      );
    }
  };

  /* Change de inputs value */
  const preventDotrepeat = (e,funcionSet,behaviorOfInput) => {
    let element = document.getElementById("amount-input").value;
    var patt = new RegExp("[0-9]|[.]");
    if (patt.test(e.key)) {
      if (e.key === ".") {
        console.log(e.target.value);
        if (!behaviorOfInput) {
            funcionSet(true);
        } else if (behaviorOfInput && element.includes(".")) {
          e.preventDefault();
        }
      }
    } else {
      e.preventDefault();
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "amount"  && e.target.value.indexOf(".") === -1) setdotRepeatBehavior(false);
    if (e.target.name === "price"  && e.target.value.indexOf(".") === -1) setdotRepeatBehaviorPrice(false);

    if (e.target.name === "amount" || e.target.name === "price") {
      if (e.target.name === "amount") {
        setQtyForm(e.target.value);
      }
      if (type.selection === "limit-order") {
        if (values.price !== "") {
          setTotal(
            (e.target.value * values.price).toFixed(
              Math.min(
                formatingPair.quoteAssetPrecision,
                formatingPair.pricePrecision + formatingPair.qtyPrecision
              )
            )
          );
        } else {
          setTotal(
            (e.target.value * lastPrice).toFixed(
              Math.min(
                formatingPair.quoteAssetPrecision,
                formatingPair.pricePrecision + formatingPair.qtyPrecision
              )
            )
          );
        }
      }
    }

    let fixFormatValue = e.target.value;
    let array = e.target.value.split(".");
    let typeOfFormat;
    e.target.name === "amount"
      ? (typeOfFormat = formatingPair.qtyPrecision)
      : (typeOfFormat = formatingPair.pricePrecision);
    if (array.length > 1) {
      if (typeOfFormat > 0) {
        fixFormatValue = array[0] + "." + array[1].substring(0, typeOfFormat);
      } else {
        fixFormatValue = array[0];
      }
    }
    setValues({
      ...values,
      [e.target.name]: fixFormatValue,
    });
  };

  const submitOrder = async (_) => {
    if (values.amount === "" || Number(values.amount) <= 0) {
      openNotification({
        message: `Please, enter a valid amount.`,
      });
      return;
    }

    if (type.trade === "buy") {
      if (Number(total) > Number(available)) {
        openNotification({
          message: `Insufficient ${symbolB} balance`,
        });

        return;
      }
    } else if (type.trade === "sell") {
      if (Number(values.amount) > Number(available)) {
        openNotification({
          message: `Insufficient ${symbolA} balance`,
        });

        return;
      }
    }

    let price = values.price === "" ? lastPrice : values.price;

    // if (Number(price) <= 0) {
    //     openNotification({
    //         message: 'Price should be > 0'
    //     });
    //     return;
    // }

    let orderSymbolA = symbolA,
      orderSymbolB = symbolB;

    // ----------------------------------- Ethereum --------------------------------------

    if (symbolA === "BTC") {
      orderSymbolA = "WBTC";
    }

    if (symbolA === "XRP") {
      orderSymbolA = "WXRP";
    }

    if (symbolB === "BTC") {
      orderSymbolB = "WBTC";
    }

    if (symbolB === "XRP") {
      orderSymbolB = "WXRP";
    }

    let orderSymbols = [orderSymbolA, orderSymbolB];

    try {
      /* console.log(orderSymbols, type.trade, price, values.amount); */

      let ethereumOrderMessage = "";

      if (fortmaticConnected) {
        let ethereumOrder = new EthereumOrder("fortmatic");
        ethereumOrderMessage = await ethereumOrder.toEthereumOrder(
          orderSymbols,
          type.trade,
          price,
          values.amount
        );
      } else if (metamaskConnected) {
        let ethereumOrder = new EthereumOrder("metamask");
        ethereumOrderMessage = await ethereumOrder.toEthereumOrder(
          orderSymbols,
          type.trade,
          price,
          values.amount,
          "metamask"
        );
      } else if (coinbaseConnected) {
        let ethereumOrder = new EthereumOrder("coinbase");
        ethereumOrderMessage = await ethereumOrder.toEthereumOrder(
          orderSymbols,
          type.trade,
          price,
          values.amount
        );
      }

      loadOrderHistory();

      setValues({
        ...values,
        amount: "",
        price: "",
      });
      setTotal(0);

      openNotification({
        message: ethereumOrderMessage,
      });
    } catch (e) {
      console.log("error", e);

      if (e.msg) {
        openNotification({
          message: e.msg,
        });
      }
    }
    // ----------------------------------- End - Ethereum --------------------------------------

    // ----------------------------------- Wanchain --------------------------------------

    // if (symbolA === 'ETH') {
    // 	orderSymbolA = 'WETH';
    // } else if (symbolA === 'BTC') {
    // 	orderSymbolA = 'WBTC';
    // }

    // if (symbolB === 'ETH') {
    // 	orderSymbolB = 'WETH';
    // } else if (symbolB === 'BTC') {
    // 	orderSymbolB = 'WBTC';
    // }

    // let orderSymbols = [ orderSymbolA, orderSymbolB ];
    // console.log(orderSymbols, type.trade, price, values.amount);

    // try {
    // 	const wanchainOrder = await WanchainOrder.toWanchainOrder(orderSymbols, type.trade, price, values.amount);

    // 	loadOrderHistory();

    // 	setValues({
    // 		...values,
    // 		amount: '',
    // 		price: ''
    // 	});
    // 	setTotal(0);

    // 	openNotification({
    // 		message: wanchainOrder
    // 	});
    // } catch (e) {
    // 	console.log('error', e);
    // }

    // ----------------------------------- End - Wanchain --------------------------------------
  };
  /* console.log(formatingPair.qtyPrecision,formatingPair.pricePrecision) */
  return (
    <Fragment>
      <Formik
        initialValues={values}
        validationSchema={validate}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form>
            <div>
              {type.trade === "buy" ? (
                <span style={{ color: "rgb(0, 187, 255)", marginLeft: "10px" }}>
                  Amount
                </span>
              ) : (
                <span style={{ color: "rgb(255, 99, 85)", marginLeft: "10px" }}>
                  Amount
                </span>
              )}
              <input
                id="amount-input"
                onKeyPress={(e) => preventDotrepeat(e,setdotRepeatBehavior,dotRepeatBehavior)}
                className={`form-fields-buyandsell after ${
                  type.trade === "buy" ? "buy" : "sell"
                }`}
                name="amount"
                type="text"
                value={values.amount}
                onChange={handleChange}
                /*  maxLength={`${formatingPair.qtyPrecision}`} */
              />
              {/*  <Field
                                className={`form-fields-buyandsell after ${type.trade === 'buy' ? 'buy' : 'sell'}`}
                                name="amount"
                                type="number"
                                value={values.amount}
                                onChange={handleChange}
                                maxLength={`${formatingPair.qtyPrecision}`}
                            /> */}

              {type.trade === "buy" ? (
                <label
                  style={{
                    fontSize: "14px",
                    color: "#706E7D",
                    marginLeft: "-40px",
                    marginTop: "7px",
                    color: "rgb(0, 187, 255)",
                  }}
                >
                  {symbolA}
                </label>
              ) : (
                <label
                  style={{
                    fontSize: "14px",
                    color: "#706E7D",
                    marginLeft: "-40px",
                    marginTop: "7px",
                    color: "rgb(255, 99, 85)",
                  }}
                >
                  {symbolA}
                </label>
              )}
            </div>
            {values.amount && parseFloat(values.amount) > formatingPair.maxQty && (
              <label style={{ color: "red" }}>
                You can't {type.trade} more than {formatingPair.maxQty}{" "}
                {symbolA} <br />
              </label>
            )}
            {values.amount && parseFloat(values.amount) < formatingPair.minQty && (
              <label style={{ color: "red" }}>
                The minimum allowed amount is {formatingPair.minQty} {symbolA}
                <br />
              </label>
            )}
            {values.amount.toString().split(".")[1] &&
              values.amount.toString().split(".")[1].length >
                formatingPair.qtyPrecision && (
                <label style={{ color: "red" }}>
                  {formatingPair.qtyPrecision === 0
                    ? `use only integer quantities for this pair`
                    : `only up to ${formatingPair.qtyPrecision} decimals allowed`}
                  <br />
                </label>
              )}

            {type.selection === "limit-order" && (
              <div>
                {type.trade === "buy" ? (
                  <span
                    style={{ color: "rgb(0, 187, 255)", marginLeft: "10px" }}
                  >
                    Price
                  </span>
                ) : (
                  <span
                    style={{ color: "rgb(255, 99, 85)", marginLeft: "10px" }}
                  >
                    Price
                  </span>
                )}
                <input
                  className={`form-fields-buyandsell after ${
                    type.trade === "buy" ? "buy" : "sell"
                  }`}
                  onKeyPress={(e) => preventDotrepeat(e,setdotRepeatBehaviorPrice,dotRepeatBehaviorPrice)}
                  name="price"
                  type="text"
                  value={
                    values.price !== ""
                      ? values.price
                      : lastPrice.toFixed(formatingPair.pricePrecision)
                  }
                  maxLength={`${formatingPair.pricePrecision}`}
                  onChange={handleChange}
                />
                {/* <Field
                                    className={`form-fields-buyandsell after ${type.trade === 'buy' ? 'buy' : 'sell'}`}
                                    name="price"
                                    type="number"
                                    value={
                                        values.price !== ''
                                            ? values.price
                                            : lastPrice.toFixed(formatingPair.pricePrecision)
                                    }
                                    maxLength={`${formatingPair.pricePrecision}`}
                                    onChange={handleChange}
                                /> */}

                {values.price &&
                  parseFloat(values.price) > formatingPair.maxPrice && (
                    <label style={{ color: "red" }}>
                      You can't set more than {formatingPair.maxPrice} for{" "}
                      {symbolA} <br />
                    </label>
                  )}
                {values.price &&
                  parseFloat(values.price) < formatingPair.minPrice && (
                    <label style={{ color: "red" }}>
                      You can't set less than {formatingPair.minPrice} for{" "}
                      {symbolA} <br />
                    </label>
                  )}
                {values.price.toString().split(".")[1] &&
                  values.price.toString().split(".")[1].length >
                    formatingPair.pricePrecision && (
                    <label style={{ color: "red" }}>
                      only up to {formatingPair.pricePrecision} decimals allowed{" "}
                      <br />
                    </label>
                  )}
              </div>
            )}

            <div
              style={{
                justifyContent: "space-between",
                display: "flex",
                paddingTop: "5px",
              }}
            >
              {type.trade === "buy" ? (
                <span style={{ color: "rgb(0, 187, 255)", marginLeft: "10px" }}>
                  Available
                </span>
              ) : (
                <span style={{ color: "rgb(255, 99, 85)", marginLeft: "10px" }}>
                  Available
                </span>
              )}

              {type.trade === "buy" ? (
                <span
                  className="avl-amount"
                  style={{ color: "rgb(0, 187, 255)" }}
                >
                  {available &&
                    parseFloat(available).toFixed(
                      formatingPair.quoteAssetPrecision
                    )}{" "}
                  {symbolB}
                </span>
              ) : (
                <span
                  className="avl-amount"
                  style={{ color: "rgb(255, 99, 85)" }}
                >
                  {available &&
                    parseFloat(available).toFixed(
                      formatingPair.baseAssetPrecision
                    )}{" "}
                  {symbolA}
                </span>
              )}
            </div>
            <div className="percent-buttons">
              <button
                type="button"
                onClick={() => handlePercent(0.25)}
                className={`percent-button left ${
                  type.trade === "buy" ? "buy" : "sell"
                }`}
              >
                25%
              </button>
              <button
                type="button"
                onClick={() => handlePercent(0.5)}
                className={`percent-button right ${
                  type.trade === "buy" ? "buy" : "sell"
                }`}
              >
                50%
              </button>
              <button
                type="button"
                onClick={() => handlePercent(0.75)}
                className={`percent-button left ${
                  type.trade === "buy" ? "buy" : "sell"
                }`}
              >
                75%
              </button>
              <button
                type="button"
                onClick={() => handlePercent(1)}
                className={`percent-button right ${
                  type.trade === "buy" ? "buy" : "sell"
                }`}
              >
                100%
              </button>
            </div>

            <div className="total-price">
              {type.trade === "buy" ? (
                <span style={{ color: "rgb(0, 187, 255)", marginLeft: "10px" }}>
                  Total
                </span>
              ) : (
                <span style={{ color: "rgb(255, 99, 85)", marginLeft: "10px" }}>
                  Total
                </span>
              )}

              <Field
                className={`form-fields-buyandsell after ${
                  type.trade === "buy" ? "buy" : "sell"
                }`}
                name="total"
                value={total}
                onChange={handleChange}
                disabled={true}
              />
              {type.trade === "buy" ? (
                <label
                  style={{
                    fontSize: "14px",
                    color: "#706E7D",
                    marginLeft: "-40px",
                    marginTop: "7px",
                    color: "rgb(0, 187, 255)",
                  }}
                >
                  {symbolB}
                </label>
              ) : (
                <label
                  style={{
                    fontSize: "14px",
                    color: "#706E7D",
                    marginLeft: "-40px",
                    marginTop: "7px",
                    color: "rgb(255, 99, 85)",
                  }}
                >
                  {symbolB}
                </label>
              )}
            </div>
            <div style={{ margin: "30px 0px 20px 0" }}>
              {(metamaskConnected || fortmaticConnected || coinbaseConnected) &&
                type.trade === "buy" && (
                  <button
                    className="submit-form buy"
                    type="submit"
                    onClick={submitOrder}
                    disabled={
                      parseFloat(values.price) <= 0 ||
                      parseFloat(values.amount) <= 0 ||
                      isNaN(parseFloat(values.amount)) ||
                      (values.amount.toString().split(".")[1] &&
                        values.amount.toString().split(".")[1].length >
                          formatingPair.qtyPrecision) ||
                      (values.price.toString().split(".")[1] &&
                        values.price.toString().split(".")[1].length >
                          formatingPair.pricePrecision) ||
                      (values.amount &&
                        parseFloat(values.amount) > formatingPair.maxQty) ||
                      (values.price &&
                        parseFloat(values.price) > formatingPair.maxPrice) ||
                      (values.amount &&
                        parseFloat(values.amount) < formatingPair.minQty) ||
                      (values.price &&
                        parseFloat(values.price) < formatingPair.minPrice)
                        ? true
                        : false
                    }
                  >
                    Buy {symbolA}
                  </button>
                )}

              {(metamaskConnected || fortmaticConnected || coinbaseConnected) &&
                type.trade === "sell" && (
                  <button
                    className="submit-form sell"
                    type="submit"
                    onClick={submitOrder}
                    disabled={
                      parseFloat(values.price) <= 0 ||
                      parseFloat(values.amount) <= 0 ||
                      isNaN(parseFloat(values.amount)) ||
                      (values.amount.toString().split(".")[1] &&
                        values.amount.toString().split(".")[1].length >
                          formatingPair.qtyPrecision) ||
                      (values.price.toString().split(".")[1] &&
                        values.price.toString().split(".")[1].length >
                          formatingPair.pricePrecision) ||
                      (values.amount &&
                        parseFloat(values.amount) > formatingPair.maxQty) ||
                      (values.price &&
                        parseFloat(values.price) > formatingPair.maxPrice) ||
                      (values.amount &&
                        parseFloat(values.amount) < formatingPair.minQty) ||
                      (values.price &&
                        parseFloat(values.price) < formatingPair.minPrice)
                        ? true
                        : false
                    }
                  >
                    Sell {symbolA}
                  </button>
                )}

              {!metamaskConnected && !fortmaticConnected && !coinbaseConnected && (
                <button
                  className="submit-form buy"
                  type="submit"
                  onClick={(_) => setAddWallet(true)}
                >
                  Add Wallet
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
}
