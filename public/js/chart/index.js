let width = 0;
let height = 0;

document.addEventListener('DOMContentLoaded', _ => {
    let { pathname } = window.location;

    if (pathname.includes('trade')) {
        const dataChart = document.querySelector('#chart-data');

        let { exchange, symbol, mode } = dataChart.dataset;

        window.addEventListener('resize', _ => {
            renderChart(exchange, symbol, mode);
        });

        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.type == 'attributes') {
                    let { exchange, symbol, mode } = dataChart.dataset;
                    renderChart(exchange, symbol, mode);
                }
            });
        });

        observer.observe(dataChart, {
            attributes: true, //configure it to listen to attribute changes
        });
        renderChart(exchange, symbol, mode);
    }
});
