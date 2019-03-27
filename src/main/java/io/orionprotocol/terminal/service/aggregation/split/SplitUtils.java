package io.orionprotocol.terminal.service.aggregation.split;

import io.orionprotocol.terminal.model.Exchange;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.util.AbstractMap;
import java.util.Iterator;
import java.util.Map;

public class SplitUtils {

    private static final Map.Entry<Double, Double> MAX_VALUE = new AbstractMap.SimpleEntry(Double.MAX_VALUE, null);

    private static final Map.Entry<Double, Double> MIN_VALUE = new AbstractMap.SimpleEntry(0D, null);

    public static Map.Entry<Double, Double> maxValue() {
        return MAX_VALUE;
    }


    public static Map.Entry<Double, Double> minValue() {
        return MIN_VALUE;
    }

    /**
     * Поиска наименьшего из 3х бирж
     *
     * @param exchangeMap
     * @return
     */
    public static Map.Entry<Double, Double> findMin(Map<Exchange, Map.Entry<Double, Double>> exchangeMap) {
        Map.Entry<Double, Double> smallest = exchangeMap.get(Exchange.BINANCE) == null ? SplitUtils.maxValue() : exchangeMap.get(Exchange.BINANCE);
        Map.Entry<Double, Double> bittrex = exchangeMap.get(Exchange.BITTREX) == null ? SplitUtils.maxValue() : exchangeMap.get(Exchange.BITTREX);
        Map.Entry<Double, Double> poloniex = exchangeMap.get(Exchange.POLONIEX) == null ? SplitUtils.maxValue() : exchangeMap.get(Exchange.POLONIEX);

        if (smallest.getKey().compareTo(bittrex.getKey()) == 1) smallest = bittrex;
        if (smallest.getKey().compareTo(poloniex.getKey()) == 1) smallest = poloniex;
        return smallest;
    }

    /**
     * Поиска наибольшего из 3х бирж
     *
     * @param exchangeMap
     * @return
     */
    public static Map.Entry<Double, Double> findMax(Map<Exchange, Map.Entry<Double, Double>> exchangeMap) {
        Map.Entry<Double, Double> biggest = exchangeMap.get(Exchange.BINANCE) == null ? SplitUtils.minValue() : exchangeMap.get(Exchange.BINANCE);
        Map.Entry<Double, Double> bittrex = exchangeMap.get(Exchange.BITTREX) == null ? SplitUtils.minValue() : exchangeMap.get(Exchange.BITTREX);
        Map.Entry<Double, Double> poloniex = exchangeMap.get(Exchange.POLONIEX) == null ? SplitUtils.minValue() : exchangeMap.get(Exchange.POLONIEX);

        if (biggest.getKey().compareTo(bittrex.getKey()) == -1) biggest = bittrex;
        if (biggest.getKey().compareTo(poloniex.getKey()) == -1) biggest = poloniex;
        return biggest;
    }

    public static String roundSplitNumbers(BigDecimal number) {
        number.setScale(8, RoundingMode.CEILING);
        return number.toString();
    }


    public static void fullExchangeMap(Map<Exchange, Map.Entry<Double, Double>> exchangeMap,
                                       Iterator<Map.Entry<Double, Double>> binanceIterator,
                                       Iterator<Map.Entry<Double, Double>> bittrexIterator,
                                       Iterator<Map.Entry<Double, Double>> poloniexIterator) {
        if (exchangeMap.get(Exchange.BINANCE) == null && binanceIterator.hasNext()) {
            exchangeMap.put(Exchange.BINANCE, binanceIterator.next());
        }
        if (exchangeMap.get(Exchange.BITTREX) == null && bittrexIterator.hasNext()) {
            exchangeMap.put(Exchange.BITTREX, bittrexIterator.next());
        }
        if (exchangeMap.get(Exchange.POLONIEX) == null && poloniexIterator.hasNext()) {
            exchangeMap.put(Exchange.POLONIEX, poloniexIterator.next());
        }

    }

    public static void main(String[] args) {
        BigDecimal bigDecimal = new BigDecimal(0);
        System.out.println(new DecimalFormat("#0.########").format(bigDecimal));
        System.out.println(roundSplitNumbers(bigDecimal));
    }


}
