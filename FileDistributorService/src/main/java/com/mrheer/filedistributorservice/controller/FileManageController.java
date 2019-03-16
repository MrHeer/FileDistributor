package com.mrheer.filedistributorservice.controller;

import com.mrheer.filedistributorservice.service.FileManageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class FileManageController {
    @Autowired
    FileManageService fileManageService;
}
