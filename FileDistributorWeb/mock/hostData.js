const hostData = [];
for (let i = 1; i <= 6; i++) {
  hostData.push({
    key: `${i}`,
    group_name: "Group1",
    host_name: `Host${i}`,
    ip_address: `10.34.45.${i}`
  });
}

for (let i = 7; i <= 12; i++) {
  hostData.push({
    key: `${i}`,
    group_name: "Group2",
    host_name: `Host${i}`,
    ip_address: `10.34.46.${i}`
  });
}

export default {
  "get /api/getHostData": {
    hostData: hostData
  },

  "post /api/addHost": {
    hostData: hostData,
    status: "success"
  },

  "post /api/deleteHost": {
    hostData: hostData,
    status: "error"
  },

  "post /api/editHost": {
    hostData: hostData,
    status: "error"
  },

  "post /api/testHost": {
    status: "success"
  }
};
