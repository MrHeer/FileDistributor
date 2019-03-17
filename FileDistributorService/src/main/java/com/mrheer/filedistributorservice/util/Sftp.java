package com.mrheer.filedistributorservice.util;

import com.jcraft.jsch.*;
import com.mrheer.filedistributorservice.entity.HostEntity;
import com.mrheer.filedistributorservice.model.DistributeType;
import com.mrheer.filedistributorservice.model.FileModel;
import com.mrheer.filedistributorservice.model.Status;
import com.mrheer.filedistributorservice.model.StatusModel;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Stream;

public class Sftp {
    private static ChannelSftp getChannel(HostEntity host) throws JSchException {
        JSch jSch = new JSch();
        Session session = jSch.getSession(host.getUserName(), host.getIpAddress());
        session.setPort(Integer.parseInt(host.getPort()));
        session.setPassword(host.getPassword());
        session.setTimeout(3000);
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
        Path filePath = Paths.get(path, "*" + keyword + "*");
        lsEntryVector = channel.ls(filePath.toString());
        Stream<ChannelSftp.LsEntry> stream = lsEntryVector.stream();
        stream.forEach(lsEntry -> {
            FileModel.FileDataBean file = new FileModel.FileDataBean();
            SftpATTRS attrs = lsEntry.getAttrs();
            String fileType;
            if (attrs.isDir()) fileType = "d";
            else if (attrs.isLink()) fileType = "l";
            else fileType = "-";
            file.setKey(String.valueOf(attrs.hashCode()));
            file.setType(fileType);
            file.setName(lsEntry.getFilename());

            file.setSize(getPrintSize(attrs.getSize()));
            file.setModify_time(attrs.getMtimeString());
            fileList.add(file);
        });
        fileModel.setFileData(fileList);
        channel.disconnect();

        return fileModel;
    }

    public static String getPrintSize(long size) {
        if (size < 1024) {
            return size + "B";
        } else {
            size = size / 1024;
        }

        if (size < 1024) {
            return size + "KB";
        } else {
            size = size / 1024;
        }

        if (size < 1024) {
            size = size * 100;
            return size / 100 + "."
                    + size % 100 + "MB";
        } else {
            size = size * 100 / 1024;
            return size / 100 + "."
                    + size % 100 + "GB";
        }
    }

    public static void main(String[] args) {
        HostEntity host = new HostEntity();
        host.setIpAddress("127.0.0.1");
        host.setPort("22");
        host.setUserName("mrheer");
        host.setPassword("lcy5201314");
        String path = "/upload";
        String keyword = "";
        try {
            FileModel fileModel = ls(host, path, keyword);
        } catch (JSchException | SftpException e) {
            e.printStackTrace();
        }
    }

    public static void deleteFile(HostEntity host, String path, List<String> fileList) throws JSchException, SftpException {
        ChannelSftp channel = getChannel(host);
        for (String fileName : fileList) {
            Path filePath = Paths.get(path, fileName);
            try {
                channel.rm(filePath.toString());
            } catch (SftpException e) {
                channel.rmdir(filePath.toString());
            }
        }
        channel.disconnect();
    }

    public static InputStream download(HostEntity host, String path, String fileName) throws JSchException, IOException, SftpException {
        ChannelSftp channel = getChannel(host);
        Path filePath = Paths.get(path, fileName);
        return channel.get(filePath.toString());
    }
}
