package com.mrheer.filedistributorservice.model;

public class DistributeStatusModel {

    /**
     * distributeStatus : {"status":"success"}
     */

    private DistributeStatusBean distributeStatus;

    public DistributeStatusBean getDistributeStatus() {
        return distributeStatus;
    }

    public void setDistributeStatus(DistributeStatusBean distributeStatus) {
        this.distributeStatus = distributeStatus;
    }

    public static class DistributeStatusBean {
        /**
         * status : success
         */

        private String status;

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }
}
