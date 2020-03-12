const initialState = {
	walletOpt: 'wanchain',
	wanActive: false,
	wanmaskConnected: false,
	metamaskConnected: false,
	addWallet: false,
	ethAddress: '',
	// assets: { WAN: 'WAN', ETH: 'ETH', BTC: 'WBTC', XRP: 'WXRP' }
	assets: { ETH: 'ETH', BTC: 'WBTC', XRP: 'WXRP' }
	// assets: []
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
		case 'SetAddWallet':
			return { ...state, addWallet: action.payload };
		case 'SetEthAddress':
			return { ...state, ethAddress: action.payload };
		case 'SetWalletAssets':
			return { ...state, assets: action.payload };
		default:
			return state;
	}
};
