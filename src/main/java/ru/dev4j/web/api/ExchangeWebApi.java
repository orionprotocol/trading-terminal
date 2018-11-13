package ru.dev4j.web.api;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.dev4j.model.ExchangeTuple;
import ru.dev4j.service.aggregation.FirstAggregator;

import javax.servlet.http.HttpServletRequest;
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
    Map<String, List<ExchangeTuple>> handleDeal(@RequestParam(name = "symbol") String symbol, @RequestParam(name = "depth") Integer depth) {
        if (symbol.equals("ETHBTC")) {
            Map<String, List<ExchangeTuple>> response = firstAggregator.aggregateAsksAndBids(symbol, depth);
            return response;
        }
        return new HashMap<>();
    }

}
