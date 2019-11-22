"use strict";

am4core.ready(function () {
  am4core.useTheme(am4themes_animated); // Themes end

  /**
   * Define data for each year
   */
  // Create chart instance

  var chart = am4core.create("pie", am4charts.PieChart);
  chart.data = [{
    'name': 'DASH',
    'val': '45'
  }, {
    'name': 'BTC',
    'val': '40'
  }, {
    'name': 'ETH',
    'val': '15'
  }]; // Add label

  chart.innerRadius = am4core.percent(50);
  var label = chart.seriesContainer.createChild(am4core.Label);
  label.text = "3.3078099BTC";
  label.horizontalCenter = "middle";
  label.verticalCenter = "middle";
  label.fontSize = 20;
  chart.innerRadius = am4core.percent(90); // Add and configure Series

  var pieSeries = chart.series.push(new am4charts.PieSeries());
  pieSeries.dataFields.value = "val";
  pieSeries.dataFields.category = "name";
  pieSeries.labels.template.disabled = true;
  pieSeries.ticks.template.disabled = true;
  pieSeries.colors.list = [am4core.color("#00bbff"), am4core.color("#f7931a"), am4core.color("#8800ff")];
});