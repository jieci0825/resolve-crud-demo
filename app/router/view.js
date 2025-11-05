module.exports = (app, router) => {
    // 这是前面 controllerLoader 处理后挂载到 app.controllers 上的
    const { view: viewController } = app.controllers

    // viewController.renderPage.bind(viewController) 接受 ctx,next 中间件参数的同时，绑定 this 指向

    // 渲染出对应的页面
    router.get('/view/:page', viewController.renderPage.bind(viewController))
}
