package ru.dev4j;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import ru.dev4j.config.MongoDBConfig;
import ru.dev4j.config.PropertySourceConfig;
import ru.dev4j.config.RedisConfig;
import ru.dev4j.config.ServiceConfig;
import ru.dev4j.model.Pair;
import ru.dev4j.model.PairConfig;
import ru.dev4j.repository.db.PairConfigRepository;
import ru.dev4j.repository.redis.RedisRepository;

import java.util.ArrayList;
import java.util.List;

public class DbConfig {

    public static void main(String[] args) {

        AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext(PropertySourceConfig.class, ServiceConfig.class, MongoDBConfig.class, RedisConfig.class);

        PairConfigRepository pairConfigRepository = applicationContext.getBean(PairConfigRepository.class);

        Pair pair = new Pair("BTCXRP", "117");

        PairConfig pairConfig = new PairConfig();

        List<Pair> pairs = new ArrayList<>();
        pairs.add(pair);

        pairConfig.setExchange("POLONIEX");
        pairConfig.setPair(pairs);

        pairConfigRepository.save(pairConfig);
        System.out.println("DONE");
    }
}
