package ru.dev4j.service.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.dev4j.model.Exchange;
import ru.dev4j.repository.redis.RedisRepository;

@Service
public class PoloniexHandler {

    @Autowired
    private RedisRepository redisRepository;

    public void handleAskPair(String price, String size, String pair) {

        redisRepository.deleteAsks(Exchange.POLONIEX, pair, price);

        Double rSize = Double.valueOf(size);
        if (rSize > 0) {
            redisRepository.addAsks(Exchange.POLONIEX, pair, price, size);
        }
    }


    public void handleBidsPair(String price, String size, String pair) {

        redisRepository.deleteBids(Exchange.POLONIEX, pair, price);

        Double rSize = Double.valueOf(size);
        if (rSize > 0) {
            redisRepository.addBids(Exchange.POLONIEX, pair, price, size);
        }
    }

}
