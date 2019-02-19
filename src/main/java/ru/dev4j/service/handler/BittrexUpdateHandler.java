package ru.dev4j.service.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.dev4j.model.Exchange;
import ru.dev4j.repository.redis.InMemoryRepository;
import ru.dev4j.service.map.ExchangeMapService;

@Service
public class BittrexUpdateHandler {

    @Autowired
    private InMemoryRepository inMemoryRepository;

    @Autowired
    private ExchangeMapService exchangeMapService;


    public void handleAskPair(Double price, Double size, String generalPair) {

        exchangeMapService.deleteAsks(Exchange.BITTREX, generalPair, price);

        Double rSize = size;
        if (rSize > 0) {
            exchangeMapService.addAsks(Exchange.BITTREX, generalPair, price, size);
        }
    }

    public void handleBidsPair(Double price, Double size, String generalPair) {

        exchangeMapService.deleteBids(Exchange.BITTREX, generalPair, price);

        Double rSize = size;
        if (rSize > 0) {
            exchangeMapService.addBids(Exchange.BITTREX, generalPair, price, size);
        }
    }

    public void clearAllPairs(Exchange exchange, String pair){
        exchangeMapService.clearState(exchange,pair);
    }

}
