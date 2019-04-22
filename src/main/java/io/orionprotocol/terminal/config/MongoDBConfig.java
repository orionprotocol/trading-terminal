package io.orionprotocol.terminal.config;

import com.mongodb.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.util.Collections;

@Configuration
@Import({PropertySourceConfig.class})
@EnableMongoRepositories(basePackages = {"io.orionprotocol.terminal.repository.db"})
@EnableMongoAuditing
public class MongoDBConfig extends AbstractMongoConfiguration {

    @Value("${db.host}")
    private String host;

    @Value("${db.port}")
    private int port;

    @Value("${db.name}")
    private String databaseName;

    @Value("${db.username}")
    private String username;

    @Value("${db.password}")
    private String password;

    @Override
    protected String getDatabaseName() {
        return databaseName;
    }

    @Override
    public Mongo mongo() throws Exception {

        MongoClientOptions options = new MongoClientOptions.Builder()
                .maxConnectionIdleTime(60000)
                .build();

        ServerAddress address = new ServerAddress(host, port);
        // If username not empty then return MongoClient with credential
        if (!username.equals("")) {
            MongoCredential credential = MongoCredential.createCredential(username, databaseName, password.toCharArray());
            return new MongoClient(address, Collections.singletonList(credential), options);
        }
        return new MongoClient(address, options);
    }

}
