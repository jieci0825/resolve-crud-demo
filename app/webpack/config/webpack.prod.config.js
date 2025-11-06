const path = require('path')
const webpackBaseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')
const HappyPack = require('happypack')
const os = require('os')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CssMiniPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackInjectAttributesPlugin = require('html-webpack-inject-attributes-plugin')
const TerseWebpackPlugin = require('terser-webpack-plugin')

// 多线程打包配置
const hoppypackCommonConfig = {
    debug: false,
    threadPool: HappyPack.ThreadPool({
        size: os.cpus().length
    })
}

/**
 * @type {import('webpack').Configuration}
 */
const webpackProdConfig = {
    mode: 'production',
    output: {
        filename: 'js/[name]-[chunkhash:8].bundle.js',
        path: path.resolve(process.cwd(), './app/public/dist/production'),
        publicPath: '/dist/production',
        crossOriginLoading: 'anonymous'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'happypack/loader?id=css']
            },
            {
                test: /\.js$/,
                use: ['happypack/loader?id=js'],
                include: [path.resolve(process.cwd(), './app/pages')],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        // 在构建前清理输出目录
        new CleanWebpackPlugin(['production'], {
            root: path.resolve(process.cwd(), './app/public/dist'),
            verbose: true
        }),
        // 优化压缩 css
        new CssMiniPlugin(),
        // 提取 css 的公共部分
        new MiniCssExtractPlugin({
            filename: 'css/[name]-[contenthash:8].bundle.css'
        }),
        // 多线程打包 css
        new HappyPack({
            ...hoppypackCommonConfig,
            id: 'css',
            loaders: [
                {
                    path: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                }
            ]
        }),
        // 多线程打包 js，加快打包速度
        new HappyPack({
            ...hoppypackCommonConfig,
            id: 'js',
            loaders: [
                `babel-loader?${JSON.stringify({
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-transform-runtime']
                })}`
            ]
        }),
        // 请求资源时，不发送用户的身份凭证
        new HtmlWebpackInjectAttributesPlugin({
            crossOriginLoading: 'anonymous'
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerseWebpackPlugin({
                cache: true, // 开启缓存，提高构建速度
                parallel: true, // 开启多线程压缩
                terserOptions: {
                    compress: {
                        drop_console: true // 清除 console.log
                    }
                }
            })
        ]
    }
}

module.exports = merge.smart(webpackBaseConfig, webpackProdConfig)
