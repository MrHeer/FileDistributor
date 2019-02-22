package com.mrheer.filedistributorservice.model;

import java.util.List;

public class HostModel {

    /**
     * hostData : [{"key":"1","group_name":"Group1","host_name":"Host1","ip_address":"10.34.45.1"},{"key":"2","group_name":"Group1","host_name":"Host2","ip_address":"10.34.45.2"},{"key":"3","group_name":"Group1","host_name":"Host3","ip_address":"10.34.45.3"},{"key":"4","group_name":"Group1","host_name":"Host4","ip_address":"10.34.45.4"},{"key":"5","group_name":"Group1","host_name":"Host5","ip_address":"10.34.45.5"},{"key":"6","group_name":"Group1","host_name":"Host6","ip_address":"10.34.45.6"},{"key":"7","group_name":"Group1","host_name":"Host7","ip_address":"10.34.45.7"},{"key":"8","group_name":"Group1","host_name":"Host8","ip_address":"10.34.45.8"},{"key":"9","group_name":"Group1","host_name":"Host9","ip_address":"10.34.45.9"},{"key":"10","group_name":"Group1","host_name":"Host10","ip_address":"10.34.45.10"},{"key":"11","group_name":"Group1","host_name":"Host11","ip_address":"10.34.45.11"},{"key":"12","group_name":"Group1","host_name":"Host12","ip_address":"10.34.45.12"},{"key":"13","group_name":"Group1","host_name":"Host13","ip_address":"10.34.45.13"},{"key":"14","group_name":"Group1","host_name":"Host14","ip_address":"10.34.45.14"},{"key":"15","group_name":"Group1","host_name":"Host15","ip_address":"10.34.45.15"},{"key":"16","group_name":"Group1","host_name":"Host16","ip_address":"10.34.45.16"},{"key":"17","group_name":"Group1","host_name":"Host17","ip_address":"10.34.45.17"},{"key":"18","group_name":"Group1","host_name":"Host18","ip_address":"10.34.45.18"},{"key":"19","group_name":"Group1","host_name":"Host19","ip_address":"10.34.45.19"},{"key":"20","group_name":"Group1","host_name":"Host20","ip_address":"10.34.45.20"},{"key":"21","group_name":"Group1","host_name":"Host21","ip_address":"10.34.45.21"},{"key":"22","group_name":"Group1","host_name":"Host22","ip_address":"10.34.45.22"},{"key":"23","group_name":"Group1","host_name":"Host23","ip_address":"10.34.45.23"},{"key":"24","group_name":"Group1","host_name":"Host24","ip_address":"10.34.45.24"},{"key":"25","group_name":"Group1","host_name":"Host25","ip_address":"10.34.45.25"},{"key":"26","group_name":"Group1","host_name":"Host26","ip_address":"10.34.45.26"},{"key":"27","group_name":"Group1","host_name":"Host27","ip_address":"10.34.45.27"},{"key":"28","group_name":"Group1","host_name":"Host28","ip_address":"10.34.45.28"},{"key":"29","group_name":"Group1","host_name":"Host29","ip_address":"10.34.45.29"},{"key":"30","group_name":"Group1","host_name":"Host30","ip_address":"10.34.45.30"},{"key":"31","group_name":"Group1","host_name":"Host31","ip_address":"10.34.45.31"},{"key":"32","group_name":"Group1","host_name":"Host32","ip_address":"10.34.45.32"},{"key":"33","group_name":"Group1","host_name":"Host33","ip_address":"10.34.45.33"},{"key":"34","group_name":"Group1","host_name":"Host34","ip_address":"10.34.45.34"},{"key":"35","group_name":"Group1","host_name":"Host35","ip_address":"10.34.45.35"},{"key":"36","group_name":"Group1","host_name":"Host36","ip_address":"10.34.45.36"},{"key":"37","group_name":"Group1","host_name":"Host37","ip_address":"10.34.45.37"},{"key":"38","group_name":"Group1","host_name":"Host38","ip_address":"10.34.45.38"},{"key":"39","group_name":"Group1","host_name":"Host39","ip_address":"10.34.45.39"},{"key":"40","group_name":"Group1","host_name":"Host40","ip_address":"10.34.45.40"},{"key":"41","group_name":"Group1","host_name":"Host41","ip_address":"10.34.45.41"},{"key":"42","group_name":"Group1","host_name":"Host42","ip_address":"10.34.45.42"},{"key":"43","group_name":"Group1","host_name":"Host43","ip_address":"10.34.45.43"},{"key":"44","group_name":"Group1","host_name":"Host44","ip_address":"10.34.45.44"},{"key":"45","group_name":"Group1","host_name":"Host45","ip_address":"10.34.45.45"},{"key":"46","group_name":"Group1","host_name":"Host46","ip_address":"10.34.45.46"},{"key":"47","group_name":"Group1","host_name":"Host47","ip_address":"10.34.45.47"},{"key":"48","group_name":"Group1","host_name":"Host48","ip_address":"10.34.45.48"},{"key":"49","group_name":"Group1","host_name":"Host49","ip_address":"10.34.45.49"},{"key":"50","group_name":"Group1","host_name":"Host50","ip_address":"10.34.45.50"},{"key":"51","group_name":"Group1","host_name":"Host51","ip_address":"10.34.45.51"},{"key":"52","group_name":"Group1","host_name":"Host52","ip_address":"10.34.45.52"},{"key":"53","group_name":"Group1","host_name":"Host53","ip_address":"10.34.45.53"},{"key":"54","group_name":"Group1","host_name":"Host54","ip_address":"10.34.45.54"},{"key":"55","group_name":"Group1","host_name":"Host55","ip_address":"10.34.45.55"},{"key":"56","group_name":"Group1","host_name":"Host56","ip_address":"10.34.45.56"},{"key":"57","group_name":"Group1","host_name":"Host57","ip_address":"10.34.45.57"},{"key":"58","group_name":"Group1","host_name":"Host58","ip_address":"10.34.45.58"},{"key":"59","group_name":"Group1","host_name":"Host59","ip_address":"10.34.45.59"},{"key":"60","group_name":"Group1","host_name":"Host60","ip_address":"10.34.45.60"},{"key":"61","group_name":"Group2","host_name":"Host61","ip_address":"10.34.46.61"},{"key":"62","group_name":"Group2","host_name":"Host62","ip_address":"10.34.46.62"},{"key":"63","group_name":"Group2","host_name":"Host63","ip_address":"10.34.46.63"},{"key":"64","group_name":"Group2","host_name":"Host64","ip_address":"10.34.46.64"},{"key":"65","group_name":"Group2","host_name":"Host65","ip_address":"10.34.46.65"},{"key":"66","group_name":"Group2","host_name":"Host66","ip_address":"10.34.46.66"},{"key":"67","group_name":"Group2","host_name":"Host67","ip_address":"10.34.46.67"},{"key":"68","group_name":"Group2","host_name":"Host68","ip_address":"10.34.46.68"},{"key":"69","group_name":"Group2","host_name":"Host69","ip_address":"10.34.46.69"},{"key":"70","group_name":"Group2","host_name":"Host70","ip_address":"10.34.46.70"},{"key":"71","group_name":"Group2","host_name":"Host71","ip_address":"10.34.46.71"},{"key":"72","group_name":"Group2","host_name":"Host72","ip_address":"10.34.46.72"},{"key":"73","group_name":"Group2","host_name":"Host73","ip_address":"10.34.46.73"},{"key":"74","group_name":"Group2","host_name":"Host74","ip_address":"10.34.46.74"},{"key":"75","group_name":"Group2","host_name":"Host75","ip_address":"10.34.46.75"},{"key":"76","group_name":"Group2","host_name":"Host76","ip_address":"10.34.46.76"},{"key":"77","group_name":"Group2","host_name":"Host77","ip_address":"10.34.46.77"},{"key":"78","group_name":"Group2","host_name":"Host78","ip_address":"10.34.46.78"},{"key":"79","group_name":"Group2","host_name":"Host79","ip_address":"10.34.46.79"},{"key":"80","group_name":"Group2","host_name":"Host80","ip_address":"10.34.46.80"},{"key":"81","group_name":"Group2","host_name":"Host81","ip_address":"10.34.46.81"},{"key":"82","group_name":"Group2","host_name":"Host82","ip_address":"10.34.46.82"},{"key":"83","group_name":"Group2","host_name":"Host83","ip_address":"10.34.46.83"},{"key":"84","group_name":"Group2","host_name":"Host84","ip_address":"10.34.46.84"},{"key":"85","group_name":"Group2","host_name":"Host85","ip_address":"10.34.46.85"},{"key":"86","group_name":"Group2","host_name":"Host86","ip_address":"10.34.46.86"},{"key":"87","group_name":"Group2","host_name":"Host87","ip_address":"10.34.46.87"},{"key":"88","group_name":"Group2","host_name":"Host88","ip_address":"10.34.46.88"},{"key":"89","group_name":"Group2","host_name":"Host89","ip_address":"10.34.46.89"},{"key":"90","group_name":"Group2","host_name":"Host90","ip_address":"10.34.46.90"},{"key":"91","group_name":"Group2","host_name":"Host91","ip_address":"10.34.46.91"},{"key":"92","group_name":"Group2","host_name":"Host92","ip_address":"10.34.46.92"},{"key":"93","group_name":"Group2","host_name":"Host93","ip_address":"10.34.46.93"},{"key":"94","group_name":"Group2","host_name":"Host94","ip_address":"10.34.46.94"},{"key":"95","group_name":"Group2","host_name":"Host95","ip_address":"10.34.46.95"},{"key":"96","group_name":"Group2","host_name":"Host96","ip_address":"10.34.46.96"},{"key":"97","group_name":"Group2","host_name":"Host97","ip_address":"10.34.46.97"},{"key":"98","group_name":"Group2","host_name":"Host98","ip_address":"10.34.46.98"},{"key":"99","group_name":"Group2","host_name":"Host99","ip_address":"10.34.46.99"},{"key":"100","group_name":"Group2","host_name":"Host100","ip_address":"10.34.46.100"},{"key":"101","group_name":"Group2","host_name":"Host101","ip_address":"10.34.46.101"},{"key":"102","group_name":"Group2","host_name":"Host102","ip_address":"10.34.46.102"},{"key":"103","group_name":"Group2","host_name":"Host103","ip_address":"10.34.46.103"},{"key":"104","group_name":"Group2","host_name":"Host104","ip_address":"10.34.46.104"},{"key":"105","group_name":"Group2","host_name":"Host105","ip_address":"10.34.46.105"},{"key":"106","group_name":"Group2","host_name":"Host106","ip_address":"10.34.46.106"},{"key":"107","group_name":"Group2","host_name":"Host107","ip_address":"10.34.46.107"},{"key":"108","group_name":"Group2","host_name":"Host108","ip_address":"10.34.46.108"},{"key":"109","group_name":"Group2","host_name":"Host109","ip_address":"10.34.46.109"},{"key":"110","group_name":"Group2","host_name":"Host110","ip_address":"10.34.46.110"},{"key":"111","group_name":"Group2","host_name":"Host111","ip_address":"10.34.46.111"},{"key":"112","group_name":"Group2","host_name":"Host112","ip_address":"10.34.46.112"},{"key":"113","group_name":"Group2","host_name":"Host113","ip_address":"10.34.46.113"},{"key":"114","group_name":"Group2","host_name":"Host114","ip_address":"10.34.46.114"},{"key":"115","group_name":"Group2","host_name":"Host115","ip_address":"10.34.46.115"},{"key":"116","group_name":"Group2","host_name":"Host116","ip_address":"10.34.46.116"},{"key":"117","group_name":"Group2","host_name":"Host117","ip_address":"10.34.46.117"},{"key":"118","group_name":"Group2","host_name":"Host118","ip_address":"10.34.46.118"},{"key":"119","group_name":"Group2","host_name":"Host119","ip_address":"10.34.46.119"},{"key":"120","group_name":"Group2","host_name":"Host120","ip_address":"10.34.46.120"}]
     * status : error
     */

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
        /**
         * key : 1
         * group_name : Group1
         * host_name : Host1
         * ip_address : 10.34.45.1
         */

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
