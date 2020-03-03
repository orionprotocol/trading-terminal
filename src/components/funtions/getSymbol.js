export default function(symbol) {
	switch (symbol) {
		case 'wbtc':
			return 'BTC';
		case 'weth':
			return 'ETH';
		case 'wxrp':
			return 'XRP';
		default:
			return symbol.toUpperCase();
	}
}
