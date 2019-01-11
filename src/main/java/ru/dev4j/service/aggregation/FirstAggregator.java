package ru.dev4j.service.aggregation;

import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.stereotype.Service;
import ru.dev4j.config.MongoDBConfig;
import ru.dev4j.config.PropertySourceConfig;
import ru.dev4j.config.RedisConfig;
import ru.dev4j.config.ServiceConfig;
import ru.dev4j.model.DataType;
import ru.dev4j.model.Exchange;
import ru.dev4j.model.ExchangeTuple;
import ru.dev4j.model.SizeExchange;
import ru.dev4j.repository.redis.RedisRepository;
import ru.dev4j.service.map.ExchangeMapService;

import java.math.BigDecimal;
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

        TreeMap<BigDecimal, String> asks = exchangeMapService.getFirstAsks(exchange, pair, depth);

        List<ExchangeTuple> finalAggregatedAsks = asks.entrySet().stream()
                .limit(depth)
                .collect(ArrayList::new, (m, e) -> m.add(new ExchangeTuple(e.getKey(), Double.valueOf(e.getValue()),null)), List::addAll);

        return finalAggregatedAsks;
    }


    private List<ExchangeTuple> aggregateBidsPairByDepthForExchange(String pair, Integer depth, Exchange exchange) {

        TreeMap<BigDecimal, String> bids = exchangeMapService.getFirstBids(exchange, pair, depth);

        List<ExchangeTuple> finalAggregatedBids = bids.entrySet().stream()
                .limit(depth)
                .collect(ArrayList::new, (m, e) -> m.add(new ExchangeTuple(e.getKey(), Double.valueOf(e.getValue()),null)), List::addAll);

        return finalAggregatedBids;
    }

    private List<ExchangeTuple> aggregateAsksPairByDepth(String pair, Integer depth) {

        TreeMap<BigDecimal, SizeExchange> aggregatedTopMap = new TreeMap<>();

        TreeMap<BigDecimal, String> binanceAsks = exchangeMapService.getFirstAsks(Exchange.BINANCE, pair, depth);

        mergeInMap(aggregatedTopMap, binanceAsks, Exchange.BINANCE.name().toLowerCase());

        TreeMap<BigDecimal, String> poloniexAsks = exchangeMapService.getFirstAsks(Exchange.POLONIEX, pair, depth);

        mergeInMap(aggregatedTopMap, poloniexAsks, Exchange.POLONIEX.name().toLowerCase());

        TreeMap<BigDecimal, String> bittrexAsks = exchangeMapService.getFirstAsks(Exchange.BITTREX, pair, depth);

        mergeInMap(aggregatedTopMap, bittrexAsks, Exchange.BITTREX.name().toLowerCase());

        List<ExchangeTuple> finalAggregatedAsks = aggregatedTopMap.entrySet().stream()
                .limit(depth)
                .collect(ArrayList::new, (m, e) -> m.add(new ExchangeTuple(e.getKey(), e.getValue().getSize(), new ArrayList<>(e.getValue().getExchanges()))), List::addAll);

        return finalAggregatedAsks;
    }

    private List<ExchangeTuple> aggregateBidsPairByDepth(String pair, Integer depth) {

        TreeMap<BigDecimal, SizeExchange> aggregatedTopMap = new TreeMap<>(Comparator.reverseOrder());

        TreeMap<BigDecimal, String> binanceBids = exchangeMapService.getFirstBids(Exchange.BINANCE, pair, depth);

        mergeInMap(aggregatedTopMap, binanceBids, Exchange.BINANCE.name().toLowerCase());

        TreeMap<BigDecimal, String> poloniexBids = exchangeMapService.getFirstBids(Exchange.POLONIEX, pair, depth);

        mergeInMap(aggregatedTopMap, poloniexBids,Exchange.POLONIEX.name().toLowerCase());

        TreeMap<BigDecimal, String> bittrexBids = exchangeMapService.getFirstBids(Exchange.BITTREX, pair, depth);

        mergeInMap(aggregatedTopMap, bittrexBids,Exchange.POLONIEX.name().toLowerCase());


        List<ExchangeTuple> finalAggregatedBids = aggregatedTopMap.entrySet().stream()
                .limit(depth)
                .collect(ArrayList::new, (m, e) -> m.add(new ExchangeTuple(e.getKey(), e.getValue().getSize(),new ArrayList<>(e.getValue().getExchanges()))), List::addAll);

        return finalAggregatedBids;
    }

    private void mergeInMap(Map<BigDecimal, SizeExchange> aggregatedTopMap, TreeMap<BigDecimal, String> treeMap, String exchange) {
        for (Map.Entry<BigDecimal, String> entry : treeMap.entrySet()) {
            BigDecimal price = entry.getKey();
            String size = entry.getValue();
            SizeExchange sizeExchange = aggregatedTopMap.get(price);
            if (sizeExchange == null) {
                sizeExchange = new SizeExchange(Double.valueOf(size));
                sizeExchange.getExchanges().add(exchange);
                aggregatedTopMap.put(price, sizeExchange);
            } else {
                SizeExchange oldExchange = aggregatedTopMap.get(price);
                oldExchange.getExchanges().add(exchange);
                oldExchange.setSize(oldExchange.getSize() + Double.valueOf(size));
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
