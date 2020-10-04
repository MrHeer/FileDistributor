package com.mrheer.filedistributorservice.model;

import java.util.List;

public class HostModel {
    private string status;
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
        private String group_name;
        private String host_name;
        private String ip_address;

        public String getKey() {
            return key;
        }

        public void setKey(String key) {
            this.key = key;
        }

        public String getGroup_name() {
            return group_name;
        }

        public void setGroup_name(String group_name) {
            this.group_name = group_name;
        }

        public String getHost_name() {
            return host_name;
        }

        public void setHost_name(String host_name) {
            this.host_name = host_name;
        }

        public String getIp_address() {
            return ip_address;
        }

        public void setIp_address(String ip_address) {
            this.ip_address = ip_address;
        }
    }
}
