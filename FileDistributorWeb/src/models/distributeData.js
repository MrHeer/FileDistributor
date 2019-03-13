import { distribute } from '@/services/api';
import { message } from 'antd';
import { formatMessage } from 'umi/locale';

export default {
    namespace: 'distributeData',
    state: {
        distributeStatus: {},
        selectedHost: [],
        // buttonType: 'distribute', 'retry', 'reset'
        buttonType: 'distribute'
    },

    effects: {
        *distribute({ payload }, { call, put }) {
            const data = yield call(distribute, payload);
            yield put({
                type: 'distributeData',
                payload: data
            });
        }
    },

    reducers: {
        distributeData(state, {payload: data}) {
            const { distributeStatus, selectedHost } = data;
            var buttonType;
            if(distributeStatus === 'success') {
                buttonType = 'reset';
                message.success(formatMessage({ id: 'distribute_success' }));
            } else if(distributeStatus === 'error') {
                buttonType = 'retry';
                message.error(formatMessage({ id: 'distribute_error' }));
            }
            return {
                distributeStatus: distributeStatus,
                selectedHost: selectedHost,
                buttonType: buttonType
            };
        },

        updateSelectHost(state, {payload: data}) {
            const { selectedHost } = data;
            return {
                selectedHost: selectedHost,
                buttonType: 'distribute'
            };
        }
    }
};
