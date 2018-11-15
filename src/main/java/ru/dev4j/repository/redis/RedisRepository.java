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

    public void addAsks(Exchange exchange, String pair, String price, String size) {
        redisTemplate.opsForHash().put(String.format("%s:%s:%s", DataType.ASKS.name(), exchange.name(), pair), price, size);
    }

    public void addBids(Exchange exchange, String pair, String price, String size) {
        redisTemplate.opsForHash().put(String.format("%s:%s:%s", DataType.BIDS.name(), exchange.name(), pair), price, size);
    }

    public void deleteAsks(Exchange exchange, String pair, String price) {
        redisTemplate.opsForHash().delete(String.format("%s:%s:%s", DataType.ASKS.name(), exchange.name(), pair), price);
    }

    public void deleteBids(Exchange exchange, String pair, String price) {
        redisTemplate.opsForHash().delete(String.format("%s:%s:%s", DataType.BIDS.name(), exchange.name(), pair), price);
    }

    public Map<Object, Object> getAllAsks(Exchange exchange, String pair) {
        return redisTemplate.opsForHash().entries(String.format("%s:%s:%s", DataType.ASKS.name(), exchange.name(), pair));
    }

    public Map<Object, Object> getAllBids(Exchange exchange, String pair) {
        return redisTemplate.opsForHash().entries(String.format("%s:%s:%s", DataType.BIDS.name(), exchange.name(), pair));
    }

    public void saveLasUpdateIdBinance(String pair, String lastUpdateId) {
        redisTemplate.opsForHash().put(String.format("%s:%s", Exchange.BINANCE.name(), pair),"lastUpdateId", lastUpdateId);
    }

    public Long getLastUpdateIdBinance(String pair) {
        return new Long((String) redisTemplate.opsForHash().get(String.format("%s:%s", Exchange.BINANCE.name(), pair),"lastUpdateId"));
    }

    public void saveLoadSnapshotBinance(String pair, String bool) {
        redisTemplate.opsForHash().put(String.format("%s:%s", Exchange.BINANCE.name(), pair), "loadSnapshot", bool);
    }

    public String getLoadSnapshotBinance(String pair) {
        return (String) redisTemplate.opsForHash().get(String.format("%s:%s", Exchange.BINANCE.name(), pair), "loadSnapshot");
    }
}
