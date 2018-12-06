package ru.dev4j.repository.db.impl;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import ru.dev4j.model.Broker;
import ru.dev4j.model.PairConfig;
import ru.dev4j.repository.base.AbstractRepository;

public class BrokerRepositoryImpl extends AbstractRepository implements BrokerRepositoryCustom {

    @Override
    public Broker findByAddress(String address) {
        Query query = new Query();
        query.addCriteria(Criteria.where("address").is(address));
        return mongoTemplate.findOne(query, Broker.class);
    }
}
