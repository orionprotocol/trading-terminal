package io.orionprotocol.terminal.web.api;

import io.orionprotocol.terminal.model.Broker;
import io.orionprotocol.terminal.model.Exchange;
import io.orionprotocol.terminal.model.ExchangeBalance;
import io.orionprotocol.terminal.model.PairBalance;
import io.orionprotocol.terminal.repository.db.BrokerRepository;
import io.orionprotocol.terminal.web.api.request.NewBroker;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Controller
public class BrokerApi {

    @Autowired
    private BrokerRepository brokerRepository;

    @RequestMapping(value = "/broker/register", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody
    Map<String, String> handleOrderBook(@RequestBody NewBroker newBroker) {
        //TODO:validate
        Broker broker = brokerRepository.findByAddress(newBroker.getAddress());
        Map<String, String> response = new HashMap<>();
        if (broker != null) {
            broker.setCallbackUrl(newBroker.getCallbackUrl());
            broker.setPublicKey(newBroker.getPublicKey());
            broker.setSignature(newBroker.getSignature());
            brokerRepository.save(broker);
            return response;
        } else {
            Broker bdBroker = new Broker(newBroker.getAddress(), newBroker.getCallbackUrl(), Broker.BrokerStatus.REGISTRED);
            brokerRepository.save(bdBroker);
            response.put("status", bdBroker.getStatus().toString());
            response.put("broker", bdBroker.getAddress());
        }
        return response;
    }

    @RequestMapping(value = "/broker/balance", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody
    Map<String, String> updateBalance(@RequestBody String body) {
        JSONObject root = new JSONObject(body);
        String address = null;
        try {
            address = root.getString("address");
        } catch (Exception e) {

        }
        Map<String, String> response = new HashMap<>();
        if (address != null) {
            Broker broker = brokerRepository.findByAddress(address);
            if (broker != null) {
                List<ExchangeBalance> exchangeBalances = getBalances(root);
                broker.setExchangeBalances(exchangeBalances);
                brokerRepository.save(broker);
                response.put("status", broker.getStatus().toString());
                response.put("broker", broker.getAddress());
            }
        }
        return response;
    }

    @RequestMapping(value = "/broker/balance/symbols", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody
    Map<String, String> balanceSymbols() {

        Map<String, String> response = new HashMap<>();

        return response;
    }


    private List<ExchangeBalance> getBalances(JSONObject root) {
        List<Exchange> exchanges = new ArrayList<>();
        exchanges.add(Exchange.BINANCE);
        exchanges.add(Exchange.BITTREX);
        exchanges.add(Exchange.POLONIEX);
        List<ExchangeBalance> exchangeBalances = new ArrayList<>();
        for (Exchange exchange : exchanges) {
            JSONObject jsonObject = null;
            try {
                jsonObject = root.getJSONObject(exchange.name().toLowerCase());
            } catch (Exception e) {
            }
            if (jsonObject != null) {
                ExchangeBalance exchangeBalance = new ExchangeBalance();
                exchangeBalance.setExchange(exchange);
                List<PairBalance> pairBalances = new ArrayList<>();
                Set<String> keys = jsonObject.keySet();
                for (String key : keys) {
                    String balance = jsonObject.getString(key);
                    if (balance != null) {
                        PairBalance pairBalance = new PairBalance(key.toLowerCase(), balance);
                        pairBalances.add(pairBalance);
                    }
                }
                exchangeBalance.setPairBalances(pairBalances);
                exchangeBalances.add(exchangeBalance);
            }
        }
        return exchangeBalances;
    }


}
