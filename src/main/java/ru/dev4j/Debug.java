package ru.dev4j;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import ru.dev4j.config.*;

public class Debug {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext(PropertySourceConfig.class, ServiceConfig.class, WebSocketConfig.class, MongoDBConfig.class, RedisConfig.class);

    }
}
