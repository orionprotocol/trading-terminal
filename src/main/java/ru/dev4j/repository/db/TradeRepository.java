package ru.dev4j.repository.db;

import org.springframework.data.mongodb.repository.MongoRepository;
import ru.dev4j.model.PairConfig;
import ru.dev4j.model.Trade;
import ru.dev4j.repository.db.impl.PairConfigRepositoryCustom;
import ru.dev4j.repository.db.impl.TradeRepositoryCustom;

public interface TradeRepository extends TradeRepositoryCustom, MongoRepository<Trade, String> {

}
