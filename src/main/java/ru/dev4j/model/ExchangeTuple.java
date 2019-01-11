package ru.dev4j.model;

import java.math.BigDecimal;
import java.util.List;

public class ExchangeTuple {
    private BigDecimal price;
    private Double size;
    private List<String> exchanges;

    public List<String> getExchanges() {
        return exchanges;
    }

    public void setExchanges(List<String> exchanges) {
        this.exchanges = exchanges;
    }

    public ExchangeTuple(BigDecimal price, Double size, List<String> exchanges) {
        this.price = price;
        this.size = size;
        this.exchanges = exchanges;
    }

    @Override
    public String toString() {
        return "{price=" + price +
                ", size=" + size +
                '}';
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
