package ru.dev4j.web.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.dev4j.model.Trade;
import ru.dev4j.service.aggregation.order.TradeService;

import java.util.Map;

@Controller
public class TradeApi {

    @Autowired
    private TradeService tradeService;

    @RequestMapping(value = "/trade", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody
    Map<String, Object> handleNewTrade(@RequestBody Trade trade) {
        return tradeService.handleNewTrade(trade);
    }

}
