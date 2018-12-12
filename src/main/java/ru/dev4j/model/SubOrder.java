package ru.dev4j.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;

@Document
public class SubOrder {

    private String id;
    private String orderId;
    private Exchange exchange;
    private BigDecimal price;
    private BigDecimal subOrdQty;
    private BigDecimal fee;

    public SubOrder(String id, String orderId, Exchange exchange, BigDecimal price, BigDecimal subOrdQty, BigDecimal fee) {
        this.id = id;
        this.orderId = orderId;
        this.exchange = exchange;
        this.price = price;
        this.subOrdQty = subOrdQty;
        this.fee = fee;
    }

    public SubOrder() {
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Exchange getExchange() {
        return exchange;
    }

    public void setExchange(Exchange exchange) {
        this.exchange = exchange;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public BigDecimal getSubOrdQty() {
        return subOrdQty;
    }

    public void setSubOrdQty(BigDecimal subOrdQty) {
        this.subOrdQty = subOrdQty;
    }

    public BigDecimal getFee() {
        return fee;
    }

    public void setFee(BigDecimal fee) {
        this.fee = fee;
    }
}
