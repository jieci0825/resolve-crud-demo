const middlewareLoader = require('./middleware')
const configLoader = require('./config')
const controllerLoader = require('./controller')
const routerLoader = require('./router')
const routerSchemaLoader = require('./router-schema')
const serviceLoader = require('./service')
const extendLoader = require('./extend')
const path = require('path')

module.exports = {
    // 加载 loaders
    loadLoaders(app) {
        // 加载顺序不要轻易改变
        middlewareLoader(app)
        console.log('-- [start] load middleware done --')

        routerSchemaLoader(app)
        console.log('-- [start] load router schema done --')

        serviceLoader(app)
        console.log('-- [start] load service done --')

        controllerLoader(app)
        console.log('-- [start] load controller done --')

        configLoader(app)
        console.log('-- [start] load config done --')

        extendLoader(app)
        console.log('-- [start] load extend done --')

        // 还有一些中间件，需要单独加载
        try {
            const globalMiddlewarePath = path.join(
                app.businessDir,
                'middleware.js'
            )
            require(globalMiddlewarePath)(app)
            console.log('-- [start] load global middleware done --')
        } catch (error) {
            console.log('[exception] there is no global middleware file.')
        }

        routerLoader(app)
        console.log('-- [start] load router done --')
    },
    middlewareLoader,
    configLoader,
    controllerLoader,
    routerLoader,
    routerSchemaLoader,
    serviceLoader,
    extendLoader
}
