module.exports = (app, router) => {
    const { project: projectController } = app.controllers

    // 渲染出对应的页面
    router.get(
        '/api/project/list',
        projectController.getList.bind(projectController)
    )
}
