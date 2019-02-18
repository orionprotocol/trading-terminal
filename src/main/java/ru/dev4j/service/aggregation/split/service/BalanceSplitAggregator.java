package ru.dev4j.service.aggregation.split.service;

import com.google.common.collect.ImmutableMap;
import com.google.common.collect.Maps;
import org.jooq.lambda.Seq;
import org.jooq.lambda.tuple.Tuple3;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.dev4j.model.DataType;
import ru.dev4j.model.Exchange;
import ru.dev4j.service.aggregation.split.Route;
import ru.dev4j.service.aggregation.split.Split;
import ru.dev4j.service.map.ExchangeMapService;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.util.*;
import java.util.stream.Collectors;

import static org.jooq.lambda.tuple.Tuple.tuple;

@Service
public class BalanceSplitAggregator {

    @Autowired
    private ExchangeMapService exchangeMapService;

    private static final Double ZERO = 0D;
    private static final int DECIMALS = 8;
    private static final MathContext mc = new MathContext(DECIMALS, RoundingMode.HALF_UP);

    public Map<String,Object> secondLevel(String pair, Double price, DataType dataType, Double size, Double binanceBalance, Double bittrexBalance, Double poloniexBalance) {

        List<Split> boughtSplits = new ArrayList<>();

        Map<Exchange, Double> balanceMap = ImmutableMap.of(
                Exchange.BINANCE, binanceBalance,
                Exchange.BITTREX, bittrexBalance,
                Exchange.POLONIEX, poloniexBalance);


        if (dataType.equals(DataType.ASKS)) {
            boughtSplits.addAll(aggregateAsks(pair, price, size, balanceMap));
        } else if (dataType.equals(DataType.BIDS)) {
            boughtSplits.addAll(aggregateBids(pair, price, size, balanceMap));
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

    private List<Split> splitRemaining(String pair, double price, double size, Map<Exchange, Double> exchangeBalance) {
        List<Map.Entry<Exchange, Double>> balances =
                new ArrayList<>(exchangeBalance.entrySet()).stream()
                        .filter(b -> !exchangeMapService.getAllBids(b.getKey(), pair).isEmpty())
                        .sorted((o1, o2) -> (int) (o1.getValue() - o2.getValue()))
                        .collect(Collectors.toList());

        List<Split> splits = new ArrayList<>();
        BigDecimal remainingSize = new BigDecimal(size, mc);
        for (int i = 0; i < balances.size(); i++) {
            BigDecimal nextSize = (remainingSize.divide(BigDecimal.valueOf(balances.size() - i), mc)
                    .min(BigDecimal.valueOf(balances.get(i).getValue()))).setScale(2, RoundingMode.FLOOR);

            if (nextSize.compareTo(BigDecimal.ZERO) > 0) {
                splits.add(new Split(price, nextSize.doubleValue(), balances.get(i).getKey()));
                remainingSize = remainingSize.subtract(nextSize);
            }
        }

        return splits;
    }

    private List<Split> aggregateBids(String pair, Double price, Double size, Map<Exchange, Double> exchangeBalance) {
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

        Seq<Tuple3<Double, Double, Exchange>> aggregate = binance.concat(bittrex).concat(poloniex)
                .sorted(Comparator.reverseOrder());

        List<Split> splits = new ArrayList<>();
        Map<Exchange, Double> remBalances = Maps.newHashMap(exchangeBalance);
        size = calculateSplits(DataType.BIDS, size, aggregate, splits, remBalances);

        if (size > 0) {
            splits.addAll(splitRemaining(pair, price, size, remBalances));
        }

        return splits;
    }

    private double withMinNotional(double price, double qty) {
        return price * qty >= 0.001 ? qty : 0;
    }

    private Double calculateSplits(DataType side, Double size, Seq<Tuple3<Double, Double, Exchange>> aggregate,
                                   List<Split> splits, Map<Exchange, Double> remBalances) {
        for (Tuple3<Double, Double, Exchange> t : aggregate) {
            double minSize = withMinNotional(t.v1, Math.min(size, t.v2));
            double availableQty = side == DataType.ASKS ?
                    remBalances.get(t.v3) / t.v1
                    : remBalances.get(t.v3);
            double subOrdQty = withMinNotional(t.v1, BigDecimal.valueOf(Math.min(minSize, availableQty))
                    .setScale(2, RoundingMode.FLOOR).doubleValue());

            if (subOrdQty > 0) {
                double spentQty = side == DataType.ASKS ? subOrdQty * t.v1 : subOrdQty;
                remBalances.compute(t.v3, (exchange, bal) -> bal != null ? bal - spentQty : 0.0);

                splits.add(new Split(t.v1, subOrdQty, t.v3));
                size -= subOrdQty;
                if (size <= 0) break;
            }
        }
        return size;
    }

    private List<Split> aggregateAsks(String pair, Double price, Double size, Map<Exchange, Double> exchangeBalance) {
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

        Seq<Tuple3<Double, Double, Exchange>> aggregate = binance.concat(bittrex).concat(poloniex).sorted();

        List<Split> splits = new ArrayList<>();
        Map<Exchange, Double> remBalances = Maps.newHashMap(exchangeBalance);
        size = calculateSplits(DataType.ASKS, size, aggregate, splits, remBalances);

        if (size > 0) {
            splits.addAll(splitRemaining(pair, price, size, remBalances));
        }

        return splits;
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
