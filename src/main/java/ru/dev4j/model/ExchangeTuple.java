package ru.dev4j.model;

import java.math.BigDecimal;
import java.util.List;

public class ExchangeTuple {
    private Double price;
    private Double size;
    private List<String> exchanges;

    public List<String> getExchanges() {
        return exchanges;
    }

    public void setExchanges(List<String> exchanges) {
        this.exchanges = exchanges;
    }

    public ExchangeTuple(Double price, Double size, List<String> exchanges) {
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
}
