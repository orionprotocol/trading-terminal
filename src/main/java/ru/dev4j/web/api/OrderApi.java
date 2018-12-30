package ru.dev4j.web.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.dev4j.model.Broker;
import ru.dev4j.model.Order;
import ru.dev4j.model.exceptions.SubOrderException;
import ru.dev4j.repository.db.OrderRepository;
import ru.dev4j.service.aggregation.order.OrderService;
import ru.dev4j.web.api.request.DeleteOrder;
import ru.dev4j.web.api.request.NewBroker;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class OrderApi {

    @Autowired
    private OrderService orderService;

    @RequestMapping(value = "/order", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody
    Map<String, Object> handleOrderBook(@RequestBody Order order) {
        try {
            return orderService.aggregateRoutes(order);
        } catch (SubOrderException e) {
            Map<String,Object> response = new HashMap<>();
            response.put("code","1010");
            return response;
        }
    }

    @RequestMapping(value = "/order", method = RequestMethod.DELETE)
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody
    Map<String, Object> deleteOrder(@RequestBody DeleteOrder deleteOrder) {
        return orderService.deleteOrder(deleteOrder.getOrdId(), deleteOrder.getClientOrdId());
    }

    @RequestMapping(value = "/order", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody
    Order orderStatus(@RequestParam(name = "symbol") String symbol, @RequestParam(name = "orderId") Long ordId,
                      @RequestParam(name = "clientOrdId", required = false) String clientOrdId) {
        return orderService.getOrderInfo(ordId);
    }

    @RequestMapping(value = "/orderHistory", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody
    List<Order> orderStatus(@RequestParam(name = "symbol") String symbol, @RequestParam(name = "ordId", required = false) Long ordId,
                            @RequestParam(name = "startTime", required = false) Long startTime,
                            @RequestParam(name = "endTime", required = false) Long endTime,
                            @RequestParam(name = "limit", defaultValue = "500", required = false) Integer limit) {
        return orderService.orderHistory(ordId, symbol, startTime, endTime, limit);
    }
}
