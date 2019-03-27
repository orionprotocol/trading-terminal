package io.orionprotocol.terminal.repository.db;

import org.springframework.data.mongodb.repository.MongoRepository;
import io.orionprotocol.terminal.model.Broker;
import io.orionprotocol.terminal.repository.db.impl.BrokerRepositoryCustom;

public interface BrokerRepository extends BrokerRepositoryCustom, MongoRepository<Broker, String> {
}
