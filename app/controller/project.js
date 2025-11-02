module.exports = app => {
    return class ProjectController {
        async getList(ctx) {
            const { project: projectService } = app.services
            const result = await projectService.getList()
            ctx.status = 200
            ctx.body = {
                data: result,
                success: true,
                metadata: {}
            }
        }
    }
}
