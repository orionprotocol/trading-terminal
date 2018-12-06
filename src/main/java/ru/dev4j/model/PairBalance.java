package ru.dev4j.model;

public class PairBalance {
    private String pair;
    private String balance;

    public PairBalance() {
    }

    public PairBalance(String pair, String balance) {
        this.pair = pair;
        this.balance = balance;
    }

    public String getPair() {
        return pair;
    }

    public void setPair(String pair) {
        this.pair = pair;
    }

    public String getBalance() {
        return balance;
    }

    public void setBalance(String balance) {
        this.balance = balance;
    }
}
