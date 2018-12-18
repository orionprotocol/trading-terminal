package ru.dev4j.web.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.dev4j.model.Broker;
import ru.dev4j.service.pair.PairService;
import ru.dev4j.web.api.request.NewBroker;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class PairsApi {

    @Autowired
    private PairService pairService;

    @RequestMapping(value = "/pairs/list", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody
    List<String> pairList() {
        return pairService.allPairs();
    }

}
