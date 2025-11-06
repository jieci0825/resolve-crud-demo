const webpackBaseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')

/**
 * @type {import('webpack').Configuration}
 */
const webpackDevConfig = {
    mode: 'development',
    output: {
        filename: 'js/[name]-[chunkhash:8].bundle.js',
        path: path.resolve(process.cwd(), './app/public/dist/development'),
        publicPath: '/dist/development',
        crossOriginLoading: 'anonymous'
    }
}

module.exports = merge.smart(webpackBaseConfig, webpackDevConfig)
