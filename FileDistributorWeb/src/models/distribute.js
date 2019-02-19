import { distribute } from '@/services/api';
import { message } from 'antd';
import { formatMessage } from 'umi/locale';

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
            if(distributeStatus.status === 'success') {
                message.success(formatMessage({ id: 'distribute_success' }));
            } else if(distributeStatus.status === 'error') {
                message.error(formatMessage({ id: 'distribute_error' }));
            }
            return {
                distributeStatus: distributeStatus
            };
        }
    }
};
