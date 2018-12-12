package ru.dev4j.service.aggregation.order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.dev4j.model.*;
import ru.dev4j.repository.db.BrokerRepository;
import ru.dev4j.repository.db.OrderRepository;
import ru.dev4j.service.aggregation.split.Route;
import ru.dev4j.service.aggregation.split.service.BalanceSplitAggregator;

import java.math.BigDecimal;
import java.util.*;

@Service
public class OrderService {

    @Autowired
    private BrokerRepository brokerRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private BalanceSplitAggregator balanceSplitAggregator;

    public Map<String,Object> deleteOrder(String ordId) {
        Order order = orderRepository.findOne(ordId);
        Map<String,Object> response = new HashMap<>();
        response.put("symbol",order.getSymbol());
        response.put("ordId",order.getId());
        response.put("clientOrdId",order.getClientOrderId());
        response.put("txTime",null);
        response.put("price",order.getPrice());
        response.put("ordQty",order.getOrderQty());
        response.put("filledQty",order.getFilledQty());
        response.put("status","CANCELED");
        response.put("type",order.getOrdType());
        response.put("side",order.getSide());

        orderRepository.delete(ordId);
        return response;
    }

    public Map<String, Object> aggregateRoutes(Order order) {


        String symbol[] = order.getSymbol().split(":");

        Broker broker = brokerRepository.findByAddress(order.getClientId());
        DataType dataType = DataType.ASKS;
        String balanceSymbol = symbol[1].toLowerCase();
        if (order.getSide().toLowerCase().equals("sell")) {
            dataType = DataType.BIDS;
            balanceSymbol = symbol[0].toLowerCase();
        }
        Map<Exchange, BigDecimal> balances = chooseSymbolBalance(broker, balanceSymbol);

        Long startTime = System.currentTimeMillis();
        Map<String, Object> routes = balanceSplitAggregator.secondLevel(order.getSymbol(), new BigDecimal(order.getPrice()), dataType, new BigDecimal(order.getOrderQty()),
                balances.get(Exchange.BINANCE), balances.get(Exchange.BITTREX), balances.get(Exchange.POLONIEX));

        Long time = System.currentTimeMillis() - startTime;

        order.setStatus("NEW");
        orderRepository.save(order);

        List<SubOrder> subOrders = getSubOrders((List<Route>) routes.get("routes"), order);
        order.setSubOrders(subOrders);
        orderRepository.save(order);

        routes.get(Exchange.BINANCE);

        Map<String, Object> response = new HashMap<>();
        response.put("symbol", order.getSymbol());
        response.put("orderId", order.getId());
        response.put("clientOrdId", order.getClientId());
        response.put("time", time);
        response.put("price", order.getPrice());
        response.put("ordQty", order.getOrderQty());
        response.put("filledQty", order.getFilledQty());
        response.put("status", order.getStatus());
        response.put("ordType", order.getOrdType());
        response.put("side", order.getSide());
        response.put("subOrders", order.getSubOrders());

        return response;
    }

    private Map<Exchange, BigDecimal> chooseSymbolBalance(Broker broker, String balanceSymbol) {

        Map<Exchange, BigDecimal> response = new HashMap<>();
        for (ExchangeBalance exchangeBalance : broker.getExchangeBalances()) {
            Exchange exchange = Exchange.BINANCE;
            switch (exchangeBalance.getExchange()) {
                case POLONIEX:
                    exchange = Exchange.POLONIEX;
                    break;
                case BITTREX:
                    exchange = Exchange.BITTREX;
                    break;
                case BINANCE:
                    exchange = Exchange.BINANCE;
                    break;
            }
            BigDecimal balance = findExchangeSymbolBalance(exchangeBalance.getPairBalances(), balanceSymbol);
            response.put(exchange, balance);
        }
        return response;
    }

    private BigDecimal findExchangeSymbolBalance(List<PairBalance> pairBalances, String balanceSymbol) {
        for (PairBalance pairBalance : pairBalances) {
            if (pairBalance.getSymbol().toLowerCase().equals(balanceSymbol)) {
                return new BigDecimal(pairBalance.getBalance());
            }
        }
        return BigDecimal.ZERO;
    }

    private List<SubOrder> getSubOrders(List<Route> routes, Order order) {
        UUID uuid = UUID.randomUUID();
        List<SubOrder> subOrders = new ArrayList<>();
        for (Route route : routes) {
            SubOrder subOrder = mapToSubOrder(route, order,uuid.toString());
            subOrders.add(subOrder);
        }

        return subOrders;
    }

    private SubOrder mapToSubOrder(Route route, Order order,String subOrdId) {
        return new SubOrder(subOrdId,order.getId(), route.getExchange(), new BigDecimal(route.getPrice()), new BigDecimal(route.getSubOrdQty()), null);
    }

}
