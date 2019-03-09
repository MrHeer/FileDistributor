package com.mrheer.filedistributorservice.service;

import com.mrheer.filedistributorservice.entity.HostEntity;
import com.mrheer.filedistributorservice.model.HostModel;
import com.mrheer.filedistributorservice.model.Status;
import com.mrheer.filedistributorservice.repository.HostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class HostManageService {
    @Autowired
    private HostRepository hostRepository;

    public HostModel getHostModel() {
        HostModel hostModel = new HostModel();
        List<HostEntity> list = hostRepository.findAll();
        List<HostModel.HostDataBean> hostDataBeanList = new ArrayList<>();
        for (HostEntity entity : list) {
            HostModel.HostDataBean hostDataBean = new HostModel.HostDataBean();
            hostDataBean.setGroup_name(entity.getGroupName());
            hostDataBean.setHost_name(entity.getHostName());
            hostDataBean.setIp_address(entity.getIpAddress());
            hostDataBean.setKey(String.valueOf(entity.getId()));
            hostDataBeanList.add(hostDataBean);
        }
        hostModel.setHostData(hostDataBeanList);
        hostModel.setStatus(Status.SUCCESS);
        return hostModel;
    }

    public HostModel save(HostEntity hostEntity) {
        hostRepository.saveAndFlush(hostEntity);
        return getHostModel();
    }

    public HostModel delete(List<Long> list) {
        for (Long id : list) {
            hostRepository.deleteById(id);
        }
        return getHostModel();
    }
}
