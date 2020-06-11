import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

/* let price = require('crypto-price'); */

const TotalBalances = _ => {
    const balances = useSelector(state => state.balances);
    const { assets } = useSelector(state => state.wallet);
    const { changeInTickers, tickers } = useSelector(state => state.general);
    const [contract, setContract] = useState(null);
    const [total, setTotal] = useState(0);
    const [inBTC, setInBTC] = useState({});

    /*  console.log(tickers,assets) */
    useEffect(
        _ => {
            let newContract = {};
            for (let a in assets) {
                a = a.toUpperCase();
                newContract[a] = 0;
            }
            setContract(newContract);
        },
        [assets]
    );

    const setBTCTotal = async _ => {
        let newTotal = 0;
        let newInBTC = {};
        /*  console.log(tickers)  */
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
                        newInBTC[symbolA] = Number(contract[symbolA]) * Number(tickers[`${symbolA}-BTC`].lastPrice);
                    } else if (`BTC-${symbolA}` === pairs) {
                        /* price for dolar */
                        newInBTC[symbolA] = Number(contract[symbolA]) / Number(tickers[`BTC-${symbolA}`].lastPrice);
                    }
                }
            }
        }
        for (const key in newInBTC) {
            newTotal +=newInBTC[key]
        }
        /*   
        //OLD LOGIC
        for (let asset in contract) {
              let res = await price.getCryptoPrice('BTC', asset);
              let amount = 0;
              if (res) {
                  amount = Number(contract[asset]) * Number(res.price);
                  newInBTC[asset] = amount;
                  newTotal += Number(amount);
              } else {
                  newTotal += Number(contract[asset]);
                  newInBTC[asset] = contract[asset];
              }
          } */
        
                setTotal(newTotal);
                setInBTC(newInBTC); 
    };

    useEffect(
        _ => {
            setBTCTotal();
        },
        //eslint-disable-next-line react-hooks/exhaustive-deps
        [contract, changeInTickers]
    );

    useEffect(
        _ => {
            try {
                const { contractBalances } = balances;
                if (contractBalances) {
                    let newContract = {};

                    for (let a in assets) {
                        if (
                            Number(contractBalances[assets[a.toUpperCase()]]) >=
                            0
                        ) {
                            newContract[a.toUpperCase()] =
                                contractBalances[assets[a.toUpperCase()]];
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

    useEffect(
        _ => {
            if (total < 0) return;
            window.am4core.ready(function () {
                let data = [];

                for (let asset in inBTC) {
                    let percent = (100 * inBTC[asset]) / total;
                    
                    data.push({
                        name:asset ,
                        val: inBTC[asset],
                        
                    });
                }

                window.am4core.useTheme(window.am4themes_animated); // Themes end
                /**
                 * Define data for each year
                 */
                // Create chart instance
                var chart = window.am4core.create(
                    'pie',
                    window.am4charts.PieChart
                );
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
                chart.innerRadius = window.am4core.percent(50);
                var label = chart.seriesContainer.createChild(
                    window.am4core.Label
                );
                label.text = Number(total).toFixed(8) + ' BTC';
                label.horizontalCenter = 'middle';
                label.verticalCenter = 'middle';
                label.fontSize = 20;
                chart.innerRadius = window.am4core.percent(90); // Add and configure Series
                var pieSeries = chart.series.push(
                    new window.am4charts.PieSeries()
                );
                pieSeries.dataFields.value = 'val';
                pieSeries.dataFields.category = 'name';
                pieSeries.labels.template.disabled = true;
                pieSeries.ticks.template.disabled = true;
                pieSeries.colors.list = [
                    window.am4core.color('#8800ff'),//violet eth
                    window.am4core.color('#f7931a'),//yellow btc
                    window.am4core.color('#434343'),//black xrp
                    window.am4core.color('#2AA37E'),//green usdt
                ];
            });
        },
        [total]
    );

    return (
        <div className="graph">
            <h2>Total Balance</h2>
            <div className="graph-container" id="pie" />
            <div className="coins">
                {contract &&
                    Object.keys(contract).map(a => (
                        <div className="coin" key={a}>
                            <div className="left">
                                <img
                                    src={`./img/${a.toLowerCase()}-wallet.png`}
                                    alt={a}
                                />
                                <span className="name">{a.toUpperCase()}</span>
                            </div>
                            <span className="num">
                                {Number(contract[a.toUpperCase()]).toFixed(6)}
                            </span>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default TotalBalances;
