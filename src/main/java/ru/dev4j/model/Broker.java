package ru.dev4j.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "Broker")
public class Broker {
    private String id;
    private String address;
    private String publicKey;
    private String callbackUrl;
    private String signature;
    private List<ExchangeBalance> exchangeBalances;
    private BrokerStatus status = BrokerStatus.NULL;


    public Broker(String address, String callbackUrl, BrokerStatus status) {
        this.address = address;
        this.callbackUrl = callbackUrl;
        this.status = status;
    }

    public List<ExchangeBalance> getExchangeBalances() {
        return exchangeBalances;
    }

    public void setExchangeBalances(List<ExchangeBalance> exchangeBalances) {
        this.exchangeBalances = exchangeBalances;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public BrokerStatus getStatus() {
        return status;
    }

    public void setStatus(BrokerStatus status) {
        this.status = status;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPublicKey() {
        return publicKey;
    }

    public void setPublicKey(String publicKey) {
        this.publicKey = publicKey;
    }

    public String getCallbackUrl() {
        return callbackUrl;
    }

    public void setCallbackUrl(String callbackUrl) {
        this.callbackUrl = callbackUrl;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

    public enum BrokerStatus {
        REGISTRED, NULL
    }
}
