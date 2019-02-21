package com.mrheer.filedistributorservice.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class FileDistributeController {
    @RequestMapping(value = "/getTreeData", method = RequestMethod.GET)
    public String getHost() {
        return "getTreeData";
    }
}
