package ru.dev4j.model;

public enum Exchange {
    POLONIEX, BINANCE, BITTREX;

    public String getId() {
        return this.name().toLowerCase();
    }
}
