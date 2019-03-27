package io.orionprotocol.terminal.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document
public class SubOrder {

    private Long id;
    private Long orderId;
    private Exchange exchange;
    private Double price;
    private Double subOrdQty;
    private Double fee;
    private Boolean reserved = false;
    private String brokerId;
    private String status;
    private List<Trade> trades = new ArrayList<>();

    public SubOrder(Long id, Long orderId, Exchange exchange, Double price, Double subOrdQty, Double fee) {
        this.id = id;
        this.orderId = orderId;
        this.exchange = exchange;
        this.price = price;
        this.subOrdQty = subOrdQty;
        this.fee = fee;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getSubOrdQty() {
        return subOrdQty;
    }

    public void setSubOrdQty(Double subOrdQty) {
        this.subOrdQty = subOrdQty;
    }

    public Double getFee() {
        return fee;
    }

    public void setFee(Double fee) {
        this.fee = fee;
    }

    public double getSpentQty() {
        return 0.0;
    }
}
