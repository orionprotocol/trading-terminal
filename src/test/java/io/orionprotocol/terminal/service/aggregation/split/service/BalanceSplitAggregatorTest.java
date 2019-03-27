package io.orionprotocol.terminal.service.aggregation.split.service;

import org.jooq.lambda.Seq;
import org.jooq.lambda.tuple.Tuple3;
import io.orionprotocol.terminal.model.Exchange;
import io.orionprotocol.terminal.service.aggregation.split.Split;

import java.util.*;
import java.util.concurrent.ConcurrentSkipListMap;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.jooq.lambda.tuple.Tuple.tuple;

public class BalanceSplitAggregatorTest {

    @org.junit.Test
    public void testAggregateBids() {
        ConcurrentSkipListMap<Double, Double> bids1
                = new ConcurrentSkipListMap<>(Comparator.reverseOrder());
        IntStream
                .rangeClosed(1, 10)
                .forEach(index -> {
                    bids1.put((double) index, (double) index + 1);
                });

        ConcurrentSkipListMap<Double, Double> bids2
                = new ConcurrentSkipListMap<>(Comparator.reverseOrder());

        IntStream
                .rangeClosed(4, 8)
                .forEach(index -> {
                    bids2.put((double) index, (double) index * 2);
                });

        Seq<Tuple3<Double, Double, Exchange>> binance = Seq.seq(bids1.entrySet().stream()).map(e -> tuple(e.getKey(), e.getValue(), Exchange.BINANCE));
        Seq<Tuple3<Double, Double, Exchange>> bittrex = Seq.seq(bids2.entrySet().stream()).map(e -> tuple(e.getKey(), e.getValue(), Exchange.BITTREX));

        double ordQty = 37;
        List<Split> splits = binance.concat(bittrex)
                .sorted(Comparator.reverseOrder())
                .scanLeft(tuple(0.0, tuple(0.0, 0.0, Exchange.BINANCE)), (withSum, i) ->
                        tuple(withSum.v1 + i.v2, i))
                .drop(1)
                .peek(System.out::println)
                .limitWhileClosed(i -> i.v1 < ordQty)
                .map(i -> new Split(i.v2.v1, Math.min(ordQty - (i.v1 - i.v2.v2) , i.v2.v2), i.v2.v3))
                .collect(Collectors.toList());

        splits.forEach(System.out::println);
    }

    @org.junit.Test
    public void secondLevel() {
        ConcurrentSkipListMap<Double, Double> bids1
                = new ConcurrentSkipListMap<>();
        IntStream
                .rangeClosed(1, 10)
                .forEach(index -> {
                    bids1.put((double) index, (double) index);
                });

        ConcurrentSkipListMap<Double, Double> bids2
                = new ConcurrentSkipListMap<>();

        IntStream
                .rangeClosed(4, 8)
                .forEach(index -> {
                    bids2.put((double) index, (double) index*2);
                });

        Seq<Tuple3<Double, Double, String>> binance = Seq.seq(bids1.entrySet().stream()).map(e -> tuple(e.getKey(), e.getValue(), "binance"));
        Seq<Tuple3<Double, Double, String>> bittrex = Seq.seq(bids2.entrySet().stream()).map(e -> tuple(e.getKey(), e.getValue(), "bittrex"));

        binance.concat(bittrex)
                .sorted()
                .scanLeft(tuple(0.0,tuple(0.0, 0.0, "")), (a, i) -> tuple(a.v1 + i.v2, i))
                .limitWhileClosed(i -> i.v1 < 24)
                .forEach(System.out::println);

        /*bids1.putAll(bids2);

        Map<Double, Double> bidBin = bids1.entrySet().stream().collect(
                        Collectors.toMap(e -> e.getKey(), e -> e.getValue()));

        System.out.println(bidBin);*/

        /*Seq.seq(IntStream.concat(IntStream.range(0, 10), IntStream.range(10, 15))
                .sorted())
                .scanLeft(tuple(0,0), (u, v) -> tuple(u.v1 + v, v))
                .drop(1)
                .limitWhile(i -> i.v1 < 20)
                .forEach(System.out::println);*/


    }
}