module.exports = {
    '/api/project/list': {
        get: {
            // 如果有需要也可以添加 headers 的校验
            // headers:{},
            query: {
                type: 'object',
                properties: {
                    projectKey: {
                        type: 'string',
                        description: '项目key'
                    },
                    page: {
                        // 字符串或数字
                        type: ['string', 'number'],
                        description: '页码'
                    },
                    pageSize: {
                        type: ['string'],
                        description: '每页数量'
                    }
                },
                required: []
            }
        }
    }
}
