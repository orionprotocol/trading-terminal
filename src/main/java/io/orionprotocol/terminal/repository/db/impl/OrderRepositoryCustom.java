package io.orionprotocol.terminal.repository.db.impl;

import io.orionprotocol.terminal.model.Order;

import java.util.List;

public interface OrderRepositoryCustom {

    List<Order> orderHistory(Long ordId, String symbol, Long startTime, Long endTime, Integer limit,Integer sort, String clientId);
}
