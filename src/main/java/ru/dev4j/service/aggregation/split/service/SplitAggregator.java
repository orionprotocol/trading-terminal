package ru.dev4j.service.aggregation.split.service;

import com.google.common.collect.Maps;
import org.jooq.lambda.Seq;
import org.jooq.lambda.tuple.Tuple3;
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
import java.util.stream.Collectors;

import static org.jooq.lambda.tuple.Tuple.tuple;

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
    public Map<String, Object> firstLevel(String pair, DataType dataType, Double ordQty, Double price) {

        List<Split> splitList = null;

        if (dataType.equals(DataType.ASKS)) {
            splitList = aggregateAsks(pair, ordQty, price);
        }
        if (dataType.equals(DataType.BIDS)) {
            splitList = aggregateBids(pair, price, ordQty);
        }

        Map<Exchange, Double> sizeMap = new HashMap<>();
        Map<Exchange, Double> priceMap = new HashMap<>();


        Double totalCost = 0D;
        Double totalSize = 0D;

        for (Split split : splitList) {
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
        DecimalFormat decimalFormat = new DecimalFormat("#0.########");
        List<Route> routes = new ArrayList<>();
        routes.add(new Route(pair, Exchange.BINANCE, priceMap.get(Exchange.BINANCE) == null ? "0" : decimalFormat.format(priceMap.get(Exchange.BINANCE)),
                sizeMap.get(Exchange.BINANCE) == null ? "0" : decimalFormat.format(sizeMap.get(Exchange.BINANCE))));
        routes.add(new Route(pair, Exchange.BITTREX, priceMap.get(Exchange.BITTREX) == null ? "0" : decimalFormat.format(priceMap.get(Exchange.BITTREX)),
                sizeMap.get(Exchange.BITTREX) == null ? "0" : decimalFormat.format(sizeMap.get(Exchange.BITTREX))));
        routes.add(new Route(pair, Exchange.POLONIEX, priceMap.get(Exchange.POLONIEX) == null ? "0" : decimalFormat.format(priceMap.get(Exchange.POLONIEX)),
                sizeMap.get(Exchange.POLONIEX) == null ? "0" : decimalFormat.format(sizeMap.get(Exchange.POLONIEX))));

        response.put("routes", routes);
        response.put("totalCost", decimalFormat.format(totalCost));
        if(totalSize > 0){
            response.put("totalPrice", decimalFormat.format(totalCost / totalSize));
        }else{
            response.put("totalPrice", 0);
        }
        return response;
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

        Seq<Tuple3<Double, Double, Exchange>> binance = Seq.seq(exchangeMapService.getAllBids(Exchange.BINANCE, pair)
                .entrySet().stream())
                .filter(e -> e.getKey() >= price)
                .map(e -> tuple(e.getKey(), e.getValue(), Exchange.BINANCE));

        Seq<Tuple3<Double, Double, Exchange>> bittrex = Seq.seq(exchangeMapService.getAllBids(Exchange.BITTREX, pair)
                .entrySet().stream())
                .filter(e -> e.getKey() >= price)
                .map(e -> tuple(e.getKey(), e.getValue(), Exchange.BITTREX));

        Seq<Tuple3<Double, Double, Exchange>> poloniex = Seq.seq(exchangeMapService.getAllBids(Exchange.POLONIEX, pair)
                .entrySet().stream())
                .filter(e -> e.getKey() >= price)
                .map(e -> tuple(e.getKey(), e.getValue(), Exchange.POLONIEX));

        List<Split> splits = binance.concat(bittrex).concat(poloniex)
                .sorted(Comparator.reverseOrder())
                .scanLeft(tuple(0.0, tuple(0.0, 0.0, Exchange.BINANCE)), (withSum, i) ->
                        tuple(withSum.v1 + i.v2, i))
                .drop(1)
                .limitWhileClosed(i -> i.v1 < ordQty)
                .map(i -> new Split(i.v2.v1, Math.min(ordQty - (i.v1 - i.v2.v2) , i.v2.v2), i.v2.v3))
                .collect(Collectors.toList());

        return splits;
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

        Seq<Tuple3<Double, Double, Exchange>> binance = Seq.seq(exchangeMapService.getAllAsks(Exchange.BINANCE, pair)
                .entrySet().stream())
                .filter(e -> e.getKey() <= price)
                .map(e -> tuple(e.getKey(), e.getValue(), Exchange.BINANCE));

        Seq<Tuple3<Double, Double, Exchange>> bittrex = Seq.seq(exchangeMapService.getAllAsks(Exchange.BITTREX, pair)
                .entrySet().stream())
                .filter(e -> e.getKey() <= price)
                .map(e -> tuple(e.getKey(), e.getValue(), Exchange.BITTREX));

        Seq<Tuple3<Double, Double, Exchange>> poloniex = Seq.seq(exchangeMapService.getAllAsks(Exchange.POLONIEX, pair)
                .entrySet().stream())
                .filter(e -> e.getKey() <= price)
                .map(e -> tuple(e.getKey(), e.getValue(), Exchange.POLONIEX));

        List<Split> splits = binance.concat(bittrex).concat(poloniex)
                .sorted()
                .scanLeft(tuple(0.0, tuple(0.0, 0.0, Exchange.BINANCE)), (withSum, i) ->
                        tuple(withSum.v1 + i.v2, i))
                .drop(1)
                .limitWhileClosed(i -> i.v1 < ordQty)
                .map(i -> new Split(i.v2.v1, Math.min(ordQty - (i.v1 - i.v2.v2) , i.v2.v2), i.v2.v3))
                .collect(Collectors.toList());

        return splits;

    }

    /**
     * Aggregates orderbook for single exchange
     *
     * @param pair
     * @param ordQty
     * @param exchange
     * @param type
     */
    List<Split> aggregateExchangeLevel(String pair, Double ordQty, Exchange exchange, String type) {
        List<Split> splitList = new ArrayList<>();

        Iterator<Map.Entry<Double, Double>> levels = type.equals("asks") ?
                exchangeMapService.getAllAsks(exchange, pair).entrySet().iterator()
                : exchangeMapService.getAllBids(exchange, pair).entrySet().iterator();

        double remaining = ordQty;

        while (remaining > 0 && levels.hasNext()) {
            Map.Entry<Double, Double> level = levels.next();
            double value = Math.min(remaining, level.getValue());
            Split split = new Split(level.getKey(), value, exchange);
            splitList.add(split);
            remaining -= value;
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
