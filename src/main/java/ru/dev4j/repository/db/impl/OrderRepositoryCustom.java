package ru.dev4j.repository.db.impl;

import ru.dev4j.model.Order;

import java.util.List;

public interface OrderRepositoryCustom {

    List<Order> orderHistory(Long ordId, String symbol, Long startTime, Long endTime, Integer limit,Integer sort, String clientId);
}
