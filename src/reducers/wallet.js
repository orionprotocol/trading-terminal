const initialState = {
    walletOpt: 'wanchain',
    wanActive: false,
    wanmaskConnected: false,
    metamaskConnected: false,
    fortmaticConnected: false,
    coinbaseConnected: false,
    addWallet: false,
    ethAddress: '',
    assets: { ETH: 'ETH', BTC: 'WBTC', XRP: 'WXRP', USDT: 'USDT', ERD: 'ERD' },
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
        case 'SetFortmaticConnect':
            return { ...state, fortmaticConnected: action.payload };
        case 'SetCoinbaseConnect':
            return { ...state, coinbaseConnected: action.payload };    
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
