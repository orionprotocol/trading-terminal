package io.orionprotocol.terminal.model;

import java.util.HashSet;
import java.util.Set;

public class SizeExchange {
    private Double size;
    private Set<String> exchanges = new HashSet<>();

    public SizeExchange(Double size) {
        this.size = size;
    }

    public SizeExchange() {

    }

    public Double getSize() {
        return size;
    }

    public void setSize(Double size) {
        this.size = size;
    }

    public Set<String> getExchanges() {
        return exchanges;
    }

    public void setExchanges(Set<String> exchanges) {
        this.exchanges = exchanges;
    }
}
