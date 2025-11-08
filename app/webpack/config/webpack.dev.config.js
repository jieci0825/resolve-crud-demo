const path = require('path')
const webpackBaseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')
const webpack = require('webpack')

const DEV_SERVER_CONFIG = {
    host: 'localhost',
    port: 9527,
    hmrPath: '__webpack_hrm',
    timeout: 20 * 1000
}

Object.keys(webpackBaseConfig.entry).forEach(key => {
    if (key !== 'vendor') {
        webpackBaseConfig.entry[key] = [
            // 主入口文件
            webpackBaseConfig.entry[key],
            // hmr 更新入口，官方指定的 hmr 路径
            `webpack-hot-middleware/client?path=http://${DEV_SERVER_CONFIG.host}:${DEV_SERVER_CONFIG.port}/${DEV_SERVER_CONFIG.hmrPath}&timeout=${DEV_SERVER_CONFIG.timeout}&reload=true`
        ]
    }
})

/**
 * @type {import('webpack').Configuration}
 */
const webpackDevConfig = {
    mode: 'development',
    output: {
        filename: 'js/[name]-[chunkhash:8].bundle.js',
        path: path.resolve(process.cwd(), './app/public/dist/development'),
        publicPath: `http://${DEV_SERVER_CONFIG.host}:${DEV_SERVER_CONFIG.port}/dist/development`,
        globalObject: 'this'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin({
            multiStep: false
        })
    ]
}

module.exports = {
    webpackConfig: merge.smart(webpackBaseConfig, webpackDevConfig),
    DEV_SERVER_CONFIG
}
