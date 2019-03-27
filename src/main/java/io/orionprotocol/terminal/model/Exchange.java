package io.orionprotocol.terminal.model;

public enum Exchange {
    POLONIEX, BINANCE, BITTREX;

    public String getId() {
        return this.name().toLowerCase();
    }
}
