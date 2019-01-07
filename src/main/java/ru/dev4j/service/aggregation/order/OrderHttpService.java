package ru.dev4j.service.aggregation.order;

import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import ru.dev4j.model.Broker;
import ru.dev4j.model.Order;
import ru.dev4j.model.SubOrder;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;

@Service
public class OrderHttpService {

    private final static Long FINAL_TIMEOUT = 4000L;

    public Boolean sendOrderInfo(SubOrder subOrder, Order order, Broker broker) {

        JSONObject request = new JSONObject();

        request.put("symbol", order.getSymbol());
//        request.put("ordId", order.getId());
        request.put("subOrdId", subOrder.getId());
        request.put("price", subOrder.getPrice());
        request.put("exchange", subOrder.getExchange());
        request.put("subOrdQty", subOrder.getSubOrdQty());
//        request.put("ordType", order.getOrdType());
        request.put("side", order.getSide());

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
                if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
                    success = true;
                }
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

    public Boolean deleteOrderInfo(SubOrder subOrder, Order order, Broker broker) {

        JSONObject jsonRequest = new JSONObject();

        jsonRequest.put("symbol", order.getSymbol());
        jsonRequest.put("subOrdId", subOrder.getId());
        jsonRequest.put("price", subOrder.getPrice());
        jsonRequest.put("exchange", subOrder.getExchange());

        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<JSONObject> request = new HttpEntity<>(jsonRequest);

        boolean success = false;
        long timeout = 0;
        while (!success && timeout <= FINAL_TIMEOUT) {
            try {
                Thread.sleep(timeout);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            try {
                ResponseEntity<Object> responseEntity = restTemplate.exchange(broker.getCallbackUrl() + "/order",
                        HttpMethod.DELETE, request, (Class<Object>) null);
                if (responseEntity.getStatusCode().equals(org.springframework.http.HttpStatus.OK)) {
                    success = true;
                }
            } catch (Exception e) {
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
