import {
  getHostData,
  addHost,
  deleteHost,
  editHost,
  testHost,
} from "@/services/api";
import { Effect, Reducer } from "umi";
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

    *add({ payload, callback }, { call, put }) {
      const data = yield call(addHost, payload);
      yield put({
        type: "addHost",
        payload: data,
        callback,
      });
    },

    *delete({ payload, callback }, { call, put }) {
      const data = yield call(deleteHost, payload);
      yield put({
        type: "deleteHost",
        payload: data,
        callback,
      });
    },

    *edit({ payload, callback }, { call, put }) {
      const data = yield call(editHost, payload);
      yield put({
        type: "editHost",
        payload: data,
        callback,
      });
    },

    *test({ payload, callback }, { call, put }) {
      const data = yield call(testHost, payload);
      yield put({
        type: "testHost",
        payload: data,
        callback,
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

    addHost(state = defaultState, { payload: data, callback }) {
      const { hostData, status } = data;
      callback(status);
      return {
        ...state,
        hostData,
        status,
      };
    },

    deleteHost(state = defaultState, { payload: data, callback }) {
      const { hostData, status } = data;
      callback(status);
      return {
        ...state,
        hostData,
        status,
      };
    },

    editHost(state = defaultState, { payload: data, callback }) {
      const { hostData, status } = data;
      callback(status);
      return {
        ...state,
        hostData,
        status,
      };
    },

    testHost(state = defaultState, { payload: data, callback }) {
      const { status } = data;
      callback(status);
      return {
        ...state,
        status,
      };
    },
  },
};

export default HostDataModel;
