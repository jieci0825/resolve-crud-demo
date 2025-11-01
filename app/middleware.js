const koaNunjucks = require('koa-nunjucks-2')
const path = require('path')

module.exports = app => {
    app.use(
        koaNunjucks({
            ext: 'tpl',
            path: path.resolve(process.cwd(), './app/public'),
            nunjucksConfig: {
                // 开启缓存，不开启缓存的话，每次修改模板都会重新编译
                noCache: true,
                // 去掉多余的行
                trimBlocks: true
            }
        })
    )
}
