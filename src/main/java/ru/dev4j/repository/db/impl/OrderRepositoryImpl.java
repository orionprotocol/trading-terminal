package ru.dev4j.repository.db.impl;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import ru.dev4j.model.Broker;
import ru.dev4j.model.Order;
import ru.dev4j.repository.base.AbstractRepository;

import java.util.List;

public class OrderRepositoryImpl extends AbstractRepository implements OrderRepositoryCustom {

    @Override
    public List<Order> orderHistory(Long ordId, String symbol, Long startTime, Long endTime, Integer limit, Integer sort) {
        Query query = new Query(new Criteria().andOperator(Criteria.where("id").gte(ordId), Criteria.where("symbol").is(symbol),
                Criteria.where("time").gte(startTime), Criteria.where("time").lte(endTime))).limit(limit);
        query.fields().exclude("subOrders");
        if (sort == 0) {
            query.with(new Sort(new Sort.Order(Sort.Direction.DESC, "id")));
        }

        return mongoTemplate.find(query, Order.class);
    }
}
