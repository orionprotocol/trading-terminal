package io.orionprotocol.terminal;

import io.orionprotocol.terminal.config.MongoDBConfig;
import io.orionprotocol.terminal.config.PropertySourceConfig;
import io.orionprotocol.terminal.model.SequenceId;
import io.orionprotocol.terminal.repository.db.SequenceRepository;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

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
