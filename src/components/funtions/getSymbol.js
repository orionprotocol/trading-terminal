export default function(symbol) {
	switch (symbol) {
		case 'wbtc':
			return 'BTC';
		case 'weth':
			return 'ETH';
		default:
			return symbol.toUpperCase();
	}
}
