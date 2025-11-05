/**
 * 处理异常，对于未捕获的异常进行统一处理
 */
module.exports = app => {
    return async (ctx, next) => {
        try {
            await next()
        } catch (error) {
            const { status, message, detail } = error

            app.logger.info(JSON.stringify(error))
            app.logger.error('[-- exception --]:', error)
            app.logger.error('[-- exception --]:', status, message, detail)

            // 如果消息中包含template not found，则表示模板不存在错误，可以额外处理
            if (message && message.indexOf('template not found') > -1) {
                // 设置临时重定向，避免永久重定向导致以后这个页面上线的时候无法访问
                ctx.status = 302
                ctx.redirect(app?.options?.homePath || '/')
                return
            }

            ctx.status = 200

            ctx.body = {
                success: false,
                message: '服务器错误，请稍后再试！！！',
                code: 50000
            }
        }
    }
}
