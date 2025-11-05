const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
    // 入口配置
    entry: {
        'entry.page1': './app/pages/page1/entry.page1.js',
        'entry.page2': './app/pages/page2/entry.page2.js'
    },
    // 模块解析配置
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [path.resolve(process.cwd(), './app/pages')],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(scss|sass)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name]-hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'file-loader'
            }
        ]
    },
    // 输出配置
    output: {
        filename: 'js/[name]-[chunkhash:8].bundle.js',
        path: path.resolve(process.cwd(), './app/public/dist/production'),
        publicPath: '/dist/production',
        crossOriginLoading: 'anonymous'
    },
    // 解析配置，比如导入时省略后缀名，决定如何解析模块的顺序，别名等
    resolve: {
        extensions: ['.js', '.vue', '.less', '.css', '.json'],
        alias: {
            $pages: path.resolve(process.cwd(), './app/pages')
        }
    },
    plugins: [
        // 在构建前清理输出目录
        new CleanWebpackPlugin(['production'], {
            root: path.resolve(process.cwd(), './app/public/dist'),
            verbose: true
        }),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API: true,
            __VUE_PROD_DEVTOOLS: false,
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(process.cwd(), './app/public/dist/entry.page1.tpl'),
            template: path.resolve(process.cwd(), './app/view/entry.tpl'),
            chunks: ['entry.page1']
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(process.cwd(), './app/public/dist/entry.page2.tpl'),
            template: path.resolve(process.cwd(), './app/view/entry.tpl'),
            chunks: ['entry.page2']
        })
    ],
    optimization: {}
}
