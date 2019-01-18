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
    private static final DecimalFormat df10 = new DecimalFormat("#.##########");


    public Map<String, Object> orderBenefits(String pair,
                                             Double ordQty, String side) {
        List<Split> totalLevels = new ArrayList<>();
        List<Split> binanaceLevels = new ArrayList<>();
        List<Split> bittrexLevels = new ArrayList<>();
        List<Split> poloniexLevels = new ArrayList<>();

        String type = "";
        if (side.equals("buy")) {
            splitAggregator.aggregateAsks(pair, ordQty, new BigDecimal(Double.MAX_VALUE), totalLevels);
            type = "asks";
        }
        if (side.equals("sell")) {
            splitAggregator.aggregateBids(pair, new BigDecimal(0), ordQty, totalLevels);
            type = "bids";
        }
        splitAggregator.aggregateExchangeLevel(pair, ordQty, binanaceLevels, Exchange.BINANCE, type);
        splitAggregator.aggregateExchangeLevel(pair, ordQty, bittrexLevels, Exchange.BITTREX, type);
        splitAggregator.aggregateExchangeLevel(pair, ordQty, poloniexLevels, Exchange.POLONIEX, type);

        System.out.println("TOTAL LEVELS");
        System.out.println(Arrays.toString(totalLevels.toArray()));

        System.out.println("BINANCE LEVELS");
        System.out.println(Arrays.toString(binanaceLevels.toArray()));

        System.out.println("BITTREX LEVELS");
        System.out.println(Arrays.toString(bittrexLevels.toArray()));

        System.out.println("POLONIEX LEVELS");
        System.out.println(Arrays.toString(poloniexLevels.toArray()));


        Double totalCostLevels = totalLevels.stream().mapToDouble(split -> split.getPrice().doubleValue() * split.getSize().doubleValue()).sum();

        Double totalCostBinance = binanaceLevels.stream().mapToDouble(split -> split.getPrice().doubleValue() * split.getSize().doubleValue()).sum();

        Double totalCostBittrex = bittrexLevels.stream().mapToDouble(split -> split.getPrice().doubleValue() * split.getSize().doubleValue()).sum();

        Double totalCostPoloniex = poloniexLevels.stream().mapToDouble(split -> split.getPrice().doubleValue() * split.getSize().doubleValue()).sum();


        Map<String, Object> response = new HashMap<>();

        response.put(Exchange.BINANCE.name().toLowerCase(), calculateBenefits(totalCostLevels, totalCostBinance));
        response.put(Exchange.BITTREX.name().toLowerCase(), calculateBenefits(totalCostLevels, totalCostBittrex));
        response.put(Exchange.POLONIEX.name().toLowerCase(), calculateBenefits(totalCostLevels, totalCostPoloniex));

        return response;
    }

    Map<String, String> calculateBenefits(Double totalCost, Double totalCostExchange) {

        Double benefitBtcDouble = totalCostExchange - totalCost;

        BigDecimal benefitPct = new BigDecimal(benefitBtcDouble / (totalCost * 100));

        BigDecimal benefitBtc = new BigDecimal(benefitBtcDouble);

        Map<String, String> response = new HashMap<>();
        response.put("benefitBtc", df10.format(benefitBtc));
        response.put("benefitPct", df2.format(benefitPct));

        return response;
    }
}
