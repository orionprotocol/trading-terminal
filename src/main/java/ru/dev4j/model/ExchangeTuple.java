package ru.dev4j.model;

import java.math.BigDecimal;

public class ExchangeTuple {
    private BigDecimal price;
    private Double size;

    public ExchangeTuple(BigDecimal price, Double size) {

        this.price = price;
        this.size = size;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Double getSize() {
        return size;
    }

    public void setSize(Double size) {
        this.size = size;
    }
}
