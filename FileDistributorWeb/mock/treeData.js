const treeData = [{
    title: 'Group-0',
    key: 'G-0',
    children: [
        {title: 'Host-0', key: 'H-0'},
        {title: 'Host-1', key: 'H-1'},
        {title: 'Host-2', key: 'H-2'},
        {title: 'Host-3', key: 'H-3'},
        {title: 'Host-4', key: 'H-4'},
        {title: 'Host-5', key: 'H-5'},
        {title: 'Host-6', key: 'H-6'},
        {title: 'Host-7', key: 'H-7'},
        {title: 'Host-8', key: 'H-8'}
    ]
},{
    title: 'Group-1',
    key: 'G-1',
    children: [
        {title: 'Host-9', key: 'H-9'},
        {title: 'Host-10', key: 'H-10'},
        {title: 'Host-11', key: 'H-11'},
        {title: 'Host-12', key: 'H-12'},
        {title: 'Host-13', key: 'H-13'}
    ]
}];

export default {
    'get /api/getTreeData': {
        treeData: treeData
    }
};
