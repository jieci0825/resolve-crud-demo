const express = require('express')
const webpack = require('webpack')
const path = require('path')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const consoler = require('consoler')
const {
    webpackConfig,
    DEV_SERVER_CONFIG
} = require('./config/webpack.dev.config')

const app = express()

const compiler = webpack(webpackConfig)

// 指定静态目录
app.use(express.static(path.resolve(__dirname, '../public')))

// 引入 devMiddleware 监控文件的改动
app.use(
    devMiddleware(compiler, {
        // 落地文件-即无需打包到内存里面的文件
        writeToDisk: filePath => {
            // 所有以 .tpl 结尾的文件都不打包到内存
            return filePath.endsWith('.tpl')
        },
        // 资源路径
        // publicPath: webpackConfig.output.publicPath,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods':
                'GET, POST, PUT, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers':
                ' X-Requested-With, content-type, Authorization'
        },
        stats: {
            colors: true
        }
    })
)

// 引入 hotMiddleware 实现热更新
app.use(
    hotMiddleware(compiler, {
        path: `/${DEV_SERVER_CONFIG.hmrPath}`,
        log: () => {}
    })
)

consoler.info('请等待 webpack 初次构建完成提示...')

app.listen(DEV_SERVER_CONFIG.port, () => {
    consoler.info(
        `开发服务器已启动，访问地址：http://localhost:${DEV_SERVER_CONFIG.port}`
    )
})
