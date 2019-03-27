package io.orionprotocol.terminal.web.api;

import io.orionprotocol.terminal.service.pair.PairService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
