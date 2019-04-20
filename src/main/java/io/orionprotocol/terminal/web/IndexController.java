package io.orionprotocol.terminal.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {


    @RequestMapping(value = "/testsocket")
    public String starter() {
        return "testsocket";
    }


    @RequestMapping(value = "/socket")
    public String socket() {
        return "socket/socket";
    }


    @RequestMapping(value = "/testsocket2")
    public String starter2() {
        return "testsocket2";
    }

    @RequestMapping(value = "/")
    public String client() {
        return "client/client";
    }

    @RequestMapping(value = "/balance")
    public String balance() {
        return "client/client";
    }

    @RequestMapping(value = "/deposit")
    public String deposit() {
        return "client/client";
    }


    @RequestMapping(value = "/modal")
    public String modal() {
        return "client/client";
    }

    @RequestMapping(value = "/chart")
    public String chart() {
        return "client/client";
    }


}
