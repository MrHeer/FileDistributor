package com.mrheer.filedistributorservice.controller;

import com.mrheer.filedistributorservice.entity.HostEntity;
import com.mrheer.filedistributorservice.model.HostModel;
import com.mrheer.filedistributorservice.model.Status;
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
    public HostModel getHost() {
        return hostManageService.getHostModel();
    }

    @RequestMapping(value = "/addHost", method = RequestMethod.POST)
    public HostModel addHost(@RequestBody Map<String, String> reqMap) {
        HostEntity hostEntity = new HostEntity();
        hostEntity.setGroupName(reqMap.get("group_name"));
        hostEntity.setHostName(reqMap.get("host_name"));
        hostEntity.setIpAddress(reqMap.get("ip_address"));
        hostEntity.setUserName(reqMap.get("user_name"));
        hostEntity.setPassword(reqMap.get("password"));
        return hostManageService.save(hostEntity);
    }

    @RequestMapping(value = "/deleteHost", method = RequestMethod.POST)
    public HostModel deleteHost(@RequestBody Map<String, ArrayList<String>> reqMap) {
        List<Long> list = new ArrayList<>();
        for (Object value : reqMap.get("hostID")) {
            list.add(Long.valueOf((String) value));
        }
        return hostManageService.delete(list);
    }

    @RequestMapping(value = "/editHost", method = RequestMethod.POST)
    public HostModel editHost(@RequestBody Map<String, String> reqMap) {
        HostEntity hostEntity = new HostEntity();
        hostEntity.setId(Long.valueOf(reqMap.get("host_id")));
        hostEntity.setGroupName(reqMap.get("group_name"));
        hostEntity.setHostName(reqMap.get("host_name"));
        hostEntity.setIpAddress(reqMap.get("ip_address"));
        hostEntity.setUserName(reqMap.get("user_name"));
        hostEntity.setPassword(reqMap.get("password"));
        return hostManageService.save(hostEntity);
    }

    @RequestMapping(value = "/testHost", method = RequestMethod.POST)
    public StatusModel testHost() {
        StatusModel statusModel = new StatusModel();
        statusModel.setStatus(Status.SUCCESS);
        return statusModel;
    }
}
