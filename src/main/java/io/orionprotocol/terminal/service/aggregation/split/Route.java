package io.orionprotocol.terminal.service.aggregation.split;

import io.orionprotocol.terminal.model.Exchange;

public class Route {

    private String id;
    private String symbol;
    private Exchange exchange;
    private String price;
    private String subOrdQty;

    public Route(String symbol, Exchange exchange, String price, String subOrdQty) {
        this.symbol = symbol;
        this.exchange = exchange;
        this.price = price;
        this.subOrdQty = subOrdQty;
    }

    public Route(String symbol, Exchange exchange, String price) {
        this.symbol = symbol;
        this.exchange = exchange;
        this.price = price;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public Exchange getExchange() {
        return exchange;
    }

    public void setExchange(Exchange exchange) {
        this.exchange = exchange;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getSubOrdQty() {
        return subOrdQty;
    }

    public void setSubOrdQty(String subOrdQty) {
        this.subOrdQty = subOrdQty;
    }
}
