package ru.dev4j.service.handler;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.dev4j.model.Exchange;
import ru.dev4j.repository.redis.RedisRepository;

@Service
public class BinanceHandler {

    @Autowired
    private RedisRepository redisRepository;

    public void handleAskPair(String price, String size, String pair) {

        redisRepository.deleteAsks(Exchange.BINANCE, pair, price);

        Double rSize = Double.valueOf(size);
        if (rSize > 0) {
            redisRepository.addAsks(Exchange.BINANCE, pair, price, size);
        }
    }


    public void handleBidsPair(String price, String size, String pair) {

        redisRepository.deleteBids(Exchange.BINANCE, pair, price);

        Double rSize = Double.valueOf(size);
        if (rSize > 0) {
            redisRepository.addBids(Exchange.BINANCE, pair, price, size);
        }
    }

    public void handleFirstSnapshot(String json, String pair) {
        JSONObject snapshot = new JSONObject(json);
        JSONArray asks = snapshot.getJSONArray("asks");

        Integer lastUpdateId = snapshot.getInt("lastUpdateId");

        for (int i = 0; i < asks.length(); i++) {
            JSONArray ask = asks.getJSONArray(i);
            String price = ask.getString(0);
            String size = ask.getString(1);
            handleAskPair(price, size, pair);
        }

        JSONArray bids = snapshot.getJSONArray("bids");

        for (int i = 0; i < bids.length(); i++) {
            JSONArray bid = bids.getJSONArray(i);
            String price = bid.getString(0);
            String size = bid.getString(1);
            handleBidsPair(price, size, pair);
        }

        redisRepository.saveLasUpdateIdBinance(pair, String.valueOf(lastUpdateId));
        redisRepository.saveLoadSnapshotBinance(pair,"1");
    }
}
