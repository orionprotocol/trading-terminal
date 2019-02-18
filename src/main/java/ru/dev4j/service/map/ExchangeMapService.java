package ru.dev4j.service.map;

import org.springframework.stereotype.Service;
import ru.dev4j.model.DataType;
import ru.dev4j.model.Exchange;

import javax.annotation.PostConstruct;
import java.math.BigDecimal;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentSkipListMap;

@Service
public class ExchangeMapService {
    private static ConcurrentHashMap<String, ConcurrentSkipListMap<Double, Double>> exchangeHolder;

    @PostConstruct
    public void load() {
        exchangeHolder = new ConcurrentHashMap<>();
    }

    public void addAsks(Exchange exchange, String pair, Double price, Double size) {
        String key = String.format("%s:%s:%s", DataType.ASKS.name(), exchange.name(), pair);
        checkForNullAsk(key);
        ConcurrentSkipListMap<Double, Double> map = exchangeHolder.get(key);
        map.put(price, Double.valueOf(size));
    }

    public void addBids(Exchange exchange, String pair, Double price, Double size) {
        String key = String.format("%s:%s:%s", DataType.BIDS.name(), exchange.name(), pair);
        checkForNullDesk(key);
        ConcurrentSkipListMap<Double, Double> map = exchangeHolder.get(key);
        map.put(price, Double.valueOf(size));
    }


    public void deleteAsks(Exchange exchange, String pair, Double price) {
        String key = String.format("%s:%s:%s", DataType.ASKS.name(), exchange.name(), pair);
        checkForNullAsk(key);
        ConcurrentSkipListMap<Double, Double> map = exchangeHolder.get(key);
        map.remove(price);
    }

    public void deleteBids(Exchange exchange, String pair, Double price) {
        String key = String.format("%s:%s:%s", DataType.BIDS.name(), exchange.name(), pair);
        checkForNullDesk(key);
        ConcurrentSkipListMap<Double, Double> map = exchangeHolder.get(key);
        map.remove(price);
    }

    public ConcurrentSkipListMap<Double, Double> getAllAsks(Exchange exchange, String pair) {
        String key = String.format("%s:%s:%s", DataType.ASKS.name(), exchange.name(), pair);
        checkForNullAsk(key);
        return exchangeHolder.get(key);
    }

    public ConcurrentSkipListMap<Double, Double> getAllBids(Exchange exchange, String pair) {
        String key = String.format("%s:%s:%s", DataType.BIDS.name(), exchange.name(), pair);
        checkForNullDesk(key);
        return exchangeHolder.get(key);
    }

    public ConcurrentHashMap<String, ConcurrentSkipListMap<Double, Double>> getExchangeHolder() {
        return exchangeHolder;
    }

    public TreeMap<Double, Double> getFirstAsks(Exchange exchange, String pair, Integer depth) {
        String key = String.format("%s:%s:%s", DataType.ASKS.name(), exchange.name(), pair);
        checkForNullAsk(key);
        TreeMap<Double, Double> response = exchangeHolder.get(key).entrySet().stream()
                .limit(depth)
                .collect(TreeMap::new, (m, e) -> m.put(e.getKey(), e.getValue()), Map::putAll);
        return response;
    }

    public TreeMap<Double, Double> getFirstBids(Exchange exchange, String pair, Integer depth) {
        String key = String.format("%s:%s:%s", DataType.BIDS.name(), exchange.name(), pair);
        checkForNullDesk(key);
        TreeMap<Double, Double> response = exchangeHolder.get(key).entrySet().stream()
                .limit(depth)
                .collect(TreeMap::new, (m, e) -> m.put(e.getKey(), e.getValue()), Map::putAll);
        return response;
    }

    public void clearState(Exchange exchange, String pair){
        String askKey = String.format("%s:%s:%s", DataType.ASKS.name(), exchange, pair);
        checkForNullDesk(askKey);
        ConcurrentSkipListMap<Double, Double> askMap = exchangeHolder.get(askKey);
        askMap.clear();

        String bidKey = String.format("%s:%s:%s", DataType.BIDS.name(), exchange, pair);
        checkForNullDesk(bidKey);
        ConcurrentSkipListMap<Double, Double> bidMap = exchangeHolder.get(bidKey);
        bidMap.clear();

    }

    public Double getExchangeMapValue(Exchange exchange, DataType dataType, String pair,Double price){
        String key = String.format("%s:%s:%s", dataType.name(), exchange.name(), pair);
        if(dataType.equals(DataType.ASKS)){
            checkForNullAsk(key);
        }else {
            checkForNullDesk(key);
        }
        return exchangeHolder.get(key).get(price);
    }

    private void checkForNullAsk(String key) {
        ConcurrentSkipListMap<Double, Double> map = exchangeHolder.get(key);
        if (map == null) {
            exchangeHolder.put(key, new ConcurrentSkipListMap<>());
        }
    }

    private void checkForNullDesk(String key) {
        ConcurrentSkipListMap<Double, Double> map = exchangeHolder.get(key);
        Comparator<Double> comparator = Comparator.reverseOrder();
        if (map == null) {
            exchangeHolder.put(key, new ConcurrentSkipListMap<>(comparator));
        }
    }



}
