import request from '@/utils/request';

export async function getTreeData() {
    return request('/api/getTreeData');
}

export async function getHostData() {
    return request('/api/getHost');
}

export async function addHost(params) {
    return request('/api/addHost', {
        method: 'POST',
        body: {
            ...params
        }
    });
}

export async function deleteHost(params) {
    return request('/api/deleteHost', {
        method: 'POST',
        body: {
            ...params
        }
    });
}

export async function editHost(params) {
    return request('/api/editHost', {
        method: 'POST',
        body: {
            ...params
        }
    });
}

export async function testHost(params) {
    return request('/api/testHost', {
        method: 'POST',
        body: {
            ...params
        }
    });
}

export async function distribute(params) {
    return request('/api/distribute', {
        method: 'POST',
        body: {
            ...params
        }
    });
}
