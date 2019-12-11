/**
	{walletBalances: {…}, contractbalances: {…}}
*/

export default (state = {}, { type, ...action }) => {
	switch (type) {
		case 'SetBalances':
			// let all = action.payload;
			// let newState = {
			// 	walletBalances: all.walletBalances,
			// 	contractBalances: all.contractbalances
			// };
			return action.payload;
		default:
			return state;
	}
};
