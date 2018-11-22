package ru.dev4j.web.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.dev4j.model.DataType;
import ru.dev4j.model.ExchangeTuple;
import ru.dev4j.service.aggregation.split.Route;
import ru.dev4j.service.aggregation.split.SplitAggregator;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class SplitWebApi {

    @Autowired
    private SplitAggregator splitAggregator;

    @RequestMapping(value = "/api/v1/split/orderBook", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody
    List<Route> handleExchangeOrderBook(@RequestParam(name = "symbol") String symbol,
                                        @RequestParam(name = "ordQty") Double ordQty,
                                        @RequestParam(name = "price", required = false) Double price,
                                        @RequestParam(name = "side") String side) {
        if (side.toLowerCase().equals("buy")) {
            return splitAggregator.firstLevel(symbol, DataType.ASKS, ordQty, new BigDecimal(price));
        }
        if (side.toLowerCase().equals("sell")) {
            return splitAggregator.firstLevel(symbol, DataType.BIDS, ordQty, new BigDecimal(price));
        }
        return new ArrayList<>();
    }
}
