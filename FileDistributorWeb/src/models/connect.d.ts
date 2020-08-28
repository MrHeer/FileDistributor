import { MenuDataItem, Settings as ProSettings } from "@ant-design/pro-layout";

import { DistributeDataModelState } from "./distributeData";
import { TreeDataModelState } from "./treeData";
import { FileDataModelState } from "./fileData";
import { HostDataModelState } from "./hostData";

export { DistributeDataModelState, TreeDataModelState, HostDataModelState };

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    distribute?: boolean;
    treeData?: boolean;
    fileData?: boolean;
    hostData?: boolean;
  };
}

export interface ConnectState {
  loading: Loading;
  settings: ProSettings;
  distribute: DistributeDataModelState;
  treeData: TreeDataModelState;
  fileData: FileDataModelState;
  hostData: HostDataModelState;
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}
