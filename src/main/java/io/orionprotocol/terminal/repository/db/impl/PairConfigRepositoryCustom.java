package io.orionprotocol.terminal.repository.db.impl;

import io.orionprotocol.terminal.model.PairConfig;

public interface PairConfigRepositoryCustom {

    PairConfig findByExchange(String exchange);
}
