const path = require('path')
const glob = require('glob')
const { camelCase } = require('lodash')
const { tools } = require('@utils')

/**
 * controller loader
 * @param {object} app Koa 实例
 * @description 加载所有的中间件，可以通过 `app.controllers.${目录}.${文件}` 访问
 * @example
 * 假设目录结构如下：
 * ```
 * - app/controller
 *          |
 *          |- custom-module
 *              |
 *              |- custom-controller.js
 * ```
 * 就可以通过 `app.controllers.customModule.customController` 访问
 */
module.exports = app => {
    // 读取符合 glob 规则 app/controller/**/**.js 的文件
    const controllerPath = path.join(app.businessDir, 'controller')
    const filePathList = glob.sync(path.join(controllerPath, '**/*.js'))

    // 遍历读取到的文件内容，吧内容加载到 app.controllers 中
    const controllers = {}

    filePathList.forEach(filePath => {
        // 提取文件名称
        const { ext } = path.parse(filePath)

        // 提取文件路径，即计算出相对路径，并去掉后缀
        const relativePath = path
            .relative(controllerPath, filePath)
            .replace(ext, '')

        // 将名称从 - 连接改为小驼峰
        const keys = relativePath.split(path.sep).map(item => camelCase(item))

        // 创建嵌套对象
        //  -  实际导出是一个函数，所以调用即可
        const ControllerModule = require(filePath)(app)
        const value = new ControllerModule()
        const nestedObject = tools.createNestedObject(keys, value)

        Object.assign(controllers, nestedObject)
    })

    // 挂载到 app 上
    app.controllers = controllers
}
