package ru.dev4j.web.api;

import org.jooq.lambda.Seq;
import org.jooq.lambda.tuple.Tuple2;
import org.jooq.lambda.tuple.Tuple3;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.dev4j.model.Broker;
import ru.dev4j.model.DataType;
import ru.dev4j.service.aggregation.order.OrderService;
import ru.dev4j.service.aggregation.split.Route;
import ru.dev4j.service.aggregation.split.SplitUtils;
import ru.dev4j.service.aggregation.split.service.BalanceSplitAggregator;
import ru.dev4j.service.aggregation.split.service.SplitAggregator;

import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.DoubleStream;

import static org.jooq.lambda.tuple.Tuple.tuple;

@Controller
public class SplitWebApi {

    @Autowired
    private SplitAggregator splitAggregator;

    @Autowired
    private BalanceSplitAggregator balanceSplitAggregator;

    @Autowired
    private OrderService orderService;

    private DecimalFormat decimalFormat = new DecimalFormat("#0.########");

    @RequestMapping(value = "api/v1/order-route", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody
    Map<String, Object> handleExchangeOrderBook(@RequestParam(name = "symbol") String symbol,
                                        @RequestParam(name = "ordQty") Double ordQty,
                                        @RequestParam(name = "price", required = false) Double price,
                                        @RequestParam(name = "side") String side) {
        double requiredPrice = price == null ?
                Objects.equals(side, "buy") ? Double.MAX_VALUE : Double.MIN_VALUE
                : price;
        Tuple3<List<Broker>, List<Route>, String> routes = orderService.findRoutes(symbol, side, ordQty, requiredPrice);

        Map<String, Object> response = new HashMap<>();

        Tuple2<Double, Double> total = Seq.seq(routes.v2)
                .foldLeft(tuple(0.0, 0.0), (res, x) -> tuple(res.v1 + Double.valueOf(x.getSubOrdQty()),
                        res.v2 + Double.valueOf(x.getSubOrdQty()) * Double.valueOf(x.getPrice())));

        response.put("routes", routes.v2);
        response.put("totalCost", decimalFormat.format(total.v2));
        if(total.v1 > 0){
            DoubleStream doubleStream = routes.v2.stream()
                    .filter(r ->  Double.valueOf(r.getSubOrdQty()) > 0 && Double.valueOf(r.getPrice()) > 0)
                    .mapToDouble(r -> Double.valueOf(r.getPrice()));
            double totalPrice = (Objects.equals(side, "buy") ? doubleStream.max() : doubleStream.min()).orElse(0.0);
            DecimalFormat df = new DecimalFormat("#0.########");
            response.put("totalPrice", df.format(totalPrice));
        } else{
            response.put("totalPrice", 0);
        }
        return response;
    }

    @RequestMapping(value = "api/v1/order-route/balance", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody
    Map<String, Object> handleExchangeBalanceOrderBook(@RequestParam(name = "symbol") String symbol,
                                                       @RequestParam(name = "ordQty") Double ordQty,
                                                       @RequestParam(name = "price", required = false) Double price,
                                                       @RequestParam(name = "side") String side,
                                                       @RequestParam(name = "binanceBalance", required = false) Double binanceBalance,
                                                       @RequestParam(name = "bittrexBalance", required = false) Double bittrexBalance,
                                                       @RequestParam(name = "poloniexBalance", required = false) Double poloniexBalance) {
        if (binanceBalance == null) {
            binanceBalance = Double.MAX_VALUE;
        }
        if (bittrexBalance == null) {
            bittrexBalance = Double.MAX_VALUE;
        }
        if (poloniexBalance == null) {
            poloniexBalance = Double.MAX_VALUE;
        }
        if (side.toLowerCase().equals("buy")) {
            if (price == null) {
                price = SplitUtils.maxValue().getKey();
            }
            return balanceSplitAggregator.secondLevel(symbol, price, DataType.ASKS, ordQty, binanceBalance, bittrexBalance, poloniexBalance);
        }
        if (side.toLowerCase().equals("sell")) {
            if (price == null) {
                price = SplitUtils.minValue().getKey();
            }
            return balanceSplitAggregator.secondLevel(symbol, price, DataType.BIDS, ordQty, binanceBalance, bittrexBalance, poloniexBalance);
        }
        return new HashMap<>();
    }
}
