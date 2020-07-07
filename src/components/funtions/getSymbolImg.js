export default function (symbol) {
  symbol = symbol.toUpperCase();
  switch (symbol) {
    case "ETH":
      return "./img/eth-aside.svg";
    case "BTC":
      return "./img/btc-color.png";
    case "WAN":
      return "./img/wanchain.png";
    case "XRP":
      return "./img/xrp-wallet.png";
    case "ERD":
      return "./img/erd-wallet.png";
    default:
      return "./img/btc-color.png";
  }
}
