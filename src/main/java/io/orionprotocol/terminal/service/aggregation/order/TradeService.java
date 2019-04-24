package io.orionprotocol.terminal.service.aggregation.order;

import com.wavesplatform.wavesj.AssetPair;
import com.wavesplatform.wavesj.Node;
import com.wavesplatform.wavesj.PrivateKeyAccount;
import io.orionprotocol.terminal.repository.db.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import io.orionprotocol.terminal.model.Order;
import io.orionprotocol.terminal.model.OrderStatus;
import io.orionprotocol.terminal.model.SubOrder;
import io.orionprotocol.terminal.model.Trade;

import java.io.IOException;
import java.math.BigDecimal;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TradeService {

    @Autowired
    private OrderRepository orderRepository;

    @Value("${orion.wavesSeed}")
    private String seed;

    private PrivateKeyAccount getAccount() {
        return PrivateKeyAccount.fromSeed(seed, 0, com.wavesplatform.wavesj.Account.TESTNET);
    }

    Node matcher;
    String matcherKey;
    long MATCHER_FEE = 300_000;

    private final static class WavesAssets {
        static String WAVES = com.wavesplatform.wavesj.Asset.WAVES;
        static String BTC = "EBJDs3MRUiK35xbj59ejsf5Z4wH9oz6FuHvSCHVQqZHS";
        static String ETH = "25BEcPNiopW1ioBveCZTaDTVPci2o9ZLkqCELHC2GYoZ";
        static String XRP = "GqudznuaRtCKRKfEJu7WJyVxpFEwU1TNLtd7yUuwaP7R";

        static String toWavesAsset(String asset) {
            switch (asset){
                case "BTC":
                    return BTC;
                case "ETH":
                    return ETH;
                case "XRP":
                    return XRP;
                default:
                    return WAVES;
            }
        }

        static AssetPair symbolToAssetPair(String symbol) {
            String assets[] = symbol.split("-");
            return new AssetPair(toWavesAsset(assets[0]), toWavesAsset(assets[1]));
        }
    }

    public Map<String, Object> handleNewTrade(Trade trade) {
        Map<String, Object> response = new HashMap<>();
        Order order = orderRepository.findOne(trade.getOrdId());
        SubOrder subOrder = getSubOrder(order, trade);
        subOrder.getTrades().add(trade);
        subOrder.setStatus(trade.getStatus());
        //TODO:validation for price from telegram chat
        BigDecimal filledQty = order.getFilledQty().add(new BigDecimal(trade.getQty()));
        order.setFilledQty(filledQty);
        order.setUpdateTime(System.currentTimeMillis());
        calculateStatus(order);
        orderRepository.save(order);

        response.put("ordId", order.getId());
        response.put("subOrdId", subOrder.getId());
        response.put("exchange", subOrder.getExchange().name());
        response.put("price", subOrder.getPrice());
        response.put("subOrdQty", subOrder.getSubOrdQty());
        response.put("filledQty", order.getFilledQty());
        response.put("status", order.getStatus());

        try {
            if (new BigDecimal(trade.getQty()).compareTo(BigDecimal.ZERO) > 0) {
                createCounterOrder(order, trade);
            }
        } catch (Exception e) {
            // TODO: Return 500 HTTP error
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        return response;
    }

    private void calculateStatus(Order order) {
        if (order.getFilledQty().doubleValue() >= order.getOrderQty()) {
            order.setStatus(OrderStatus.FILLED);
            return;
        }
        if (order.getFilledQty().doubleValue() > 0) {
            for (SubOrder subOrder : order.getSubOrders()) {
                if (!subOrder.getStatus().equals(OrderStatus.CANCELED.name())) {
                    order.setStatus(OrderStatus.PARTIALLY_FILLED);
                    return;
                }
            }
            boolean partiallyCanceled = true;
            for (SubOrder subOrder : order.getSubOrders()) {
                if (!subOrder.getStatus().equals(OrderStatus.CANCELED.name()) && !subOrder.getStatus().equals(OrderStatus.FILLED.name())) {
                    partiallyCanceled = false;
                    break;
                }
            }
            if (partiallyCanceled) {
                order.setStatus(OrderStatus.PARTIALLY_CANCELLED);
                return;
            }
        }
        if (order.getFilledQty().doubleValue() == 0) {
            boolean canceled = true;
            for (SubOrder subOrder : order.getSubOrders()) {
                if (!subOrder.getStatus().equals(OrderStatus.CANCELED.name())) {
                    canceled = false;
                    break;
                }
            }
            if(canceled){
                order.setStatus(OrderStatus.CANCELED);
                return;
            }
        }
        order.setStatus(OrderStatus.NEW);
    }

    private Node getMatcher() throws URISyntaxException {
        if (matcher == null) {
            matcher = new Node("https://matcher.testnet.wavesnodes.com", com.wavesplatform.wavesj.Account.TESTNET);
        }
        return matcher;
    }

    private String getMatcherKey() throws IOException {
        if (matcherKey == null) {
            matcherKey  = matcher.getMatcherKey();
        }
        return matcherKey;
    }

    private void createCounterOrder(Order order, Trade trade) throws Exception {
        BigDecimal tokens = new BigDecimal(com.wavesplatform.wavesj.Asset.TOKEN);
        long price = new BigDecimal(trade.getPrice()).multiply(tokens).longValue();
        long amount = new BigDecimal(trade.getQty()).multiply(tokens).longValue();

        com.wavesplatform.wavesj.matcher.Order.Type side = order.getSide().equals("buy") ?
                com.wavesplatform.wavesj.matcher.Order.Type.SELL :
                com.wavesplatform.wavesj.matcher.Order.Type.BUY;

        com.wavesplatform.wavesj.matcher.Order wavesOrder = getMatcher().createOrder(this.getAccount(), getMatcherKey(),
                 WavesAssets.symbolToAssetPair(order.getSymbol()),
                // buy 10 WAVES at 0.00090000 WBTC each
                side,
                price,
                amount,
                // make order valid for 1 hour
                System.currentTimeMillis() + 3_600_000, MATCHER_FEE);
    }

    private SubOrder getSubOrder(Order order, Trade trade) {
        List<SubOrder> subOrders = order.getSubOrders();
        for (SubOrder subOrder : subOrders) {
            if (subOrder.getId().equals(Long.valueOf(trade.getSubOrdId()))) {
                return subOrder;
            }
        }
        return null;
    }

    public static void main(String[] args) {
        Order order = new Order();
        order.setSymbol("WAVES-BTC");
        Trade trade = new Trade();
        trade.setPrice("0.00071");
        trade.setQty("300");

        TradeService tradeService = new TradeService();
        System.out.println(tradeService.getAccount().getAddress());

        try {
            tradeService.createCounterOrder(order, trade);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
