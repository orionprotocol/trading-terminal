package ru.dev4j.repository.db.impl;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import ru.dev4j.model.PairConfig;
import ru.dev4j.repository.base.AbstractRepository;

public class PairConfigRepositoryImpl extends AbstractRepository implements PairConfigRepositoryCustom {

    @Override
    public PairConfig findByExchange(String exchange) {
        Query query = new Query();
        query.addCriteria(Criteria.where("exchange").is(exchange));
        return mongoTemplate.findOne(query, PairConfig.class);
    }
}
