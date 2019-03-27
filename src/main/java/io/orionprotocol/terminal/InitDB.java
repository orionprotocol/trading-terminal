package io.orionprotocol.terminal;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import io.orionprotocol.terminal.config.MongoDBConfig;
import io.orionprotocol.terminal.config.PropertySourceConfig;
import io.orionprotocol.terminal.model.Exchange;
import io.orionprotocol.terminal.model.Order;
import io.orionprotocol.terminal.model.OrderStatus;
import io.orionprotocol.terminal.model.SubOrder;
import io.orionprotocol.terminal.repository.db.OrderRepository;

import java.util.ArrayList;
import java.util.List;

public class InitDB {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext(PropertySourceConfig.class, MongoDBConfig.class);
        OrderRepository orderRepository = applicationContext.getBean(OrderRepository.class);

        for (long i = 0; i < 20; i++) {
            Order order = new Order();
            order.setId(i + 25);
            order.setStatus(OrderStatus.NEW);
            order.setClientId("3P6G8AxXyq8KvppcMGXdggEXFsucJWZ48Dv");
            order.setSymbol("ETH-BTC");
            order.setSide(i % 2 == 0 ? "buy" : "sell");
            order.setOrderQty(1.5);
            order.setPrice(1.8);
            order.setSubOrders(subOrders(i + 25));

            orderRepository.save(order);
        }

        System.exit(0);
    }

    public static List<SubOrder> subOrders(long orderId) {
        List<SubOrder> subOrders = new ArrayList<>();
        SubOrder subOrder = new SubOrder();
        subOrder.setBrokerId("5c11629c46e0fb0001467e2b");
        subOrder.setReserved(true);
        subOrder.setExchange(Exchange.BINANCE);
        subOrder.setId(orderId + 5);
        subOrder.setOrderId(orderId);
        subOrder.setPrice(1.0);
        subOrder.setSubOrdQty(0.7);

        subOrders.add(subOrder);

        SubOrder subOrder1 = new SubOrder();
        subOrder1.setBrokerId("5c11629c46e0fb0001467e2b");
        subOrder1.setReserved(true);
        subOrder1.setExchange(Exchange.BINANCE);
        subOrder1.setId(orderId + 6);
        subOrder1.setOrderId(orderId);
        subOrder1.setPrice(0.5);
        subOrder1.setSubOrdQty(0.3);
        subOrders.add(subOrder1);

        return subOrders;
    }
}
