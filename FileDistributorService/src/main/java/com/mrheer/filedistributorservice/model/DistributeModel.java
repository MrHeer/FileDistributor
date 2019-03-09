package com.mrheer.filedistributorservice.model;

import java.util.List;

public class DistributeModel {

    /**
     * fileList : [{"uid":"d0c54f6a94729c51503048b416fa3817","lastModified":1547135172668,"lastModifiedDate":"2019-01-10T15:46:12.668Z","name":"201811_Bill.pdf","size":226030,"type":"application/pdf","percent":100,"originFileObj":{"uid":"rc-upload-1552119770912-2"},"status":"done","response":{"uid":"d0c54f6a94729c51503048b416fa3817","status":"success"}},{"uid":"a0cfbd8b0bb2f1f0cdd6e8fc00d7bac3","lastModified":1547135213133,"lastModifiedDate":"2019-01-10T15:46:53.133Z","name":"201812_Bill.pdf","size":227210,"type":"application/pdf","percent":100,"originFileObj":{"uid":"rc-upload-1552119770912-3"},"status":"done","response":{"uid":"a0cfbd8b0bb2f1f0cdd6e8fc00d7bac3","status":"success"}}]
     * selectedHost : [{"key":"7","percent":0},{"key":"8","percent":0},{"key":"9","percent":0}]
     * remotePath : /tmp/upload
     */

    private String remotePath;
    private List<FileListBean> fileList;
    private List<SelectedHostBean> selectedHost;

    public String getRemotePath() {
        return remotePath;
    }

    public void setRemotePath(String remotePath) {
        this.remotePath = remotePath;
    }

    public List<FileListBean> getFileList() {
        return fileList;
    }

    public void setFileList(List<FileListBean> fileList) {
        this.fileList = fileList;
    }

    public List<SelectedHostBean> getSelectedHost() {
        return selectedHost;
    }

    public void setSelectedHost(List<SelectedHostBean> selectedHost) {
        this.selectedHost = selectedHost;
    }

    public static class FileListBean {
        /**
         * uid : d0c54f6a94729c51503048b416fa3817
         * lastModified : 1547135172668
         * lastModifiedDate : 2019-01-10T15:46:12.668Z
         * name : 201811_Bill.pdf
         * size : 226030
         * type : application/pdf
         * percent : 100
         * originFileObj : {"uid":"rc-upload-1552119770912-2"}
         * status : done
         * response : {"uid":"d0c54f6a94729c51503048b416fa3817","status":"success"}
         */

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
             * uid : rc-upload-1552119770912-2
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
             * uid : d0c54f6a94729c51503048b416fa3817
             * status : success
             */

            private String uid;
            private String status;

            public String getUid() {
                return uid;
            }

            public void setUid(String uid) {
                this.uid = uid;
            }

            public String getStatus() {
                return status;
            }

            public void setStatus(String status) {
                this.status = status;
            }
        }
    }

    public static class SelectedHostBean {
        /**
         * key : 7
         * percent : 0
         */

        private String key;
        private int percent;

        public String getKey() {
            return key;
        }

        public void setKey(String key) {
            this.key = key;
        }

        public int getPercent() {
            return percent;
        }

        public void setPercent(int percent) {
            this.percent = percent;
        }
    }
}
