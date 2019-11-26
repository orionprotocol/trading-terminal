const element = document.querySelector('#chart-data');

export default (state = { symbol: 'ETH-BTC' }, { type, ...action }) => {
	switch (type) {
		case 'SetSymbol':
			element.dataset.symbol = action.payload;
			return { ...state, symbol: action.payload };
		case 'SetOrdersBooks':
			return { ...state, ordersBooks: action.payload };
		default:
			return state;
	}
};
