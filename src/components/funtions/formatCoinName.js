
export const reformatNameCoins =(coin)=>{
    switch (coin) {
        case 'WBTC':
            return 'BTC'
        case 'WXRP':
            return 'XRP'
        default:
            return coin
    }
}