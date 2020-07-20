export default (
  state = {
    walletBalances: { ETH: '', USDT: '', WBTC: '', WXRP: '', ERD: '' },
    contractBalances: { ETH: '', USDT: '', WBTC: '', WXRP: '', ERD: '' },
  },
  { type, ...action }
) => {
  switch (type) {
    case 'SetBalances':
      return action.payload;
    default:
      return state;
  }
};
