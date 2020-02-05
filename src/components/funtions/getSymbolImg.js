export default function(symbol) {
	symbol = symbol.toUpperCase();
	switch (symbol) {
		case 'ETH':
			return './img/eth-aside.svg';
		case 'BTC':
			return './img/btc-color.png';
		case 'WAN':
			return './img/wanchain.png';
		default:
			return './img/btc-color.png';
	}
}
