package ru.dev4j.service.aggregation.split.service;

import com.github.ccob.bittrex4j.dao.Balance;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.dev4j.model.DataType;
import ru.dev4j.model.Exchange;
import ru.dev4j.service.aggregation.split.Split;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.*;

@Service
public class OrderBenefitsService {

    @Autowired
    private SplitAggregator splitAggregator;

    private static final DecimalFormat df2 = new DecimalFormat("#.#####");
    private static final DecimalFormat df10 = new DecimalFormat("#.########");


    public Map<String, Object> orderBenefits(String pair, Double ordQty, String side) {
        List<Split> totalLevels = null;
        List<Split> binanaceLevels = null;
        List<Split> bittrexLevels = null;
        List<Split> poloniexLevels = null;

        String type = "";
        if (side.equals("buy")) {
            totalLevels = splitAggregator.aggregateAsks(pair, ordQty, Double.MAX_VALUE);
            type = "asks";
        }
        if (side.equals("sell")) {
            totalLevels = splitAggregator.aggregateBids(pair, 0D, ordQty);
            type = "bids";
        }
        binanaceLevels = splitAggregator.aggregateExchangeLevel(pair, ordQty, Exchange.BINANCE, type);
        bittrexLevels = splitAggregator.aggregateExchangeLevel(pair, ordQty, Exchange.BITTREX, type);
        poloniexLevels = splitAggregator.aggregateExchangeLevel(pair, ordQty, Exchange.POLONIEX, type);

        System.out.println("TOTAL LEVEL " + totalLevels.size());
        System.out.println("BINANCE LEVELS " + binanaceLevels.size());
        System.out.println("BITTREX LEVELS " + bittrexLevels.size());
        System.out.println("POLONIEX LEVELS " + poloniexLevels.size());

        Double totalCostLevels = totalLevels.stream()
                .mapToDouble(l -> l.getPrice()).max().orElse(0.0) * ordQty;

        Double totalCostBinance = binanaceLevels.stream()
                .mapToDouble(l -> l.getPrice()).max().orElse(0.0) * ordQty;

        Double totalCostBittrex = bittrexLevels.stream()
                .mapToDouble(l -> l.getPrice()).max().orElse(0.0) * ordQty;

        Double totalCostPoloniex = poloniexLevels.stream()
                .mapToDouble(l -> l.getPrice()).max().orElse(0.0) * ordQty;


        Map<String, Object> response = new HashMap<>();

        response.put(Exchange.BINANCE.name().toLowerCase(), calculateBenefits(totalCostLevels, totalCostBinance));
        response.put(Exchange.BITTREX.name().toLowerCase(), calculateBenefits(totalCostLevels, totalCostBittrex));
        response.put(Exchange.POLONIEX.name().toLowerCase(), calculateBenefits(totalCostLevels, totalCostPoloniex));


        return response;
    }

    private Map<String, String> calculateBenefits(Double totalCost, Double totalCostExchange) {

        double benefitBtcDouble = Double.max(0.0, totalCostExchange - totalCost);

        BigDecimal benefitPct = new BigDecimal(benefitBtcDouble * 100 / totalCost);

        BigDecimal benefitBtc = new BigDecimal(benefitBtcDouble);

        Map<String, String> response = new HashMap<>();
        response.put("benefitBtc", df10.format(benefitBtc));
        response.put("benefitPct", df2.format(benefitPct));

        return response;
    }
}
