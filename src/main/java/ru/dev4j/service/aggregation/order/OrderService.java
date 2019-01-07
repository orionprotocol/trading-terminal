package ru.dev4j.service.aggregation.order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.dev4j.model.*;
import ru.dev4j.model.exceptions.SubOrderException;
import ru.dev4j.repository.db.BrokerRepository;
import ru.dev4j.repository.db.OrderRepository;
import ru.dev4j.repository.db.SequenceRepository;
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

    @Autowired
    private SequenceRepository sequenceRepository;

    @Autowired
    private OrderHttpService orderHttpService;

    public Map<String, Object> deleteOrder(Long ordId, String clientOrdId) {
        Order order = orderRepository.findOne(ordId);
        order.setStatus("CANCELED");

        for (SubOrder subOrder : order.getSubOrders()) {
            Broker broker = brokerRepository.findOne(subOrder.getBrokerId());
            Boolean sent = orderHttpService.deleteOrderInfo(subOrder, order, broker);
            if (!sent) {
                brokerRepository.delete(broker.getId());
            }
        }

        Map<String, Object> response = new HashMap<>();
        response.put("symbol", order.getSymbol());
        response.put("ordId", order.getId());
        response.put("clientOrdId", order.getClientOrderId());
        response.put("txTime", null);
        response.put("price", order.getPrice());
        response.put("ordQty", order.getOrderQty());
        response.put("filledQty", order.getFilledQty());
        response.put("status", order.getStatus());
        response.put("type", order.getOrdType());
        response.put("side", order.getSide());


        order.setUpdateTime(System.currentTimeMillis());
        orderRepository.delete(ordId);
        return response;
    }

    public Map<String, Object> aggregateRoutes(Order order) throws SubOrderException {

        String symbol[] = order.getSymbol().split("-");

        Broker broker = brokerRepository.findByAddress(order.getClientId());
        DataType dataType = DataType.ASKS;
        String balanceSymbol = symbol[1].toLowerCase();
        if (order.getSide().toLowerCase().equals("sell")) {
            dataType = DataType.BIDS;
            balanceSymbol = symbol[0].toLowerCase();
        }
        Map<Exchange, BigDecimal> balances = chooseSymbolBalance(broker, balanceSymbol);

        Long time = System.currentTimeMillis();

        Map<String, Object> routes = balanceSplitAggregator.secondLevel(order.getSymbol(), new BigDecimal(order.getPrice()), dataType, new BigDecimal(order.getOrderQty()),
                balances.get(Exchange.BINANCE), balances.get(Exchange.BITTREX), balances.get(Exchange.POLONIEX));

        List<SubOrder> subOrders = getSubOrders((List<Route>) routes.get("routes"), order);

        List<Broker> brokers = brokerRepository.findAll();
        for (Broker dbBroker : brokers) {
            for (SubOrder subOrder : subOrders) {
                if (!subOrder.getReserved()) {
                    Map<Exchange, BigDecimal> brokerBalances = chooseSymbolBalance(dbBroker, balanceSymbol);
                    BigDecimal value = subOrder.getPrice().multiply(subOrder.getSubOrdQty());
                    if (brokerBalances.get(subOrder.getExchange()).compareTo(value) != -1) {
                        Boolean sent = orderHttpService.sendOrderInfo(subOrder, order, dbBroker);
                        if (sent) {
                            subOrder.setReserved(true);
                            subOrder.setBrokerId(dbBroker.getId());
                            order.getSubOrders().add(subOrder);
                            break;
                        } else {
//                            brokerRepository.delete(dbBroker.getId());
                        }
                    }
                }
            }
        }
        for (SubOrder subOrder : subOrders) {
            if (!subOrder.getReserved()) {
                throw new SubOrderException();
            }
        }
        if (subOrders == null || subOrders.isEmpty()) {
            throw new SubOrderException();
        }

        order.setTime(time);
        order.setUpdateTime(time);
        order.setId(sequenceRepository.getNextSequenceId("exchange"));
        order.setStatus("NEW");
        orderRepository.save(order);

        order.setSubOrders(subOrders);
        orderRepository.save(order);

        routes.get(Exchange.BINANCE);

        Map<String, Object> response = new HashMap<>();
        response.put("symbol", order.getSymbol());
        response.put("orderId", order.getId());
        response.put("clientOrdId", order.getClientId());
        response.put("time", order.getTime());
        response.put("price", order.getPrice());
        response.put("ordQty", order.getOrderQty());
        response.put("filledQty", order.getFilledQty());
        response.put("status", order.getStatus());
        response.put("ordType", order.getOrdType());
        response.put("side", order.getSide());
        response.put("subOrders", order.getSubOrders());

        return response;
    }

    public Order getOrderInfo(Long ordId) {
        Order order = orderRepository.findOne(ordId);

        return order;
    }

    public List<Order> orderHistory(Long ordId, String symbol, Long startTime, Long endTime, Integer limit) {
        Integer sort = 1;
        if (ordId == null) {
            ordId = Long.MIN_VALUE;
        }
        if (startTime == null && endTime == null) {
            sort = 0;
        }
        if (startTime == null) {
            startTime = Long.MIN_VALUE;
        }
        if (endTime == null) {
            endTime = Long.MAX_VALUE;
        }
        if (limit > 1000) {
            limit = 1000;
        }

        return orderRepository.orderHistory(ordId, symbol, startTime, endTime, limit, sort);
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
        List<SubOrder> subOrders = new ArrayList<>();
        for (Route route : routes) {
            if (Double.valueOf(route.getSubOrdQty()) > 0 && Double.valueOf(route.getPrice()) > 0) {
                SubOrder subOrder = mapToSubOrder(route, order, sequenceRepository.getNextSequenceId("exchange"));
                subOrders.add(subOrder);
            }
        }

        return subOrders;
    }

    private SubOrder mapToSubOrder(Route route, Order order, Long subOrdId) {
        return new SubOrder(subOrdId, order.getId(), route.getExchange(), new BigDecimal(route.getPrice()), new BigDecimal(route.getSubOrdQty()), null);
    }

}
