module.exports = {
    name: '淘宝',
    desc: '淘宝电商系统',
    homePage: '',
    menu: [
        {
            key: 'operating',
            label: '运营活动',
            menuType: 'module',
            moduleType: 'side',
            sideConfig: {
                menu: [
                    {
                        key: 'order',
                        label: '订单管理',
                        menuType: 'module',
                        moduleType: 'iframe',
                        iframeConfig: {
                            path: 'https://www.baidu.com'
                        }
                    },
                    {
                        key: 'coupon',
                        label: '优惠券',
                        menuType: 'module',
                        moduleType: 'custom',
                        customConfig: {
                            path: '/todo'
                        }
                    },
                    {
                        key: 'limited',
                        label: '限量购',
                        menuType: 'module',
                        moduleType: 'custom',
                        customConfig: {
                            path: '/todo'
                        }
                    },
                    {
                        key: 'festival',
                        label: '节日券',
                        menuType: 'module',
                        moduleType: 'custom',
                        customConfig: {
                            path: '/todo'
                        }
                    }
                ]
            }
        }
    ]
}
