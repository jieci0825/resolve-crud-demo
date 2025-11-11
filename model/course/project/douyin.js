module.exports = {
    name: '抖音课堂',
    desc: '抖音课堂的课程管理系统',
    homePage: '',
    menu: [
        {
            key: 'video',
            label: '视频管理(抖音)'
        },
        {
            key: 'traffic',
            label: '流量管理',
            menuType: 'module',
            moduleType: 'side',
            sideConfig: {
                menu: [
                    {
                        key: 'user-traffic',
                        label: '学员流量',
                        menuType: 'module',
                        moduleType: 'custom',
                        customConfig: {
                            path: '/todo'
                        }
                    },
                    {
                        key: 'side-info-search',
                        label: '信息搜索',
                        menuType: 'module',
                        moduleType: 'iframe',
                        iframeConfig: {
                            path: 'https://www.jd.com'
                        }
                    }
                ]
            }
        },
        {
            key: 'info-search',
            label: '信息搜索',
            menuType: 'module',
            moduleType: 'iframe',
            iframeConfig: {
                path: 'https://www.jd.com'
            }
        }
    ]
}
