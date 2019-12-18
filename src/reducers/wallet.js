const initialState = {
	walletOpt: 'wanchain',
	wanActive: false
};

export default (state = initialState, { type, ...action }) => {
	switch (type) {
		case 'SetWanActive':
			return { ...state, wanActive: action.payload };
		case 'SetWalletOpt':
			return { ...state, walletOpt: action.payload };
		default:
			return state;
	}
};
