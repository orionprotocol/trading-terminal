package ru.dev4j.repository.db;


import org.springframework.data.mongodb.repository.MongoRepository;
import ru.dev4j.model.Broker;
import ru.dev4j.model.Order;

public interface OrderRepository extends MongoRepository<Order, String> {
}
