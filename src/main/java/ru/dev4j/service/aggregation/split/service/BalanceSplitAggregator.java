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

    private static final Double ZERO = 0D;


    public Map<String,Object> secondLevel(String pair, Double price, DataType dataType, Double size, Double binanceBalance, Double bittrexBalance, Double poloniexBalance) {

        List<Split> boughtSplits = new ArrayList<>();

        Map<Exchange, Double> balanceMap = new HashMap<>();
        balanceMap.put(Exchange.BINANCE, binanceBalance);
        balanceMap.put(Exchange.BITTREX, bittrexBalance);
        balanceMap.put(Exchange.POLONIEX, poloniexBalance);


        if (dataType.equals(DataType.ASKS)) {
            aggregateAsks(boughtSplits, balanceMap, pair, price, size, binanceBalance, bittrexBalance, poloniexBalance);
        }
        if (dataType.equals(DataType.BIDS)) {
            aggregateBids(boughtSplits, balanceMap, pair, price, size, binanceBalance, bittrexBalance, poloniexBalance);
        }


        Map<Exchange, Double> sizeMap = new HashMap<>();
        Map<Exchange, Double> priceMap = new HashMap<>();

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

    private void aggregateBids(List<Split> boughtSplits, Map<Exchange, Double> balanceMap, String pair, Double price, Double size, Double binanceBalance, Double bittrexBalance, Double poloniexBalance) {
        Iterator<Map.Entry<Double, Double>> binanceBids = exchangeMapService.getAllBids(Exchange.BINANCE, pair).entrySet().iterator();
        Iterator<Map.Entry<Double, Double>> bittrexBids = exchangeMapService.getAllBids(Exchange.BITTREX, pair).entrySet().iterator();
        Iterator<Map.Entry<Double, Double>> poloniexBids = exchangeMapService.getAllBids(Exchange.POLONIEX, pair).entrySet().iterator();

        Double boughtSize = 0D;

        Map.Entry<Double, Double> max = SplitUtils.maxValue();

        Map<Exchange, Map.Entry<Double, Double>> exchangeMap = new HashMap<>();

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


    private void aggregateAsks(List<Split> boughtSplits, Map<Exchange, Double> balanceMap, String pair, Double price, Double size,
                               Double binanceBalance, Double bittrexBalance, Double poloniexBalance) {
        Iterator<Map.Entry<Double, Double>> binanceAsks = exchangeMapService.getAllAsks(Exchange.BINANCE, pair).entrySet().iterator();
        Iterator<Map.Entry<Double, Double>> bittrexAsks = exchangeMapService.getAllAsks(Exchange.BITTREX, pair).entrySet().iterator();
        Iterator<Map.Entry<Double, Double>> poloniexAsks = exchangeMapService.getAllAsks(Exchange.POLONIEX, pair).entrySet().iterator();

        Double boughtSize = 0D;

        Map.Entry<Double, Double> min = SplitUtils.minValue();

        Map<Exchange, Map.Entry<Double, Double>> exchangeMap = new HashMap<>();

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
    private Double getBigDecimal(List<Split> boughtSplits, Double size, Double boughtSize, Split split) {
        if (split != null) {
            boughtSize = boughtSize + split.getSize();
            if (boughtSize.compareTo(size) == 1) {
                Double rest = boughtSize- size;
                Double subOrdQty = split.getSize();
                Double newSubOrdQty = subOrdQty - rest;
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
    private void handleAsksSplit(Split split, Map<Exchange, Double> finalMap, Map<Exchange, Double> maxMap) {
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
            finalMap.put(exchange, finalMap.get(exchange) + split.getSize());
        }
    }

    /**
     * Full <code>finalmap</code> and <code>minMap</code>
     *
     * @param split
     * @param finalMap
     * @param minMap
     */
    private void handleBidsSplit(Split split, Map<Exchange, Double> finalMap, Map<Exchange, Double> minMap) {
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
            finalMap.put(exchange, finalMap.get(exchange) + split.getSize());
        }
    }

    /**
     * Delete iterator max/min value
     *
     * @param value
     * @param exchangeMap
     * @param balanceMap
     */
    private void extractValue(Map.Entry<Double, Double> value, Map<Exchange, Map.Entry<Double, Double>> exchangeMap, Map<Exchange, Double> balanceMap) {
        Map.Entry<Double, Double> binance = exchangeMap.get(Exchange.BINANCE);
        if (binance != null && binance.getKey().equals(value.getKey())) {
            exchangeMap.put(Exchange.BINANCE, null);
        }
        Map.Entry<Double, Double> bittrex = exchangeMap.get(Exchange.BITTREX);
        if (bittrex != null && bittrex.getKey().equals(value.getKey())) {
            exchangeMap.put(Exchange.BITTREX, null);
        }
        Map.Entry<Double, Double> poloniex = exchangeMap.get(Exchange.POLONIEX);
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
    private Split decreaseBalance(Map.Entry<Double, Double> value,
                                  Map<Exchange, Double> balanceMap, Map<Exchange, Map.Entry<Double, Double>> exchangeMap) {
        Map.Entry<Double, Double> binance = exchangeMap.get(Exchange.BINANCE);
        Exchange exchange = Exchange.BINANCE;
        if (binance != null && binance.getKey().equals(value.getKey())) {
            exchange = Exchange.BINANCE;
        }
        Map.Entry<Double, Double> bittrex = exchangeMap.get(Exchange.BITTREX);
        if (bittrex != null && bittrex.getKey().equals(value.getKey())) {
            exchange = Exchange.BITTREX;
        }
        Map.Entry<Double, Double> poloniex = exchangeMap.get(Exchange.POLONIEX);
        if (poloniex != null && poloniex.getKey().equals(value.getKey())) {
            exchange = Exchange.POLONIEX;
        }
        Double balance = balanceMap.get(exchange);
        Split split = new Split(value.getKey(), exchange);
        if (balance.compareTo(ZERO) == 1) {
            Double cost = value.getKey() * Double.valueOf(value.getValue());
            if (balance.compareTo(cost) == 1) {
                Double newBalance = balance - cost;
                balanceMap.put(exchange, newBalance);
                split.setSize(Double.valueOf(value.getValue()));
                return split;
            } else {
                Double size = balance.doubleValue() / value.getKey().doubleValue();
                Double newBalance = 0D;
                balanceMap.put(exchange, newBalance);
                split.setSize(size);
                return split;
            }
        } else {
            return null;
        }
    }

}
