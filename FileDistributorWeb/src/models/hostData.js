import { getHostData, addHost, deleteHost, editHost, testHost } from '@/services/api';
import { message } from 'antd';
import { formatMessage } from 'umi/locale';

export default {
    namespace: 'hostData',
    state: {
        hostData: [],
        status: ''
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const data = yield call(getHostData, payload);
            yield put({
                type: 'hostData',
                payload: data
            });
        },

        *add({ payload }, { call, put }) {
            const data = yield call(addHost, payload);
            yield put({
                type: 'addHost',
                payload: data
            });
        },

        *delete({ payload }, { call, put }) {
            const data = yield call(deleteHost, payload);
            yield put({
                type: 'deleteHost',
                payload: data
            });
        },

        *edit({ payload }, { call, put }) {
            const data = yield call(editHost, payload);
            yield put({
                type: 'editHost',
                payload: data
            });
        },

        *test({ payload }, { call, put }) {
            const data = yield call(testHost, payload);
            yield put({
                type: 'testHost',
                payload: data
            });
        }
    },

    reducers: {
        hostData(state, {payload: data}) {
            const { hostData } = data;
            return {
                hostData: hostData
            };
        },

        addHost(state, {payload: data}) {
            const { hostData, status } = data;
            if(status === 'success') {
                message.success(formatMessage({ id: 'add_success' }));
            } else if(status === 'error') {
                message.error(formatMessage({ id: 'add_error' }));
            }
            return {
                hostData: hostData
            };
        },

        deleteHost(state, {payload: data}) {
            const { hostData, status } = data;
            if(status === 'success') {
                message.success(formatMessage({ id: 'delete_success' }));
            } else if(status === 'error') {
                message.error(formatMessage({ id: 'delete_error' }));
            }
            return {
                hostData: hostData
            };
        },

        editHost(state, {payload: data}) {
            const { hostData, status } = data;
            if(status === 'success') {
                message.success(formatMessage({ id: 'edit_success' }));
            } else if(status === 'error') {
                message.error(formatMessage({ id: 'edit_error' }));
            }
            return {
                hostData: hostData
            };
        },

        testHost(state, {payload: data}) {
            const { status } = data;
            if(status === 'success') {
                message.success(formatMessage({ id: 'test_success' }));
            } else if(status === 'error') {
                message.error(formatMessage({ id: 'test_error' }));
            }
            return {
                hostData: state.hostData,
                status: status
            };
        }
    }
};
