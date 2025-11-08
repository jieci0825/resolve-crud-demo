const path = require('path')

/**
 * config loader
 * @param {object} app Koa 实例
 * @description
 * - 配置区分环境：本地、测试、生产。不同的环境读取不同的配置文件。
 * - 通过 env.config.js 覆盖 default.config.js 的配置。最后挂载到 app.config 上。
 */
module.exports = app => {
    const configDir = path.join(app.baseDir, 'config')
    // 获取 default.config.js
    const defaultConfig = require(path.join(configDir, 'default.config.js'))

    // 获取 [env].config.js
    let envConfig = {}

    try {
        // 根据环境加载不同的配置文件
        if (app.env.isLocal()) {
            envConfig = require(path.join(configDir, 'local.config.js'))
        } else if (app.env.isBeta()) {
            envConfig = require(path.join(configDir, 'beta.config.js'))
        } else if (app.env.isProduction()) {
            envConfig = require(path.join(configDir, 'production.config.js'))
        }
    } catch (error) {
        console.log(`[load env config] ${error.message}`)
    }

    // 合并配置并挂载
    app.config = Object.assign(defaultConfig, envConfig)
}
