package com.mrheer.filedistributorservice.controller;

import com.mrheer.filedistributorservice.model.TreeModel;
import com.mrheer.filedistributorservice.service.FileDistributeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class FileDistributeController {
    @Autowired
    FileDistributeService fileDistributeService;

    @RequestMapping(value = "/getTreeData", method = RequestMethod.GET)
    public TreeModel getTree() {
        return fileDistributeService.getTreeModel();
    }
}
