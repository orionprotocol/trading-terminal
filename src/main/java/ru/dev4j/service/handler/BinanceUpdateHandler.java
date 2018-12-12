package ru.dev4j.service.handler;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.dev4j.model.Exchange;
import ru.dev4j.repository.redis.RedisRepository;
import ru.dev4j.service.map.ExchangeMapService;

import java.math.BigDecimal;

@Service
public class BinanceUpdateHandler {

    @Autowired
    private RedisRepository redisRepository;

    @Autowired
    private ExchangeMapService exchangeMapService;

    public void handleAskPair(BigDecimal price, String size, String pair) {

        exchangeMapService.deleteAsks(Exchange.BINANCE, pair, price);

        Double rSize = Double.valueOf(size);
        if (rSize > 0) {
            exchangeMapService.addAsks(Exchange.BINANCE, pair, price, size);
        }
    }


    public void handleBidsPair(BigDecimal price, String size, String pair) {

        exchangeMapService.deleteBids(Exchange.BINANCE, pair, price);

        Double rSize = Double.valueOf(size);
        if (rSize > 0) {
            exchangeMapService.addBids(Exchange.BINANCE, pair, price, size);
        }
    }

    public void handleFirstSnapshot(String json, String pair) {
        JSONObject snapshot = new JSONObject(json);
        JSONArray asks = snapshot.getJSONArray("asks");

        Integer lastUpdateId = snapshot.getInt("lastUpdateId");

        for (int i = 0; i < asks.length(); i++) {
            JSONArray ask = asks.getJSONArray(i);
            BigDecimal price = ask.getBigDecimal(0);
            String size = ask.getString(1);
            handleAskPair(price, size, pair);
        }

        JSONArray bids = snapshot.getJSONArray("bids");

        for (int i = 0; i < bids.length(); i++) {
            JSONArray bid = bids.getJSONArray(i);
            BigDecimal price = bid.getBigDecimal(0);
            String size = bid.getString(1);
            handleBidsPair(price, size, pair);
        }

        redisRepository.saveLasUpdateIdBinance(pair, String.valueOf(lastUpdateId));
        redisRepository.saveLoadSnapshotBinance(pair,"1");
    }
}
