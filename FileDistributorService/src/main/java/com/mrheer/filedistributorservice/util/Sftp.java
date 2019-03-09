package com.mrheer.filedistributorservice.util;

import com.jcraft.jsch.*;
import com.mrheer.filedistributorservice.entity.HostEntity;
import com.mrheer.filedistributorservice.model.Status;
import com.mrheer.filedistributorservice.model.StatusModel;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
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

    public static void distribute(HostEntity host, Map<String, byte[]> fileMap, String path) throws JSchException, IOException, SftpException {
        JSch jSch = new JSch();
        Session session = jSch.getSession(host.getUserName(), host.getIpAddress());
        session.setPort(Integer.parseInt(host.getPort()));
        session.setPassword(host.getPassword());
        Properties config = new Properties();
        config.put("StrictHostKeyChecking", "no");
        session.setConfig(config);
        session.connect();
        ChannelSftp channel = (ChannelSftp) session.openChannel("sftp");
        channel.connect();
        for (Map.Entry<String, byte[]> file : fileMap.entrySet()) {
            ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(file.getValue());
            Path filePath = Paths.get(path, file.getKey());
            channel.put(byteArrayInputStream, filePath.toString());
        }
        channel.disconnect();
    }
}
