const model = {
    mode: 'dashboard', // 模板类型
    menu: [
        {
            key: '', // 菜单唯一标识
            name: '', // 菜单名称
            icon: '', // 菜单图标
            menuType: '', // 菜单类型: group | module

            // 当 menuType 为 group 时，表示有子菜单
            subMenu: [
                // 递归子菜单配置 menuItem
                {},
                {}
            ],

            // 当 menuType 为 module 时，可以设置 moduleType
            moduleType: '', // 模块类型，枚举值： iframe | custom | schema | side
            // 当 moduleType 为 iframe 时
            iframeConfig: {
                path: '' // iframe 路径
            },
            // 当 moduleType 为 custom 时
            customConfig: {
                path: '' // 自定义路由路径
            },
            // 当 moduleType 为 schema 时
            schemaConfig: {
                api: '', // schema 接口地址，即页面的数据来源地址
                schema: {
                    type: 'object',
                    properties: {
                        key: {
                            // ...schema
                            type: '', // 枚举值：
                            label: '', // 字段名称
                            default: '', // 默认值
                            required: '' // 是否必填
                        }
                    }
                },
                tableConfig: {}, // table 相关配置
                searchConfig: {}, // search-bar 相关配置
                components: {} // 模块组件
            },
            // 当 moduleType 为 side 时
            sideConfig: {
                menu: {} // 递归 menu menuItem 配置。但是，不能嵌套 side
            }
        }
    ]
}
