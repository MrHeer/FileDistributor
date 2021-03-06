package com.mrheer.filedistributorservice.controller;

import com.mrheer.filedistributorservice.entity.HostEntity;
import com.mrheer.filedistributorservice.model.HostModel;
import com.mrheer.filedistributorservice.model.StatusModel;
import com.mrheer.filedistributorservice.service.HostManageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class HostManageController {
    @Autowired
    private HostManageService hostManageService;

    @RequestMapping(value = "/getHostData", method = RequestMethod.GET)
    public HostModel getHostData() {
        return hostManageService.getHostModel();
    }

    @RequestMapping(value = "/addHost", method = RequestMethod.POST)
    public HostModel addHost(@RequestBody Map<String, String> reqMap) {
        HostEntity hostEntity = new HostEntity();
        hostEntity.setGroupName(reqMap.get("groupName"));
        hostEntity.setHostName(reqMap.get("hostName"));
        hostEntity.setIpAddress(reqMap.get("ipAddress"));
        hostEntity.setPort(reqMap.get("port"));
        hostEntity.setUserName(reqMap.get("userName"));
        hostEntity.setPassword(reqMap.get("password"));
        return hostManageService.save(hostEntity);
    }

    @RequestMapping(value = "/deleteHost", method = RequestMethod.POST)
    public HostModel deleteHost(@RequestBody Map<String, ArrayList<String>> reqMap) {
        List<Long> list = new ArrayList<>();
        for (Object value : reqMap.get("hostId")) {
            list.add(Long.valueOf((String) value));
        }
        return hostManageService.delete(list);
    }

    @RequestMapping(value = "/editHost", method = RequestMethod.POST)
    public HostModel editHost(@RequestBody Map<String, String> reqMap) {
        HostEntity hostEntity = new HostEntity();
        hostEntity.setId(Long.valueOf(reqMap.get("hostId")));
        hostEntity.setGroupName(reqMap.get("groupName"));
        hostEntity.setHostName(reqMap.get("hostName"));
        hostEntity.setIpAddress(reqMap.get("ipAddress"));
        hostEntity.setPort(reqMap.get("port"));
        hostEntity.setUserName(reqMap.get("userName"));
        hostEntity.setPassword(reqMap.get("password"));
        return hostManageService.save(hostEntity);
    }

    @RequestMapping(value = "/testHost", method = RequestMethod.POST)
    public StatusModel testHost(@RequestBody Map<String, String> reqMap) {
        HostEntity hostEntity = new HostEntity();
        hostEntity.setGroupName(reqMap.get("groupName"));
        hostEntity.setHostName(reqMap.get("hostName"));
        hostEntity.setIpAddress(reqMap.get("ipAddress"));
        hostEntity.setPort(reqMap.get("port"));
        hostEntity.setUserName(reqMap.get("userName"));
        hostEntity.setPassword(reqMap.get("password"));
        return hostManageService.testHost(hostEntity);
    }
}
