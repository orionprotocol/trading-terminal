package io.orionprotocol.terminal.repository.redis;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import io.orionprotocol.terminal.model.DataType;
import io.orionprotocol.terminal.model.Exchange;

import javax.annotation.PostConstruct;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentSkipListMap;

@Repository
@Transactional
public class InMemoryRepository {

    private static ConcurrentHashMap<String, ConcurrentSkipListMap<String, Object>> inMemoryHolder;

    @PostConstruct
    public void load() {
        inMemoryHolder = new ConcurrentHashMap<>();
    }


    public void saveLasUpdateIdBinance(String pair, String lastUpdateId) {
        String key = String.format("%s:%s", Exchange.BINANCE.name(), pair);
        checkForNullAsk(key);
        ConcurrentSkipListMap<String, Object> map = inMemoryHolder.get(key);
        map.put("lastUpdateId", lastUpdateId);
    }

    public Long getLastUpdateIdBinance(String pair) {
        String key = String.format("%s:%s", Exchange.BINANCE.name(), pair);
        checkForNullAsk(key);
        ConcurrentSkipListMap<String, Object> map = inMemoryHolder.get(key);
        return Long.valueOf((String) map.get("lastUpdateId"));
    }

    public void saveLoadSnapshotBinance(String pair, String bool) {
        String key = String.format("%s:%s", Exchange.BINANCE.name(), pair);
        checkForNullAsk(key);
        ConcurrentSkipListMap<String, Object> map = inMemoryHolder.get(key);
        map.put("loadSnapshot", bool);
    }

    public String getLoadSnapshotBinance(String pair) {
        String key = String.format("%s:%s", Exchange.BINANCE.name(), pair);
        checkForNullAsk(key);
        ConcurrentSkipListMap<String, Object> map = inMemoryHolder.get(key);
        return (String) map.get("loadSnapshot");
    }

    public void deleteChanges(Exchange exchange, DataType dataType, String pair, String timePrice) {
        String key = String.format("%s:%s:%s", exchange.name(), dataType.name(), pair);
        checkForNullAsk(key);
        ConcurrentSkipListMap<String, Object> map = inMemoryHolder.get(key);
        map.remove(timePrice);
    }

    public void saveChanges(Exchange exchange, DataType dataType, String pair, String price) {
        Long time = System.currentTimeMillis();
        String key = String.format("%s:%s:%s", exchange.name(), dataType.name(), pair);
        checkForNullAsk(key);
        ConcurrentSkipListMap<String, Object> map = inMemoryHolder.get(key);
        map.put(String.format("%s:%s", String.valueOf(time), price),0);
    }

    public Set<Map.Entry<String, Object>> getChanges(Exchange exchange, DataType dataType, String pair) {
        String key = String.format("%s:%s:%s", exchange.name(), dataType.name(), pair);
        checkForNullAsk(key);
        ConcurrentSkipListMap<String, Object> map = inMemoryHolder.get(key);
        return map.entrySet();
    }

    public void clearAllChanges(Exchange exchange, String pair){
        Set<Map.Entry<String, Object>> bittrexAsksChanges = getChanges(exchange, DataType.ASKS, pair);
        Set<Map.Entry<String, Object>> bittrexBidsChanges = getChanges(exchange, DataType.BIDS, pair);

        for (Map.Entry<String, Object> askChange : bittrexAsksChanges) {
            String key = askChange.getKey();
            deleteChanges(exchange, DataType.ASKS, pair, key);
        }
        for (Map.Entry<String, Object> bidChange : bittrexBidsChanges) {
            String key = bidChange.getKey();
            deleteChanges(exchange, DataType.BIDS, pair, key);
        }
    }
    private void checkForNullAsk(String key) {
        ConcurrentSkipListMap<String, Object> map = inMemoryHolder.get(key);
        if (map == null) {
            inMemoryHolder.put(key, new ConcurrentSkipListMap<>());
        }
    }
}
