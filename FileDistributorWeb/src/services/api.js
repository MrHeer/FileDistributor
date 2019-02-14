import request from '@/utils/request';

export async function queryTreeData() {
    return request('/api/getTreeData');
}
