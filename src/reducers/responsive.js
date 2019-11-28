const initialState = {
	home: {
		active: false,
		pair: false,
		exchange: false,
		chart: false,
		history: false,
		orderbook: false
	}
};

export default (state = initialState, { type }) => {
	const div = document.querySelector('#chart-container');
	switch (type) {
		case 'SetHomeActive':
			return { ...state, home: { ...state.home, active: !state.home.active } };
		case 'SetHomePair':
			div.style.visibility = 'hidden';
			return {
				...state,
				home: {
					...state.home,
					pair: true,
					exchange: false,
					chart: false,
					history: false,
					orderbook: false
				}
			};
		case 'SetHomeExchange':
			div.style.visibility = 'hidden';
			return {
				...state,
				home: {
					...state.home,
					pair: false,
					exchange: true,
					chart: false,
					history: false,
					orderbook: false
				}
			};
		case 'SetHomeChart':
			return {
				...state,
				home: {
					...state.home,
					pair: false,
					exchange: false,
					chart: true,
					history: false,
					orderbook: false
				}
			};
		case 'SetHomeHistory':
			div.style.visibility = 'hidden';
			return {
				...state,
				home: {
					...state.home,
					pair: false,
					exchange: false,
					chart: false,
					history: true,
					orderbook: false
				}
			};
		case 'SetHomeOrderbook':
			div.style.visibility = 'hidden';
			return {
				...state,
				home: {
					...state.home,
					pair: false,
					exchange: false,
					chart: false,
					history: false,
					orderbook: true
				}
			};
		default:
			return state;
	}
};
