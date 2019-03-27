package io.orionprotocol.terminal.repository.db;


import io.orionprotocol.terminal.repository.db.impl.OrderRepositoryCustom;
import org.springframework.data.mongodb.repository.MongoRepository;
import io.orionprotocol.terminal.model.Order;

public interface OrderRepository extends OrderRepositoryCustom, MongoRepository<Order, Long> {
}
