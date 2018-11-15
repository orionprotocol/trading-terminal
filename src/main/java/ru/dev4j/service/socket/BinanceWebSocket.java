package ru.dev4j.service.socket;

import com.binance.api.client.BinanceApiClientFactory;
import com.binance.api.client.BinanceApiWebSocketClient;
import com.binance.api.client.domain.market.OrderBookEntry;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.dev4j.model.Pair;
import ru.dev4j.model.PairConfig;
import ru.dev4j.repository.db.PairConfigRepository;
import ru.dev4j.repository.redis.RedisRepository;
import ru.dev4j.service.handler.BinanceHandler;
import ru.dev4j.web.api.AmoWebHooks;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Service
public class BinanceWebSocket {

    private static final String EXCHANGE_NAME = "BINANCE";

    final static Logger logger = Logger.getLogger(BinanceWebSocket.class);

    @Autowired
    private BinanceHandler binanceHandler;

    @Autowired
    private RedisRepository redisRepository;

    @Autowired
    private PairConfigRepository pairConfigRepository;

    private static final String API = "https://www.binance.com/api/v1/depth?symbol={PAIR}&limit=1000";

    @PostConstruct
    public void initConncetions() throws IOException {

        PairConfig binanceConfig = pairConfigRepository.findByExchange(EXCHANGE_NAME);

        for (Pair pair : binanceConfig.getPair()) {

            redisRepository.saveLoadSnapshotBinance(pair.getGeneralName(), "0");
            logger.info(String.format("INIT %S PAIR", pair.getCodeName()));

            BinanceApiWebSocketClient client = BinanceApiClientFactory.newInstance().newWebSocketClient();

            client.onDepthEvent(pair.getCodeName().toLowerCase(), depthEvent -> {
                logger.info("New event");
                String loadSnapshot = redisRepository.getLoadSnapshotBinance(pair.getGeneralName());
                if (loadSnapshot == null || loadSnapshot.equals("0")) {
                    String ethBtcJson = null;
                    try {
                        ethBtcJson = getFirstSnapshot(API.replace("{PAIR}", pair.getCodeName()));
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    for (OrderBookEntry orderBook : depthEvent.getAsks()) {
                        binanceHandler.handleAskPair(orderBook.getPrice(), orderBook.getQty(), pair.getGeneralName());
                    }
                    for (OrderBookEntry orderBook : depthEvent.getBids()) {
                        binanceHandler.handleBidsPair(orderBook.getPrice(), orderBook.getQty(), pair.getGeneralName());
                    }
                    binanceHandler.handleFirstSnapshot(ethBtcJson, pair.getGeneralName());
                }
                if (loadSnapshot != null && loadSnapshot.equals("1")) {
                    Long lastUpdateId = redisRepository.getLastUpdateIdBinance(pair.getGeneralName());
                    if (depthEvent.getFinalUpdateId() > lastUpdateId) {
                        for (OrderBookEntry orderBook : depthEvent.getAsks()) {
                            binanceHandler.handleAskPair(orderBook.getPrice(), orderBook.getQty(), pair.getGeneralName());
                        }
                        for (OrderBookEntry orderBook : depthEvent.getBids()) {
                            binanceHandler.handleBidsPair(orderBook.getPrice(), orderBook.getQty(), pair.getGeneralName());
                        }
                    }
                }


            });
        }
    }

    public String getFirstSnapshot(String url) throws IOException {

        HttpGet httpGet = new HttpGet(url);

        HttpClient client = HttpClientBuilder.create().build();
        HttpResponse response = client.execute(httpGet);
        String json = EntityUtils.toString(response.getEntity(), StandardCharsets.UTF_8);

        return json;
    }

}
