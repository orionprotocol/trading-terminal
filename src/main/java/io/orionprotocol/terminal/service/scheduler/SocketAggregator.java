package io.orionprotocol.terminal.service.scheduler;


import com.google.gson.Gson;
import io.orionprotocol.terminal.model.*;
import io.orionprotocol.terminal.repository.db.PairConfigRepository;
import io.orionprotocol.terminal.repository.redis.InMemoryRepository;
import io.orionprotocol.terminal.service.SocketHolder;
import io.orionprotocol.terminal.service.map.ExchangeMapService;
import io.orionprotocol.terminal.service.socket.custom.SocketHandler;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.*;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class SocketAggregator {

    private ScheduledExecutorService executorService;


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
    private InMemoryRepository inMemoryRepository;

    @Autowired
    private ExchangeMapService exchangeMapService;

    Gson gson = new Gson();


    @PostConstruct
    public void init() {
        PairConfig binanceConfig = pairConfigRepository.findByExchange(BINANCE);
        PairConfig poloniexConfig = pairConfigRepository.findByExchange(POLONIEX);
        PairConfig bittrexConfig = pairConfigRepository.findByExchange(BITTREX);

        pairs = new LinkedHashSet<>();

        for (Pair pair : binanceConfig.getPair()) {
            pairs.add(pair.getGeneralName());
        }

        for (Pair pair : poloniexConfig.getPair()) {
            pairs.add(pair.getGeneralName());
        }

        for (Pair pair : bittrexConfig.getPair()) {
            pairs.add(pair.getGeneralName());
        }

        initScheduler(DELAY, PERIOD, pairs);
    }


    public void initScheduler(int delay, int period, Set<String> pairs) {
        executorService = Executors.newScheduledThreadPool(3);
        for (String pair : pairs) {
            executorService.scheduleAtFixedRate(createAggregator(pair), delay, period, UNIT);
        }
    }


    private Runnable createAggregator(final String pair) {
        return () -> {
            try {
                Long now = System.currentTimeMillis();
                Map<String, List<ExchangeTuple>> aggregatedData = handlePairChanges(pair, now);
                if (aggregatedData.get("aggregatedAsks").size() > 0 || aggregatedData.get("aggregatedBids").size() > 0) {
                    logger.info("PAIR " + pair + "ASKS " + aggregatedData.get("aggregatedAsks").size() + " BIDS " + aggregatedData.get("aggregatedBids").size());
                    if (pair.equals("WAVES-BTC")) {
                        System.out.println();
                    }
                    try {
                        SocketHandler socketHandler = socketHolder.getSocket(pair);
                        socketHandler.sendNotification(gson.toJson(aggregatedData));
                    } catch (Exception e) {
                        logger.error(e);
                    }
                }
            } catch (Exception e) {
                logger.error(e);
            }
        };
    }


    private Map<String, List<ExchangeTuple>> handlePairChanges(String pair, Long now) {
        Map<String, List<ExchangeTuple>> finalMap = new HashMap<>();

        Map<Double, SizeExchange> finalAsksMap = new HashMap<>();
        Map<Double, SizeExchange> finalBidsMap = new HashMap<>();

        Map<Double, SizeExchange> exchangeAsksMap = new HashMap<>();
        Map<Double, SizeExchange> exchangeBidsMap = new HashMap<>();

        Set<Map.Entry<String, Object>> binanceAsksChanges = inMemoryRepository.getChanges(Exchange.BINANCE, DataType.ASKS, pair);
        Set<Map.Entry<String, Object>> binanceBidsChanges = inMemoryRepository.getChanges(Exchange.BINANCE, DataType.BIDS, pair);

        Set<Map.Entry<String, Object>> poloniexAsksChanges = inMemoryRepository.getChanges(Exchange.POLONIEX, DataType.ASKS, pair);
        Set<Map.Entry<String, Object>> poloniexBidsChanges = inMemoryRepository.getChanges(Exchange.POLONIEX, DataType.BIDS, pair);

        Set<Map.Entry<String, Object>> bittrexAsksChanges = inMemoryRepository.getChanges(Exchange.BITTREX, DataType.ASKS, pair);
        Set<Map.Entry<String, Object>> bittrexBidsChanges = inMemoryRepository.getChanges(Exchange.BITTREX, DataType.BIDS, pair);

        handleChanges(binanceAsksChanges, now, finalAsksMap, exchangeAsksMap, pair, Exchange.BINANCE, DataType.ASKS);

        handleChanges(poloniexAsksChanges, now, finalAsksMap, exchangeAsksMap, pair, Exchange.POLONIEX, DataType.ASKS);

        handleChanges(bittrexAsksChanges, now, finalAsksMap, exchangeAsksMap, pair, Exchange.BITTREX, DataType.ASKS);

        handleChanges(binanceBidsChanges, now, finalBidsMap, exchangeBidsMap, pair, Exchange.BINANCE, DataType.BIDS);

        handleChanges(poloniexBidsChanges, now, finalBidsMap, exchangeBidsMap, pair, Exchange.POLONIEX, DataType.BIDS);

        handleChanges(bittrexBidsChanges, now, finalBidsMap, exchangeBidsMap, pair, Exchange.BITTREX, DataType.BIDS);


        List<ExchangeTuple> finalAggregatedAsks = finalAsksMap.entrySet().stream()
                .collect(ArrayList::new, (m, e) -> m.add(new ExchangeTuple(e.getKey(), e.getValue().getSize(), new ArrayList<>(e.getValue().getExchanges()))), List::addAll);

        List<ExchangeTuple> finalAggregatedBids = finalBidsMap.entrySet().stream()
                .collect(ArrayList::new, (m, e) -> m.add(new ExchangeTuple(e.getKey(), e.getValue().getSize(), new ArrayList<>(e.getValue().getExchanges()))), List::addAll);

        List<ExchangeTuple> exchangeAsks = exchangeAsksMap.entrySet().stream()
                .collect(ArrayList::new, (m, e) -> m.add(new ExchangeTuple(e.getKey(), e.getValue().getSize(), new ArrayList<>(e.getValue().getExchanges()))), List::addAll);

        List<ExchangeTuple> exchangeBids = exchangeBidsMap.entrySet().stream()
                .collect(ArrayList::new, (m, e) -> m.add(new ExchangeTuple(e.getKey(), e.getValue().getSize(), new ArrayList<>(e.getValue().getExchanges()))), List::addAll);


        finalMap.put("aggregatedAsks", finalAggregatedAsks);
        finalMap.put("aggregatedBids", finalAggregatedBids);

        finalMap.put("exchangeAsks", exchangeAsks);
        finalMap.put("exchangeBids", exchangeBids);
        return finalMap;
    }

    private void handleChanges(Set<Map.Entry<String, Object>> changes, Long now, Map<Double, SizeExchange> finalMap, Map<Double, SizeExchange> exchangeMap, String pair, Exchange exchange, DataType dataType) {
        for (Map.Entry<String, Object> change : changes) {
            String key = change.getKey();
            handleChange(key, now, finalMap, exchangeMap, pair, exchange, dataType);
        }
    }

    private void handleChange(String key, Long now, Map<Double, SizeExchange> finalMap, Map<Double, SizeExchange> exchangeMap, String pair, Exchange exchange, DataType dataType) {
        String[] timePrice = key.split(":");
        Long time = Long.valueOf(timePrice[0]);
        if (time < now) {
            Double price = Double.valueOf(timePrice[1]);
            SizeExchange aggregatedSize = getAggregatedSize(dataType, pair, price);
            SizeExchange exchangeSize = getExchangeSize(dataType, pair, price, exchange);
            finalMap.put(price, aggregatedSize);
            exchangeMap.put(price, exchangeSize);
            inMemoryRepository.deleteChanges(exchange, dataType, pair, key);
        }
    }

    private SizeExchange getAggregatedSize(DataType dataType, String pair, Double price) {
        Double binanceSize = exchangeMapService.getExchangeMapValue(Exchange.BINANCE, dataType, pair, price);
        Double poloniexSize = exchangeMapService.getExchangeMapValue(Exchange.POLONIEX, dataType, pair, price);
        Double bittrexSize = exchangeMapService.getExchangeMapValue(Exchange.BITTREX, dataType, pair, price);

        SizeExchange sizeExchange = new SizeExchange();
        if (binanceSize != null) {
            sizeExchange.getExchanges().add(Exchange.BINANCE.name().toLowerCase());
        } else {
            binanceSize = 0D;
        }
        if (poloniexSize != null) {
            sizeExchange.getExchanges().add(Exchange.POLONIEX.name().toLowerCase());
        } else {
            poloniexSize = 0D;
        }
        if (bittrexSize != null) {
            sizeExchange.getExchanges().add(Exchange.BITTREX.name().toLowerCase());
        } else {
            bittrexSize = 0D;
        }
        Double aggregatedSize = binanceSize + poloniexSize + bittrexSize;
        sizeExchange.setSize(aggregatedSize);
        return sizeExchange;
    }

    private SizeExchange getExchangeSize(DataType dataType, String pair, Double price, Exchange exchange) {
        Double size = exchangeMapService.getExchangeMapValue(exchange, dataType, pair, price);

        SizeExchange sizeExchange = new SizeExchange();
        sizeExchange.getExchanges().add(exchange.name().toLowerCase());
        if (size != null) {
            sizeExchange.setSize(size);
        } else {
            sizeExchange.setSize(0D);
        }
        return sizeExchange;
    }

}
