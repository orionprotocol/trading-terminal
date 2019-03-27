package io.orionprotocol.terminal.service.socket;

import com.cf.client.WSSClient;
import com.cf.client.poloniex.wss.model.PoloniexWSSSubscription;
import io.orionprotocol.terminal.repository.db.PairConfigRepository;
import io.orionprotocol.terminal.repository.redis.InMemoryRepository;
import io.orionprotocol.terminal.service.handler.PoloniexUpdateHandler;
import org.apache.commons.lang3.concurrent.BasicThreadFactory;
import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import io.orionprotocol.terminal.model.DataType;
import io.orionprotocol.terminal.model.Exchange;
import io.orionprotocol.terminal.model.Pair;
import io.orionprotocol.terminal.model.PairConfig;

import javax.annotation.PostConstruct;
import java.util.Iterator;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Service
public class PoloniexWebSocket {

    private static final String EXCHANGE_NAME = "POLONIEX";

    @Autowired
    private PoloniexUpdateHandler poloniexUpdateHandler;

    final static Logger logger = Logger.getLogger(PoloniexWebSocket.class);

    @Autowired
    private PairConfigRepository pairConfigRepository;

    @Autowired
    private InMemoryRepository inMemoryRepository;

    private ExecutorService executorService;

    @PostConstruct
    public void initConncetions() {
        BasicThreadFactory factory = new BasicThreadFactory.Builder().namingPattern("POLONIEX-SOCKET").build();
        executorService = Executors.newSingleThreadExecutor(factory);
        executorService.execute(() -> {
            logger.info("INIT POLONIEX ETHBTC CONNECTOR");
            try (WSSClient wssClient = new WSSClient("wss://api2.poloniex.com")) {

                PairConfig binanceConfig = pairConfigRepository.findByExchange(EXCHANGE_NAME);

                for (Pair pair : binanceConfig.getPair()) {
                    wssClient.addSubscription(new PoloniexWSSSubscription(pair.getCodeName()), s -> {
                        if (s.contains("orderBook")) {
                            handleFirstSnapshot(s, pair.getGeneralName());
                        } else {
                            handleUpdates(s, pair.getGeneralName());
                        }
                    });
                }
                wssClient.run(1000000000);
            } catch (Exception e) {
                logger.error(e);
            }
        });
    }

    private void handleFirstSnapshot(String s, String pair) {
        String validJSON = s.substring(s.indexOf("{\"currencyPair\""), s.length() - 3);
        JSONObject snapshot = new JSONObject(validJSON);

        JSONArray orderBook = snapshot.getJSONArray("orderBook");

        JSONObject asks = orderBook.getJSONObject(0);

        Iterator<String> aPrices = asks.keys();
        while (aPrices.hasNext()) {
            String aPrice = aPrices.next();
            if (asks.get(aPrice) instanceof String) {
                String aSize = asks.getString(aPrice);
                poloniexUpdateHandler.handleAskPair(Double.valueOf(aPrice), Double.valueOf(aSize), pair);
            }
        }

        JSONObject bids = orderBook.getJSONObject(1);

        Iterator<String> bPrices = bids.keys();
        while (bPrices.hasNext()) {
            String bPrice = bPrices.next();
            if (bids.get(bPrice) instanceof String) {
                String bSize = bids.getString(bPrice);
                poloniexUpdateHandler.handleBidsPair(Double.valueOf(bPrice), Double.valueOf(bSize), pair);
            }
        }
        logger.info("Handle first snapshot");
    }

    private void handleUpdates(String s, String pair) {
        logger.info(String.format("NEW UPDATE %s POLONIEX", pair));
        String validJSON = "{'updates':" + s.substring(s.indexOf("[["), s.length() - 1) + "}";
        JSONObject updateObj = new JSONObject(validJSON);
        JSONArray updates = updateObj.getJSONArray("updates");
        if (updates.length() > 0) {
            for (int i = 0; i < updates.length(); i++) {
                JSONArray update = updates.getJSONArray(i);
                String type = update.getString(0);
                if (type.equals("o")) {
                    Integer updateType = update.getInt(1);
                    Double price = update.getDouble(2);
                    Double size = Double.valueOf(update.getString(3));
                    if (updateType == 0) {
                        poloniexUpdateHandler.handleAskPair(price, size, pair);
                        inMemoryRepository.saveChanges(Exchange.POLONIEX, DataType.ASKS, pair, String.valueOf(price));
                    }
                    if (updateType == 1) {
                        poloniexUpdateHandler.handleBidsPair(price, size, pair);
                        inMemoryRepository.saveChanges(Exchange.POLONIEX, DataType.BIDS, pair, String.valueOf(price));
                    }
                }
            }
        }
    }


}
