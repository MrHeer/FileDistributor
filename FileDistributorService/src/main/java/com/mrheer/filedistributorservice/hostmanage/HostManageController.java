package com.mrheer.filedistributorservice.hostmanage;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HostManageController {
    @RequestMapping(value = "/getHostData", method = RequestMethod.GET)
    public String getHost() {
        return "getHostData";
    }
}
