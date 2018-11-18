package ru.dev4j;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import ru.dev4j.config.*;
import ru.dev4j.model.Pair;
import ru.dev4j.model.PairConfig;
import ru.dev4j.repository.db.PairConfigRepository;
import ru.dev4j.repository.redis.RedisRepository;

import java.util.ArrayList;
import java.util.List;

public class DbConfig {

    public static void main(String[] args) {

        AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext(PropertySourceConfig.class, MongoDBConfig.class);

        PairConfigRepository pairConfigRepository = applicationContext.getBean(PairConfigRepository.class);

        Pair pair = new Pair("ETHBTC", "BTC-ETH");
        Pair pair2 = new Pair("XRPBTC", "BTC-XRP");
        Pair pair3 = new Pair("WAVESBTC", "BTC-WAVES");
        PairConfig pairConfig = new PairConfig();

        List<Pair> pairs = new ArrayList<>();
        pairs.add(pair);
        pairs.add(pair2);
        pairs.add(pair3);

        pairConfig.setExchange("BITTREX");
        pairConfig.setPair(pairs);

        pairConfigRepository.save(pairConfig);
        System.out.println("DONE");
    }
}
