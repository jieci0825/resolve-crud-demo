const Koa = require('koa')
const path = require('path')

const env = require('./env')
const { loadLoaders } = require('./loader')

module.exports = {
    /**
     * @param {object} options
     */
    start(options) {
        const app = new Koa()

        // 应用配置
        app.options = options
        // 基础路径
        app.baseDir = process.cwd()
        // 业务文件路径
        app.businessDir = path.resolve(app.baseDir, 'app')
        // 初始化环境配置
        app.env = env()

        // 加载 loaders
        loadLoaders(app)

        try {
            const PORT = process.env.PORT || 3000
            const HOST = process.env.IP || '0.0.0.0'
            app.listen(PORT, HOST)
            console.log(`服务启动成功： http://${HOST}:${PORT}`)
        } catch (error) {
            console.error(error)
        }
    }
}
