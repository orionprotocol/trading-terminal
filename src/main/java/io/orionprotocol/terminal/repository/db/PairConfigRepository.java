package io.orionprotocol.terminal.repository.db;

import io.orionprotocol.terminal.repository.db.impl.PairConfigRepositoryCustom;
import org.springframework.data.mongodb.repository.MongoRepository;
import io.orionprotocol.terminal.model.PairConfig;

public interface PairConfigRepository extends PairConfigRepositoryCustom, MongoRepository<PairConfig, String> {
}
