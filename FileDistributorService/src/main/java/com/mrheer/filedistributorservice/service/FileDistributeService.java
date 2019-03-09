package com.mrheer.filedistributorservice.service;

import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.SftpException;
import com.mrheer.filedistributorservice.entity.HostEntity;
import com.mrheer.filedistributorservice.model.*;
import com.mrheer.filedistributorservice.repository.HostRepository;
import com.mrheer.filedistributorservice.util.FileManager;
import com.mrheer.filedistributorservice.util.Sftp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;

@Service
public class FileDistributeService {
    @Autowired
    HostRepository hostRepository;

    public TreeModel getTreeModel() {
        TreeModel treeModel = new TreeModel();
        List<HostEntity> list = hostRepository.findAll();
        List<TreeModel.TreeDataBean> groupList = new ArrayList<>();
        Hashtable<String, List<TreeModel.TreeDataBean.ChildrenBean>> hashtable = new Hashtable<>();
        for (HostEntity hostEntity : list) {
            if (hashtable.containsKey(hostEntity.getGroupName())) {
                TreeModel.TreeDataBean.ChildrenBean hostBean = new TreeModel.TreeDataBean.ChildrenBean();
                hostBean.setKey(String.valueOf(hostEntity.getId()));
                hostBean.setTitle(hostEntity.getHostName());
                hashtable.get(hostEntity.getGroupName()).add(hostBean);
            } else {
                List<TreeModel.TreeDataBean.ChildrenBean> hostList = new ArrayList<>();
                TreeModel.TreeDataBean.ChildrenBean hostBean = new TreeModel.TreeDataBean.ChildrenBean();
                hostBean.setKey(String.valueOf(hostEntity.getId()));
                hostBean.setTitle(hostEntity.getHostName());
                hostList.add(hostBean);
                hashtable.put(hostEntity.getGroupName(), hostList);

            }
        }
        for (String groupName : hashtable.keySet()) {
            TreeModel.TreeDataBean treeDataBean = new TreeModel.TreeDataBean();
            treeDataBean.setKey(groupName);
            treeDataBean.setTitle(groupName);
            treeDataBean.setChildren(hashtable.get(groupName));
            groupList.add(treeDataBean);
        }
        treeModel.setTreeData(groupList);
        return treeModel;
    }

    public UploadStatusModel upload(MultipartFile file) {
        UploadStatusModel uploadStatusModel = new UploadStatusModel();

        try {
            // generate MD5 hash
            MessageDigest md5 = MessageDigest.getInstance("MD5");
            md5.update(file.getBytes());
            String uid = new BigInteger(1, md5.digest()).toString(16);

            // save file to the hashTable
            byte[] bytes = file.getBytes().clone();
            FileManager.add(uid, bytes);
            uploadStatusModel.setStatus(Status.SUCCESS);
            uploadStatusModel.setUid(uid);
        } catch (IOException e) {
            e.printStackTrace();
            uploadStatusModel.setStatus(Status.ERROR);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            uploadStatusModel.setStatus(Status.ERROR);
        }

        return uploadStatusModel;
    }

    public DistributeStatusModel distribute(DistributeModel data) {
        DistributeStatusModel distributeStatusModel = new DistributeStatusModel();
        DistributeStatusModel.DistributeStatusBean statusBean = new DistributeStatusModel.DistributeStatusBean();

        if (data.getRemotePath().isEmpty() || data.getFileList().isEmpty() || data.getSelectedHost().isEmpty()) {
            statusBean.setStatus(Status.ERROR);
            distributeStatusModel.setDistributeStatus(statusBean);
            return distributeStatusModel;
        }

        // add all file to the fileMap
        Map<String, byte[]> fileMap = new TreeMap<>();
        for (DistributeModel.FileListBean fileInfo : data.getFileList()) {
            fileMap.put(fileInfo.getName(), FileManager.get(fileInfo.getResponse().getUid()));
        }

        // distribute the files to host
        for (DistributeModel.SelectedHostBean hostInfo : data.getSelectedHost()) {
            HostEntity host = hostRepository.getOne(Long.valueOf(hostInfo.getKey()));
            try {
                Sftp.distribute(host, fileMap, data.getRemotePath());
            } catch (JSchException e) {
                e.printStackTrace();
                statusBean.setStatus(Status.ERROR);
                distributeStatusModel.setDistributeStatus(statusBean);
                return distributeStatusModel;
            } catch (SftpException e) {
                e.printStackTrace();
                statusBean.setStatus(Status.ERROR);
                distributeStatusModel.setDistributeStatus(statusBean);
                return distributeStatusModel;
            } catch (IOException e) {
                e.printStackTrace();
                statusBean.setStatus(Status.ERROR);
                distributeStatusModel.setDistributeStatus(statusBean);
                return distributeStatusModel;
            }
        }

        // clear memory file data
        if (FileManager.getSize() > 10) {
            FileManager.clear();
        }

        statusBean.setStatus(Status.SUCCESS);
        distributeStatusModel.setDistributeStatus(statusBean);

        return distributeStatusModel;
    }
}
