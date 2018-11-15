package ru.dev4j.repository.db.impl;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import ru.dev4j.model.PairConfig;

public interface PairConfigRepositoryCustom {

    PairConfig findByExchange(String exchange);
}
