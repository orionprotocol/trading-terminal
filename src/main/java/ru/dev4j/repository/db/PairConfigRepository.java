package ru.dev4j.repository.db;

import org.springframework.data.mongodb.repository.MongoRepository;
import ru.dev4j.model.PairConfig;
import ru.dev4j.repository.db.impl.PairConfigRepositoryCustom;

public interface PairConfigRepository extends PairConfigRepositoryCustom, MongoRepository<PairConfig, String> {
}
