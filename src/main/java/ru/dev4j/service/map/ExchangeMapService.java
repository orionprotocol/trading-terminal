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
    private static ConcurrentHashMap<String, ConcurrentSkipListMap<BigDecimal, String>> exchangeHolder;

    @PostConstruct
    public void load() {
        exchangeHolder = new ConcurrentHashMap<>();
    }

    public void addAsks(Exchange exchange, String pair, BigDecimal price, String size) {
        String key = String.format("%s:%s:%s", DataType.ASKS.name(), exchange.name(), pair);
        checkForNullAsk(key);
        ConcurrentSkipListMap<BigDecimal, String> map = exchangeHolder.get(key);
        map.put(price, size);
    }

    public void addBids(Exchange exchange, String pair, BigDecimal price, String size) {
        String key = String.format("%s:%s:%s", DataType.BIDS.name(), exchange.name(), pair);
        checkForNullDesk(key);
        ConcurrentSkipListMap<BigDecimal, String> map = exchangeHolder.get(key);
        map.put(price, size);
    }


    public void deleteAsks(Exchange exchange, String pair, BigDecimal price) {
        String key = String.format("%s:%s:%s", DataType.ASKS.name(), exchange.name(), pair);
        checkForNullAsk(key);
        ConcurrentSkipListMap<BigDecimal, String> map = exchangeHolder.get(key);
        map.remove(price);
    }

    public void deleteBids(Exchange exchange, String pair, BigDecimal price) {
        String key = String.format("%s:%s:%s", DataType.BIDS.name(), exchange.name(), pair);
        checkForNullDesk(key);
        ConcurrentSkipListMap<BigDecimal, String> map = exchangeHolder.get(key);
        map.remove(price);
    }

    public ConcurrentSkipListMap<BigDecimal, String> getAllAsks(Exchange exchange, String pair) {
        String key = String.format("%s:%s:%s", DataType.ASKS.name(), exchange.name(), pair);
        checkForNullAsk(key);
        return exchangeHolder.get(key);
    }

    public ConcurrentSkipListMap<BigDecimal, String> getAllBids(Exchange exchange, String pair) {
        String key = String.format("%s:%s:%s", DataType.BIDS.name(), exchange.name(), pair);
        checkForNullDesk(key);
        return exchangeHolder.get(key);
    }

    public ConcurrentHashMap<String, ConcurrentSkipListMap<BigDecimal, String>> getExchangeHolder() {
        return exchangeHolder;
    }

    public TreeMap<BigDecimal, String> getFirstAsks(Exchange exchange, String pair, Integer depth) {
        String key = String.format("%s:%s:%s", DataType.ASKS.name(), exchange.name(), pair);
        checkForNullAsk(key);
        TreeMap<BigDecimal, String> response = exchangeHolder.get(key).entrySet().stream()
                .limit(depth)
                .collect(TreeMap::new, (m, e) -> m.put(e.getKey(), e.getValue()), Map::putAll);
        return response;
    }

    public TreeMap<BigDecimal, String> getFirstBids(Exchange exchange, String pair, Integer depth) {
        String key = String.format("%s:%s:%s", DataType.BIDS.name(), exchange.name(), pair);
        checkForNullDesk(key);
        TreeMap<BigDecimal, String> response = exchangeHolder.get(key).entrySet().stream()
                .limit(depth)
                .collect(TreeMap::new, (m, e) -> m.put(e.getKey(), e.getValue()), Map::putAll);
        return response;
    }

    private void checkForNullAsk(String key) {
        ConcurrentSkipListMap<BigDecimal, String> map = exchangeHolder.get(key);
        if (map == null) {
            exchangeHolder.put(key, new ConcurrentSkipListMap<>());
        }
    }

    private void checkForNullDesk(String key) {
        ConcurrentSkipListMap<BigDecimal, String> map = exchangeHolder.get(key);
        Comparator<BigDecimal> comparator = Comparator.reverseOrder();
        if (map == null) {
            exchangeHolder.put(key, new ConcurrentSkipListMap<>(comparator));
        }
    }


}
