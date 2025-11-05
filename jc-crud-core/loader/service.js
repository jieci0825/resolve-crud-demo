const path = require('path')
const glob = require('glob')
const { camelCase } = require('lodash')
const { tools } = require('@utils')

/**
 * service loader
 * @param {object} app Koa 实例
 * @description 加载所有的中间件，可以通过 `app.services.${目录}.${文件}` 访问
 * @example
 * 假设目录结构如下：
 * ```
 * - app/service
 *          |
 *          |- custom-module
 *              |
 *              |- custom-service.js
 * ```
 * 就可以通过 `app.services.customModule.customService` 访问
 */
module.exports = app => {
    // 读取符合 glob 规则 app/service/**/**.js 的文件
    const servicePath = path.join(app.businessDir, 'service')
    const filePathList = glob.sync(path.join(servicePath, '**/*.js'))

    // 遍历读取到的文件内容，吧内容加载到 app.services 中
    const services = {}

    filePathList.forEach(filePath => {
        // 提取文件名称
        const { ext } = path.parse(filePath)

        // 提取文件路径，即计算出相对路径，并去掉后缀
        const relativePath = path
            .relative(servicePath, filePath)
            .replace(ext, '')

        // 将名称从 - 连接改为小驼峰
        const keys = relativePath.split(path.sep).map(item => camelCase(item))

        // 创建嵌套对象
        //  -  实际导出是一个函数，所以调用即可
        const ServiceModule = require(filePath)(app)
        const value = new ServiceModule()
        const nestedObject = tools.createNestedObject(keys, value)

        Object.assign(services, nestedObject)
    })

    // 挂载到 app 上
    app.services = services
}
