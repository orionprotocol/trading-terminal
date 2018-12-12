package ru.dev4j.web.api.request;

public class DeleteOrder {
    private String symbol;
    private String ordId;
    private String clientOrdId;

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getOrdId() {
        return ordId;
    }

    public void setOrdId(String ordId) {
        this.ordId = ordId;
    }

    public String getClientOrdId() {
        return clientOrdId;
    }

    public void setClientOrdId(String clientOrdId) {
        this.clientOrdId = clientOrdId;
    }
}
