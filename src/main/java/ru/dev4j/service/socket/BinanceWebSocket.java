package ru.dev4j.service.socket;

import com.binance.api.client.BinanceApiClientFactory;
import com.binance.api.client.BinanceApiWebSocketClient;
import com.binance.api.client.domain.market.OrderBookEntry;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.dev4j.repository.redis.RedisRepository;
import ru.dev4j.service.handler.BinanceHandler;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Service
public class BinanceWebSocket {

    @Autowired
    private BinanceHandler binanceHandler;

    @Autowired
    private RedisRepository redisRepository;

    private static final String API = "https://www.binance.com/api/v1/depth?symbol={PAIR}&limit=1000";

    @PostConstruct
    public void initConncetions() throws IOException {

        BinanceApiWebSocketClient client = BinanceApiClientFactory.newInstance().newWebSocketClient();

        redisRepository.saveLoadSnapshotBinance("ETHBTC", "0");
        client.onDepthEvent("ETHBTC".toLowerCase(), depthEvent -> {
            System.out.println(depthEvent);
            String loadSnapshot = redisRepository.getLoadSnapshotBinance("ETHBTC");
            if (loadSnapshot == null || loadSnapshot.equals("0")) {
                String ethBtcJson = null;
                try {
                    ethBtcJson = getFirstSnapshot(API.replace("{PAIR}", "ETHBTC"));
                } catch (IOException e) {
                    e.printStackTrace();
                }
                for (OrderBookEntry orderBook : depthEvent.getAsks()) {
                    binanceHandler.handleAskPair(orderBook.getPrice(), orderBook.getQty(), "ETHBTC");
                }
                for (OrderBookEntry orderBook : depthEvent.getBids()) {
                    binanceHandler.handleBidsPair(orderBook.getPrice(), orderBook.getQty(), "ETHBTC");
                }
                binanceHandler.handleFirstSnapshot(ethBtcJson, "ETHBTC");
            }
            if (loadSnapshot != null && loadSnapshot.equals("1")) {
                Long lastUpdateId = redisRepository.getLastUpdateIdBinance("ETHBTC");
                if (depthEvent.getFinalUpdateId() > lastUpdateId) {
                    for (OrderBookEntry orderBook : depthEvent.getAsks()) {
                        binanceHandler.handleAskPair(orderBook.getPrice(), orderBook.getQty(), "ETHBTC");
                    }
                    for (OrderBookEntry orderBook : depthEvent.getBids()) {
                        binanceHandler.handleBidsPair(orderBook.getPrice(), orderBook.getQty(), "ETHBTC");
                    }
                }
            }


        });
    }

    public String getFirstSnapshot(String url) throws IOException {

        HttpGet httpGet = new HttpGet(url);

        HttpClient client = HttpClientBuilder.create().build();
        HttpResponse response = client.execute(httpGet);
        String json = EntityUtils.toString(response.getEntity(), StandardCharsets.UTF_8);

        return json;
    }

}
