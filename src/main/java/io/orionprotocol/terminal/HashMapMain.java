package io.orionprotocol.terminal;

import io.orionprotocol.terminal.config.MongoDBConfig;
import io.orionprotocol.terminal.config.PropertySourceConfig;
import io.orionprotocol.terminal.config.RedisConfig;
import io.orionprotocol.terminal.config.ServiceConfig;
import io.orionprotocol.terminal.model.Exchange;
import io.orionprotocol.terminal.service.map.ExchangeMapService;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.math.BigDecimal;
import java.util.concurrent.ConcurrentSkipListMap;

public class HashMapMain {
    public static void main(String[] args) {

        AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext(PropertySourceConfig.class, ServiceConfig.class, MongoDBConfig.class, RedisConfig.class);

        ExchangeMapService exchangeMapService = applicationContext.getBean(ExchangeMapService.class);

        exchangeMapService.addAsks(Exchange.BINANCE, "ETHBTC", 0.00008567, 1.9);
        exchangeMapService.addAsks(Exchange.BINANCE, "ETHBTC", 0.0111514, 1.4);
        exchangeMapService.addAsks(Exchange.BINANCE, "ETHBTC", 0.0331514, 1.2);
        exchangeMapService.addAsks(Exchange.BINANCE, "ETHBTC", 0.01531514, 1.1);
        exchangeMapService.addAsks(Exchange.BINANCE, "ETHBTC", 0.01531514, 1.5);
        exchangeMapService.addAsks(Exchange.BINANCE, "ETHBTC", 0.00001567, 1.54);

        ConcurrentSkipListMap<Double, Double> map = exchangeMapService.getAllAsks(Exchange.BINANCE, "ETHBTC");

        BigDecimal bigDecimal = new BigDecimal("0.0000008567");
        System.out.println(bigDecimal);
        System.out.println(map);
    }
}
