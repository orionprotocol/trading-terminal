import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'antd';
import './totalb.scss';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { ethereum } from '../../../services/Coinbase';

am4core.useTheme(am4themes_animated);

const TotalBalances = (_) => {
  /* REDUX */
  const balances = useSelector((state) => state.balances);
  const mode = useSelector((state) => state.general.mode);
  const assets = useSelector((state) => state.wallet.assets);
  const tickers = useSelector((state) => state.general.tickers);
  const [contract, setContract] = useState({});
  /* REDUX */

  const [disconnecting, setdisconnecting] = useState(false);

  /* Disconnection function */
  const clearLocalStorage = (_) => {
    localStorage.removeItem('wanmaskConnected');
    localStorage.removeItem('metamaskConnected');
    localStorage.removeItem('fortmaticConnected');
    localStorage.removeItem('coinbaseConnected');
    localStorage.removeItem('ethAddress');
    localStorage.removeItem('address');
  };

  const handleDisconnect = (_) => {
    setdisconnecting(true);
    if (localStorage.getItem('coinbaseConnected')) {
      ethereum.close();
    }
    clearLocalStorage();

    setTimeout(() => {
      setdisconnecting(false);
      window.location.replace('/');
    }, 1000);
  };
  /* Disconnection function */
  useEffect(
    (_) => {
      let newContract = {};
      for (let a in assets) {
        a = a.toUpperCase();
        newContract[a] = 0;
      }
      setContract(newContract);
    },
    [assets]
  );

  const setBTCTotal = async (_) => {
    let newTotal = 0;
    let newInBTC = {};

    /*  CALCULATING TOTALS IN BTC  */
    for (const symbolA in contract) {
      let amount = 0;
      for (const pairs in tickers) {
        if (symbolA === 'BTC') {
          /* If pure btc */
          newInBTC[symbolA] = contract[symbolA];
          /*  console.log(contract[symbolA]) */
        } else {
          if (`${symbolA}-BTC` === pairs) {
            /* price for a symbol */
            newInBTC[symbolA] =
              Number(contract[symbolA]) * Number(tickers[`${symbolA}-BTC`].lastPrice);
          } else if (`BTC-${symbolA}` === pairs) {
            /* price for dolar */
            newInBTC[symbolA] =
              Number(contract[symbolA]) / Number(tickers[`BTC-${symbolA}`].lastPrice);
          }
        }
      }
    }
    for (const key in newInBTC) {
      newTotal += newInBTC[key];
    }

    /* CHART CREATE */
    if (Object.keys(newInBTC).length > 0) {
      am4core.ready(function () {
        let data = [];
        for (let asset in newInBTC) {
          let percent = (100 * newInBTC[asset]) / newTotal;

          data.push({
            name: asset,
            val: newInBTC[asset],
          });
        }

        var chart = am4core.create('pie', am4charts.PieChart);
        chart.data = data;
        // chart.data = [
        //     {
        //         name: "XRP",
        //         val: "45"
        //     },
        //     {
        //         name: "BTC",
        //         val: "40"
        //     },
        //     {
        //         name: "ETH",
        //         val: "15"
        //     }
        // ]; // Add label
        chart.innerRadius = am4core.percent(50);
        var label = chart.seriesContainer.createChild(am4core.Label);
        label.text = Number(newTotal).toFixed(8) + ' BTC';
        label.horizontalCenter = 'middle';
        label.verticalCenter = 'middle';
        label.fontSize = 20;
        chart.innerRadius = am4core.percent(90); // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = 'val';
        pieSeries.dataFields.category = 'name';
        pieSeries.labels.template.disabled = true;
        pieSeries.ticks.template.disabled = true;
        pieSeries.colors.list = [
          am4core.color('#8800ff'), //violet eth
          am4core.color('#f7931a'), //yellow btc
          am4core.color('#434343'), //black xrp
          am4core.color('#2AA37E'), //green usdt
        ];
      });
    }
  };
  const [firstTimeSetTotal, setfirstTimeSetTotal] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setBTCTotal();
      setfirstTimeSetTotal(!firstTimeSetTotal);
    }, 10000);

    return () => clearTimeout(timeout);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstTimeSetTotal]);

  useEffect(() => {
    let newTotal = 0;
    let newInBTC = {};
    /*  CALCULATING TOTALS IN BTC  */
    for (const symbolA in contract) {
      let amount = 0;
      for (const pairs in tickers) {
        if (symbolA === 'BTC') {
          /* If pure btc */
          newInBTC[symbolA] = contract[symbolA];
          /*  console.log(contract[symbolA]) */
        } else {
          if (`${symbolA}-BTC` === pairs) {
            /* price for a symbol */
            newInBTC[symbolA] =
              Number(contract[symbolA]) * Number(tickers[`${symbolA}-BTC`].lastPrice);
          } else if (`BTC-${symbolA}` === pairs) {
            /* price for dolar */
            newInBTC[symbolA] =
              Number(contract[symbolA]) / Number(tickers[`BTC-${symbolA}`].lastPrice);
          }
        }
      }
    }
    for (const key in newInBTC) {
      newTotal += newInBTC[key];
    }
    console.log(newTotal);
    /* CHART CREATE */
    am4core.ready(function () {
      let data = [];
      for (let asset in newInBTC) {
        let percent = (100 * newInBTC[asset]) / newTotal;
        data.push({
          name: asset,
          val: newInBTC[asset],
        });
      }

      var chart = am4core.create('pie', am4charts.PieChart);
      chart.data = data;
      chart.innerRadius = am4core.percent(50);
      var label = chart.seriesContainer.createChild(am4core.Label);
      label.text = Number(newTotal).toFixed(8) + ' BTC';
      label.horizontalCenter = 'middle';
      label.verticalCenter = 'middle';
      label.fontSize = 20;
      chart.innerRadius = am4core.percent(90); // Add and configure Series
      var pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = 'val';
      pieSeries.dataFields.category = 'name';
      pieSeries.labels.template.disabled = true;
      pieSeries.ticks.template.disabled = true;
      pieSeries.colors.list = [
        am4core.color('#8800ff'), //violet eth
        am4core.color('#f7931a'), //yellow btc
        am4core.color('#434343'), //black xrp
        am4core.color('#2AA37E'), //green usdt
      ];
    });
  }, [contract]);

  useEffect(
    (_) => {
      try {
        const { contractBalances } = balances;
        if (contractBalances) {
          let newContract = {};

          for (let a in assets) {
            if (Number(contractBalances[assets[a.toUpperCase()]]) >= 0) {
              newContract[a.toUpperCase()] = contractBalances[assets[a.toUpperCase()]];
            } else {
              newContract[a.toUpperCase()] = 0;
            }
          }

          setContract({
            // ...contract,
            ...newContract,
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [balances]
  );

  return (
    <Col xs={24} lg={6}>
      <div className="graph">
        <h2>Total Balance</h2>
        <div className="graph-container" id="pie" />
        <div className="coins">
          {contract &&
            Object.keys(contract).map((a) => (
              <div className="coin" key={a}>
                <div className="left">
                  {/* i can also import the image from public folder like this, but only works from public folder
               <img src={`./img/currencies_highlight/${a.toLowerCase()}.svg`} alt={a} />  */}
                  <img src={`/img/icons/currencies_highlight/${a.toLowerCase()}.svg`} alt={a} />

                  <span className="name">{a.toUpperCase()}</span>
                </div>
                <span className="num">{Number(contract[a.toUpperCase()]).toFixed(6)}</span>
              </div>
            ))}
        </div>
        <button onClick={handleDisconnect} type="button" className={`btn-disconnet ${mode}`}>
          {!disconnecting ? (
            <>
              <img src={`/img/icons/dashboard/totalBalance/minusIcon-${mode}.svg`} alt={'minus'} />
              <span>Disconnect All</span>
            </>
          ) : (
            <div class="spinner-loader-btn">
              <div class="rect1"></div>
              <div class="rect2"></div>
              <div class="rect3"></div>
              <div class="rect4"></div>
              <div class="rect5"></div>
            </div>
          )}
        </button>
      </div>
    </Col>
  );
};

export default TotalBalances;
