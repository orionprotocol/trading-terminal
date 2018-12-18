package ru.dev4j.service.pair;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.dev4j.model.Pair;
import ru.dev4j.model.PairConfig;
import ru.dev4j.repository.db.PairConfigRepository;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Service
public class PairService {

    @Autowired
    private PairConfigRepository pairConfigRepository;

    private static final String BINANCE = "BINANCE";
    private static final String POLONIEX = "POLONIEX";
    private static final String BITTREX = "BITTREX";


    public List<String> allPairs() {
        PairConfig binanceConfig = pairConfigRepository.findByExchange(BINANCE);
        PairConfig poloniexConfig = pairConfigRepository.findByExchange(POLONIEX);
        PairConfig bittrexConfig = pairConfigRepository.findByExchange(BITTREX);

        HashSet<String> pairs = new HashSet<>();

        for (Pair pair : binanceConfig.getPair()) {
            pairs.add(pair.getGeneralName());
        }

        for (Pair pair : poloniexConfig.getPair()) {
            pairs.add(pair.getGeneralName());
        }

        for (Pair pair : bittrexConfig.getPair()) {
            pairs.add(pair.getGeneralName());
        }

        return new ArrayList<>(pairs);
    }
}
