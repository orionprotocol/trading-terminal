package ru.dev4j.model;

public class ExchangeTuple {
    private String price;
    private Double size;

    public ExchangeTuple(String price, Double size) {
        this.price = price;
        this.size = size;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public Double getSize() {
        return size;
    }

    public void setSize(Double size) {
        this.size = size;
    }
}
