package com.mrheer.filedistributorservice.model;

import java.util.List;

public class HostModel {
    private String status;
    private List<HostDataBean> hostData;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<HostDataBean> getHostData() {
        return hostData;
    }

    public void setHostData(List<HostDataBean> hostData) {
        this.hostData = hostData;
    }

    public static class HostDataBean {
        private String key;
        private String groupName;
        private String hostName;
        private String ipAddress;

        public String getKey() {
            return key;
        }

        public void setKey(String key) {
            this.key = key;
        }

        public String getGroupName() {
            return groupName;
        }

        public void setGroupName(String groupName) {
            this.groupName = groupName;
        }

        public String getHostName() {
            return hostName;
        }

        public void setHostName(String hostName) {
            this.hostName = hostName;
        }

        public String getIpAddress() {
            return ipAddress;
        }

        public void setIpAddress(String ipAddress) {
            this.ipAddress = ipAddress;
        }
    }
}
