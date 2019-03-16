package com.mrheer.filedistributorservice.util;

import com.jcraft.jsch.*;
import com.mrheer.filedistributorservice.entity.HostEntity;
import com.mrheer.filedistributorservice.model.DistributeType;
import com.mrheer.filedistributorservice.model.FileModel;
import com.mrheer.filedistributorservice.model.Status;
import com.mrheer.filedistributorservice.model.StatusModel;

import java.io.ByteArrayInputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.function.Consumer;
import java.util.stream.Stream;

public class Sftp {
    private static ChannelSftp getChannel(HostEntity host) throws JSchException {
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
        return channel;
    }

    public static StatusModel testHost(HostEntity host) throws JSchException {
        Channel channel = getChannel(host);
        channel.disconnect();
        StatusModel statusModel = new StatusModel();
        statusModel.setStatus(Status.SUCCESS);
        return statusModel;
    }


    public static String distribute(HostEntity host, Map<String, byte[]> fileMap, String path, String type) throws JSchException, SftpException {
        String status = Status.SUCCESS;
        ChannelSftp channel = getChannel(host);
        for (Map.Entry<String, byte[]> file : fileMap.entrySet()) {
            Path filePath = Paths.get(path, file.getKey());
            try {
                SftpATTRS attrs = getAttrs(host, filePath.toString());
                if (type.equalsIgnoreCase(DistributeType.OVERWRITE)) {
                    ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(file.getValue());
                    channel.put(byteArrayInputStream, filePath.toString());
                } else {
                    status = Status.EXIST;
                }
            } catch (SftpException e) {
                // file not exist
                e.printStackTrace();
                ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(file.getValue());
                channel.put(byteArrayInputStream, filePath.toString());
            }
        }
        channel.disconnect();
        return status;
    }

    public static SftpATTRS getAttrs(HostEntity host, String filePath) throws JSchException, SftpException {
        ChannelSftp channel = getChannel(host);
        return channel.lstat(filePath);
    }

    public static FileModel ls(HostEntity host, String path, String keyword) throws JSchException, SftpException {
        FileModel fileModel = new FileModel();
        List<FileModel.FileDataBean> fileList = new ArrayList<>();
        ChannelSftp channel = getChannel(host);
        Vector lsEntryVector = new Vector<>();
        lsEntryVector = channel.ls(path + "*" + keyword + "*");
        Stream stream = lsEntryVector.parallelStream();
        stream.forEach(new Consumer() {
            @Override
            public void accept(Object o) {
                ChannelSftp.LsEntry lsEntry = (ChannelSftp.LsEntry) o;
                FileModel.FileDataBean file = new FileModel.FileDataBean();
                SftpATTRS attrs = lsEntry.getAttrs();
                file.setKey(String.valueOf(attrs.hashCode()));
                file.setType(String.valueOf(attrs.getFlags()));
                file.setName(lsEntry.getFilename());
                file.setSize(String.valueOf(attrs.getSize()));
                file.setModify_time(attrs.getMtimeString());
                fileList.add(file);
            }
        });
        fileModel.setFileData(fileList);
        channel.disconnect();

        return fileModel;
    }
}
