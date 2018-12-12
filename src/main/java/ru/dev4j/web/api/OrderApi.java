package ru.dev4j.web.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.dev4j.model.Broker;
import ru.dev4j.model.Order;
import ru.dev4j.repository.db.OrderRepository;
import ru.dev4j.service.aggregation.order.OrderService;
import ru.dev4j.web.api.request.DeleteOrder;
import ru.dev4j.web.api.request.NewBroker;

import java.util.HashMap;
import java.util.Map;

@Controller
public class OrderApi {

    @Autowired
    private OrderService orderService;

    @RequestMapping(value = "/order", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody
    Map<String, Object> handleOrderBook(@RequestBody Order order) {
        return orderService.aggregateRoutes(order);
    }

    @RequestMapping(value = "/order", method = RequestMethod.DELETE)
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody
    Map<String, Object> deleteOrder(@RequestBody DeleteOrder deleteOrder) {
        return orderService.deleteOrder(deleteOrder.getOrdId());
    }
}
