package io.orionprotocol.terminal;

import io.orionprotocol.terminal.config.*;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;


public class Debug {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext(PropertySourceConfig.class, ServiceConfig.class, WebSocketConfig.class, MongoDBConfig.class, RedisConfig.class);

    }
}
