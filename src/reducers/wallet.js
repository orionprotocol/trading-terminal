const initialState = {
	walletOpt: 'wanchain',
	wanActive: false,
	wanmaskConnected: false,
	metamaskConnected: false
};

export default (state = initialState, { type, ...action }) => {
	switch (type) {
		case 'SetWanmaskConnect':
			return { ...state, wanmaskConnected: action.payload };
		case 'SetWanActive':
			return { ...state, wanActive: action.payload };
		case 'SetWalletOpt':
			return { ...state, walletOpt: action.payload };
		case 'SetMetamaskConnect':
			return { ...state, metamaskConnected: action.payload };
		default:
			return state;
	}
};
