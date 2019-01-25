package ru.dev4j.service.aggregation.split;

import ru.dev4j.model.Exchange;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.util.AbstractMap;
import java.util.Iterator;
import java.util.Map;

public class SplitUtils {

    private static final Map.Entry<BigDecimal, String> MAX_VALUE = new AbstractMap.SimpleEntry(new BigDecimal(Double.MAX_VALUE), null);

    private static final Map.Entry<BigDecimal, String> MIN_VALUE = new AbstractMap.SimpleEntry(new BigDecimal(0), null);

    public static Map.Entry<BigDecimal, String> maxValue() {
        return MAX_VALUE;
    }


    public static Map.Entry<BigDecimal, String> minValue() {
        return MIN_VALUE;
    }

    /**
     * Поиска наименьшего из 3х бирж
     *
     * @param exchangeMap
     * @return
     */
    public static Map.Entry<BigDecimal, String> findMin(Map<Exchange, Map.Entry<BigDecimal, String>> exchangeMap) {
        Map.Entry<BigDecimal, String> smallest = exchangeMap.get(Exchange.BINANCE) == null ? SplitUtils.maxValue() : exchangeMap.get(Exchange.BINANCE);
        Map.Entry<BigDecimal, String> bittrex = exchangeMap.get(Exchange.BITTREX) == null ? SplitUtils.maxValue() : exchangeMap.get(Exchange.BITTREX);
        Map.Entry<BigDecimal, String> poloniex = exchangeMap.get(Exchange.POLONIEX) == null ? SplitUtils.maxValue() : exchangeMap.get(Exchange.POLONIEX);

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
    public static Map.Entry<BigDecimal, String> findMax(Map<Exchange, Map.Entry<BigDecimal, String>> exchangeMap) {
        Map.Entry<BigDecimal, String> biggest = exchangeMap.get(Exchange.BINANCE) == null ? SplitUtils.minValue() : exchangeMap.get(Exchange.BINANCE);
        Map.Entry<BigDecimal, String> bittrex = exchangeMap.get(Exchange.BITTREX) == null ? SplitUtils.minValue() : exchangeMap.get(Exchange.BITTREX);
        Map.Entry<BigDecimal, String> poloniex = exchangeMap.get(Exchange.POLONIEX) == null ? SplitUtils.minValue() : exchangeMap.get(Exchange.POLONIEX);

        if (biggest.getKey().compareTo(bittrex.getKey()) == -1) biggest = bittrex;
        if (biggest.getKey().compareTo(poloniex.getKey()) == -1) biggest = poloniex;
        return biggest;
    }

    public static String roundSplitNumbers(BigDecimal number) {
        number.setScale(8, RoundingMode.CEILING);
        return number.toString();
    }


    public static void fullExchangeMap(Map<Exchange, Map.Entry<BigDecimal, String>> exchangeMap,
                                       Iterator<Map.Entry<BigDecimal, String>> binanceIterator,
                                       Iterator<Map.Entry<BigDecimal, String>> bittrexIterator,
                                       Iterator<Map.Entry<BigDecimal, String>> poloniexIterator
    ) {
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
