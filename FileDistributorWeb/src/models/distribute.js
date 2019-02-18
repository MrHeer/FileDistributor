import { distribute } from '@/services/api';

export default {
    namespace: 'distribute',
    state: {
        distributeStatus: {}
    },

    effects: {
        *distribute({ payload }, { call, put }) {
            const data = yield call(distribute, payload);
            yield put({
                type: 'distributeStatus',
                payload: data
            });
        }
    },

    reducers: {
        distributeStatus(state, {payload: data}) {
            const { distributeStatus } = data;
            return {
                distributeStatus: distributeStatus,
                loading: false
            };
        }
    }
};
