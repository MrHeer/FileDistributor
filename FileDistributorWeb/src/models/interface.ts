export type ButtonType = "distribute" | "retry" | "reset";

export type Status = "wait" | "success" | "exist" | "error";

export interface DistributeHost {
  key: string;
  title: string;
  status: Status;
}

export interface Host {
  key: string;
  groupName: string;
  hostName: string;
  ipAddress: string;
}

export interface File {
  key: string;
  type: string;
  permissions: string;
  numbers: string;
  user: string;
  groupName: string;
  size: string;
  modifyTime: string;
  name: string;
}

export interface Tree {
  title: string;
  key: string;
  children?: Tree[];
}
