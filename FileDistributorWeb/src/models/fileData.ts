import { getFileData, deleteFile } from "@/services/api";
import { Effect, Reducer } from "umi";
import { File, Status } from "./interface";

const defaultState: FileDataModelState = {
  fileData: [],
  status: "wait",
};

export interface FileDataModelState {
  fileData: File[];
  status: Status;
}

interface FileDataModelType {
  namespace: "fileData";
  state: FileDataModelState;
  effects: {
    fetch: Effect;
    delete: Effect;
  };
  reducers: {
    fileData: Reducer<FileDataModelState>;
    deleteFile: Reducer<FileDataModelState>;
  };
}

const FileDataModel: FileDataModelType = {
  namespace: "fileData",
  state: defaultState,

  effects: {
    *fetch({ payload }, { call, put }) {
      const data = yield call(getFileData, payload);
      yield put({
        type: "fileData",
        payload: data,
      });
    },

    *delete({ payload, callback }, { call, put }) {
      const data = yield call(deleteFile, payload);
      yield put({
        type: "deleteFile",
        payload: data,
        callback,
      });
    },
  },

  reducers: {
    fileData(state = defaultState, { payload: data }) {
      const { fileData } = data;
      return {
        ...state,
        fileData,
      };
    },

    deleteFile(state = defaultState, { payload: data, callback }) {
      const { fileData, status } = data;
      callback(status);
      return {
        ...state,
        fileData,
        status,
      };
    },
  },
};

export default FileDataModel;
