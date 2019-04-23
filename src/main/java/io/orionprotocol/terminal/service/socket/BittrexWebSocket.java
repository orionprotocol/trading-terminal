package io.orionprotocol.terminal.service.socket;

import com.github.ccob.bittrex4j.BittrexExchange;
import com.github.ccob.bittrex4j.dao.MarketOrder;
import io.orionprotocol.terminal.repository.db.PairConfigRepository;
import io.orionprotocol.terminal.repository.redis.InMemoryRepository;
import io.orionprotocol.terminal.service.handler.BittrexUpdateHandler;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import io.orionprotocol.terminal.model.DataType;
import io.orionprotocol.terminal.model.Exchange;
import io.orionprotocol.terminal.model.Pair;
import io.orionprotocol.terminal.model.PairConfig;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.io.IOException;
import java.util.List;

@Service
public class BittrexWebSocket {

    private static final String BITTREX_NAME = "BITTREX";

    @Value("${bittrex.apikey}")
    private String API_KEY;

    @Value("${bittrex.secret}")
    private String SECRET_KEY;


    final static Logger logger = Logger.getLogger(BittrexWebSocket.class);

    @Autowired
    private BittrexUpdateHandler bittrexUpdateHandler;

    @Autowired
    private InMemoryRepository inMemoryRepository;

    @Autowired
    private PairConfigRepository pairConfigRepository;

    private BittrexExchange bittrexExchange;

    @PreDestroy
    public void preDestory() throws IOException {
        if (bittrexExchange != null) {
            bittrexExchange.close();
        }
    }

    @PostConstruct
    public void initConncetions() throws IOException {

        bittrexExchange = new BittrexExchange(API_KEY, SECRET_KEY);

        PairConfig bittrexConfig = pairConfigRepository.findByExchange(BITTREX_NAME);

        bittrexExchange.onUpdateExchangeState(updateExchangeState -> {
            String pair = mapToGeneralName(updateExchangeState.getMarketName(), bittrexConfig.getPair());
            for (MarketOrder marketOrder : updateExchangeState.getSells()) {
                bittrexUpdateHandler.handleAskPair(marketOrder.getRate().doubleValue(), marketOrder.getQuantity().doubleValue(), pair);
                inMemoryRepository.saveChanges(Exchange.BITTREX, DataType.ASKS, pair, marketOrder.getRate().toString());
            }
            for (MarketOrder marketOrder : updateExchangeState.getBuys()) {
                bittrexUpdateHandler.handleBidsPair(marketOrder.getRate().doubleValue(), marketOrder.getQuantity().doubleValue(), pair);
                inMemoryRepository.saveChanges(Exchange.BITTREX, DataType.BIDS, pair, marketOrder.getRate().toString());
            }
        });


        bittrexExchange.connectToWebSocket(() -> {

            for (Pair pair : bittrexConfig.getPair()) {

                bittrexExchange.queryExchangeState(pair.getCodeName(), exchangeState -> {
                    bittrexUpdateHandler.clearAllPairs(Exchange.BITTREX, pair.getGeneralName());
                    inMemoryRepository.clearAllChanges(Exchange.BITTREX, pair.getGeneralName());
                    for (MarketOrder marketOrder : exchangeState.getSells()) {
                        bittrexUpdateHandler.handleAskPair(marketOrder.getRate().doubleValue(), marketOrder.getQuantity().doubleValue(), pair.getGeneralName());
                    }
                    for (MarketOrder marketOrder : exchangeState.getBuys()) {
                        bittrexUpdateHandler.handleBidsPair(marketOrder.getRate().doubleValue(), marketOrder.getQuantity().doubleValue(), pair.getGeneralName());
                    }

                });
                bittrexExchange.subscribeToExchangeDeltas(pair.getCodeName(), null);

                bittrexExchange.subscribeToMarketSummaries(null);

            }
        });

    }

    private String mapToGeneralName(String codeName, List<Pair> pairs) {
        for (Pair pair : pairs) {
            if (codeName.equals(pair.getCodeName())) {
                return pair.getGeneralName();
            }
        }
        return null;
    }
}
