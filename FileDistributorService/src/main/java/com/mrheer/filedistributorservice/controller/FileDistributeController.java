package com.mrheer.filedistributorservice.controller;

import com.mrheer.filedistributorservice.model.DistributeModel;
import com.mrheer.filedistributorservice.model.DistributeStatusModel;
import com.mrheer.filedistributorservice.model.TreeModel;
import com.mrheer.filedistributorservice.model.UploadStatusModel;
import com.mrheer.filedistributorservice.service.FileDistributeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class FileDistributeController {
    @Autowired
    FileDistributeService fileDistributeService;

    @RequestMapping(value = "/getTreeData", method = RequestMethod.GET)
    public TreeModel getTree() {
        return fileDistributeService.getTreeModel();
    }

    @RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
    public UploadStatusModel uploadFile(@RequestParam("file") MultipartFile file) {
        return fileDistributeService.upload(file);
    }

    @RequestMapping(value = "distribute", method = RequestMethod.POST)
    public DistributeStatusModel distribute(@RequestBody DistributeModel distributeModel) {
        return fileDistributeService.distribute(distributeModel);
    }
}
