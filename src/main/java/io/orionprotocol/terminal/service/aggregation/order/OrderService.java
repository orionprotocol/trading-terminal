package io.orionprotocol.terminal.service.aggregation.order;

import io.orionprotocol.terminal.model.*;
import io.orionprotocol.terminal.model.exceptions.SubOrderException;
import io.orionprotocol.terminal.repository.db.BrokerRepository;
import io.orionprotocol.terminal.repository.db.OrderRepository;
import io.orionprotocol.terminal.repository.db.SequenceRepository;
import io.orionprotocol.terminal.service.aggregation.split.Route;
import io.orionprotocol.terminal.service.aggregation.split.service.BalanceSplitAggregator;
import org.jooq.lambda.tuple.Tuple;
import org.jooq.lambda.tuple.Tuple3;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        order.setStatus(OrderStatus.CANCELED);

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

    public Tuple3<List<Broker>, List<Route>, String> findRoutes(String symbol, String side, double ordQty, double price) {

        String assets[] = symbol.split("-");

        DataType dataType = Objects.equals(side, "buy") ? DataType.ASKS : DataType.BIDS;
        String balanceAsset = Objects.equals(side, "buy") ? assets[1].toLowerCase():  assets[0].toLowerCase();

        List<Broker> brokers = brokerRepository.findAll();
        Map<Exchange, Double> balances = aggregateBalances(brokers, balanceAsset);

        List<Route> routes = (List<Route>) balanceSplitAggregator.secondLevel(
                symbol,
                price,
                dataType,
                ordQty,
                balances.get(Exchange.BINANCE), balances.get(Exchange.BITTREX), balances.get(Exchange.POLONIEX))
                    .get("routes");

        return Tuple.tuple(brokers, routes, balanceAsset);
    }


    public Map<String, Object> aggregateRoutes(Order order) throws SubOrderException {

        Tuple3<List<Broker>, List<Route>, String> routes = findRoutes(order.getSymbol(), order.getSide(), order.getOrderQty(), order.getPrice());

        Long time = System.currentTimeMillis();
        order.setTime(time);
        order.setUpdateTime(time);
        order.setId(sequenceRepository.getNextSequenceId("exchange"));
        order.setStatus(OrderStatus.NEW);

        List<SubOrder> subOrders = getSubOrders(routes.v2, order);
        for (SubOrder subOrder : subOrders) {
            for (Broker dbBroker : routes.v1) {
                Map<Exchange, Double> brokerBalances = chooseSymbolBalance(dbBroker, routes.v3);
                if (brokerBalances.get(subOrder.getExchange()) >= subOrder.getSpentQty()) {
                    subOrder.setReserved(true);
                    subOrder.setBrokerId(dbBroker.getId());
                    order.getSubOrders().add(subOrder);
                    break;
                }
            }
        }
        orderRepository.save(order);
        order.setSubOrders(subOrders);
        orderRepository.save(order);

        for (SubOrder subOrder : subOrders) {
            for (Broker dbBroker : routes.v1) {
                if (Objects.equals(dbBroker.getId(), subOrder.getBrokerId())) {
                    orderHttpService.sendOrderInfo(subOrder, order, dbBroker);
                }
            }
        }

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

    private Map<Exchange, Double> aggregateBalances(List<Broker> brokers, String balanceSymbol) {
        Map<Exchange, Double> balances = new HashMap<>();
        for (Broker broker : brokers) {
            for (ExchangeBalance eb : broker.getExchangeBalances()) {
                double balance = findExchangeSymbolBalance(eb.getPairBalances(), balanceSymbol);
                balances.compute(eb.getExchange(), (exchange, bal) -> bal == null ? balance : bal + balance);
            }
        }

        return balances;
    }

    public Order getOrderInfo(Long ordId) {
        Order order = orderRepository.findOne(ordId);

        return order;
    }

    public List<Order> orderHistory(Long ordId, String symbol, Long startTime, Long endTime, Integer limit, String clientId) {
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

        return orderRepository.orderHistory(ordId, symbol, startTime, endTime, limit, sort,clientId);
    }

    private Map<Exchange, Double> chooseSymbolBalance(Broker broker, String balanceSymbol) {

        Map<Exchange, Double> response = new HashMap<>();
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
            Double balance = findExchangeSymbolBalance(exchangeBalance.getPairBalances(), balanceSymbol);
            response.put(exchange, balance);
        }
        return response;
    }

    private Double findExchangeSymbolBalance(List<PairBalance> pairBalances, String balanceSymbol) {
        for (PairBalance pairBalance : pairBalances) {
            if (pairBalance.getSymbol().toLowerCase().equals(balanceSymbol)) {
                return Double.valueOf(pairBalance.getBalance());
            }
        }
        return 0D;
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
        return new SubOrder(subOrdId, order.getId(), route.getExchange(), Double.valueOf(route.getPrice()), Double.valueOf(route.getSubOrdQty()), null);
    }

}
