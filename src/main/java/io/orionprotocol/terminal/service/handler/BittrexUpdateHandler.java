package io.orionprotocol.terminal.service.handler;

import io.orionprotocol.terminal.repository.redis.InMemoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import io.orionprotocol.terminal.model.Exchange;
import io.orionprotocol.terminal.service.map.ExchangeMapService;

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
