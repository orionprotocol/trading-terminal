package io.orionprotocol.terminal.service.aggregation;

import io.orionprotocol.terminal.config.RedisConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.stereotype.Service;
import io.orionprotocol.terminal.config.MongoDBConfig;
import io.orionprotocol.terminal.config.PropertySourceConfig;
import io.orionprotocol.terminal.config.ServiceConfig;
import io.orionprotocol.terminal.model.Exchange;
import io.orionprotocol.terminal.model.ExchangeTuple;
import io.orionprotocol.terminal.model.SizeExchange;
import io.orionprotocol.terminal.service.map.ExchangeMapService;

import java.util.*;

@Service
public class FirstAggregator {

    @Autowired
    private ExchangeMapService exchangeMapService;

    //TODO:COMMENT

    public Map<String, List<ExchangeTuple>> aggregateAsksAndBids(String pair, Integer depth) {
        List<ExchangeTuple> asks = aggregateAsksPairByDepth(pair, depth);
        List<ExchangeTuple> bids = aggregateBidsPairByDepth(pair, depth);

        Map<String, List<ExchangeTuple>> response = new HashMap<>();
        response.put("asks", asks);
        response.put("bids", bids);

        return response;
    }

    public Map<String, List<ExchangeTuple>> aggregateAsksAndBidsForExchange(String pair, Integer depth, Exchange exchange) {
        List<ExchangeTuple> asks = aggregateAsksPairByDepthForExchange(pair, depth, exchange);
        List<ExchangeTuple> bids = aggregateBidsPairByDepthForExchange(pair, depth, exchange);

        Map<String, List<ExchangeTuple>> response = new HashMap<>();
        response.put("asks", asks);
        response.put("bids", bids);

        return response;
    }

    private List<ExchangeTuple> aggregateAsksPairByDepthForExchange(String pair, Integer depth, Exchange exchange) {

        TreeMap<Double, Double> asks = exchangeMapService.getFirstAsks(exchange, pair, depth);

        List<ExchangeTuple> finalAggregatedAsks = asks.entrySet().stream()
                .limit(depth)
                .collect(ArrayList::new, (m, e) -> m.add(new ExchangeTuple(e.getKey(), e.getValue(),null)), List::addAll);

        return finalAggregatedAsks;
    }


    private List<ExchangeTuple> aggregateBidsPairByDepthForExchange(String pair, Integer depth, Exchange exchange) {

        TreeMap<Double, Double> bids = exchangeMapService.getFirstBids(exchange, pair, depth);

        List<ExchangeTuple> finalAggregatedBids = bids.entrySet().stream()
                .limit(depth)
                .collect(ArrayList::new, (m, e) -> m.add(new ExchangeTuple(e.getKey(), e.getValue(),null)), List::addAll);

        return finalAggregatedBids;
    }

    private List<ExchangeTuple> aggregateAsksPairByDepth(String pair, Integer depth) {

        TreeMap<Double, SizeExchange> aggregatedTopMap = new TreeMap<>();

        TreeMap<Double, Double> binanceAsks = exchangeMapService.getFirstAsks(Exchange.BINANCE, pair, depth);

        mergeInMap(aggregatedTopMap, binanceAsks, Exchange.BINANCE.name().toLowerCase());

        TreeMap<Double, Double> poloniexAsks = exchangeMapService.getFirstAsks(Exchange.POLONIEX, pair, depth);

        mergeInMap(aggregatedTopMap, poloniexAsks, Exchange.POLONIEX.name().toLowerCase());

        TreeMap<Double, Double> bittrexAsks = exchangeMapService.getFirstAsks(Exchange.BITTREX, pair, depth);

        mergeInMap(aggregatedTopMap, bittrexAsks, Exchange.BITTREX.name().toLowerCase());

        List<ExchangeTuple> finalAggregatedAsks = aggregatedTopMap.entrySet().stream()
                .limit(depth)
                .collect(ArrayList::new, (m, e) -> m.add(new ExchangeTuple(e.getKey(), e.getValue().getSize(), new ArrayList<>(e.getValue().getExchanges()))), List::addAll);

        return finalAggregatedAsks;
    }

    private List<ExchangeTuple> aggregateBidsPairByDepth(String pair, Integer depth) {

        TreeMap<Double, SizeExchange> aggregatedTopMap = new TreeMap<>(Comparator.reverseOrder());

        TreeMap<Double, Double> binanceBids = exchangeMapService.getFirstBids(Exchange.BINANCE, pair, depth);

        mergeInMap(aggregatedTopMap, binanceBids, Exchange.BINANCE.name().toLowerCase());

        TreeMap<Double, Double> poloniexBids = exchangeMapService.getFirstBids(Exchange.POLONIEX, pair, depth);

        mergeInMap(aggregatedTopMap, poloniexBids,Exchange.POLONIEX.name().toLowerCase());

        TreeMap<Double, Double> bittrexBids = exchangeMapService.getFirstBids(Exchange.BITTREX, pair, depth);

        mergeInMap(aggregatedTopMap, bittrexBids,Exchange.BITTREX.name().toLowerCase());


        List<ExchangeTuple> finalAggregatedBids = aggregatedTopMap.entrySet().stream()
                .limit(depth)
                .collect(ArrayList::new, (m, e) -> m.add(new ExchangeTuple(e.getKey(), e.getValue().getSize(),new ArrayList<>(e.getValue().getExchanges()))), List::addAll);

        return finalAggregatedBids;
    }

    private void mergeInMap(Map<Double, SizeExchange> aggregatedTopMap, TreeMap<Double, Double> treeMap, String exchange) {
        for (Map.Entry<Double, Double> entry : treeMap.entrySet()) {
            Double price = entry.getKey();
            Double size = entry.getValue();
            SizeExchange sizeExchange = aggregatedTopMap.get(price);
            if (sizeExchange == null) {
                sizeExchange = new SizeExchange(size);
                sizeExchange.getExchanges().add(exchange);
                aggregatedTopMap.put(price, sizeExchange);
            } else {
                SizeExchange oldExchange = aggregatedTopMap.get(price);
                oldExchange.getExchanges().add(exchange);
                oldExchange.setSize(oldExchange.getSize() + size);
                aggregatedTopMap.put(price, oldExchange);
            }
        }
    }


    public static void main(String[] args) {
        AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext(MongoDBConfig.class, PropertySourceConfig.class, ServiceConfig.class, RedisConfig.class);
        FirstAggregator firstAggregator = applicationContext.getBean(FirstAggregator.class);

        firstAggregator.aggregateAsksPairByDepth("ETHBTC", 50);

    }
}
