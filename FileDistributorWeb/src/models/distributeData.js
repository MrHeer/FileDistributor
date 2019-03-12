import { distribute } from '@/services/api';
import { message } from 'antd';
import { formatMessage } from 'umi/locale';

export default {
    namespace: 'distributeData',
    state: {
        distributeStatus: {},
        selectedHost: []
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
            const { distributeStatus, selectedHost } = data;
            if(distributeStatus === 'success') {
                message.success(formatMessage({ id: 'distribute_success' }));
            } else if(distributeStatus === 'error') {
                message.error(formatMessage({ id: 'distribute_error' }));
            }
            return {
                distributeStatus: distributeStatus,
                selectedHost: selectedHost
            };
        },

        selectHost(state, {payload: data}) {
            const { selectedHost } = data;
            return {
                selectedHost: selectedHost
            };
        }
    }
};
