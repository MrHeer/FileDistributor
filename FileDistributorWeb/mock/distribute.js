const selectedHost = [
    {key: 'H-0', title: 'Host-0', status: 'success'},
    {key: 'H-1', title: 'Host-1', status: 'error'},
    {key: 'H-2', title: 'Host-2', status: 'success'},
    {key: 'H-3', title: 'Host-3', status: 'success'},
    {key: 'H-4', title: 'Host-4', status: 'exist'},
    {key: 'H-5', title: 'Host-5', status: 'success'},
    {key: 'H-6', title: 'Host-6', status: 'exist'},
    {key: 'H-7', title: 'Host-7', status: 'success'},
    {key: 'H-8', title: 'Host-8', status: 'success'}
];

export default {
    'post /api/distribute': {
        distributeStatus: 'error',
        selectedHost: selectedHost
    }
};
