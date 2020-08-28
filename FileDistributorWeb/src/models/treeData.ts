import { getTreeData } from "@/services/api";
import { Effect, Reducer } from "umi";
import { Tree } from "./interface";

const defaultState: TreeDataModelState = {
  treeData: [],
};

export interface TreeDataModelState {
  treeData: Tree[];
}

interface TreeDataModelType {
  namespace: "treeData";
  state: TreeDataModelState;
  effects: {
    fetch: Effect;
  };
  reducers: {
    treeData: Reducer<TreeDataModelState>;
  };
}

const TreeDataModel: TreeDataModelType = {
  namespace: "treeData",
  state: defaultState,

  effects: {
    *fetch({ payload }, { call, put }) {
      const data = yield call(getTreeData, payload);
      yield put({
        type: "treeData",
        payload: data,
      });
    },
  },

  reducers: {
    treeData(_state, { payload: data }) {
      const { treeData } = data;
      return {
        treeData,
      };
    },
  },
};

export default TreeDataModel;
