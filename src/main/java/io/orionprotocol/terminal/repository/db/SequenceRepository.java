package io.orionprotocol.terminal.repository.db;

import io.orionprotocol.terminal.repository.db.impl.SequenceRepositoryCustom;
import org.springframework.data.mongodb.repository.MongoRepository;
import io.orionprotocol.terminal.model.SequenceId;


public interface SequenceRepository extends MongoRepository<SequenceId, Long>, SequenceRepositoryCustom {
}
