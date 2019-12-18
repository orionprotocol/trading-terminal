const initialState = {
	walletOpt: 'wanchain',
	wanActive: false,
	wanmaskConnect: false
};

export default (state = initialState, { type, ...action }) => {
	switch (type) {
		case 'SetWanmaskConnect':
			return { ...state, wanmaskConnect: action.payload };
		case 'SetWanActive':
			return { ...state, wanActive: action.payload };
		case 'SetWalletOpt':
			return { ...state, walletOpt: action.payload };
		default:
			return state;
	}
};
