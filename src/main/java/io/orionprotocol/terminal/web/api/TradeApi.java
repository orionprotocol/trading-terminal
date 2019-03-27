package io.orionprotocol.terminal.web.api;

import io.orionprotocol.terminal.model.Trade;
import io.orionprotocol.terminal.service.aggregation.order.TradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
