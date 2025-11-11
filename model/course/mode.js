module.exports = {
    mode: 'dashboard',
    name: '课程系统',
    menu: [
        {
            key: 'video',
            label: '视频管理',
            menuType: 'module',
            moduleType: 'custom',
            customConfig: {
                path: '/todo'
            }
        },
        {
            key: 'user',
            label: '用户管理',
            menuType: 'module',
            moduleType: 'custom',
            customConfig: {
                path: '/todo'
            }
        }
    ]
}
