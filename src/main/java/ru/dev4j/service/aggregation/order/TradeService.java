package ru.dev4j.service.aggregation.order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.dev4j.model.Order;
import ru.dev4j.model.SubOrder;
import ru.dev4j.model.Trade;
import ru.dev4j.repository.db.OrderRepository;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TradeService {

    @Autowired
    private OrderRepository orderRepository;

    public Map<String, Object> handleNewTrade(Trade trade) {
        Map<String, Object> response = new HashMap<>();
        Order order = orderRepository.findOne(trade.getOrdId());
        SubOrder subOrder = getSubOrder(order, trade);
        subOrder.getTrades().add(trade);
        //TODO:validation for price from telegram chat
        BigDecimal filledQty = order.getFilledQty().add(new BigDecimal(trade.getQty()));
        order.setFilledQty(filledQty);
        order.setUpdateTime(System.currentTimeMillis());
        order.setStatus("PARTIALLY_FILLED");
        orderRepository.save(order);

        response.put("ordId", order.getId());
        response.put("subOrdId", subOrder.getId());
        response.put("exchange", subOrder.getExchange().name());
        response.put("price", subOrder.getPrice());
        response.put("subOrdQty", subOrder.getSubOrdQty());
        response.put("filledQty", order.getFilledQty());
        response.put("status", order.getStatus());

        return response;

    }

    private SubOrder getSubOrder(Order order, Trade trade) {
        List<SubOrder> subOrders = order.getSubOrders();
        for (SubOrder subOrder : subOrders) {
            if (subOrder.getId().equals(trade.getSubOrdId())) {
                return subOrder;
            }
        }
        return null;
    }
}
