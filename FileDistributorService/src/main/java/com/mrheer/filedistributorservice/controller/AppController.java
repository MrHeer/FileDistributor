package com.mrheer.filedistributorservice.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class AppController {
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index() {
        return "index.html";
    }

    @RequestMapping(value = "/FileDistribute", method = RequestMethod.GET)
    public String fileDistribute() {
        return "index.html";
    }

    @RequestMapping(value = "/HostManage", method = RequestMethod.GET)
    public String hostManage() {
        return "index.html";
    }
}
