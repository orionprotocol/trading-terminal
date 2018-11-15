package ru.dev4j.service.socket;

import com.cf.client.WSSClient;
import com.cf.client.poloniex.wss.model.PoloniexWSSSubscription;
import com.cf.client.wss.handler.TickerMessageHandler;
import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.dev4j.model.Pair;
import ru.dev4j.model.PairConfig;
import ru.dev4j.repository.db.PairConfigRepository;
import ru.dev4j.service.handler.BinanceHandler;
import ru.dev4j.service.handler.PoloniexHandler;

import javax.annotation.PostConstruct;
import java.util.Iterator;

//@Service
public class PoloniexWebSocket {

    private static final String EXCHANGE_NAME = "POLONIEX";

    @Autowired
    private PoloniexHandler poloniexHandler;

    final static Logger logger = Logger.getLogger(PoloniexWebSocket.class);

    @Autowired
    private PairConfigRepository pairConfigRepository;


    @PostConstruct
    public void initConncetions() {
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
            wssClient.run(30000);
        } catch (Exception e) {
            e.printStackTrace();
        }
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
                poloniexHandler.handleAskPair(aPrice, aSize, pair);
            }
        }

        JSONObject bids = orderBook.getJSONObject(1);

        Iterator<String> bPrices = bids.keys();
        while (bPrices.hasNext()) {
            String bPrice = bPrices.next();
            if (bids.get(bPrice) instanceof String) {
                String bSize = bids.getString(bPrice);
                poloniexHandler.handleBidsPair(bPrice, bSize, pair);
            }
        }
        logger.info("Handle first snapshot");
    }

    private void handleUpdates(String s, String pair) {
        logger.info(String.format("NEW UPDATE %s POLONIEX",pair));
        String validJSON = "{'updates':" + s.substring(s.indexOf("[["), s.length() - 1) + "}";
        JSONObject updateObj = new JSONObject(validJSON);
        JSONArray updates = updateObj.getJSONArray("updates");
        if (updates.length() > 0) {
            for (int i = 0; i < updates.length(); i++) {
                JSONArray update = updates.getJSONArray(i);
                String type = update.getString(0);
                if (type.equals("o")) {
                    Integer updateType = update.getInt(1);
                    String price = update.getString(2);
                    String size = update.getString(3);
                    if (updateType == 0) {
                        poloniexHandler.handleAskPair(price, size, pair);
                    }
                    if (updateType == 1) {
                        poloniexHandler.handleBidsPair(price, size, pair);
                    }
                }
            }
        }
    }


}
