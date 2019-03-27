package io.orionprotocol.terminal.repository.db.impl;

import io.orionprotocol.terminal.repository.base.AbstractRepository;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import io.orionprotocol.terminal.model.PairConfig;

public class PairConfigRepositoryImpl extends AbstractRepository implements PairConfigRepositoryCustom {

    @Override
    public PairConfig findByExchange(String exchange) {
        Query query = new Query();
        query.addCriteria(Criteria.where("exchange").is(exchange));
        return mongoTemplate.findOne(query, PairConfig.class);
    }
}
