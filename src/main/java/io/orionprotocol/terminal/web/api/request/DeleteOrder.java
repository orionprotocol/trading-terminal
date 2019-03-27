package io.orionprotocol.terminal.web.api.request;

public class DeleteOrder {
    private String symbol;
    private Long ordId;
    private String clientOrdId;

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public Long getOrdId() {
        return ordId;
    }

    public void setOrdId(Long ordId) {
        this.ordId = ordId;
    }

    public String getClientOrdId() {
        return clientOrdId;
    }

    public void setClientOrdId(String clientOrdId) {
        this.clientOrdId = clientOrdId;
    }
}
