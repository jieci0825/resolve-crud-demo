const glob = require('glob')
const KoaRouter = require('koa-router')
const path = require('path')

/**
 * router loader
 * @param {object} app Koa 实例
 * @description 解析 app/router 目录下的所有的 **.js 文件，加载到 KoaRouter 下
 */
module.exports = app => {
    const router = new KoaRouter()

    const routerPath = path.join(app.businessDir, 'router')
    const filePathList = glob.sync(path.join(routerPath, '**/*.js'))

    filePathList.forEach(filePath => {
        require(filePath)(app, router)
    })

    // 最后注册一个兜底路由
    router.all('*', async ctx => {
        // 兜底路由，当前面的找不到的时候，返回 302 重定向到首页
        ctx.status = 302
        ctx.redirect(app?.options?.homePath ?? '/')
    })

    app.use(router.routes()).use(router.allowedMethods())
}
