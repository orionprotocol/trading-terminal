import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

let price = require("crypto-price");

const TotalBalances = _ => {
    const balances = useSelector(state => state.balances);
    const [contract, setContract] = useState({
        ETH: 0,
        BTC: 0,
        XRP: 0
    });
    const [total, setTotal] = useState(0);
    const [inBTC, setInBTC] = useState({});

    const setBTCTotal = async _ => {
        let newTotal = 0;
        let newInBTC = {};

        for (let asset in contract) {
            let res = await price.getCryptoPrice("BTC", asset);
            let amount = 0;
            if (res) {
                amount = Number(contract[asset]) * Number(res.price);
                newInBTC[asset] = amount;
                newTotal += amount;
            } else {
                newTotal += contract[asset];
                newInBTC[asset] = contract[asset];
            }
        }
        setTotal(newTotal);
        setInBTC(newInBTC);
    };

    useEffect(
        _ => {
            setBTCTotal();
        },
        //eslint-disable-next-line react-hooks/exhaustive-deps
        [contract]
    );

    useEffect(
        _ => {
            try {
                const { contractBalances } = balances;
                if (contractBalances) {
                    setContract({
                        ...contract,
                        // ETH: Number(contractBalances.WETH) || 0,
                        ETH: Number(contractBalances.ETH) || 0,
                        BTC: Number(contractBalances.WBTC) || 0,
                        XRP: Number(contractBalances.WXRP) || 0
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
            window.am4core.ready(function() {
                let data = [];

                for (let asset in inBTC) {
                    let percent = (100 * inBTC[asset]) / total;

                    data.push({
                        name: asset,
                        val: percent
                    });
                }

                window.am4core.useTheme(window.am4themes_animated); // Themes end
                /**
                 * Define data for each year
                 */
                // Create chart instance
                var chart = window.am4core.create(
                    "pie",
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
                label.text = total.toFixed(8) + " BTC";
                label.horizontalCenter = "middle";
                label.verticalCenter = "middle";
                label.fontSize = 20;
                chart.innerRadius = window.am4core.percent(90); // Add and configure Series
                var pieSeries = chart.series.push(
                    new window.am4charts.PieSeries()
                );
                pieSeries.dataFields.value = "val";
                pieSeries.dataFields.category = "name";
                pieSeries.labels.template.disabled = true;
                pieSeries.ticks.template.disabled = true;
                pieSeries.colors.list = [
                    window.am4core.color("#424054"),
                    window.am4core.color("#f7931a"),
                    window.am4core.color("#8800ff")
                ];
            });
        },
        [total, inBTC]
    );

    return (
        <div className="graph">
            <h2>Total Balance</h2>
            <div className="graph-container" id="pie" />
            <div className="coins">
                <div className="coin">
                    <div className="left">
                        <img src="./img/btc-wallet.png" alt="dash" />
                        <span className="name">BTC</span>
                    </div>
                    <span className="num">{contract.BTC.toFixed(6)}</span>
                </div>
                <div className="coin">
                    <div className="left">
                        <img src="./img/eth-wallet.png" alt="dash" />
                        <span className="name">eth</span>
                    </div>
                    <span className="num">{contract.ETH.toFixed(6)}</span>
                </div>
                <div className="coin">
                    <div className="left">
                        <img src="./img/xrp-wallet.png" alt="dash" />
                        <span className="name">XRP</span>
                    </div>
                    <span className="num">{contract.XRP.toFixed(6)}</span>
                </div>
            </div>
        </div>
    );
};

export default TotalBalances;
