import { getFileData, deleteFile } from '@/services/api';
import { message } from 'antd';
import { formatMessage } from 'umi/locale';

export default {
    namespace: 'fileData',
    state: {
        fileData: [],
        status: ''
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const data = yield call(getFileData, payload);
            yield put({
                type: 'fileData',
                payload: data
            });
        },

        *delete({ payload }, { call, put }) {
            const data = yield call(deleteFile, payload);
            yield put({
                type: 'deleteFile',
                payload: data
            });
        }
    },

    reducers: {
        fileData(state, {payload: data}) {
            const { fileData } = data;
            return {
                fileData: fileData
            };
        },

        deleteFile(state, {payload: data}) {
            const { fileData, status } = data;
            if(status === 'success') {
                message.success(formatMessage({ id: 'delete_success' }));
            } else if(status === 'error') {
                message.error(formatMessage({ id: 'delete_error' }));
            }
            return {
                fileData: fileData
            };
        }
    }
};
