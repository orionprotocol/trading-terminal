package io.orionprotocol.terminal.repository.db.impl;

import io.orionprotocol.terminal.repository.base.AbstractRepository;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import io.orionprotocol.terminal.model.Order;

import java.util.List;

public class OrderRepositoryImpl extends AbstractRepository implements OrderRepositoryCustom {

    @Override
    public List<Order> orderHistory(Long ordId, String symbol, Long startTime, Long endTime, Integer limit, Integer sort, String clientId) {
        Query query = new Query(new Criteria().andOperator(Criteria.where("id").gte(ordId), Criteria.where("symbol").is(symbol),
                Criteria.where("time").gte(startTime), Criteria.where("time").lte(endTime), Criteria.where("clientId").is(clientId))).limit(limit);
        if (sort == 0) {
            query.with(new Sort(new Sort.Order(Sort.Direction.DESC, "id")));
        }
        return mongoTemplate.find(query, Order.class);
    }
}
