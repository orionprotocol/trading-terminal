export const reformatNameCoins = (coin) => {
  switch (coin) {
    case "WBTC":
      return "BTC";
    case "WXRP":
      return "XRP";
    case "USDT":
      return "USD";
    case "ERD":
      return "ERD";
    default:
      return coin;
  }
};
