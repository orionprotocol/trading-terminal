package ru.dev4j;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import ru.dev4j.config.MongoDBConfig;
import ru.dev4j.config.PropertySourceConfig;
import ru.dev4j.config.RedisConfig;
import ru.dev4j.config.ServiceConfig;
import ru.dev4j.model.Exchange;
import ru.dev4j.service.map.ExchangeMapService;

import java.math.BigDecimal;
import java.util.Map;
import java.util.TreeMap;
import java.util.concurrent.ConcurrentSkipListMap;

public class HashMapMain {
    public static void main(String[] args) {

        AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext(PropertySourceConfig.class, ServiceConfig.class, MongoDBConfig.class, RedisConfig.class);

        ExchangeMapService exchangeMapService = applicationContext.getBean(ExchangeMapService.class);

        exchangeMapService.addAsks(Exchange.BINANCE, "ETHBTC", BigDecimal.valueOf(0.00008567), "1.9");
        exchangeMapService.addAsks(Exchange.BINANCE, "ETHBTC", BigDecimal.valueOf(0.0111514), "1.4");
        exchangeMapService.addAsks(Exchange.BINANCE, "ETHBTC", BigDecimal.valueOf(0.0331514), "1.2");
        exchangeMapService.addAsks(Exchange.BINANCE, "ETHBTC", BigDecimal.valueOf(0.01531514), "1.1");
        exchangeMapService.addAsks(Exchange.BINANCE, "ETHBTC", BigDecimal.valueOf(0.01531514), "1.5");
        exchangeMapService.addAsks(Exchange.BINANCE, "ETHBTC", BigDecimal.valueOf(0.00001567), "1.54");

        ConcurrentSkipListMap<BigDecimal, String> map = exchangeMapService.getAllAsks(Exchange.BINANCE, "ETHBTC");

        BigDecimal bigDecimal = new BigDecimal("0.0000008567");
        System.out.println(bigDecimal);
        System.out.println(map);
    }
}
