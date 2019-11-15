export default (state = {}, { type, ...action }) => {
	switch (type) {
		case 'SetBalances':
			return action.payload;
		default:
			return state;
	}
};
