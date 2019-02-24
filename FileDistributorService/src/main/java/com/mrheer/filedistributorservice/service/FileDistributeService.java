package com.mrheer.filedistributorservice.service;

import com.mrheer.filedistributorservice.entity.HostEntity;
import com.mrheer.filedistributorservice.model.TreeModel;
import com.mrheer.filedistributorservice.repository.HostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
