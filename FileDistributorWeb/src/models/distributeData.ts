import { distribute } from "@/services/api";
import { Effect, Reducer } from "umi";
import { DistributeHost as Host, ButtonType, Status } from "./interface";

const defaultState: DistributeDataModelState = {
  distributeStatus: "",
  selectedHosts: [],
  buttonType: "distribute",
};

export interface DistributeDataModelState {
  distributeStatus: Status | "";
  selectedHosts: Host[];
  buttonType: ButtonType;
}

interface DistributeDataModelType {
  namespace: "distributeData";
  state: DistributeDataModelState;
  effects: {
    distribute: Effect;
  };
  reducers: {
    distributeData: Reducer<DistributeDataModelState>;
    updateSelectHost: Reducer<DistributeDataModelState>;
  };
}

const DistributeDataModel: DistributeDataModelType = {
  namespace: "distributeData",
  state: defaultState,

  effects: {
    *distribute({ payload, callback }, { call, put }) {
      const data = yield call(distribute, payload);
      yield put({
        type: "distributeData",
        payload: data,
        callback,
      });
    },
  },

  reducers: {
    distributeData(
      state,
      { payload: data, callback }
    ): DistributeDataModelState {
      const { distributeStatus, selectedHosts } = data;
      callback(distributeStatus);
      let buttonType: ButtonType = "reset";
      if (distributeStatus === "success") {
        buttonType = "reset";
      } else if (distributeStatus === "error") {
        buttonType = "retry";
      }
      return {
        ...state,
        distributeStatus,
        selectedHosts,
        buttonType,
      };
    },

    updateSelectHost(
      state = defaultState,
      { payload: data }
    ): DistributeDataModelState {
      const { selectedHosts } = data;
      return {
        ...state,
        selectedHosts,
        buttonType: "distribute",
      };
    },
  },
};

export default DistributeDataModel;
