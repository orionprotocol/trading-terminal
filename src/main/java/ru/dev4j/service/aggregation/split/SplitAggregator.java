package ru.dev4j.service.aggregation.split;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.dev4j.model.DataType;
import ru.dev4j.model.Exchange;
import ru.dev4j.service.map.ExchangeMapService;

import java.math.BigDecimal;
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

        Map<Exchange, BigDecimal> finalMap = new HashMap<>();
        Map<Exchange, BigDecimal> maxMap = new HashMap<>();
        for (Split split : splitList) {
            handleSplit(split, finalMap, maxMap);
        }
        List<Route> routes = new ArrayList<>();
        routes.add(new Route(pair, Exchange.BINANCE, maxMap.get(Exchange.BINANCE) == null ? "0" : maxMap.get(Exchange.BINANCE).toPlainString(),
                finalMap.get(Exchange.BINANCE) == null ? "0" : finalMap.get(Exchange.BINANCE).toPlainString()));
        routes.add(new Route(pair, Exchange.BITTREX, maxMap.get(Exchange.BITTREX) == null ? "0" : maxMap.get(Exchange.BITTREX).toPlainString(),
                finalMap.get(Exchange.BITTREX) == null ? "0" : finalMap.get(Exchange.BITTREX).toPlainString()));
        routes.add(new Route(pair, Exchange.POLONIEX, maxMap.get(Exchange.POLONIEX) == null ? "0" : maxMap.get(Exchange.POLONIEX).toPlainString(),
                finalMap.get(Exchange.POLONIEX) == null ? "0" : finalMap.get(Exchange.POLONIEX).toPlainString()));

        return routes;

    }

    public void aggregateBids(String pair, BigDecimal price, Double ordQty, List<Split> splitList) {

        Iterator<Map.Entry<BigDecimal, String>> binanceBids = exchangeMapService.getAllBids(Exchange.BINANCE, pair).descendingMap().entrySet().iterator();
        Iterator<Map.Entry<BigDecimal, String>> bittrexBids = exchangeMapService.getAllBids(Exchange.BITTREX, pair).descendingMap().entrySet().iterator();
        Iterator<Map.Entry<BigDecimal, String>> poloniexBids = exchangeMapService.getAllBids(Exchange.POLONIEX, pair).descendingMap().entrySet().iterator();

        Map<Exchange, Map.Entry<BigDecimal, String>> exchangeMap = new HashMap<>();

        moveIteratorToPrice(binanceBids, exchangeMap, price, Exchange.BINANCE);

        moveIteratorToPrice(bittrexBids, exchangeMap, price, Exchange.BITTREX);

        moveIteratorToPrice(poloniexBids, exchangeMap, price, Exchange.POLONIEX);

        Double aggregatedSize = 0D;

        while (ordQty > aggregatedSize) {
            if (exchangeMap.get(Exchange.BINANCE) == null && binanceBids.hasNext()) {
                exchangeMap.put(Exchange.BINANCE, binanceBids.next());
            }
            if (exchangeMap.get(Exchange.BITTREX) == null && bittrexBids.hasNext()) {
                exchangeMap.put(Exchange.BITTREX, bittrexBids.next());
            }
            if (exchangeMap.get(Exchange.POLONIEX) == null && poloniexBids.hasNext()) {
                exchangeMap.put(Exchange.POLONIEX, poloniexBids.next());
            }
            if (!binanceBids.hasNext() && !bittrexBids.hasNext() && !poloniexBids.hasNext()) {
                break;
            }
            Map.Entry<BigDecimal, String> min = findMin(exchangeMap);
            Double minValue = Double.valueOf(min.getValue());
            aggregatedSize = aggregatedSize + minValue;
            aggregatedSize = extractValue(ordQty, splitList, aggregatedSize, exchangeMap, min, minValue);
        }
    }

    public void aggregateAsks(String pair, Double ordQty, BigDecimal price, List<Split> splitList) {

        Double aggregatedSize = 0D;

        Map<Exchange, Map.Entry<BigDecimal, String>> exchangeMap = new HashMap<>();

        Map.Entry<BigDecimal, String> min = minValue();

        Iterator<Map.Entry<BigDecimal, String>> binanceAsks = exchangeMapService.getAllAsks(Exchange.BINANCE, pair).entrySet().iterator();
        Iterator<Map.Entry<BigDecimal, String>> bittrexAsks = exchangeMapService.getAllAsks(Exchange.BITTREX, pair).entrySet().iterator();
        Iterator<Map.Entry<BigDecimal, String>> poloniexAsks = exchangeMapService.getAllAsks(Exchange.POLONIEX, pair).entrySet().iterator();


        while ((ordQty > aggregatedSize) && (price.compareTo(min.getKey()) == 1)) {
            if (exchangeMap.get(Exchange.BINANCE) == null && binanceAsks.hasNext()) {
                exchangeMap.put(Exchange.BINANCE, binanceAsks.next());
            }
            if (exchangeMap.get(Exchange.BITTREX) == null && bittrexAsks.hasNext()) {
                exchangeMap.put(Exchange.BITTREX, bittrexAsks.next());
            }
            if (exchangeMap.get(Exchange.POLONIEX) == null && poloniexAsks.hasNext()) {
                exchangeMap.put(Exchange.POLONIEX, poloniexAsks.next());
            }
            min = findMin(exchangeMap);
            Double minValue = Double.valueOf(min.getValue());
            aggregatedSize = aggregatedSize + minValue;
            aggregatedSize = extractValue(ordQty, splitList, aggregatedSize, exchangeMap, min, minValue);

        }
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
     * Move to up strict
     *
     * @param iterator
     * @param exchangeMap
     * @param price
     * @param exchange
     */
    private void moveIteratorToPrice(Iterator<Map.Entry<BigDecimal, String>> iterator,
                                     Map<Exchange, Map.Entry<BigDecimal, String>> exchangeMap,
                                     BigDecimal price, Exchange exchange) {
        while (iterator.hasNext()) {
            Map.Entry<BigDecimal, String> iteratorValue = iterator.next();
            exchangeMap.put(exchange, iteratorValue);
            if (price.compareTo(iteratorValue.getKey()) != 1) {
                break;
            }
        }
    }

    /**
     * Full <code>finalmap</code> and <code>maxMap</code>
     *
     * @param split
     * @param finalMap
     * @param maxMap
     */
    private void handleSplit(Split split, Map<Exchange, BigDecimal> finalMap, Map<Exchange, BigDecimal> maxMap) {
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
     * Поиска наименьшего из 3х бирж
     *
     * @param exchangeMap
     * @return
     */
    private Map.Entry<BigDecimal, String> findMin(Map<Exchange, Map.Entry<BigDecimal, String>> exchangeMap) {
        Map.Entry<BigDecimal, String> smallest = exchangeMap.get(Exchange.BINANCE) == null ? maxValue() : exchangeMap.get(Exchange.BINANCE);
        Map.Entry<BigDecimal, String> bittrex = exchangeMap.get(Exchange.BITTREX) == null ? maxValue() : exchangeMap.get(Exchange.BITTREX);
        Map.Entry<BigDecimal, String> poloniex = exchangeMap.get(Exchange.POLONIEX) == null ? maxValue() : exchangeMap.get(Exchange.POLONIEX);

        if (smallest.getKey().compareTo(bittrex.getKey()) == 1) smallest = bittrex;
        if (smallest.getKey().compareTo(poloniex.getKey()) == 1) smallest = poloniex;
        return smallest;
    }


    private Map.Entry<BigDecimal, String> maxValue() {
        return new AbstractMap.SimpleEntry(new BigDecimal(Double.MAX_VALUE), null);
    }


    private Map.Entry<BigDecimal, String> minValue() {
        return new AbstractMap.SimpleEntry(new BigDecimal(0), null);
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
        if (binance.getKey().equals(min)) {
            split.add(new Split(binance.getKey(), new BigDecimal(binance.getValue()), Exchange.BINANCE));
            exchangeMap.put(Exchange.BINANCE, null);
            return;
        }
        Map.Entry<BigDecimal, String> bittrex = exchangeMap.get(Exchange.BITTREX);
        if (bittrex.getKey().equals(min)) {
            split.add(new Split(bittrex.getKey(), new BigDecimal(bittrex.getValue()), Exchange.BITTREX));
            exchangeMap.put(Exchange.BITTREX, null);
            return;
        }
        Map.Entry<BigDecimal, String> poloniex = exchangeMap.get(Exchange.POLONIEX);
        if (poloniex.getKey().equals(min)) {
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
        if (binance.getKey().equals(min)) {
            split.add(new Split(binance.getKey(), new BigDecimal(rest), Exchange.BINANCE));
            return;
        }
        Map.Entry<BigDecimal, String> bittrex = exchangeMap.get(Exchange.BITTREX);
        if (bittrex.getKey().equals(min)) {
            split.add(new Split(bittrex.getKey(), new BigDecimal(rest), Exchange.BITTREX));
            return;
        }
        Map.Entry<BigDecimal, String> poloniex = exchangeMap.get(Exchange.POLONIEX);
        if (poloniex.getKey().equals(min)) {
            split.add(new Split(poloniex.getKey(), new BigDecimal(poloniex.getValue()), Exchange.POLONIEX));
            return;
        }
    }

    public static void main(String[] args) {
        BigDecimal a = new BigDecimal(0.000000001);
        BigDecimal b = new BigDecimal(0.000000002);
        BigDecimal c = new BigDecimal(0.15);
    }
}
