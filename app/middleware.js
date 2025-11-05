const path = require('path')

module.exports = app => {
    // 静态资源处理中间件
    const KoaStatic = require('koa-static')
    app.use(KoaStatic(path.resolve(process.cwd(), './app/public')))

    // 参数解析中间件
    const bodyParser = require('koa-bodyparser')
    app.use(
        bodyParser({
            formLimit: '1000mb',
            enableTypes: ['json', 'form', 'text']
        })
    )

    // 模板引擎处理中间件
    const koaNunjucks = require('koa-nunjucks-2')
    app.use(
        koaNunjucks({
            ext: 'tpl',
            path: path.resolve(process.cwd(), './app/public'),
            nunjucksConfig: {
                // 开启缓存，不开启缓存的话，每次修改模板都会重新编译
                noCache: true,
                // 去掉多余的行
                trimBlocks: true
            }
        })
    )

    // 注册全局异常处理中间件
    app.use(app.middlewares.errorHandler)

    // 注册 API 请求签名验证中间件
    app.use(app.middlewares.apiSignVerify)

    // 注册 API 参数校验中间件
    app.use(app.middlewares.apiParamsVerify)
}
