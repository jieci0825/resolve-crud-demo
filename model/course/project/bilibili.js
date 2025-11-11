module.exports = {
    name: '哔哩哔哩课堂',
    desc: '哔哩哔哩课堂的课程管理系统',
    homePage: '',
    menu: [
        {
            key: 'video',
            label: '视频管理(B站)'
        },
        {
            key: 'materials',
            label: '课程资料',
            menuType: 'module',
            moduleType: 'side',
            sideConfig: {
                menu: [
                    {
                        key: 'pdf',
                        label: 'PDF',
                        menuType: 'module',
                        moduleType: 'custom',
                        customConfig: {
                            path: '/todo'
                        }
                    },
                    {
                        key: 'word',
                        label: 'Word',
                        menuType: 'module',
                        moduleType: 'custom',
                        customConfig: {
                            path: '/todo'
                        }
                    },
                    {
                        key: 'ppt',
                        label: 'PPT',
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
