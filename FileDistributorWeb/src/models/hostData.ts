import {
  getHostData,
  addHost,
  deleteHost,
  editHost,
  testHost,
} from "@/services/api";
import { message } from "antd";
import { formatMessage, Effect, Reducer } from "umi";
import { Host, Status } from "./interface";

const defaultState: HostDataModelState = {
  hostData: [],
  status: "wait",
};

export interface HostDataModelState {
  hostData: Host[];
  status: Status;
}

interface HostDataModelType {
  namespace: "hostData";
  state: HostDataModelState;
  effects: {
    fetch: Effect;
    add: Effect;
    delete: Effect;
    edit: Effect;
    test: Effect;
  };
  reducers: {
    hostData: Reducer<HostDataModelState>;
    addHost: Reducer<HostDataModelState>;
    deleteHost: Reducer<HostDataModelState>;
    editHost: Reducer<HostDataModelState>;
    testHost: Reducer<HostDataModelState>;
  };
}

const HostDataModel: HostDataModelType = {
  namespace: "hostData",
  state: defaultState,

  effects: {
    *fetch({ payload }, { call, put }) {
      const data = yield call(getHostData, payload);
      yield put({
        type: "hostData",
        payload: data,
      });
    },

    *add({ payload }, { call, put }) {
      const data = yield call(addHost, payload);
      yield put({
        type: "addHost",
        payload: data,
      });
    },

    *delete({ payload }, { call, put }) {
      const data = yield call(deleteHost, payload);
      yield put({
        type: "deleteHost",
        payload: data,
      });
    },

    *edit({ payload }, { call, put }) {
      const data = yield call(editHost, payload);
      yield put({
        type: "editHost",
        payload: data,
      });
    },

    *test({ payload }, { call, put }) {
      const data = yield call(testHost, payload);
      yield put({
        type: "testHost",
        payload: data,
      });
    },
  },

  reducers: {
    hostData(state = defaultState, { payload: data }) {
      const { hostData } = data;
      return {
        ...state,
        hostData,
      };
    },

    addHost(state = defaultState, { payload: data }) {
      const { hostData, status } = data;
      if (status === "success") {
        message.success(formatMessage({ id: "add_success" }));
      } else if (status === "error") {
        message.error(formatMessage({ id: "add_error" }));
      }
      return {
        ...state,
        hostData,
      };
    },

    deleteHost(state = defaultState, { payload: data }) {
      const { hostData, status } = data;
      if (status === "success") {
        message.success(formatMessage({ id: "delete_success" }));
      } else if (status === "error") {
        message.error(formatMessage({ id: "delete_error" }));
      }
      return {
        ...state,
        hostData,
      };
    },

    editHost(state = defaultState, { payload: data }) {
      const { hostData, status } = data;
      if (status === "success") {
        message.success(formatMessage({ id: "edit_success" }));
      } else if (status === "error") {
        message.error(formatMessage({ id: "edit_error" }));
      }
      return {
        ...state,
        hostData,
      };
    },

    testHost(state = defaultState, { payload: data }) {
      const { status } = data;
      if (status === "success") {
        message.success(formatMessage({ id: "test_success" }));
      } else if (status === "error") {
        message.error(formatMessage({ id: "test_error" }));
      }
      return {
        ...state,
        status,
      };
    },
  },
};

export default HostDataModel;
