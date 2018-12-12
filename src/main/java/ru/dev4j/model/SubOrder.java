package ru.dev4j.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.util.List;

@Document
public class SubOrder {

    private Long id;
    private Long orderId;
    private Exchange exchange;
    private BigDecimal price;
    private BigDecimal subOrdQty;
    private BigDecimal fee;
    private Boolean reserved;
    private String brokerId;
    private List<Trade> trades;

    public SubOrder(Long id, Long orderId, Exchange exchange, BigDecimal price, BigDecimal subOrdQty, BigDecimal fee) {
        this.id = id;
        this.orderId = orderId;
        this.exchange = exchange;
        this.price = price;
        this.subOrdQty = subOrdQty;
        this.fee = fee;
    }

    public String getBrokerId() {
        return brokerId;
    }

    public void setBrokerId(String brokerId) {
        this.brokerId = brokerId;
    }

    public Boolean getReserved() {
        return reserved;
    }

    public void setReserved(Boolean reserved) {
        this.reserved = reserved;
    }

    public SubOrder() {
    }

    public List<Trade> getTrades() {
        return trades;
    }

    public void setTrades(List<Trade> trades) {
        this.trades = trades;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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
