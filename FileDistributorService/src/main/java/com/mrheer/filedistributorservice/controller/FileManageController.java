package com.mrheer.filedistributorservice.controller;

import com.mrheer.filedistributorservice.model.FileModel;
import com.mrheer.filedistributorservice.service.FileManageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class FileManageController {
    @Autowired
    FileManageService fileManageService;

    @RequestMapping(value = "/getFileData", method = RequestMethod.GET)
    public FileModel getFileData(
            @RequestParam("hostId") Long hostID,
            @RequestParam("remotePath") String remotePath,
            @RequestParam("keyword") String keyword) {
        return fileManageService.getFileModel(hostID, remotePath, keyword);
    }

    @RequestMapping(value = "/deleteFile", method = RequestMethod.POST)
    public FileModel deleteFile(@RequestBody Map<String, Object> reqMap) {
        Long hostID = Long.valueOf((String) reqMap.get("hostId"));
        String remotePath = (String) reqMap.get("remotePath");
        String keyword = (String) reqMap.get("keyword");
        List<String> fileList = (List<String>) reqMap.get("files");

        return fileManageService.deleteFile(hostID, remotePath, keyword, fileList);
    }

    @RequestMapping(value = "/download", method = RequestMethod.GET)
    public ResponseEntity<Resource> downloadFile(
            @RequestParam("hostId") Long hostID,
            @RequestParam("remotePath") String remotePath,
            @RequestParam("fileName") String fileName) {
        InputStream inputStream = fileManageService.download(hostID, remotePath, fileName);
        InputStreamResource resource = new InputStreamResource(inputStream);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .body(resource);
    }
}
