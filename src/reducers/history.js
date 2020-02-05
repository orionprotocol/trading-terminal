const initialState = {
	withdrawls: [],
	deposits: []
};

export default (state = initialState, { type, ...action }) => {
	switch (type) {
		case 'SetWithdrawls':
			return { ...state, withdrawls: action.payload };
		case 'SetDeposits':
			return { ...state, deposits: action.payload };
		default:
			return state;
	}
};
