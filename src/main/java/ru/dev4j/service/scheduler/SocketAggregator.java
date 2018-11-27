package ru.dev4j.service.scheduler;


import com.google.gson.Gson;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.dev4j.model.*;
import ru.dev4j.repository.db.PairConfigRepository;
import ru.dev4j.repository.redis.RedisRepository;
import ru.dev4j.service.map.ExchangeMapService;
import ru.dev4j.service.socket.custom.SocketHandler;
import ru.dev4j.service.SocketHolder;

import javax.annotation.PostConstruct;
import java.math.BigDecimal;
import java.util.*;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

@Service
public class SocketAggregator {

    private AggregatorChecker checker = new AggregatorChecker();
    private ScheduledExecutorService executorService;
    private ScheduledFuture<?> scheduledFuture;

    final static Logger logger = Logger.getLogger(SocketAggregator.class);

    @Autowired
    private SocketHolder socketHolder;

    private static final int DELAY = 0;
    private static final int PERIOD = 1;
    private static final TimeUnit UNIT = TimeUnit.SECONDS;

    private static final String BINANCE = "BINANCE";
    private static final String POLONIEX = "POLONIEX";
    private static final String BITTREX = "BITTREX";

    private static Set<String> pairs;

    @Autowired
    private PairConfigRepository pairConfigRepository;

    @Autowired
    private RedisRepository redisRepository;

    @Autowired
    private ExchangeMapService exchangeMapService;

    Gson gson = new Gson();


    @PostConstruct
    public void init() {
        PairConfig binanceConfig = pairConfigRepository.findByExchange(BINANCE);
        PairConfig poloniexConfig = pairConfigRepository.findByExchange(POLONIEX);
        PairConfig bittrexConfig = pairConfigRepository.findByExchange(BITTREX);

        pairs = new HashSet<>();

        for (Pair pair : binanceConfig.getPair()) {
            pairs.add(pair.getGeneralName());
        }

        for (Pair pair : poloniexConfig.getPair()) {
            pairs.add(pair.getGeneralName());
        }

        for (Pair pair : bittrexConfig.getPair()) {
            pairs.add(pair.getGeneralName());
        }

        initScheduler(DELAY, PERIOD);
    }


    public void initScheduler(int delay, int period) {
        executorService = Executors.newSingleThreadScheduledExecutor();
        scheduledFuture =
                executorService.scheduleAtFixedRate(checker, delay, period, UNIT);
    }

    public void reRunScheduler(int delay, int period) {
        scheduledFuture.cancel(true);
        scheduledFuture = executorService.scheduleAtFixedRate(checker, delay, period, UNIT);
    }

    private class AggregatorChecker implements Runnable {
        @Override
        public void run() {
            try {
                Long now = System.currentTimeMillis();
                for (String pair : pairs) {
                    Map<String, List<ExchangeTuple>> aggregatedData = handlePairChanges(pair, now);
                    if (aggregatedData.get("asks").size() > 0 || aggregatedData.get("bids").size() > 0) {
                        try {
                            SocketHandler socketHandler = socketHolder.getSocket(pair);
                            socketHandler.sendNotification(gson.toJson(aggregatedData));
                        }catch (Exception e){
                            logger.error(e);
                        }
                    }
                }
            } catch (Exception e) {
                logger.error(e);
            }
        }
    }

    private Map<String, List<ExchangeTuple>> handlePairChanges(String pair, Long now) {
        Map<String, List<ExchangeTuple>> finalMap = new HashMap<>();

        Map<BigDecimal, Double> finalAsksMap = new HashMap<>();
        Map<BigDecimal, Double> finalBidsMap = new HashMap<>();

        Map<Object, Object> binanceAsksChanges = redisRepository.getChanges(Exchange.BINANCE, DataType.ASKS, pair);
        Map<Object, Object> binanceBidsChanges = redisRepository.getChanges(Exchange.BINANCE, DataType.BIDS, pair);

        Map<Object, Object> poloniexAsksChanges = redisRepository.getChanges(Exchange.POLONIEX, DataType.ASKS, pair);
        Map<Object, Object> poloniexBidsChanges = redisRepository.getChanges(Exchange.POLONIEX, DataType.BIDS, pair);

        Map<Object, Object> bittrexAsksChanges = redisRepository.getChanges(Exchange.BITTREX, DataType.ASKS, pair);
        Map<Object, Object> bittrexBidsChanges = redisRepository.getChanges(Exchange.BITTREX, DataType.BIDS, pair);

        handleChanges(binanceAsksChanges, now, finalAsksMap, pair, Exchange.BINANCE, DataType.ASKS);

        handleChanges(poloniexAsksChanges, now, finalAsksMap, pair, Exchange.POLONIEX, DataType.ASKS);

        handleChanges(bittrexAsksChanges, now, finalAsksMap, pair, Exchange.BITTREX, DataType.ASKS);

        handleChanges(binanceBidsChanges, now, finalBidsMap, pair, Exchange.BINANCE, DataType.BIDS);

        handleChanges(poloniexBidsChanges, now, finalBidsMap, pair, Exchange.POLONIEX, DataType.BIDS);

        handleChanges(bittrexBidsChanges, now, finalBidsMap, pair, Exchange.BITTREX, DataType.BIDS);


        List<ExchangeTuple> finalAggregatedAsks = finalAsksMap.entrySet().stream()
                .collect(ArrayList::new, (m, e) -> m.add(new ExchangeTuple(e.getKey(), e.getValue())), List::addAll);

        List<ExchangeTuple> finalAggregatedBids = finalBidsMap.entrySet().stream()
                .collect(ArrayList::new, (m, e) -> m.add(new ExchangeTuple(e.getKey(), e.getValue())), List::addAll);

        finalMap.put("asks", finalAggregatedAsks);
        finalMap.put("bids", finalAggregatedBids);

        return finalMap;
    }

    private void handleChanges(Map<Object, Object> changes, Long now, Map<BigDecimal, Double> finalMap, String pair, Exchange exchange, DataType dataType) {
        for (Map.Entry<Object, Object> change : changes.entrySet()) {
            String key = (String) change.getKey();
            handleChange(key, now, finalMap, pair, exchange, dataType);
        }
    }

    private void handleChange(String key, Long now, Map<BigDecimal, Double> finalMap, String pair, Exchange exchange, DataType dataType) {
        String[] timePrice = key.split(":");
        Long time = Long.valueOf(timePrice[0]);
        if (time < now) {
            BigDecimal price = new BigDecimal(timePrice[1]);
            Double aggregatedSize = getAggregatedSize(dataType, pair, price);
            finalMap.put(price, aggregatedSize);
            redisRepository.deleteChanges(exchange, dataType, pair, key);
        }
    }

    private Double getAggregatedSize(DataType dataType, String pair, BigDecimal price) {
        String binanceSize = exchangeMapService.getExchangeMapValue(Exchange.BINANCE, dataType, pair, price);
        String poloniexSize = exchangeMapService.getExchangeMapValue(Exchange.POLONIEX, dataType, pair, price);
        String bittrexSize = exchangeMapService.getExchangeMapValue(Exchange.BITTREX, dataType, pair, price);
        Double dBinanceSize = 0D;
        Double dPoloniexSize = 0D;
        Double dBittrexSize = 0D;
        if (binanceSize != null && !binanceSize.isEmpty()) {
            dBinanceSize = Double.valueOf(binanceSize);
        }
        if (poloniexSize != null && !poloniexSize.isEmpty()) {
            dPoloniexSize = Double.valueOf(poloniexSize);
        }
        if (bittrexSize != null && !bittrexSize.isEmpty()) {
            dBittrexSize = Double.valueOf(bittrexSize);
        }
        return dBinanceSize + dPoloniexSize + dBittrexSize;
    }

}
