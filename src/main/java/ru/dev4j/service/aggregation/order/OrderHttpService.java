package ru.dev4j.service.aggregation.order;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import ru.dev4j.model.Broker;
import ru.dev4j.model.Order;
import ru.dev4j.model.SubOrder;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;

@Service
public class OrderHttpService {

    private final static Long FINAL_TIMEOUT = 4000L;

    public Boolean sendOrderInfo(SubOrder subOrder, Order order, Broker broker){

        JSONObject request = new JSONObject();

        request.put("symbol", order.getSymbol());
        request.put("ordId", order.getId());
        request.put("subOrdId", subOrder.getId());
        request.put("price", subOrder.getPrice());
        request.put("exchange", subOrder.getExchange());
        request.put("subOrdQty", subOrder.getSubOrdQty());
        request.put("ordType", order.getOrdType());

        HttpPost httpPost = new HttpPost(broker.getCallbackUrl() + "/order");

        StringEntity entity = null;
        try {
            entity = new StringEntity(request.toString());
        } catch (UnsupportedEncodingException e) {
            return false;
        }
        entity.setContentType("application/json");
        httpPost.setEntity(entity);
        httpPost.setHeader("Accept", "application/json");
        httpPost.setHeader("Content-type", "application/json");

        HttpClient client = HttpClientBuilder.create().build();

        boolean success = false;
        long timeout = 0;
        while (!success && timeout <= FINAL_TIMEOUT) {
            try {
                Thread.sleep(timeout);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            try {
                HttpResponse response = client.execute(httpPost);
                success = true;
            } catch (IOException e) {
                if (timeout == 0) {
                    timeout = 1000;
                } else {
                    timeout = timeout * 2;
                }
            }
        }


        return success;
    }
}
