module.exports = {
    name: '拼多多',
    desc: '拼多多电商系统',
    homePage: '',
    menu: [
        {
            key: 'goods',
            label: '商品管理（拼多多）'
        },
        {
            key: 'client',
            label: '客户管理（拼多多）'
        },
        {
            key: 'data',
            label: '数据分析（拼多多）',
            menuType: 'module',
            moduleType: 'side',
            sideConfig: {
                menu: [
                    {
                        key: 'analysis',
                        label: '电商罗盘',
                        menuType: 'module',
                        moduleType: 'custom',
                        customConfig: {
                            url: 'todo'
                        }
                    }
                ]
            }
        }
    ]
}
