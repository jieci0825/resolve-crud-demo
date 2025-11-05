const path = require('path')
const glob = require('glob')
const { camelCase } = require('lodash')
const { tools } = require('@utils')

/**
 * middleware loader
 * @param {object} app Koa 实例
 * @description 加载所有的中间件，可以通过 `app.middlewares.${目录}.${文件}` 访问
 * @example
 * 假设目录结构如下：
 * ```
 * - app/middleware
 *          |
 *          |- custom-module
 *              |
 *              |- custom-middleware.js
 * ```
 * 就可以通过 `app.middlewares.customModule.customMiddleware` 访问
 */
module.exports = app => {
    // 读取符合 glob 规则 app/middleware/**/**.js 的文件
    const middlewarePath = path.join(app.businessDir, 'middleware')
    const filePathList = glob.sync(path.join(middlewarePath, '**/*.js'))

    // 遍历读取到的文件内容，吧内容加载到 app.middlewares 中
    const middlewares = {}

    filePathList.forEach(filePath => {
        // 提取文件名称
        const { ext } = path.parse(filePath)

        // 提取文件路径，即计算出相对路径，并去掉后缀
        const relativePath = path
            .relative(middlewarePath, filePath)
            .replace(ext, '')

        // 将名称从 - 连接改为小驼峰
        const keys = relativePath.split(path.sep).map(item => camelCase(item))

        // 创建嵌套对象
        //  -  实际导出是一个函数，所以调用即可
        const value = require(filePath)(app)
        const nestedObject = tools.createNestedObject(keys, value)

        Object.assign(middlewares, nestedObject)
    })

    // 挂载到 app 上
    app.middlewares = middlewares
}
