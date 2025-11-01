module.exports = (app, router) => {
    console.log('init permission role router')
    router.get('/role', async (ctx, next) => {
        ctx.body = '[Get] role'
    })
    router.post('/role', async (ctx, next) => {
        ctx.body = '[Post] role'
    })
}
