module.exports = app => {
    const BaseController = require('./base')(app)

    return class ProjectController extends BaseController {
        constructor() {
            super()
        }

        async getList(ctx) {
            console.log('project controller', ctx.request.query)
            const { project: projectService } = app.services
            const result = await projectService.getList()
            this.success(ctx, result)
        }
    }
}
