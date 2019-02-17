import { queryTreeData } from '@/services/api';

export default {
    namespace: 'treeData',
    state: {
        treeData: []
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const data = yield call(queryTreeData, payload);
            yield put({
                type: 'treeData',
                payload: data
            });
        }
    },

    reducers: {
        treeData(state, {payload: data}) {
            const { treeData } = data;
            return {
                treeData
            };
        }
    }
};
