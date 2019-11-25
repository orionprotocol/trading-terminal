const element = document.querySelector('#chart-data');

const setExchange = exchange => {
	element.dataset.exchange = exchange;
};

const getExchange = _ => element.dataset.exchange;

const setSymbol = symbol => {
	element.dataset.symbol = symbol;
};

const getSymbol = _ => element.dataset.symbol;

module.exports = {
	setExchange,
	getExchange,
	setSymbol,
	getSymbol
};
