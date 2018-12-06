package ru.dev4j.repository.db.impl;

import ru.dev4j.model.Broker;

public interface BrokerRepositoryCustom  {
    Broker findByAddress(String address);
}
