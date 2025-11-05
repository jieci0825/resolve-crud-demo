const webpack = require('webpack')
const webpackBaseConfig = require('./config/webpack.base.config')

console.log('\nBuilding... \n')

webpack(webpackBaseConfig, (err, stats) => {
    if (err) {
        console.log(err)
        return
    }

    process.stdout.write(
        `${stats.toString({
            colors: true, // 在控制台显示颜色
            modules: false, // 打包的时候不显示模块信息
            children: false, // 打包的时候不显示子模块信息
            chunks: false, // 打包的时候不显示chunks信息
            chunkModules: true // 显示chunk中的模块信息
        })}\n\n`
    )
})
