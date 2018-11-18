package ru.dev4j.service.socket;

import com.binance.api.client.BinanceApiClientFactory;
import com.binance.api.client.BinanceApiWebSocketClient;
import com.binance.api.client.domain.market.OrderBookEntry;
import com.github.ccob.bittrex4j.BittrexExchange;
import com.github.ccob.bittrex4j.dao.MarketOrder;
import com.github.ccob.bittrex4j.dao.Response;
import com.github.ccob.bittrex4j.dao.WithdrawalDeposit;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.dev4j.model.DataType;
import ru.dev4j.model.Exchange;
import ru.dev4j.model.Pair;
import ru.dev4j.model.PairConfig;
import ru.dev4j.repository.db.PairConfigRepository;
import ru.dev4j.repository.redis.RedisRepository;
import ru.dev4j.service.handler.BinanceHandler;
import ru.dev4j.service.handler.BittrexHandler;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

//@Service
public class BittrexWebSocket {

    private static final String BITTREX_NAME = "BITTREX";
    private String API_KEY = "***REMOVED***";
    private String SECRET_KEY = "***REMOVED***";


    final static Logger logger = Logger.getLogger(BittrexWebSocket.class);

    @Autowired
    private BittrexHandler bittrexHandler;

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
                    bittrexHandler.handleAskPair(marketOrder.getRate(), marketOrder.getQuantity().toPlainString(), pair);
                }
                for (MarketOrder marketOrder : updateExchangeState.getBuys()) {
                    bittrexHandler.handleBidsPair(marketOrder.getRate(), marketOrder.getQuantity().toPlainString(), pair);
                }
            });


            bittrexExchange.connectToWebSocket(() -> {

                for (Pair pair : bittrexConfig.getPair()) {

                    bittrexExchange.queryExchangeState(pair.getCodeName(), exchangeState -> {
                        for (MarketOrder marketOrder : exchangeState.getSells()) {
                            bittrexHandler.handleAskPair(marketOrder.getRate(), marketOrder.getQuantity().toPlainString(), pair.getGeneralName());
                        }
                        for (MarketOrder marketOrder : exchangeState.getBuys()) {
                            bittrexHandler.handleBidsPair(marketOrder.getRate(), marketOrder.getQuantity().toPlainString(), pair.getGeneralName());
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
