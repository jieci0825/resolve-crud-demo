const path = require('path')
const glob = require('glob')
const { camelCase } = require('lodash')

/**
 * extend loader
 * @param {object} app Koa 实例
 * @description 加载所有的中间件，可以通过 `app.extends.${目录}.${文件}` 访问
 * @example
 * 假设目录结构如下：
 * ```
 * - app/extend
 *          |
 *          |- custom-extend.js
 * ```
 * 就可以通过 `app.extends.customExtend` 访问
 */
module.exports = app => {
    // 读取符合 glob 规则 app/extend/**.js 的文件
    const extendPath = path.join(app.businessDir, 'extend')
    const filePathList = glob.sync(path.join(extendPath, '**/*.js'))

    filePathList.forEach(filePath => {
        // 提取文件名称
        const { ext } = path.parse(filePath)

        // 提取文件路径，即计算出相对路径，并去掉后缀
        const relativePath = path
            .relative(extendPath, filePath)
            .replace(ext, '')

        // 将名称从 - 连接改为小驼峰
        //  - extend 只有一层，所以不需要递归处理对象，所以直接解构拿取
        const [name] = relativePath.split(path.sep).map(item => camelCase(item))

        // 处理扩展同名的情况
        for (const key in app) {
            if (name === key) {
                console.log(`[extend]: ${name} 已存在于 koa 实例中，跳过加载`)
                return
            }
        }

        app[name] = require(filePath)(app)
    })
}
