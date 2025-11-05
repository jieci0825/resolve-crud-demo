module.exports = app => {
    return class ViewController {
        /**
         * 渲染页面
         */
        async renderPage(ctx) {
            await ctx.render(`dist/entry.${ctx.params.page}`, {
                name: 'coderjc',
                env: app.env.get(),
                options: JSON.stringify(app.options, null, 2)
            })
        }
    }
}
