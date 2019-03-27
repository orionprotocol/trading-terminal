package io.orionprotocol.terminal.web.api;

import io.orionprotocol.terminal.service.aggregation.split.service.OrderBenefitsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
public class OrderBenefitsApi {

    @Autowired
    private OrderBenefitsService orderBenefitsService;

    @RequestMapping(value = "/order-benefits", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody
    Map<String, Object> orderStatus(@RequestParam(name = "symbol") String symbol,
                                    @RequestParam(name = "ordQty") Double ordQty,
                                    @RequestParam(name = "side") String side) {

        return orderBenefitsService.orderBenefits(symbol, ordQty, side);

    }


}
