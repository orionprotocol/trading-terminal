package ru.dev4j.service.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.dev4j.model.Exchange;
import ru.dev4j.repository.redis.RedisRepository;
import ru.dev4j.service.map.ExchangeMapService;

import java.math.BigDecimal;

@Service
public class PoloniexHandler {

    @Autowired
    private RedisRepository redisRepository;

    @Autowired
    private ExchangeMapService exchangeMapService;


    public void handleAskPair(BigDecimal price, String size, String pair) {

        exchangeMapService.deleteAsks(Exchange.POLONIEX, pair, price);

        Double rSize = Double.valueOf(size);
        if (rSize > 0) {
            exchangeMapService.addAsks(Exchange.POLONIEX, pair, price, size);
        }
    }


    public void handleBidsPair(BigDecimal price, String size, String pair) {

        exchangeMapService.deleteBids(Exchange.POLONIEX, pair, price);

        Double rSize = Double.valueOf(size);
        if (rSize > 0) {
            exchangeMapService.addBids(Exchange.POLONIEX, pair, price, size);
        }
    }

}
