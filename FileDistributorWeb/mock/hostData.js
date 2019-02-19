const hostData = [];
for (let i = 1; i <= 60; i++) {
    hostData.push({
        key: i,
        group_name: 'Group1',
        host_name: `Host${i}`,
        ip_address: `10.34.45.${i}`
    });
}

for (let i = 61; i <= 120; i++) {
    hostData.push({
        key: i,
        group_name: 'Group2',
        host_name: `Host${i}`,
        ip_address: `10.34.46.${i}`
    });
}

export default {
    'get /api/getHost': {
        hostData: hostData
    },

    'post /api/addHost': {
        hostData: hostData,
        status: 'success'
    },

    'post /api/deleteHost': {
        hostData: hostData,
        status: 'error'
    },

    'post /api/editHost': {
        hostData: hostData,
        status: 'error'
    },

    'post /api/testHost': {
        hostData: hostData,
        status: 'success'
    }
};
