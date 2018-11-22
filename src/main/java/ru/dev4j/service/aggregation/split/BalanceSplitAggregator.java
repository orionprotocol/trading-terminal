package ru.dev4j.service.aggregation.split;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.dev4j.model.DataType;
import ru.dev4j.model.Exchange;
import ru.dev4j.service.map.ExchangeMapService;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Service
public class BalanceSplitAggregator {

    @Autowired
    private ExchangeMapService exchangeMapService;


    public List<Route> secondLevel(String pair, DataType dataType, BigDecimal size, BigDecimal binanceBalance, BigDecimal bittrexBalance, BigDecimal poloniexBalance) {
        if (dataType.equals(DataType.ASKS)) {

        }
        return null;
    }

    public List<Route> aggregateAsks(String pair, DataType dataType, BigDecimal size, BigDecimal binanceBalance, BigDecimal bittrexBalance, BigDecimal poloniexBalance) {
        Double aggregatedSize = 0D;

        Map<Exchange, Map.Entry<BigDecimal, String>> exchangeMap = new HashMap<>();

        Iterator<Map.Entry<BigDecimal, String>> binanceAsks = exchangeMapService.getAllAsks(Exchange.BINANCE, pair).entrySet().iterator();
        Iterator<Map.Entry<BigDecimal, String>> bittrexAsks = exchangeMapService.getAllAsks(Exchange.BITTREX, pair).entrySet().iterator();
        Iterator<Map.Entry<BigDecimal, String>> poloniexAsks = exchangeMapService.getAllAsks(Exchange.POLONIEX, pair).entrySet().iterator();

        BigDecimal boughtSize = BigDecimal.valueOf(0);
        BigDecimal spentBinanceBalance = BigDecimal.valueOf(0);

        //TODO: Find min first between all exchanges
        while (binanceBalance.compareTo(spentBinanceBalance) == 1 && binanceAsks.hasNext() && size.compareTo(boughtSize) == 1) {
            Map.Entry<BigDecimal, String> binance = binanceAsks.next();
            BigDecimal cost = binance.getKey().multiply(new BigDecimal(binance.getValue()));

        }

        return null;
    }

}
