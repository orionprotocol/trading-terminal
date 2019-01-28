package ru.dev4j.service.socket;

import com.github.ccob.bittrex4j.BittrexExchange;
import com.github.ccob.bittrex4j.dao.MarketOrder;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.dev4j.model.DataType;
import ru.dev4j.model.Exchange;
import ru.dev4j.model.Pair;
import ru.dev4j.model.PairConfig;
import ru.dev4j.repository.db.PairConfigRepository;
import ru.dev4j.repository.redis.RedisRepository;
import ru.dev4j.service.handler.BittrexUpdateHandler;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.List;

@Service
public class BittrexWebSocket {

    private static final String BITTREX_NAME = "BITTREX";
    private String API_KEY = "***REMOVED***";
    private String SECRET_KEY = "***REMOVED***";


    final static Logger logger = Logger.getLogger(BittrexWebSocket.class);

    @Autowired
    private BittrexUpdateHandler bittrexUpdateHandler;

    @Autowired
    private RedisRepository redisRepository;

    @Autowired
    private PairConfigRepository pairConfigRepository;

    @PostConstruct
    public void initConncetions() throws IOException {

        try (BittrexExchange bittrexExchange = new BittrexExchange(API_KEY, SECRET_KEY)) {

            PairConfig bittrexConfig = pairConfigRepository.findByExchange(BITTREX_NAME);

            bittrexExchange.onUpdateExchangeState(updateExchangeState -> {
                String pair = mapToGeneralName(updateExchangeState.getMarketName(), bittrexConfig.getPair());
                for (MarketOrder marketOrder : updateExchangeState.getSells()) {
                    bittrexUpdateHandler.handleAskPair(marketOrder.getRate().doubleValue(), marketOrder.getQuantity().doubleValue(), pair);
                    redisRepository.saveChanges(Exchange.BITTREX, DataType.ASKS, pair, marketOrder.getRate().toString());
                }
                for (MarketOrder marketOrder : updateExchangeState.getBuys()) {
                    bittrexUpdateHandler.handleBidsPair(marketOrder.getRate().doubleValue(), marketOrder.getQuantity().doubleValue(), pair);
                    redisRepository.saveChanges(Exchange.BITTREX, DataType.BIDS, pair, marketOrder.getRate().toString());
                }
            });


            bittrexExchange.connectToWebSocket(() -> {

                for (Pair pair : bittrexConfig.getPair()) {

                    bittrexExchange.queryExchangeState(pair.getCodeName(), exchangeState -> {
                        for (MarketOrder marketOrder : exchangeState.getSells()) {
                            bittrexUpdateHandler.handleAskPair(marketOrder.getRate().doubleValue(), marketOrder.getQuantity().doubleValue(), pair.getGeneralName());
                            redisRepository.saveChanges(Exchange.BITTREX, DataType.ASKS, pair.getGeneralName(), marketOrder.getRate().toString());
                        }
                        for (MarketOrder marketOrder : exchangeState.getBuys()) {
                            bittrexUpdateHandler.handleBidsPair(marketOrder.getRate().doubleValue(), marketOrder.getQuantity().doubleValue(), pair.getGeneralName());
                            redisRepository.saveChanges(Exchange.BITTREX, DataType.BIDS, pair.getGeneralName(), marketOrder.getRate().toString());
                        }

                    });
                    bittrexExchange.subscribeToExchangeDeltas(pair.getCodeName(), null);

                    bittrexExchange.subscribeToMarketSummaries(null);

                }
            });

        } catch (Exception e) {
            logger.error(e);
        }

        System.out.println("Closing websocket and exiting");
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
