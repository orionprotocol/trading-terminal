package ru.dev4j.service.socket;

import com.cf.client.WSSClient;
import com.cf.client.poloniex.wss.model.PoloniexWSSSubscription;
import com.cf.client.wss.handler.TickerMessageHandler;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.dev4j.service.handler.BinanceHandler;
import ru.dev4j.service.handler.PoloniexHandler;

import javax.annotation.PostConstruct;
import java.util.Iterator;

@Service
public class PoloniexWebSocket {

    @Autowired
    private PoloniexHandler poloniexHandler;

    @PostConstruct
    public void initConncetions() {
        try (WSSClient wssClient = new WSSClient("wss://api2.poloniex.com")) {
            wssClient.addSubscription(new PoloniexWSSSubscription("148"), s -> {
                if (s.contains("orderBook")) {
                    handleFirstSnapshot(s, "ETHBTC");
                } else {
                    handleUpdates(s, "ETHBTC");
                }
            });
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
        System.out.println("DONE");
    }

    private void handleUpdates(String s, String pair) {
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
        System.out.println(s);
    }


}
