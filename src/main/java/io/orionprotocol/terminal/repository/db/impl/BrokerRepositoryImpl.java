package io.orionprotocol.terminal.repository.db.impl;

import io.orionprotocol.terminal.repository.base.AbstractRepository;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import io.orionprotocol.terminal.model.Broker;

public class BrokerRepositoryImpl extends AbstractRepository implements BrokerRepositoryCustom {

    @Override
    public Broker findByAddress(String address) {
        Query query = new Query();
        query.addCriteria(Criteria.where("address").is(address));
        return mongoTemplate.findOne(query, Broker.class);
    }
}
