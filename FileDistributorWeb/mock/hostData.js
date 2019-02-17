const hostData = [];
for (let i = 1; i <= 60; i++) {
    hostData.push({
        key: i,
        group_name: 'Group1',
        host_name: `Host${i}`,
        ip: `10.34.45.${i}`
    });
}

for (let i = 61; i <= 120; i++) {
    hostData.push({
        key: i,
        group_name: 'Group2',
        host_name: `Host${i}`,
        ip: `10.34.46.${i}`
    });
}

export default {
    'get /api/getHostData': {
        hostData: hostData
    }
}
