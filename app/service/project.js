module.exports = app => {
    const BaseService = require('./base')(app)
    return class ProjectService extends BaseService {
        constructor() {
            super()
        }

        async getList() {
            return [
                {
                    name: '项目1',
                    id: 1,
                    desc: '项目1描述'
                },
                {
                    name: '项目2',
                    id: 2,
                    desc: '项目2描述'
                },
                {
                    name: '项目3',
                    id: 3,
                    desc: '项目3描述'
                },
                {
                    name: '项目4',
                    id: 4,
                    desc: '项目4描述'
                }
            ]
        }
    }
}
