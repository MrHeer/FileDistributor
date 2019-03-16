package com.mrheer.filedistributorservice.model;

import java.util.List;

public class FileModel {

    private List<FileDataBean> fileData;

    public List<FileDataBean> getFileData() {
        return fileData;
    }

    public void setFileData(List<FileDataBean> fileData) {
        this.fileData = fileData;
    }

    public static class FileDataBean {
        /**
         * key : 1
         * type : -
         * permissions : r-x r-x r-x
         * numbers : 1
         * user : root
         * group : root
         * size : 1M
         * modify_time : 2019-03-23 15:32:40
         * name : File1
         */

        private String key;
        private String type;
        private String permissions;
        private String numbers;
        private String user;
        private String group;
        private String size;
        private String modify_time;
        private String name;

        public String getKey() {
            return key;
        }

        public void setKey(String key) {
            this.key = key;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public String getPermissions() {
            return permissions;
        }

        public void setPermissions(String permissions) {
            this.permissions = permissions;
        }

        public String getNumbers() {
            return numbers;
        }

        public void setNumbers(String numbers) {
            this.numbers = numbers;
        }

        public String getUser() {
            return user;
        }

        public void setUser(String user) {
            this.user = user;
        }

        public String getGroup() {
            return group;
        }

        public void setGroup(String group) {
            this.group = group;
        }

        public String getSize() {
            return size;
        }

        public void setSize(String size) {
            this.size = size;
        }

        public String getModify_time() {
            return modify_time;
        }

        public void setModify_time(String modify_time) {
            this.modify_time = modify_time;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }
}
