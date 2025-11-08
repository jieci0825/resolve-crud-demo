const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const glob = require('glob')

// 获取所有入口文件
const entryFiles = glob.sync(
    path.resolve(process.cwd(), './app/pages/*/entry.*.js')
)

// 构建入口对象
const entry = entryFiles.reduce((pre, cur) => {
    const filename = path.parse(cur).name
    pre[filename] = cur
    return pre
}, {})

// 动态生成 HtmlWebpackPlugin 实例
const htmlPlugins = entryFiles.map(entryFile => {
    const filename = path.parse(entryFile).name
    return new HtmlWebpackPlugin({
        filename: path.resolve(
            process.cwd(),
            `./app/public/dist/${filename}.tpl`
        ),
        template: path.resolve(process.cwd(), './app/view/entry.tpl'),
        chunks: [filename]
    })
})

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
    // 入口配置
    entry,
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
    // 解析配置，比如导入时省略后缀名，决定如何解析模块的顺序，别名等
    resolve: {
        extensions: ['.js', '.vue', '.less', '.css', '.json'],
        alias: {
            '@': process.cwd(),
            '$root': path.resolve(process.cwd(), './app'),
            '$pages': path.resolve(process.cwd(), './app/pages'),
            '$common': path.resolve(process.cwd(), './app/pages/common'),
            '$widgets': path.resolve(process.cwd(), './app/pages/widgets'),
            '$store': path.resolve(process.cwd(), './app/pages/store')
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API: true,
            __VUE_PROD_DEVTOOLS: false,
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
        }),
        // 动态生成的 HTML 插件
        ...htmlPlugins
    ],
    optimization: {
        // 代码分割配置：将公共模块提取到单独的 chunk 中，避免重复打包
        splitChunks: {
            // chunks: 指定哪些 chunk 参与代码分割
            // 'all': 同时对同步和异步引入的模块进行分割（推荐）
            // 'async': 只对异步引入的模块进行分割（默认值）
            // 'initial': 只对同步引入的模块进行分割
            chunks: 'all',
            // minSize: 生成 chunk 的最小体积（字节），默认 20000（20KB）
            // 设置为 0 表示无论多小的模块都可以被提取（开发环境可用于测试）
            minSize: 0,

            // cacheGroups: 缓存组配置，定义如何分割和命名提取的 chunk
            cacheGroups: {
                // 提取公共业务代码（如 common/utils.js）
                commons: {
                    // name: 提取出的 chunk 名称，最终生成 commons-[hash].bundle.js
                    name: 'commons',
                    // chunks: 只对初始加载的模块进行分割
                    chunks: 'initial',
                    // minChunks: 模块至少被引用的次数，被 2 个及以上入口引用才会提取
                    minChunks: 2,
                    // minSize: 覆盖默认的 minSize，设为 0 允许提取任意大小的公共模块
                    minSize: 0,
                    // priority: 缓存组优先级，数字越大优先级越高
                    // 当一个模块同时满足多个缓存组条件时，优先级高的生效
                    priority: 10,
                    // reuseExistingChunk: 如果当前 chunk 包含的模块已经被提取，则重用该 chunk
                    // 而不是重新生成一个新的 chunk
                    reuseExistingChunk: true
                },
                // 提取 node_modules 中的第三方库
                vendors: {
                    // test: 匹配规则，这里匹配所有 node_modules 中的模块
                    // 使用正则表达式兼容 Windows 和 Unix 路径分隔符
                    test: /[\\/]node_modules[\\/]/,
                    // name: 提取出的 chunk 名称，最终生成 vendors-[hash].bundle.js
                    name: 'vendors',
                    // chunks: 对所有类型的 chunk 进行分割
                    chunks: 'all',
                    // priority: 优先级设为 20，高于 commons，确保第三方库优先被提取，避免优先级低于 commons 导致第三方包也打包进 commons 中
                    priority: 20,
                    reuseExistingChunk: true // 如果当前 chunk 包含的模块已经被提取，则重用该 chunk
                }
            }
        },
        runtimeChunk: true // 将 webpack 运行时代码单独提取出来，避免每次构建时都生成新的 hash
    }
}
