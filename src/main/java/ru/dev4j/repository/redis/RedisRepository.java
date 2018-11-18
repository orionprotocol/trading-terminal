package ru.dev4j.repository.redis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.dev4j.model.DataType;
import ru.dev4j.model.Exchange;

import java.util.Map;
import java.util.Set;

@Repository
@Transactional
public class RedisRepository {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    public void saveLasUpdateIdBinance(String pair, String lastUpdateId) {
        redisTemplate.opsForHash().put(String.format("%s:%s", Exchange.BINANCE.name(), pair), "lastUpdateId", lastUpdateId);
    }

    public Long getLastUpdateIdBinance(String pair) {
        return new Long((String) redisTemplate.opsForHash().get(String.format("%s:%s", Exchange.BINANCE.name(), pair), "lastUpdateId"));
    }

    public void saveLoadSnapshotBinance(String pair, String bool) {
        redisTemplate.opsForHash().put(String.format("%s:%s", Exchange.BINANCE.name(), pair), "loadSnapshot", bool);
    }

    public String getLoadSnapshotBinance(String pair) {
        return (String) redisTemplate.opsForHash().get(String.format("%s:%s", Exchange.BINANCE.name(), pair), "loadSnapshot");
    }

    public void deleteChanges(Exchange exchange, DataType dataType, String pair, String timePrice) {
        redisTemplate.opsForHash().delete(String.format("%s:%s:%s", exchange.name(), dataType.name(), pair), timePrice);
    }

    public void saveChanges(Exchange exchange, DataType dataType, String pair, String price) {
        Long time = System.currentTimeMillis();
        redisTemplate.opsForHash().put(String.format("%s:%s:%s", exchange.name(), dataType.name(), pair), String.format("%s:%s", String.valueOf(time), price), 0);
    }

    public Map<Object, Object> getChanges(Exchange exchange, DataType dataType, String pair) {
        Map<Object, Object> changes = redisTemplate.opsForHash().entries(String.format("%s:%s:%s", exchange.name(), dataType.name(), pair));
        return changes;
    }
}
