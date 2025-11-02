module.exports = app => {
    const BaseController = require('./base')(app)

    return class ProjectController extends BaseController {
        constructor() {
            super()
        }

        async getList(ctx) {
            const { project: projectService } = app.services
            const result = await projectService.getList()
            this.success(ctx, result)
        }
    }
}
