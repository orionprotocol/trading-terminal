package ru.dev4j.service.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.dev4j.model.Exchange;
import ru.dev4j.repository.redis.InMemoryRepository;
import ru.dev4j.service.map.ExchangeMapService;

@Service
public class PoloniexUpdateHandler {

    @Autowired
    private InMemoryRepository inMemoryRepository;

    @Autowired
    private ExchangeMapService exchangeMapService;


    public void handleAskPair(Double price, Double size, String pair) {

        exchangeMapService.deleteAsks(Exchange.POLONIEX, pair, price);

        Double rSize = Double.valueOf(size);
        if (rSize > 0) {
            exchangeMapService.addAsks(Exchange.POLONIEX, pair, price, size);
        }
    }


    public void handleBidsPair(Double price, Double size, String pair) {

        exchangeMapService.deleteBids(Exchange.POLONIEX, pair, price);

        Double rSize = Double.valueOf(size);
        if (rSize > 0) {
            exchangeMapService.addBids(Exchange.POLONIEX, pair, price, size);
        }
    }

}
