package com.mrheer.filedistributorservice.service;

import com.mrheer.filedistributorservice.entity.HostEntity;
import com.mrheer.filedistributorservice.model.*;
import com.mrheer.filedistributorservice.repository.HostRepository;
import com.mrheer.filedistributorservice.util.FileManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;

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
            FileManager.add(uid, file);
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
        for (DistributeModel.FileListBean fileInfo : data.getFileList()) {
            MultipartFile file = FileManager.get(fileInfo.getUid());
        }
        statusBean.setStatus(Status.SUCCESS);
        distributeStatusModel.setDistributeStatus(statusBean);

        return distributeStatusModel;
    }
}
