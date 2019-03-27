package io.orionprotocol.terminal.service.aggregation.split;

import io.orionprotocol.terminal.model.Exchange;

public class Split {
    private Double price;
    private Double size;
    private Exchange exchange;

    public
    Split(Double price, Double size, Exchange exchange) {
        this.price = price;
        this.size = size;
        this.exchange = exchange;
    }

    public Split(Double price, Exchange exchange) {
        this.price = price;
        this.exchange = exchange;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getSize() {
        return size;
    }

    public void setSize(Double size) {
        this.size = size;
    }

    public Exchange getExchange() {
        return exchange;
    }

    public void setExchange(Exchange exchange) {
        this.exchange = exchange;
    }

    @Override
    public String toString() {
        return "Split{" +
                "price=" + price +
                ", size=" + size +
                ", exchange=" + exchange +
                '}';
    }
}
