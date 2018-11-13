package ru.dev4j.service.aggregation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.stereotype.Service;
import ru.dev4j.config.MongoDBConfig;
import ru.dev4j.config.PropertySourceConfig;
import ru.dev4j.config.RedisConfig;
import ru.dev4j.config.ServiceConfig;
import ru.dev4j.model.Exchange;
import ru.dev4j.model.ExchangeTuple;
import ru.dev4j.repository.redis.RedisRepository;

import java.util.*;

@Service
public class FirstAggregator {

    @Autowired
    private RedisRepository redisRepository;

    public Map<String, List<ExchangeTuple>> aggregateAsksAndBids(String pair, Integer depth) {
        List<ExchangeTuple> asks = aggregateAsksPairByDepth(pair, depth);
        List<ExchangeTuple> bids = aggregateBidsPairByDepth(pair, depth);

        Map<String, List<ExchangeTuple>> response = new HashMap<>();
        response.put("asks", asks);
        response.put("bids", bids);

        return response;
    }

    private List<ExchangeTuple> aggregateAsksPairByDepth(String pair, Integer depth) {

        Map<String, Double> aggregatedTopMap = new HashMap<>();

        Map<Object, Object> binanceAsks = redisRepository.getAllAsks(Exchange.BINANCE, pair);

        List binanceSortedKeys = new ArrayList(binanceAsks.keySet());
        Collections.sort(binanceSortedKeys, (Comparator<String>) (o1, o2) -> new Double(o1).compareTo(new Double(o2)));

        mergeInMap(depth, aggregatedTopMap, binanceAsks, binanceSortedKeys);

        Map<Object, Object> poloniexAsks = redisRepository.getAllAsks(Exchange.POLONIEX, pair);

        List poloniexSortedKeys = new ArrayList(poloniexAsks.keySet());
        Collections.sort(poloniexSortedKeys, (Comparator<String>) (o1, o2) -> new Double(o1).compareTo(new Double(o2)));

        mergeInMap(depth, aggregatedTopMap, poloniexAsks, poloniexSortedKeys);

        List<String> aggregatedSortedKeys = new ArrayList<>(aggregatedTopMap.keySet());
        Collections.sort(aggregatedSortedKeys, (Comparator<String>) (o1, o2) -> new Double(o1).compareTo(new Double(o2)));

        List<ExchangeTuple> finalAggregatedAsks = new ArrayList<>();

        for (int i = 0; i < depth; i++) {
            String fPrice = aggregatedSortedKeys.get(i);
            Double fSize = aggregatedTopMap.get(fPrice);
            ExchangeTuple exchangeTuple = new ExchangeTuple(fPrice, fSize);
            finalAggregatedAsks.add(exchangeTuple);
        }

        return finalAggregatedAsks;
    }

    private List<ExchangeTuple> aggregateBidsPairByDepth(String pair, Integer depth) {

        Map<String, Double> aggregatedTopMap = new HashMap<>();

        Map<Object, Object> binanceBids = redisRepository.getAllBids(Exchange.BINANCE, pair);

        List binanceSortedKeys = new ArrayList(binanceBids.keySet());
        Collections.sort(binanceSortedKeys, (Comparator<String>) (o1, o2) -> new Double(o2).compareTo(new Double(o1)));

        mergeInMap(depth, aggregatedTopMap, binanceBids, binanceSortedKeys);

        Map<Object, Object> poloniexBids = redisRepository.getAllBids(Exchange.POLONIEX, pair);

        List poloniexSortedKeys = new ArrayList(poloniexBids.keySet());
        Collections.sort(poloniexSortedKeys, (Comparator<String>) (o1, o2) -> new Double(o2).compareTo(new Double(o1)));

        mergeInMap(depth, aggregatedTopMap, poloniexBids, poloniexSortedKeys);

        List<String> aggregatedSortedKeys = new ArrayList<>(aggregatedTopMap.keySet());
        Collections.sort(aggregatedSortedKeys, (Comparator<String>) (o1, o2) -> new Double(o2).compareTo(new Double(o1)));

        List<ExchangeTuple> finalAggregatedBids = new ArrayList<>();

        for (int i = 0; i < depth; i++) {
            String fPrice = aggregatedSortedKeys.get(i);
            Double fSize = aggregatedTopMap.get(fPrice);
            ExchangeTuple exchangeTuple = new ExchangeTuple(fPrice, fSize);
            finalAggregatedBids.add(exchangeTuple);
        }

        return finalAggregatedBids;
    }

    private void mergeInMap(Integer depth, Map<String, Double> aggregatedTopMap, Map<Object, Object> asks, List exchangeSortedKeys) {
        if (depth > exchangeSortedKeys.size()) {
            depth = exchangeSortedKeys.size();
        }
        for (int i = 0; i < depth; i++) {
            String price = (String) exchangeSortedKeys.get(i);
            String size = (String) asks.get(price);
            Double value = aggregatedTopMap.get(price);
            if (value == null) {
                aggregatedTopMap.put(price, Double.valueOf(size));
            } else {
                Double oldSize = aggregatedTopMap.get(price);
                Double newSize = oldSize + Double.valueOf(size);
                aggregatedTopMap.put(price, newSize);
            }
        }
    }

    public static void main(String[] args) {
        AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext(MongoDBConfig.class, PropertySourceConfig.class, ServiceConfig.class, RedisConfig.class);
        FirstAggregator firstAggregator = applicationContext.getBean(FirstAggregator.class);

        firstAggregator.aggregateAsksPairByDepth("ETHBTC", 50);
        firstAggregator.aggregateBidsPairByDepth("ETHBTC", 50);
    }
}
