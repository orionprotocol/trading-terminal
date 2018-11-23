package ru.dev4j.web.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.dev4j.model.DataType;
import ru.dev4j.model.ExchangeTuple;
import ru.dev4j.service.aggregation.split.BalanceSplitAggregator;
import ru.dev4j.service.aggregation.split.Route;
import ru.dev4j.service.aggregation.split.SplitAggregator;
import ru.dev4j.service.aggregation.split.SplitUtils;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class SplitWebApi {

    @Autowired
    private SplitAggregator splitAggregator;

    @Autowired
    private BalanceSplitAggregator balanceSplitAggregator;

    @RequestMapping(value = "/api/v1/split/orderBook", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody
    List<Route> handleExchangeOrderBook(@RequestParam(name = "symbol") String symbol,
                                        @RequestParam(name = "ordQty") Double ordQty,
                                        @RequestParam(name = "price", required = false) Double price,
                                        @RequestParam(name = "side") String side) {
        if (side.toLowerCase().equals("buy")) {
            if (price == null) {
                price = SplitUtils.maxValue().getKey().doubleValue();
            }
            return splitAggregator.firstLevel(symbol, DataType.ASKS, ordQty, new BigDecimal(price));
        }
        if (side.toLowerCase().equals("sell")) {
            if (price == null) {
                price = SplitUtils.minValue().getKey().doubleValue();
            }
            return splitAggregator.firstLevel(symbol, DataType.BIDS, ordQty, new BigDecimal(price));
        }
        return new ArrayList<>();
    }

    @RequestMapping(value = "/api/v1/split-balance/orderBook", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody
    Map<String, Object> handleExchangeBalanceOrderBook(@RequestParam(name = "symbol") String symbol,
                                                       @RequestParam(name = "ordQty") BigDecimal ordQty,
                                                       @RequestParam(name = "price", required = false) BigDecimal price,
                                                       @RequestParam(name = "side") String side,
                                                       @RequestParam(name = "binanceBalance", required = false) BigDecimal binanceBalance,
                                                       @RequestParam(name = "bittrexBalance", required = false) BigDecimal bittrexBalance,
                                                       @RequestParam(name = "poloniexBalance", required = false) BigDecimal poloniexBalance) {
        if (binanceBalance == null) {
            binanceBalance = new BigDecimal(Double.MAX_VALUE);
        }
        if (bittrexBalance == null) {
            bittrexBalance = new BigDecimal(Double.MAX_VALUE);
        }
        if (poloniexBalance == null) {
            poloniexBalance = new BigDecimal(Double.MAX_VALUE);
        }
        if (side.toLowerCase().equals("buy")) {
            if (price == null) {
                price = SplitUtils.maxValue().getKey();
            }
            return balanceSplitAggregator.secondLevel(symbol, price, DataType.ASKS, ordQty, binanceBalance, bittrexBalance, poloniexBalance);
        }
        if (side.toLowerCase().equals("sell")) {
            if (price == null) {
                price = SplitUtils.minValue().getKey();
            }
            return balanceSplitAggregator.secondLevel(symbol, price, DataType.BIDS, ordQty, binanceBalance, bittrexBalance, poloniexBalance);
        }
        return new HashMap<>();
    }
}
