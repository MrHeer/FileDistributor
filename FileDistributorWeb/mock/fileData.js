const fileData = [];
for (let i = 1; i <= 6; i++) {
    fileData.push({
        key: `${i}`,
        type: '-',
        permissions: 'r-x r-x r-x',
        numbers: `${i}`,
        user: 'root',
        group: 'root',
        size: `${i}M`,
        modify_time: '2019-03-23 15:32:40',
        name: `File${i}`
    });
}

for (let i = 7; i <= 12; i++) {
    fileData.push({
        key: `${i}`,
        type: 'd',
        permissions: 'r-x r-x r-x',
        numbers: `${i}`,
        user: 'root',
        group: 'root',
        size: `${i}M`,
        modify_time: '2019-03-23 15:32:40',
        name: `Dir${i}`
    });
}

for (let i = 13; i <= 18; i++) {
    fileData.push({
        key: `${i}`,
        type: 'l',
        permissions: 'r-x r-x r-x',
        numbers: `${i}`,
        user: 'root',
        group: 'root',
        size: `${i}M`,
        modify_time: '2019-03-23 15:32:40',
        name: `UnknownFile${i}`
    });
}

export default {
    'get /api/getFileData': {
        fileData: fileData
    },

    'post /api/deleteFile': {
        fileData: fileData,
        status: 'error'
    }
};
