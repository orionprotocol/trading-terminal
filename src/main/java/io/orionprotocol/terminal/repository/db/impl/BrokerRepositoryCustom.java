package io.orionprotocol.terminal.repository.db.impl;

import io.orionprotocol.terminal.model.Broker;

public interface BrokerRepositoryCustom  {
    Broker findByAddress(String address);
}
