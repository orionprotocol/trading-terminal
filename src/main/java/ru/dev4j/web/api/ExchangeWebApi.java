package ru.dev4j.web.api;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import redis.clients.jedis.Tuple;
import ru.dev4j.model.Exchange;
import ru.dev4j.model.ExchangeTuple;
import ru.dev4j.service.aggregation.FirstAggregator;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class ExchangeWebApi {

    @Autowired
    private FirstAggregator firstAggregator;

    @RequestMapping(value = "/api/v1/orderBook", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody
    Map<String, List<ExchangeTuple>> handleOrderBook(@RequestParam(name = "symbol") String symbol, @RequestParam(name = "depth") Integer depth) {
        Map<String, List<ExchangeTuple>> response = firstAggregator.aggregateAsksAndBids(symbol, depth);
        return response;
    }

    @RequestMapping(value = "/api/v1/exchange/orderBook", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody
    Map<String, List<ExchangeTuple>> handleExchangeOrderBook(@RequestParam(name = "symbol") String symbol,
                                                             @RequestParam(name = "exchange") String exchange, @RequestParam(name = "depth") Integer depth) {
        if (exchange.equals(Exchange.BINANCE.name())) {
            return firstAggregator.aggregateAsksAndBidsForExchange(symbol, depth, Exchange.BINANCE);
        }
        if (exchange.equals(Exchange.POLONIEX.name())) {
            return firstAggregator.aggregateAsksAndBidsForExchange(symbol, depth, Exchange.POLONIEX);
        }
        if (exchange.equals(Exchange.BITTREX.name())) {
            return firstAggregator.aggregateAsksAndBidsForExchange(symbol, depth, Exchange.BITTREX);
        }

        return new HashMap<>();
    }






    @RequestMapping(value = "/testmap", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody
    Map<BigDecimal, Double> handleTestMap() {
        Map<BigDecimal, Double> map = new HashMap<>();
        map.put(new BigDecimal(0.00031), 2132D);
        map.put(new BigDecimal(0.001231), 1112D);
        map.put(new BigDecimal(0.211231), 10D);

        return map;
    }
}
