package ru.dev4j.service.aggregation;

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
import ru.dev4j.repository.redis.RedisRepository;
import ru.dev4j.service.map.ExchangeMapService;

import java.math.BigDecimal;
import java.util.*;

@Service
public class FirstAggregator {

    @Autowired
    private ExchangeMapService exchangeMapService;

    public Map<String, List<ExchangeTuple>> aggregateAsksAndBids(String pair, Integer depth) {
        List<ExchangeTuple> asks = aggregateAsksPairByDepth(pair, depth);
        List<ExchangeTuple> bids = aggregateBidsPairByDepth(pair, depth);

        Map<String, List<ExchangeTuple>> response = new HashMap<>();
        response.put("asks", asks);
        response.put("bids", bids);

        return response;
    }

    private List<ExchangeTuple> aggregateAsksPairByDepth(String pair, Integer depth) {

        TreeMap<BigDecimal, Double> aggregatedTopMap = new TreeMap<>();

        TreeMap<BigDecimal, String> binanceAsks = exchangeMapService.getFirstAsks(Exchange.BINANCE, pair, depth);

        mergeInMap(aggregatedTopMap, binanceAsks);

        TreeMap<BigDecimal, String> poloniexAsks = exchangeMapService.getFirstAsks(Exchange.POLONIEX, pair, depth);

        mergeInMap(aggregatedTopMap, poloniexAsks);

        List<ExchangeTuple> finalAggregatedAsks = aggregatedTopMap.entrySet().stream()
                .limit(depth)
                .collect(ArrayList::new, (m, e) -> m.add(new ExchangeTuple(e.getKey(), e.getValue())), List::addAll);

        return finalAggregatedAsks;
    }

    private List<ExchangeTuple> aggregateBidsPairByDepth(String pair, Integer depth) {

        TreeMap<BigDecimal, Double> aggregatedTopMap = new TreeMap<>(Comparator.reverseOrder());

        TreeMap<BigDecimal, String> binanceBids = exchangeMapService.getFirstBids(Exchange.BINANCE, pair, depth);

        mergeInMap(aggregatedTopMap, binanceBids);

        TreeMap<BigDecimal, String> poloniexBids = exchangeMapService.getFirstBids(Exchange.POLONIEX, pair, depth);

        mergeInMap(aggregatedTopMap, poloniexBids);

        List<ExchangeTuple> finalAggregatedBids = aggregatedTopMap.entrySet().stream()
                .limit(depth)
                .collect(ArrayList::new, (m, e) -> m.add(new ExchangeTuple(e.getKey(), e.getValue())), List::addAll);

        return finalAggregatedBids;
    }

    private void mergeInMap(Map<BigDecimal, Double> aggregatedTopMap, TreeMap<BigDecimal, String> treeMap) {
        for (Map.Entry<BigDecimal, String> entry : treeMap.entrySet()) {
            BigDecimal price = entry.getKey();
            String size = entry.getValue();
            Double value = aggregatedTopMap.get(price);
            if (value == null) {
                aggregatedTopMap.put(price, Double.valueOf(size));
            } else {
                Double oldSize = aggregatedTopMap.get(price);
                aggregatedTopMap.put(price, oldSize + Double.valueOf(size));
            }
        }
    }

    public static void main(String[] args) {
        AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext(MongoDBConfig.class, PropertySourceConfig.class, ServiceConfig.class, RedisConfig.class);
        FirstAggregator firstAggregator = applicationContext.getBean(FirstAggregator.class);

        firstAggregator.aggregateAsksPairByDepth("ETHBTC", 50);

    }
}
