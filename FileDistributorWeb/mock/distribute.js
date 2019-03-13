const selectedHost = [
    {key: 'h-0', title: 'Host-0', status: 'success'},
    {key: 'H-1', title: 'Host-1', status: 'error'},
    {key: 'H-2', title: 'Host-2', status: 'success'}
];

export default {
    'post /api/distribute': {
        distributeStatus: 'error',
        selectedHost: selectedHost
    }
};
