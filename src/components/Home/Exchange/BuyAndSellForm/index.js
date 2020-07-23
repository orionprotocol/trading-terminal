import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { Formik, Form, Field } from 'formik';
import validate from './validation';
import { useSelector, useDispatch } from 'react-redux';
// import { WanchainOrder } from '../../../../services/WanchainOrder';
import { EthereumOrder } from '../../../../services/EthereumOrder';
import { loadOrderHistory } from '../../Orders/index';
import openNotification from '../../../Notification';
import WithdrawAndDeposit from './components/withdrawAndDeposit';


// type: { trade: 'buy' or 'sell, selection: 'market' or 'limit-order'}
export default function BuyAndSellForm({ type, formatingPair }) {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.general.mode);
  const lastPrice = useSelector((state) => state.general.lastPrice);
  const orderData = useSelector((state) => state.general.orderData);
  const symbol = useSelector((state) => state.general.symbol);
  const symbolA = useSelector((state) => state.general.symbolA);
  const symbolB = useSelector((state) => state.general.symbolB);
  const orderBook = useSelector((state) => state.general.orderBook);
  const balances = useSelector((state) => state.balances);
  const metamaskConnected = useSelector((state) => state.wallet.metamaskConnected);
  const fortmaticConnected = useSelector((state) => state.wallet.fortmaticConnected);
  const coinbaseConnected = useSelector((state) => state.wallet.coinbaseConnected);


  const setQtyForm = useCallback((data) => dispatch({ type: 'SetQtyForm', payload: data }), [
    dispatch,
  ]);
  // const setSideForm = useCallback((data) => dispatch({ type: 'SetSideForm', payload: data }), [ dispatch ]);
  const setAddWallet = useCallback((data) => dispatch({ type: 'SetAddWallet', payload: data }), [
    dispatch,
  ]);
  const initialValues={
    amount: '',
    available: '0',
    price: '',
    percent: '',
    total: '',
  }
  const [values, setValues] = useState(initialValues);

  const [availableA, setAvailableA] = useState(0);
  const [availableB, setAvailableB] = useState(0);
  const [available, setAvailable] = useState(0);
  const [total, setTotal] = useState(0);

useEffect(() => {
  setValues(initialValues)
  setAvailableA(0)
  setAvailableB(0)
  setAvailable(0)
  setTotal(0)
}, [symbol]);

  // const [ prevType, setPrevType ] = useState('');

  /* This useEffect is made to change the de total if the amount change */
  const iterating_price_for_total = (array, amount, type) => {
    let cost = 0;
    let remanent = 0;
    let percent = 0.03;
    if (type === 'sell') percent = -0.03;
    if (amount === '') return [0, 0];
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
    if (type.selection !== 'limit-order') {
      if (orderBook.aggregatedAsks && orderBook.aggregatedAsks.length > 0) {
        const [marketTotal, marketPrice] = iterating_price_for_total(
          orderBook.aggregatedAsks,
          values.amount,
          type.trade
        );
        setValues({
          ...values,
          price: marketPrice.toFixed(formatingPair.pricePrecision),
          total: marketTotal.toFixed(formatingPair.quoteAssetPrecision),
        });
        setTotal(marketTotal.toFixed(formatingPair.quoteAssetPrecision));
      }
    }
  }, [orderBook.aggregatedAsks, values.amount, type.selection, formatingPair]);
  /* This useEffect works to change the total price when u switch from market to limit order */
  useEffect(() => {
    if (type.selection === 'limit-order') {
      console.log('entro aca??', values.amount, values.price);
      if (values.price !== '' && values.amount !== '') {
        setTotal((values.amount * values.price).toFixed(formatingPair.quoteAssetPrecision));
      }
    }
  }, [type.selection, values.amount, values.price, formatingPair]);

  useEffect(
    (_) => {
      if (orderData['price']) {
        setValues({
          ...values,
          amount: orderData.amount.toFixed(formatingPair.qtyPrecision),
          price: parseFloat(orderData.price).toFixed(formatingPair.pricePrecision),
        });
        setTotal(orderData.total.toFixed(formatingPair.quoteAssetPrecision));
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
            case 'WBTC':
              if (symbolA === 'BTC') setAvailableA(contractBalances[key]);
              else if (symbolB === 'BTC') setAvailableB(contractBalances[key]);
              break;
            case 'WXRP':
              if (symbolA === 'XRP') setAvailableA(contractBalances[key]);
              else if (symbolB === 'XRP') setAvailableB(contractBalances[key]);
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
      if (type.trade === 'buy') {
        setAvailable(availableB);
      } else if (type.trade === 'sell') {
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
    if (type.trade === 'sell') {
      setQtyForm((available * percent).toFixed(8));
      setValues({
        ...values,
        amount: (available * percent).toFixed(8),
      });
      setTotal((available * percent * lastPrice).toFixed(8));
    } else {
      setQtyForm(((available * percent) / lastPrice).toFixed(formatingPair.qtyPrecision));
      setValues({
        ...values,
        amount: ((available * percent) / lastPrice).toFixed(formatingPair.qtyPrecision),
      });
      setTotal((available * percent).toFixed(8));
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'amount' || e.target.name === 'price') {
      if (e.target.name === 'amount') {
        setQtyForm(e.target.value);
      }
      if (type.selection === 'limit-order') {
        if (values.price !== '') {
          setTotal((e.target.value * values.price).toFixed(formatingPair.pricePrecision));
        } else {
          setTotal((e.target.value * lastPrice).toFixed(formatingPair.pricePrecision));
        }
      }
    }

    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const submitOrder = async (_) => {
    if (values.amount === '' || Number(values.amount) <= 0) {
      openNotification({
        message: `Please, enter a valid amount.`,
      });
      return;
    }

    if (type.trade === 'buy') {
      if (Number(total) > Number(available)) {
        openNotification({
          message: `Insufficient ${symbolB} balance`,
        });

        return;
      }
    } else if (type.trade === 'sell') {
      if (Number(values.amount) > Number(available)) {
        openNotification({
          message: `Insufficient ${symbolA} balance`,
        });

        return;
      }
    }

    let price = values.price === '' ? lastPrice : values.price;

    // if (Number(price) <= 0) {
    //     openNotification({
    //         message: 'Price should be > 0'
    //     });
    //     return;
    // }

    let orderSymbolA = symbolA,
      orderSymbolB = symbolB;

    // ----------------------------------- Ethereum --------------------------------------

    if (symbolA === 'BTC') {
      orderSymbolA = 'WBTC';
    }

    if (symbolA === 'XRP') {
      orderSymbolA = 'WXRP';
    }

    if (symbolB === 'BTC') {
      orderSymbolB = 'WBTC';
    }

    if (symbolB === 'XRP') {
      orderSymbolB = 'WXRP';
    }

    let orderSymbols = [orderSymbolA, orderSymbolB];

    try {
      console.log(orderSymbols, type.trade, price, values.amount);

      let ethereumOrderMessage = '';

      if (fortmaticConnected) {
        let ethereumOrder = new EthereumOrder('fortmatic');
        ethereumOrderMessage = await ethereumOrder.toEthereumOrder(
          orderSymbols,
          type.trade,
          price,
          values.amount
        );
      } else if (metamaskConnected) {
        let ethereumOrder = new EthereumOrder('metamask');
        ethereumOrderMessage = await ethereumOrder.toEthereumOrder(
          orderSymbols,
          type.trade,
          price,
          values.amount,
          'metamask'
        );
      } else if (coinbaseConnected) {
        let ethereumOrder = new EthereumOrder('coinbase');
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
        amount: '',
        price: '',
      });
      setTotal(0);

      openNotification({
        message: ethereumOrderMessage,
      });
    } catch (e) {
      console.log('error', e);

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
            <span
              style={{
                color: mode === 'Dark' ? '#FFFFFF' : 'black',
                fontWeight: 'bold',
                fontSize: '14',
                marginLeft: '10px',
                marginTop: '10px',
              }}
            >
              Amount
            </span>
            <div className="amount-field">
            <Field
              className={`form-fields-buyandsell ${mode} after `}
              name="amount"
              type="number"
              min="0"
              value={values.amount}
              onChange={handleChange}
            />
            <label
              style={{
                fontSize: '14px',
                color: '#706E7D',
                marginLeft: '-40px',
                marginTop: '7px',
                color: mode === 'Dark' ? '#9797B3' : '#141029',
              }}
            >
              {symbolA}
            </label>
            </div>
           

            {touched.amount && values.amount && parseFloat(values.amount) > formatingPair.maxQty && (
              <label style={{ color: 'red' }}>
                You can't {type.trade} more than {formatingPair.maxQty} {symbolA} <br />
              </label>
            )}
            {touched.amount && values.amount && parseFloat(values.amount) < formatingPair.minQty && (
              <label style={{ color: 'red' }}>
                The minimum allowed amount is {formatingPair.minQty} {symbolA}
                <br />
              </label>
            )}
            {touched.amount &&
              values.amount.toString().split('.')[1] &&
              values.amount.toString().split('.')[1].length > formatingPair.qtyPrecision && (
                <label style={{ color: 'red' }}>
                  {formatingPair.qtyPrecision === 0
                    ? `use only integer quantities for this pair`
                    : `only up to ${formatingPair.qtyPrecision} decimals allowed`}
                  <br />
                </label>
              )}
            {type.selection === 'limit-order' && (
              <div>
                <span
                  style={{
                    color: mode === 'Dark' ? '#FFFFFF' : 'black',
                    fontWeight: 'bold',
                    fontSize: '14',
                    marginLeft: '10px',
                    marginTop: '10px',
                  }}
                >
                  Price
                </span>

                <Field
                  className={`form-fields-buyandsell ${mode}`}
                  name="price"
                  type="number"
                  
                  value={
                    values.price !== ''
                      ? values.price
                      : lastPrice.toFixed(formatingPair.pricePrecision)
                  }
                  onChange={handleChange}
                />
                {touched.price &&
                  values.price &&
                  parseFloat(values.price) > formatingPair.maxPrice && (
                    <label style={{ color: 'red' }}>
                      You can't set more than {formatingPair.maxPrice} for {symbolA} <br />
                    </label>
                  )}
                {touched.price &&
                  values.price &&
                  parseFloat(values.price) < formatingPair.minPrice && (
                    <label style={{ color: 'red' }}>
                      You can't set less than {formatingPair.minPrice} for {symbolA} <br />
                    </label>
                  )}
                {touched.price &&
                  values.price.toString().split('.')[1] &&
                  values.price.toString().split('.')[1].length > formatingPair.pricePrecision && (
                    <label style={{ color: 'red' }}>
                      only up to {formatingPair.pricePrecision} decimals allowed <br />
                    </label>
                  )}
              </div>
            )}
            <div
              style={{
                justifyContent: 'space-between',
                display: 'flex',
                paddingTop: '5px',
              }}
            >
              <span style={{ color: mode === 'Dark' ? '#9797B3' : '#A19FA9', marginLeft: '10px' }}>
                Available
              </span>

              {type.trade === 'buy' ? (
                <span
                  className="avl-amount"
                  style={{ color: mode === 'Dark' ? '#9797B3' : '#A19FA9' }}
                >
                  {available && parseFloat(available).toFixed(formatingPair.quoteAssetPrecision)}{' '}
                  {symbolB}
                </span>
              ) : (
                <span
                  className="avl-amount"
                  style={{ color: mode === 'Dark' ? '#9797B3' : '#A19FA9' }}
                >
                  {available && parseFloat(available).toFixed(formatingPair.baseAssetPrecision)}{' '}
                  {symbolA}
                </span>
              )}
            </div>
            
            <WithdrawAndDeposit balances={balances} />

            <div className={`group-buttons-percent`}>
              <button
                type="button"
                onClick={() => handlePercent(0.25)}
                className={`${mode}`}
              >
                25%
              </button>
              <button
                type="button"
                onClick={() => handlePercent(0.5)}
                className={`${mode}`}
              >
                50%
              </button>
              <button
                type="button"
                onClick={() => handlePercent(0.75)}
                className={`${mode}`}
              >
                75%
              </button>
              <button
                type="button"
                onClick={() => handlePercent(1)}
                className={`${mode}`}
              >
                100%
              </button>
            </div>

            <div className="total-price">
              <span
                style={{
                  color: mode === 'Dark' ? '#FFFFFF' : 'black',
                  fontWeight: 'bold',
                  fontSize: '14',
                  marginLeft: '10px',
                }}
              >
                Total
              </span>

              <Field
                className={`form-fields-buyandsell ${mode} after `}
                name="total"
                value={total}
                min="0"
                onChange={handleChange}
                disabled={true}
              />

              <label
                style={{
                  fontSize: '14px',
                  color: '#706E7D',
                  marginLeft: '-40px',
                  marginTop: '7px',
                  color: mode === 'Dark' ? '#9797B3' : '#141029',
                }}
              >
                {symbolB}
              </label>
            </div>
            <div style={{ margin: '20px 0px 20px 0' }}>
              {(metamaskConnected || fortmaticConnected || coinbaseConnected) &&
                type.trade === 'buy' && (
                  <button
                    className="submit-form buy"
                    type="submit"
                    onClick={submitOrder}
                    disabled={
                      parseFloat(values.price) <= 0 ||
                      parseFloat(values.amount) <= 0 ||
                      isNaN(parseFloat(values.amount)) ||
                      (values.amount.toString().split('.')[1] &&
                        values.amount.toString().split('.')[1].length >
                          formatingPair.qtyPrecision) ||
                      (values.price.toString().split('.')[1] &&
                        values.price.toString().split('.')[1].length >
                          formatingPair.pricePrecision) ||
                      (values.amount && parseFloat(values.amount) > formatingPair.maxQty) ||
                      (values.price && parseFloat(values.price) > formatingPair.maxPrice) ||
                      (values.amount && parseFloat(values.amount) < formatingPair.minQty) ||
                      (values.price && parseFloat(values.price) < formatingPair.minPrice)
                        ? true
                        : false
                    }
                  >
                    Buy {symbolA}
                  </button>
                )}

              {(metamaskConnected || fortmaticConnected || coinbaseConnected) &&
                type.trade === 'sell' && (
                  <button
                    className="submit-form sell"
                    type="submit"
                    onClick={submitOrder}
                    disabled={
                      parseFloat(values.price) <= 0 ||
                      parseFloat(values.amount) <= 0 ||
                      isNaN(parseFloat(values.amount)) ||
                      (values.amount.toString().split('.')[1] &&
                        values.amount.toString().split('.')[1].length >
                          formatingPair.qtyPrecision) ||
                      (values.price.toString().split('.')[1] &&
                        values.price.toString().split('.')[1].length >
                          formatingPair.pricePrecision) ||
                      (values.amount && parseFloat(values.amount) > formatingPair.maxQty) ||
                      (values.price && parseFloat(values.price) > formatingPair.maxPrice) ||
                      (values.amount && parseFloat(values.amount) < formatingPair.minQty) ||
                      (values.price && parseFloat(values.price) < formatingPair.minPrice)
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
