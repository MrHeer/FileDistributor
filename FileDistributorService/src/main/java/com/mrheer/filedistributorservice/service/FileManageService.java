package com.mrheer.filedistributorservice.service;

import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.SftpException;
import com.mrheer.filedistributorservice.entity.HostEntity;
import com.mrheer.filedistributorservice.model.FileModel;
import com.mrheer.filedistributorservice.repository.HostRepository;
import com.mrheer.filedistributorservice.util.Sftp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Service
public class FileManageService {
    @Autowired
    private HostRepository hostRepository;

    public FileModel getFileModel(Long id, String path, String keyword) {
        FileModel fileModel = new FileModel();
        try {
            fileModel = Sftp.ls(hostRepository.getOne(id), path, keyword);
        } catch (JSchException | SftpException e) {
            e.printStackTrace();
        }

        return fileModel;
    }

    public FileModel deleteFile(Long hostID, String remotePath, String keyword, List<String> fileList) {
        HostEntity host = hostRepository.getOne(hostID);
        try {
            Sftp.deleteFile(host, remotePath, fileList);
        } catch (JSchException | SftpException e) {
            e.printStackTrace();
        }
        return getFileModel(hostID, remotePath, keyword);
    }

    public InputStream download(Long hostID, String remotePath, String fileName) {
        HostEntity host = hostRepository.getOne(hostID);
        try {
            return Sftp.download(host, remotePath, fileName);
        } catch (JSchException | IOException | SftpException e) {
            e.printStackTrace();
        }
        return null;
    }
}
