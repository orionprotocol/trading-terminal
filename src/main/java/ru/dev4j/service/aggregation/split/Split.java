package ru.dev4j.service.aggregation.split;

import ru.dev4j.model.Exchange;

import java.math.BigDecimal;

public class Split {
    private BigDecimal price;
    private BigDecimal size;
    private Exchange exchange;

    public
    Split(BigDecimal price, BigDecimal size, Exchange exchange) {
        this.price = price;
        this.size = size;
        this.exchange = exchange;
    }

    public
    Split(BigDecimal price, Exchange exchange) {
        this.price = price;
        this.exchange = exchange;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public BigDecimal getSize() {
        return size;
    }

    public void setSize(BigDecimal size) {
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
