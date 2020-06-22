/**
	{walletBalances: {…}, contractbalances: {…}}
*/
/* Por los momentos y la unica forma de visualizar los cambios en el balance, es indicandole exactamente los nombres de los atributos dentro del objeto balance para que el useEffect pueda observar cuando cambian los balances en tiempo real */
export default (state = {walletBalances: {ETH:'',USDT:'',WBTC:'',WXRP:''}, contractBalances: {ETH:'',USDT:'',WBTC:'',WXRP:''}}, { type, ...action }) => {
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
