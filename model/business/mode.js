module.exports = {
    mode: 'dashboard',
    name: '电商系统',
    menu: [
        {
            key: 'goods',
            label: '商品管理',
            menuType: 'module',
            moduleType: 'custom',
            customConfig: {
                path: '/todo'
            }
        },
        {
            key: 'order',
            label: '订单管理',
            menuType: 'module',
            moduleType: 'custom',
            customConfig: {
                path: '/todo'
            }
        },
        {
            key: 'client',
            label: '客户管理',
            menuType: 'module',
            moduleType: 'custom',
            customConfig: {
                path: '/todo'
            }
        }
    ]
}
