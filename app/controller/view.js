class ViewController {
    /**
     * 渲染页面
     */
    async renderPage(ctx) {
        await ctx.render(`output/entry.${ctx.params.page}`)
    }
}

module.exports = app => {
    return ViewController
}
