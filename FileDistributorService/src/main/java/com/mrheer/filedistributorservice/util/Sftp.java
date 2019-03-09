package com.mrheer.filedistributorservice.util;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
import com.mrheer.filedistributorservice.entity.HostEntity;
import com.mrheer.filedistributorservice.model.Status;
import com.mrheer.filedistributorservice.model.StatusModel;

import java.util.Properties;

public class Sftp {
    public static StatusModel testHost(HostEntity host) throws JSchException {
        JSch jSch = new JSch();
        Session session = jSch.getSession(host.getUserName(), host.getIpAddress());
        session.setPort(Integer.parseInt(host.getPort()));
        session.setPassword(host.getPassword());
        Properties config = new Properties();
        config.put("StrictHostKeyChecking", "no");
        session.setConfig(config);
        session.connect();
        Channel channel = session.openChannel("sftp");
        channel.connect();
        channel.disconnect();
        StatusModel statusModel = new StatusModel();
        statusModel.setStatus(Status.SUCCESS);
        return statusModel;
    }
}
