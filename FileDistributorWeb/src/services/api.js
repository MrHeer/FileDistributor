import request from '@/utils/request';

export async function queryTreeData() {
    return request('/api/getTreeData');
}

export async function queryHostData() {
    return request('/api/getHostData');
}
