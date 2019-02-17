import { queryHostData } from '@/services/api';

export default {
    namespace: 'hostData',
    state: {
        hostData: []
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const data = yield call(queryHostData, payload);
            yield put({
                type: 'hostData',
                payload: data
            });
        }
    },

    reducers: {
        hostData(state, {payload: data}) {
            const { hostData } = data;
            return {
                hostData
            };
        }
    }
};
