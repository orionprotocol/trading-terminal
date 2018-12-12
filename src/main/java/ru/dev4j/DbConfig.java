package ru.dev4j;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import ru.dev4j.config.*;
import ru.dev4j.model.Pair;
import ru.dev4j.model.PairConfig;
import ru.dev4j.model.SequenceId;
import ru.dev4j.repository.db.PairConfigRepository;
import ru.dev4j.repository.db.SequenceRepository;
import ru.dev4j.repository.redis.RedisRepository;

import java.util.ArrayList;
import java.util.List;

public class DbConfig {

    public static void main(String[] args) {

        AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext(PropertySourceConfig.class, MongoDBConfig.class);

        SequenceRepository sequenceRepository = applicationContext.getBean(SequenceRepository.class);

        SequenceId sequenceId = new SequenceId();
        sequenceId.setId("exchange");
        sequenceId.setSeq(0);

        sequenceRepository.save(sequenceId);

        System.exit(0);
    }
}
