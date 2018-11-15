package ru.dev4j.service.map;

import org.springframework.stereotype.Service;
import ru.dev4j.model.DataType;
import ru.dev4j.model.Exchange;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentSkipListMap;

@Service
public class SortedMapService {
    private static ConcurrentHashMap<String, ConcurrentSkipListMap<Double, String>> exchangeHolder;

    @PostConstruct
    public void load() {
        exchangeHolder = new ConcurrentHashMap<>();
    }

    public void addAsks(Exchange exchange, String pair, Double price, String size) {
        exchangeHolder.get(String.format("%s:%s:%s", DataType.ASKS.name(), exchange.name(), pair)).put(price, size);
    }

    public void addBids(Exchange exchange, String pair, Double price, String size) {
        exchangeHolder.get(String.format("%s:%s:%s", DataType.BIDS.name(), exchange.name(), pair)).put(price, size);
    }

    public ConcurrentSkipListMap<Double, String> getAllAsks(Exchange exchange, String pair) {
        return exchangeHolder.get(String.format("%s:%s:%s", DataType.ASKS.name(), exchange.name(), pair));
    }

    public ConcurrentSkipListMap<Double, String> getAllBids(Exchange exchange, String pair) {
        return exchangeHolder.get(String.format("%s:%s:%s", DataType.BIDS.name(), exchange.name(), pair));
    }


}
