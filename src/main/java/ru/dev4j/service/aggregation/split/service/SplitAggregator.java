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
    public List<Route> firstLevel(String pair, DataType dataType, Double ordQty, BigDecimal price) {

        List<Split> splitList = new ArrayList<>();

        if (dataType.equals(DataType.ASKS)) {
            aggregateAsks(pair, ordQty, price, splitList);
        }
        if (dataType.equals(DataType.BIDS)) {
            aggregateBids(pair, price, ordQty, splitList);
        }

        Map<Exchange, BigDecimal> sizeMap = new HashMap<>();
        Map<Exchange, BigDecimal> priceMap = new HashMap<>();
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

    public void aggregateBids(String pair, BigDecimal price, Double ordQty, List<Split> splitList) {

        Iterator<Map.Entry<BigDecimal, String>> binanceBids = exchangeMapService.getAllBids(Exchange.BINANCE, pair).entrySet().iterator();
        Iterator<Map.Entry<BigDecimal, String>> bittrexBids = exchangeMapService.getAllBids(Exchange.BITTREX, pair).entrySet().iterator();
        Iterator<Map.Entry<BigDecimal, String>> poloniexBids = exchangeMapService.getAllBids(Exchange.POLONIEX, pair).entrySet().iterator();

        Map<Exchange, Map.Entry<BigDecimal, String>> exchangeMap = new HashMap<>();

        Double aggregatedSize = 0D;
        Map.Entry<BigDecimal, String> max = SplitUtils.maxValue();

        while ((ordQty > aggregatedSize) && (max.getKey().compareTo(price) == 1)) {
            SplitUtils.fullExchangeMap(exchangeMap, binanceBids, bittrexBids, poloniexBids);
            if (!binanceBids.hasNext() && !bittrexBids.hasNext() && !poloniexBids.hasNext()) {
                break;
            }

            max = SplitUtils.findMax(exchangeMap);
            Double maxValue = Double.valueOf(max.getValue());
            if (max.getKey().compareTo(price) == 1) {
                aggregatedSize = aggregatedSize + maxValue;
                aggregatedSize = extractValue(ordQty, splitList, aggregatedSize, exchangeMap, max, maxValue);
            }
        }
    }

    public void aggregateAsks(String pair, Double ordQty, BigDecimal price, List<Split> splitList) {

        Double aggregatedSize = 0D;

        Map<Exchange, Map.Entry<BigDecimal, String>> exchangeMap = new HashMap<>();

        Map.Entry<BigDecimal, String> min = SplitUtils.minValue();

        Iterator<Map.Entry<BigDecimal, String>> binanceAsks = exchangeMapService.getAllAsks(Exchange.BINANCE, pair).entrySet().iterator();
        Iterator<Map.Entry<BigDecimal, String>> bittrexAsks = exchangeMapService.getAllAsks(Exchange.BITTREX, pair).entrySet().iterator();
        Iterator<Map.Entry<BigDecimal, String>> poloniexAsks = exchangeMapService.getAllAsks(Exchange.POLONIEX, pair).entrySet().iterator();


        while ((ordQty > aggregatedSize) && (price.compareTo(min.getKey()) == 1)) {
            SplitUtils.fullExchangeMap(exchangeMap, binanceAsks, bittrexAsks, poloniexAsks);
            if (!binanceAsks.hasNext() && !bittrexAsks.hasNext() && !poloniexAsks.hasNext()) {
                break;
            }
            min = SplitUtils.findMin(exchangeMap);
            Double minValue = Double.valueOf(min.getValue());
            if (price.compareTo(min.getKey()) == 1) {
                aggregatedSize = aggregatedSize + minValue;
                aggregatedSize = extractValue(ordQty, splitList, aggregatedSize, exchangeMap, min, minValue);
            }
        }
    }

    public void aggregateExchangeLevel(String pair, Double ordQty, List<Split> splitList, Exchange exchange, String type) {

        Double aggregatedSize = 0D;

        Iterator<Map.Entry<BigDecimal, String>> levels = null;

        if(type.equals("asks")){
            levels = exchangeMapService.getAllAsks(exchange, pair).entrySet().iterator();
        }
        if(type.equals("bids")){
            levels = exchangeMapService.getAllBids(exchange, pair).entrySet().iterator();
        }

        while (ordQty > aggregatedSize) {
            if (!levels.hasNext()) {
                break;
            }
            Map.Entry<BigDecimal, String> level = levels.next();
            Double value = Double.valueOf(level.getValue());
            aggregatedSize = aggregatedSize + value;
            aggregatedSize = extractExchangeValue(ordQty, splitList, aggregatedSize,  level, value,exchange);
        }
    }

    private Double extractExchangeValue(Double ordQty, List<Split> splitList, Double aggregatedSize, Map.Entry<BigDecimal, String> level, Double value, Exchange exchange) {
        if (aggregatedSize > ordQty) {
            Double rest = aggregatedSize - ordQty;
            Double worthPart = value - rest;
            aggregatedSize = aggregatedSize - value + worthPart;
            splitList.add(new Split(level.getKey(), new BigDecimal(worthPart), exchange));
        } else {
            splitList.add(new Split(level.getKey(), new BigDecimal(level.getValue()), exchange));
        }
        return aggregatedSize;
    }

    private Double extractValue(Double ordQty, List<Split> splitList, Double aggregatedSize, Map<Exchange, Map.Entry<BigDecimal, String>> exchangeMap, Map.Entry<BigDecimal, String> min, Double minValue) {
        if (aggregatedSize > ordQty) {
            Double rest = aggregatedSize - ordQty;
            Double worthPart = minValue - rest;
            aggregatedSize = aggregatedSize - minValue + worthPart;
            extractFinalValue(exchangeMap, min.getKey(), worthPart, splitList);
        } else {
            extractValue(exchangeMap, min.getKey(), splitList);
        }
        return aggregatedSize;
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
     * Удаляем из <code>exchangeMap</code> <code>min</code> и добавляет его в <code>split</code>
     *
     * @param exchangeMap
     * @param min
     * @param split
     */
    private void extractValue(Map<Exchange, Map.Entry<BigDecimal, String>> exchangeMap, BigDecimal min, List<Split> split) {
        Map.Entry<BigDecimal, String> binance = exchangeMap.get(Exchange.BINANCE);
        if (binance != null && binance.getKey().equals(min)) {
            split.add(new Split(binance.getKey(), new BigDecimal(binance.getValue()), Exchange.BINANCE));
            exchangeMap.put(Exchange.BINANCE, null);
            return;
        }
        Map.Entry<BigDecimal, String> bittrex = exchangeMap.get(Exchange.BITTREX);
        if (bittrex != null && bittrex.getKey().equals(min)) {
            split.add(new Split(bittrex.getKey(), new BigDecimal(bittrex.getValue()), Exchange.BITTREX));
            exchangeMap.put(Exchange.BITTREX, null);
            return;
        }
        Map.Entry<BigDecimal, String> poloniex = exchangeMap.get(Exchange.POLONIEX);
        if (poloniex != null && poloniex.getKey().equals(min)) {
            split.add(new Split(poloniex.getKey(), new BigDecimal(poloniex.getValue()), Exchange.POLONIEX));
            exchangeMap.put(Exchange.POLONIEX, null);
            return;
        }
    }

    /**
     * Выбираем и добавляет <code>rest</code> в split
     *
     * @param exchangeMap
     * @param min
     * @param rest
     * @param split
     */
    private void extractFinalValue(Map<Exchange, Map.Entry<BigDecimal, String>> exchangeMap, BigDecimal min, Double rest, List<Split> split) {
        Map.Entry<BigDecimal, String> binance = exchangeMap.get(Exchange.BINANCE);
        if (binance != null && binance.getKey().equals(min)) {
            split.add(new Split(binance.getKey(), new BigDecimal(rest), Exchange.BINANCE));
            return;
        }
        Map.Entry<BigDecimal, String> bittrex = exchangeMap.get(Exchange.BITTREX);
        if (bittrex != null && bittrex.getKey().equals(min)) {
            split.add(new Split(bittrex.getKey(), new BigDecimal(rest), Exchange.BITTREX));
            return;
        }
        Map.Entry<BigDecimal, String> poloniex = exchangeMap.get(Exchange.POLONIEX);
        if (poloniex != null && poloniex.getKey().equals(min)) {
            split.add(new Split(poloniex.getKey(), new BigDecimal(rest), Exchange.POLONIEX));
            return;
        }
    }

    public static void main(String[] args) {
        BigDecimal a = new BigDecimal(0.150100001);
        BigDecimal b = new BigDecimal(0.200000002);
        BigDecimal c = new BigDecimal(0.35);
        Map.Entry<BigDecimal, String> ab = new AbstractMap.SimpleEntry(a, null);
        Map.Entry<BigDecimal, String> bb = new AbstractMap.SimpleEntry(b, null);
        Map.Entry<BigDecimal, String> cb = new AbstractMap.SimpleEntry(c, null);

        Map<Exchange, Map.Entry<BigDecimal, String>> exchangeEntryMap = new HashMap<>();
        exchangeEntryMap.put(Exchange.BINANCE, ab);
        exchangeEntryMap.put(Exchange.BITTREX, bb);
        exchangeEntryMap.put(Exchange.POLONIEX, cb);

        System.out.println(SplitUtils.findMax(exchangeEntryMap));
    }
}
