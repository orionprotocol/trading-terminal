package io.orionprotocol.terminal.model;

import java.util.List;

public class ExchangeBalance {

    private Exchange exchange;
    private List<PairBalance> pairBalances;

    public Exchange getExchange() {
        return exchange;
    }


    public void setExchange(Exchange exchange) {
        this.exchange = exchange;
    }

    public List<PairBalance> getPairBalances() {
        return pairBalances;
    }

    public void setPairBalances(List<PairBalance> pairBalances) {
        this.pairBalances = pairBalances;
    }
}
