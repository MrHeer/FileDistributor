import { getFileData, deleteFile } from "@/services/api";
import { message } from "antd";
import { formatMessage, Effect, Reducer } from "umi";
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

    *delete({ payload }, { call, put }) {
      const data = yield call(deleteFile, payload);
      yield put({
        type: "deleteFile",
        payload: data,
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

    deleteFile(state = defaultState, { payload: data }) {
      const { fileData, status } = data;
      if (status === "success") {
        message.success(formatMessage({ id: "delete_success" }));
      } else if (status === "error") {
        message.error(formatMessage({ id: "delete_error" }));
      }
      return {
        ...state,
        fileData,
      };
    },
  },
};

export default FileDataModel;
