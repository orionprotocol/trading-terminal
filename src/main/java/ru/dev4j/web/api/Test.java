package ru.dev4j.web.api;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/api/cookie")
public class Test {

    @RequestMapping(value = "/test",method = RequestMethod.GET)
    @ResponseBody
    public String testCookie(HttpServletRequest request){
        System.out.println(request);
        return "Hello";
    }
}
