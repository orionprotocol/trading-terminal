let width = 0;
let height = 0;

document.addEventListener('DOMContentLoaded', _ => {
	const dataChart = document.querySelector('#chart-data');

	let { exchange, symbol } = dataChart.dataset;

	window.addEventListener('resize', _ => {
		renderChart(exchange, symbol);
	});

	const observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			if (mutation.type == 'attributes') {
				let { exchange, symbol } = dataChart.dataset;
				renderChart(exchange, symbol);
			}
		});
	});

	observer.observe(dataChart, {
		attributes: true //configure it to listen to attribute changes
	});
	renderChart(exchange, symbol);
});
