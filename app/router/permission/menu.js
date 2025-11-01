module.exports = (app, router) => {
    router.get('/menu', async (ctx, next) => {
        ctx.body = '[Get] menu'
    })
    router.post('/menu', async (ctx, next) => {
        ctx.body = '[Post] menu'
    })
}
