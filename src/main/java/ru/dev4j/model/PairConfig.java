package ru.dev4j.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "PairConfig")
public class PairConfig {

    @Id
    private String id;
    private String exchange;
    private List<Pair> pair;

    public void setPair(List<Pair> pair) {
        this.pair = pair;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getExchange() {
        return exchange;
    }

    public void setExchange(String exchange) {
        this.exchange = exchange;
    }

    public List<Pair> getPair() {
        return pair;
    }
}
