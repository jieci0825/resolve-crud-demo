module.exports = app => {
    const BaseService = require('./base')(app)
    return class ProjectService extends BaseService {
        constructor() {
            super()
        }

        async getList() {
            return ['project1', 'project2', 'project3']
        }
    }
}
