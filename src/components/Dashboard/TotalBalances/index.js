import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const TotalBalances = _ => {
	const balances = useSelector(state => state.balances);
	const [ contract, setContract ] = useState({
		ETH: 0,
		BTC: 0,
		WAN: 0
	});

	useEffect(
		_ => {
			try {
				const { contractBalances } = balances;
				if (contractBalances) {
					setContract({
						...contract,
						ETH: Number(contractBalances.WETH),
						BTC: Number(contractBalances.WBTC),
						WAN: Number(contractBalances.WAN)
					});
				}
			} catch (e) {
				console.log(e);
			}
		},
		//eslint-disable-next-line react-hooks/exhaustive-deps
		[ balances ]
	);

	useEffect(_ => {
		window.am4core.ready(function() {
			window.am4core.useTheme(window.am4themes_animated); // Themes end
			/**
		   * Define data for each year
		   */
			// Create chart instance
			var chart = window.am4core.create('pie', window.am4charts.PieChart);
			chart.data = [
				{
					name: 'WAN',
					val: '45'
				},
				{
					name: 'BTC',
					val: '40'
				},
				{
					name: 'ETH',
					val: '15'
				}
			]; // Add label
			chart.innerRadius = window.am4core.percent(50);
			var label = chart.seriesContainer.createChild(window.am4core.Label);
			label.text = '3.3078099BTC';
			label.horizontalCenter = 'middle';
			label.verticalCenter = 'middle';
			label.fontSize = 20;
			chart.innerRadius = window.am4core.percent(90); // Add and configure Series
			var pieSeries = chart.series.push(new window.am4charts.PieSeries());
			pieSeries.dataFields.value = 'val';
			pieSeries.dataFields.category = 'name';
			pieSeries.labels.template.disabled = true;
			pieSeries.ticks.template.disabled = true;
			pieSeries.colors.list = [
				window.am4core.color('#424054'),
				window.am4core.color('#f7931a'),
				window.am4core.color('#8800ff')
			];
		});
	}, []);

	return (
		<div className="graph">
			<h2>Total Balance</h2>
			<div className="graph-container" id="pie" />
			<div className="coins">
				<div className="coin">
					<div className="left">
						<img src="./img/wanchain.png" alt="dash" />
						<span className="name">WAN</span>
					</div>
					<span className="num">{contract.WAN.toFixed(6)}</span>
				</div>
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
			</div>
		</div>
	);
};

export default TotalBalances;
