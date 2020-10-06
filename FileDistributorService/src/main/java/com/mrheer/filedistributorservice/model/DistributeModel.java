package com.mrheer.filedistributorservice.model;

import java.util.List;

public class DistributeModel {
    private String remotePath;
    private String type;
    private List<FileListBean> fileList;
    private List<SelectedHost> selectedHosts;

    public String getRemotePath() {
        return remotePath;
    }

    public void setRemotePath(String remotePath) {
        this.remotePath = remotePath;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<FileListBean> getFileList() {
        return fileList;
    }

    public void setFileList(List<FileListBean> fileList) {
        this.fileList = fileList;
    }

    public List<SelectedHost> getSelectedHosts() {
        return selectedHosts;
    }

    public void setSelectedHosts(List<SelectedHost> selectedHosts) {
        this.selectedHosts = selectedHosts;
    }

    public static class FileListBean {
        private String uid;
        private long lastModified;
        private String lastModifiedDate;
        private String name;
        private int size;
        private String type;
        private int percent;
        private OriginFileObjBean originFileObj;
        private String status;
        private ResponseBean response;

        public String getUid() {
            return uid;
        }

        public void setUid(String uid) {
            this.uid = uid;
        }

        public long getLastModified() {
            return lastModified;
        }

        public void setLastModified(long lastModified) {
            this.lastModified = lastModified;
        }

        public String getLastModifiedDate() {
            return lastModifiedDate;
        }

        public void setLastModifiedDate(String lastModifiedDate) {
            this.lastModifiedDate = lastModifiedDate;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public int getSize() {
            return size;
        }

        public void setSize(int size) {
            this.size = size;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public int getPercent() {
            return percent;
        }

        public void setPercent(int percent) {
            this.percent = percent;
        }

        public OriginFileObjBean getOriginFileObj() {
            return originFileObj;
        }

        public void setOriginFileObj(OriginFileObjBean originFileObj) {
            this.originFileObj = originFileObj;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public ResponseBean getResponse() {
            return response;
        }

        public void setResponse(ResponseBean response) {
            this.response = response;
        }

        public static class OriginFileObjBean {
            /**
             * uid : rc-upload-1552719767003-2
             */

            private String uid;

            public String getUid() {
                return uid;
            }

            public void setUid(String uid) {
                this.uid = uid;
            }
        }

        public static class ResponseBean {
            /**
             * uid : uid-xxx
             * url : /uploadFile/xxx
             * status : success
             */

            private String uid;
            private String url;
            private String status;

            public String getUid() {
                return uid;
            }

            public void setUid(String uid) {
                this.uid = uid;
            }

            public String getUrl() {
                return url;
            }

            public void setUrl(String url) {
                this.url = url;
            }

            public String getStatus() {
                return status;
            }

            public void setStatus(String status) {
                this.status = status;
            }
        }
    }
}
