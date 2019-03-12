export default {
    routes: [{
        path: '/',
        component: '../layouts/App',
        routes: [
            {
                path: '/', redirect: '/FileDistribute'
            },
            {
                path: '/FileDistribute',
                component: 'FileDistribute'
            },
            {
                path: '/HostManage',
                component: 'HostManage'
            },
            {
                component: '404',
            }
        ]
    }],
    plugins: [
        ['umi-plugin-react', {
            antd: true,
            dva: true,
            dynamicImport: true,
            locale: {
                baseNavigator: true, // 为true时，用navigator.language的值作为默认语言
                antd: true // 是否启用antd的<LocaleProvider />
            }
        }]
    ],
    proxy: {
        '/api': {
            target: 'http://localhost:8888/',
            changeOrigin: true,
        },
    }
};
