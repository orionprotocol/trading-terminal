package ru.dev4j;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import ru.dev4j.config.MongoDBConfig;
import ru.dev4j.config.PropertySourceConfig;
import ru.dev4j.config.RedisConfig;
import ru.dev4j.config.ServiceConfig;
import ru.dev4j.repository.redis.RedisRepository;
import ru.dev4j.service.handler.BinanceHandler;

public class RedisMain {
    public static void main(String[] args) {

        AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext(MongoDBConfig.class, PropertySourceConfig.class, ServiceConfig.class,RedisConfig.class);

        RedisRepository redisRepository = applicationContext.getBean(RedisRepository.class);

        System.out.println("DONE");

    }
}
