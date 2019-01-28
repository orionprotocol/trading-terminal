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
public class SplitAggregator {

    @Autowired
    private ExchangeMapService exchangeMapService;

    /**
     * FIRST LEVEL AGGREGATION FOR ASKS AND BIDS
     *
     * @param pair
     * @param dataType
     * @param ordQty
     * @param price
     * @return
     */
    public List<Route> firstLevel(String pair, DataType dataType, Double ordQty, Double price) {

        List<Split> splitList = null;

        if (dataType.equals(DataType.ASKS)) {
            splitList = aggregateAsks(pair, ordQty, price);
        }
        if (dataType.equals(DataType.BIDS)) {
            splitList = aggregateBids(pair, price, ordQty);
        }

        Map<Exchange, Double> sizeMap = new HashMap<>();
        Map<Exchange, Double> priceMap = new HashMap<>();
        for (Split split : splitList) {
            if (dataType.equals(DataType.ASKS)) {
                handleAsksSplit(split, sizeMap, priceMap);
            }
            if (dataType.equals(DataType.BIDS)) {
                handleBidsSplit(split, sizeMap, priceMap);
            }
        }
        DecimalFormat decimalFormat = new DecimalFormat("#0.########");
        List<Route> routes = new ArrayList<>();
        routes.add(new Route(pair, Exchange.BINANCE, priceMap.get(Exchange.BINANCE) == null ? "0" : decimalFormat.format(priceMap.get(Exchange.BINANCE)),
                sizeMap.get(Exchange.BINANCE) == null ? "0" : decimalFormat.format(sizeMap.get(Exchange.BINANCE))));
        routes.add(new Route(pair, Exchange.BITTREX, priceMap.get(Exchange.BITTREX) == null ? "0" : decimalFormat.format(priceMap.get(Exchange.BITTREX)),
                sizeMap.get(Exchange.BITTREX) == null ? "0" : decimalFormat.format(sizeMap.get(Exchange.BITTREX))));
        routes.add(new Route(pair, Exchange.POLONIEX, priceMap.get(Exchange.POLONIEX) == null ? "0" : decimalFormat.format(priceMap.get(Exchange.POLONIEX)),
                sizeMap.get(Exchange.POLONIEX) == null ? "0" : decimalFormat.format(sizeMap.get(Exchange.POLONIEX))));

        return routes;

    }

    /**
     * Aggregates bids orderbook for all exchanges
     *
     * @param pair
     * @param price
     * @param ordQty
     * @return
     */
    public List<Split> aggregateBids(String pair, Double price, Double ordQty) {

        List<Split> splitList = new ArrayList<>();

        Iterator<Map.Entry<Double, Double>> binanceBids = exchangeMapService.getAllBids(Exchange.BINANCE, pair).entrySet().iterator();
        Iterator<Map.Entry<Double, Double>> bittrexBids = exchangeMapService.getAllBids(Exchange.BITTREX, pair).entrySet().iterator();
        Iterator<Map.Entry<Double, Double>> poloniexBids = exchangeMapService.getAllBids(Exchange.POLONIEX, pair).entrySet().iterator();

        Map<Exchange, Map.Entry<Double, Double>> exchangeMap = new HashMap<>();

        Double aggregatedSize = 0D;
        Map.Entry<Double, Double> max = SplitUtils.maxValue();

        while ((ordQty > aggregatedSize) && (max.getKey() > price)) {
            if (!binanceBids.hasNext() && !bittrexBids.hasNext() && !poloniexBids.hasNext()) {
                break;
            }
            SplitUtils.fullExchangeMap(exchangeMap, binanceBids, bittrexBids, poloniexBids);
            max = SplitUtils.findMax(exchangeMap);
            Double maxValue = max.getValue();
            if (max.getKey() > price) {
                maxValue = chooseNewSize(ordQty, aggregatedSize, maxValue);
                aggregatedSize = aggregatedSize + maxValue;
                Split split = extractValue(exchangeMap, max.getKey(), maxValue);
                splitList.add(split);
            }
        }
        return splitList;
    }

    /**
     * Aggregates asks orderbook for all exchanges
     *
     * @param pair
     * @param ordQty
     * @param price
     * @return
     */
    public List<Split> aggregateAsks(String pair, Double ordQty, Double price) {

        List<Split> splitList = new ArrayList<>();

        Double aggregatedSize = 0D;

        Map<Exchange, Map.Entry<Double, Double>> exchangeMap = new HashMap<>();

        Map.Entry<Double, Double> min = SplitUtils.minValue();

        Iterator<Map.Entry<Double, Double>> binanceAsks = exchangeMapService.getAllAsks(Exchange.BINANCE, pair).entrySet().iterator();
        Iterator<Map.Entry<Double, Double>> bittrexAsks = exchangeMapService.getAllAsks(Exchange.BITTREX, pair).entrySet().iterator();
        Iterator<Map.Entry<Double, Double>> poloniexAsks = exchangeMapService.getAllAsks(Exchange.POLONIEX, pair).entrySet().iterator();

        while ((ordQty > aggregatedSize) && (price > min.getKey())) {
            if (!binanceAsks.hasNext() && !bittrexAsks.hasNext() && !poloniexAsks.hasNext()) {
                break;
            }
            SplitUtils.fullExchangeMap(exchangeMap, binanceAsks, bittrexAsks, poloniexAsks);
            min = SplitUtils.findMin(exchangeMap);
            Double minValue = min.getValue();
            if (price > min.getKey()) {
                minValue = chooseNewSize(ordQty, aggregatedSize, minValue);
                aggregatedSize = aggregatedSize + minValue;
                Split split = extractValue(exchangeMap, min.getKey(), minValue);
                splitList.add(split);
            }
        }
        return splitList;
    }

    /**
     * Aggregates orderbook for single exchange
     *
     * @param pair
     * @param ordQty
     * @param exchange
     * @param type
     */
    public List<Split> aggregateExchangeLevel(String pair, Double ordQty, Exchange exchange, String type) {
        List<Split> splitList = new ArrayList<>();

        Double aggregatedSize = 0D;

        Iterator<Map.Entry<Double, Double>> levels = null;

        if (type.equals("asks")) {
            levels = exchangeMapService.getAllAsks(exchange, pair).entrySet().iterator();
        }
        if (type.equals("bids")) {
            levels = exchangeMapService.getAllBids(exchange, pair).entrySet().iterator();
        }

        while (ordQty > aggregatedSize) {
            if (!levels.hasNext()) {
                break;
            }
            Map.Entry<Double, Double> level = levels.next();

            Double value = level.getValue();
            value = chooseNewSize(ordQty, aggregatedSize, value);
            aggregatedSize = aggregatedSize + value;

            Split split = new Split(level.getKey(), value, exchange);
            splitList.add(split);
        }
        return splitList;
    }


    /**
     * If aggregatedSize exceeds ordQty recalculate size
     *
     * @param ordQty
     * @param aggregatedSize
     * @param size
     * @return
     */
    private Double chooseNewSize(Double ordQty, Double aggregatedSize, Double size) {
        if (aggregatedSize > ordQty) {
            return size - (aggregatedSize - ordQty);
        }
        return size;
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
            if (split.getPrice() > maxMap.get(exchange)) {
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
     * Удаляем из <code>exchangeMap</code> <code>min</code> и добавляет его в <code>split</code>
     *
     * @param exchangeMap
     * @param min
     */
    private Split extractValue(Map<Exchange, Map.Entry<Double, Double>> exchangeMap, Double min, Double value) {
        Map.Entry<Double, Double> binance = exchangeMap.get(Exchange.BINANCE);
        if (binance != null && binance.getKey().equals(min)) {
            exchangeMap.put(Exchange.BINANCE, null);
            return new Split(binance.getKey(), value, Exchange.BINANCE);
        }
        Map.Entry<Double, Double> bittrex = exchangeMap.get(Exchange.BITTREX);
        if (bittrex != null && bittrex.getKey().equals(min)) {
            exchangeMap.put(Exchange.BITTREX, null);
            return new Split(bittrex.getKey(), Double.valueOf(bittrex.getValue()), Exchange.BITTREX);
        }
        Map.Entry<Double, Double> poloniex = exchangeMap.get(Exchange.POLONIEX);
        if (poloniex != null && poloniex.getKey().equals(min)) {
            exchangeMap.put(Exchange.POLONIEX, null);
            return new Split(poloniex.getKey(), Double.valueOf(poloniex.getValue()), Exchange.POLONIEX);
        }
        return null;
    }


    public static void main(String[] args) {
        BigDecimal a = new BigDecimal(0.150100001);
        BigDecimal b = new BigDecimal(0.200000002);
        BigDecimal c = new BigDecimal(0.35);
        Map.Entry<Double, Double> ab = new AbstractMap.SimpleEntry(a, null);
        Map.Entry<Double, Double> bb = new AbstractMap.SimpleEntry(b, null);
        Map.Entry<Double, Double> cb = new AbstractMap.SimpleEntry(c, null);

        Map<Exchange, Map.Entry<Double, Double>> exchangeEntryMap = new HashMap<>();
        exchangeEntryMap.put(Exchange.BINANCE, ab);
        exchangeEntryMap.put(Exchange.BITTREX, bb);
        exchangeEntryMap.put(Exchange.POLONIEX, cb);

        System.out.println(SplitUtils.findMax(exchangeEntryMap));
    }
}
