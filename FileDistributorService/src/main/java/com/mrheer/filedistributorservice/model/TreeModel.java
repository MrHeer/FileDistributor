package com.mrheer.filedistributorservice.model;

import java.util.List;

public class TreeModel {

    private List<TreeDataBean> treeData;

    public List<TreeDataBean> getTreeData() {
        return treeData;
    }

    public void setTreeData(List<TreeDataBean> treeData) {
        this.treeData = treeData;
    }

    public static class TreeDataBean {
        /**
         * title : Group-0
         * key : G-0
         * children : [{"title":"Host-0","key":"H-0"},{"title":"Host-1","key":"H-1"},{"title":"Host-2","key":"H-2"}]
         */

        private String title;
        private String key;
        private List<ChildrenBean> children;

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getKey() {
            return key;
        }

        public void setKey(String key) {
            this.key = key;
        }

        public List<ChildrenBean> getChildren() {
            return children;
        }

        public void setChildren(List<ChildrenBean> children) {
            this.children = children;
        }

        public static class ChildrenBean {
            /**
             * title : Host-0
             * key : H-0
             */

            private String title;
            private String key;

            public String getTitle() {
                return title;
            }

            public void setTitle(String title) {
                this.title = title;
            }

            public String getKey() {
                return key;
            }

            public void setKey(String key) {
                this.key = key;
            }
        }
    }
}
