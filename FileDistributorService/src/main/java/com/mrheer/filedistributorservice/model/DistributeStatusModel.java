package com.mrheer.filedistributorservice.model;

import java.util.List;

public class DistributeStatusModel {
    private String distributeStatus;
    private List<SelectedHost> selectedHosts;

    public String getDistributeStatus() {
        return distributeStatus;
    }

    public void setDistributeStatus(String distributeStatus) {
        this.distributeStatus = distributeStatus;
    }

    public List<SelectedHost> getSelectedHosts() {
        return selectedHosts;
    }

    public void setSelectedHosts(List<SelectedHost> selectedHosts) {
        this.selectedHosts = selectedHosts;
    }

}
