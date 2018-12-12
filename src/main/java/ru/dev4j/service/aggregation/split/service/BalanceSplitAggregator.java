package ru.dev4j.service.aggregation.split.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.dev4j.model.DataType;
import ru.dev4j.model.Exchange;
import ru.dev4j.service.aggregation.split.Route;
import ru.dev4j.service.aggregation.split.Split;
import ru.dev4j.service.aggregation.split.SplitUtils;
import ru.dev4j.service.map.ExchangeMapService;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.*;

@Service
public class BalanceSplitAggregator {

    @Autowired
    private ExchangeMapService exchangeMapService;

    private static final BigDecimal ZERO = BigDecimal.valueOf(0);


    public Map<String,Object> secondLevel(String pair, BigDecimal price, DataType dataType, BigDecimal size, BigDecimal binanceBalance, BigDecimal bittrexBalance, BigDecimal poloniexBalance) {

        List<Split> boughtSplits = new ArrayList<>();

        Map<Exchange, BigDecimal> balanceMap = new HashMap<>();
        balanceMap.put(Exchange.BINANCE, binanceBalance);
        balanceMap.put(Exchange.BITTREX, bittrexBalance);
        balanceMap.put(Exchange.POLONIEX, poloniexBalance);


        if (dataType.equals(DataType.ASKS)) {
            aggregateAsks(boughtSplits, balanceMap, pair, price, size, binanceBalance, bittrexBalance, poloniexBalance);
        }
        if (dataType.equals(DataType.BIDS)) {
            aggregateBids(boughtSplits, balanceMap, pair, price, size, binanceBalance, bittrexBalance, poloniexBalance);
        }


        Map<Exchange, BigDecimal> sizeMap = new HashMap<>();
        Map<Exchange, BigDecimal> priceMap = new HashMap<>();

        Double totalCost = 0D;
        Double totalSize = 0D;

        for (Split split : boughtSplits) {
            if (dataType.equals(DataType.ASKS)) {
                handleAsksSplit(split, sizeMap, priceMap);
            }
            if (dataType.equals(DataType.BIDS)) {
                handleBidsSplit(split, sizeMap, priceMap);
            }
            Double cost = split.getSize().doubleValue() * split.getPrice().doubleValue();
            totalCost = totalCost + cost;
            totalSize = totalSize + split.getSize().doubleValue();
        }

        Map<String, Object> response = new HashMap<>();
        List<Route> routes = new ArrayList<>();
        DecimalFormat decimalFormat = new DecimalFormat("#0.########");
        routes.add(new Route(pair, Exchange.BINANCE, priceMap.get(Exchange.BINANCE) == null ? "0" : decimalFormat.format(priceMap.get(Exchange.BINANCE)),
                sizeMap.get(Exchange.BINANCE) == null ? "0" : decimalFormat.format(sizeMap.get(Exchange.BINANCE))));
        routes.add(new Route(pair, Exchange.BITTREX, priceMap.get(Exchange.BITTREX) == null ? "0" : decimalFormat.format(priceMap.get(Exchange.BITTREX)),
                sizeMap.get(Exchange.BITTREX) == null ? "0" : decimalFormat.format(sizeMap.get(Exchange.BITTREX))));
        routes.add(new Route(pair, Exchange.POLONIEX, priceMap.get(Exchange.POLONIEX) == null ? "0" : decimalFormat.format(priceMap.get(Exchange.POLONIEX)),
                sizeMap.get(Exchange.POLONIEX) == null ? "0" : decimalFormat.format(sizeMap.get(Exchange.POLONIEX))));
        response.put("routes", routes);
        response.put("totalCost", totalCost);
        if(totalSize > 0){
            response.put("totalPrice", totalCost / totalSize);
        }else{
            response.put("totalPrice", 0);
        }

        return response;
    }

    private void aggregateBids(List<Split> boughtSplits, Map<Exchange, BigDecimal> balanceMap, String pair, BigDecimal price, BigDecimal size, BigDecimal binanceBalance, BigDecimal bittrexBalance, BigDecimal poloniexBalance) {
        Iterator<Map.Entry<BigDecimal, String>> binanceBids = exchangeMapService.getAllBids(Exchange.BINANCE, pair).entrySet().iterator();
        Iterator<Map.Entry<BigDecimal, String>> bittrexBids = exchangeMapService.getAllBids(Exchange.BITTREX, pair).entrySet().iterator();
        Iterator<Map.Entry<BigDecimal, String>> poloniexBids = exchangeMapService.getAllBids(Exchange.POLONIEX, pair).entrySet().iterator();

        BigDecimal boughtSize = BigDecimal.valueOf(0);

        Map.Entry<BigDecimal, String> max = SplitUtils.maxValue();

        Map<Exchange, Map.Entry<BigDecimal, String>> exchangeMap = new HashMap<>();

        while (max.getKey().compareTo(price) == 1 && size.compareTo(boughtSize) == 1 && binanceBalance.compareTo(ZERO) == 1
                && bittrexBalance.compareTo(ZERO) == 1 && poloniexBalance.compareTo(ZERO) == 1) {
            SplitUtils.fullExchangeMap(exchangeMap, binanceBids, bittrexBids, poloniexBids);
            if (!binanceBids.hasNext() && !bittrexBids.hasNext() && !poloniexBids.hasNext()) {
                break;
            }
            max = SplitUtils.findMax(exchangeMap);
            if (max.getKey().compareTo(price) == 1) {
                Split split = decreaseBalance(max, balanceMap, exchangeMap);
                boughtSize = getBigDecimal(boughtSplits, size, boughtSize, split);
                extractValue(max, exchangeMap, balanceMap);
            }
        }
    }


    private void aggregateAsks(List<Split> boughtSplits, Map<Exchange, BigDecimal> balanceMap, String pair, BigDecimal price, BigDecimal size,
                              BigDecimal binanceBalance, BigDecimal bittrexBalance, BigDecimal poloniexBalance) {
        Iterator<Map.Entry<BigDecimal, String>> binanceAsks = exchangeMapService.getAllAsks(Exchange.BINANCE, pair).entrySet().iterator();
        Iterator<Map.Entry<BigDecimal, String>> bittrexAsks = exchangeMapService.getAllAsks(Exchange.BITTREX, pair).entrySet().iterator();
        Iterator<Map.Entry<BigDecimal, String>> poloniexAsks = exchangeMapService.getAllAsks(Exchange.POLONIEX, pair).entrySet().iterator();

        BigDecimal boughtSize = BigDecimal.valueOf(0);

        Map.Entry<BigDecimal, String> min = SplitUtils.minValue();

        Map<Exchange, Map.Entry<BigDecimal, String>> exchangeMap = new HashMap<>();

        while (price.compareTo(min.getKey()) == 1 && size.compareTo(boughtSize) == 1 && binanceBalance.compareTo(ZERO) == 1
                && bittrexBalance.compareTo(ZERO) == 1 && poloniexBalance.compareTo(ZERO) == 1) {
            SplitUtils.fullExchangeMap(exchangeMap, binanceAsks, bittrexAsks, poloniexAsks);
            if (!binanceAsks.hasNext() && !bittrexAsks.hasNext() && !poloniexAsks.hasNext()) {
                break;
            }
            min = SplitUtils.findMin(exchangeMap);
            if (price.compareTo(min.getKey()) == 1) {
                Split split = decreaseBalance(min, balanceMap, exchangeMap);
                boughtSize = getBigDecimal(boughtSplits, size, boughtSize, split);
                extractValue(min, exchangeMap, balanceMap);
            }
        }
    }

    /**
     * Decrease and check oversize
     *
     * @param boughtSplits
     * @param size
     * @param boughtSize
     * @param split
     * @return
     */
    private BigDecimal getBigDecimal(List<Split> boughtSplits, BigDecimal size, BigDecimal boughtSize, Split split) {
        if (split != null) {
            boughtSize = boughtSize.add(split.getSize());
            if (boughtSize.compareTo(size) == 1) {
                BigDecimal rest = boughtSize.subtract(size);
                BigDecimal subOrdQty = split.getSize();
                BigDecimal newSubOrdQty = subOrdQty.subtract(rest);
                split.setSize(newSubOrdQty);
            }
            boughtSplits.add(split);
        }
        return boughtSize;
    }


    /**
     * Full <code>finalmap</code> and <code>maxMap</code>
     *
     * @param split
     * @param finalMap
     * @param maxMap
     */
    private void handleAsksSplit(Split split, Map<Exchange, BigDecimal> finalMap, Map<Exchange, BigDecimal> maxMap) {
        Exchange exchange = split.getExchange();
        if (maxMap.get(exchange) == null) {
            maxMap.put(exchange, split.getPrice());
        } else {
            if (split.getPrice().compareTo(maxMap.get(exchange)) == 1) {
                maxMap.put(exchange, split.getPrice());
            }
        }
        if (finalMap.get(exchange) == null) {
            finalMap.put(exchange, split.getSize());
        } else {
            finalMap.put(exchange, finalMap.get(exchange).add(split.getSize()));
        }
    }

    /**
     * Full <code>finalmap</code> and <code>minMap</code>
     *
     * @param split
     * @param finalMap
     * @param minMap
     */
    private void handleBidsSplit(Split split, Map<Exchange, BigDecimal> finalMap, Map<Exchange, BigDecimal> minMap) {
        Exchange exchange = split.getExchange();
        if (minMap.get(exchange) == null) {
            minMap.put(exchange, split.getPrice());
        } else {
            if (split.getPrice().compareTo(minMap.get(exchange)) == -1) {
                minMap.put(exchange, split.getPrice());
            }
        }
        if (finalMap.get(exchange) == null) {
            finalMap.put(exchange, split.getSize());
        } else {
            finalMap.put(exchange, finalMap.get(exchange).add(split.getSize()));
        }
    }

    /**
     * Delete iterator max/min value
     *
     * @param value
     * @param exchangeMap
     * @param balanceMap
     */
    private void extractValue(Map.Entry<BigDecimal, String> value, Map<Exchange, Map.Entry<BigDecimal, String>> exchangeMap, Map<Exchange, BigDecimal> balanceMap) {
        Map.Entry<BigDecimal, String> binance = exchangeMap.get(Exchange.BINANCE);
        if (binance != null && binance.getKey().equals(value.getKey())) {
            exchangeMap.put(Exchange.BINANCE, null);
        }
        Map.Entry<BigDecimal, String> bittrex = exchangeMap.get(Exchange.BITTREX);
        if (bittrex != null && bittrex.getKey().equals(value.getKey())) {
            exchangeMap.put(Exchange.BITTREX, null);
        }
        Map.Entry<BigDecimal, String> poloniex = exchangeMap.get(Exchange.POLONIEX);
        if (poloniex != null && poloniex.getKey().equals(value.getKey())) {
            exchangeMap.put(Exchange.POLONIEX, null);
        }
    }

    /**
     * Business logic about balance calculation
     *
     * @param value
     * @param balanceMap
     * @param exchangeMap
     * @return
     */
    private Split decreaseBalance(Map.Entry<BigDecimal, String> value,
                                  Map<Exchange, BigDecimal> balanceMap, Map<Exchange, Map.Entry<BigDecimal, String>> exchangeMap) {
        Map.Entry<BigDecimal, String> binance = exchangeMap.get(Exchange.BINANCE);
        Exchange exchange = Exchange.BINANCE;
        if (binance != null && binance.getKey().equals(value.getKey())) {
            exchange = Exchange.BINANCE;
        }
        Map.Entry<BigDecimal, String> bittrex = exchangeMap.get(Exchange.BITTREX);
        if (bittrex != null && bittrex.getKey().equals(value.getKey())) {
            exchange = Exchange.BITTREX;
        }
        Map.Entry<BigDecimal, String> poloniex = exchangeMap.get(Exchange.POLONIEX);
        if (poloniex != null && poloniex.getKey().equals(value.getKey())) {
            exchange = Exchange.POLONIEX;
        }
        BigDecimal balance = balanceMap.get(exchange);
        Split split = new Split(value.getKey(), exchange);
        if (balance.compareTo(ZERO) == 1) {
            BigDecimal cost = value.getKey().multiply(new BigDecimal(value.getValue()));
            if (balance.compareTo(cost) == 1) {
                BigDecimal newBalance = balance.subtract(cost);
                balanceMap.put(exchange, newBalance);
                split.setSize(new BigDecimal(value.getValue()));
                return split;
            } else {
                BigDecimal size = new BigDecimal(balance.doubleValue() / value.getKey().doubleValue());
                BigDecimal newBalance = BigDecimal.valueOf(0);
                balanceMap.put(exchange, newBalance);
                split.setSize(size);
                return split;
            }
        } else {
            return null;
        }
    }

}
