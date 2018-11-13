package ru.dev4j.web.api;


import org.apache.log4j.Logger;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;


@Controller
//@RequestMapping("/api")
public class AmoWebHooks {

    final static Logger logger = Logger.getLogger(AmoWebHooks.class);

//    @RequestMapping(value = "/deal", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public void handleDeal(HttpServletRequest request, @RequestParam Map<String, String> body) {
//        logger.info("Новый запрос. " + body.toString());

    }



}
