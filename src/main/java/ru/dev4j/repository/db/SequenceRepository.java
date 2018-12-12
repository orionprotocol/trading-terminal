package ru.dev4j.repository.db;

import org.springframework.data.mongodb.repository.MongoRepository;
import ru.dev4j.model.SequenceId;
import ru.dev4j.repository.db.impl.SequenceRepositoryCustom;


public interface SequenceRepository extends MongoRepository<SequenceId, Long>, SequenceRepositoryCustom {
}
