export const reformatNameCoins = (coin) => {
  switch (coin) {
    case "WBTC":
      return "BTC";
    case "WXRP":
      return "XRP";
    case "USDT":
      return "USD";
    default:
      return coin;
  }
};
