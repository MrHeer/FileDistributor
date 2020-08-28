import { distribute } from "@/services/api";
import { message } from "antd";
import { formatMessage, Effect, Reducer } from "umi";
import { DistributeHost as Host, ButtonType } from "./interface";

const defaultState: DistributeDataModelState = {
  distributeStatus: "",
  selectedHost: [],
  buttonType: "distribute",
};

export interface DistributeDataModelState {
  distributeStatus: string;
  selectedHost: Host[];
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
    *distribute({ payload }, { call, put }) {
      const data = yield call(distribute, payload);
      yield put({
        type: "distributeData",
        payload: data,
      });
    },
  },

  reducers: {
    distributeData(_state, { payload: data }): DistributeDataModelState {
      const { distributeStatus, selectedHost } = data;
      let buttonType: ButtonType = "reset";
      if (distributeStatus === "success") {
        buttonType = "reset";
        message.success(formatMessage({ id: "distribute_success" }));
      } else if (distributeStatus === "error") {
        buttonType = "retry";
        message.error(formatMessage({ id: "distribute_error" }));
      }
      return {
        distributeStatus,
        selectedHost,
        buttonType,
      };
    },

    updateSelectHost(
      state = defaultState,
      { payload: data }
    ): DistributeDataModelState {
      const { selectedHost } = data;
      return {
        ...state,
        selectedHost,
        buttonType: "distribute",
      };
    },
  },
};

export default DistributeDataModel;
