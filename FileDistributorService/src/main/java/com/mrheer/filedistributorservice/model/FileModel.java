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
        private String key;
        private String type;
        private String permissions;
        private String numbers;
        private String user;
        private String group;
        private String size;
        private String modifyTime;
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

        public String getModifyTime() {
            return modifyTime;
        }

        public void setModifyTime(String modifyTime) {
            this.modifyTime = modifyTime;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }
}
