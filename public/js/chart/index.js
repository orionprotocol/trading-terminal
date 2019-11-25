let width = 0;
let height = 0;

document.addEventListener('DOMContentLoaded', _ => {
	const element = document.querySelector('#chart-container');
	const dataChart = document.querySelector('#chart-data');

	width = element.offsetWidth - 5;
	height = element.offsetHeight - 5;
	let { exchange, symbol } = dataChart.dataset;

	window.addEventListener('resize', _ => {
		width = element.offsetWidth - 5;
		height = element.offsetHeight - 5;
		renderChart(width, height, exchange, symbol);
	});

	const observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			if (mutation.type == 'attributes') {
				let { exchange, symbol } = dataChart.dataset;
				renderChart(width, height, exchange, symbol);
			}
		});
	});

	observer.observe(dataChart, {
		attributes: true //configure it to listen to attribute changes
	});

	renderChart(width, height, exchange, symbol);
});
