const initialState = {
	home: {
		active: false,
		pair: false,
		exchange: true,
		chart: false,
		history: false,
		orderbook: false
	}
};

export default (state = initialState, { type, ...action }) => {
	switch (type) {
		case 'SetHomeActive':
			return { ...state, home: { ...state.home, active: action.payload } };
		case 'SetHomePair':
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
