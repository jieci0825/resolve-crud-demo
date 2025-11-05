const md5 = require('md5')

/**
 * API 签名合法性校验中间件
 */
module.exports = app => {
    // 从配置中读取
    const signKey = 'ajofkopdkposkdasldasldasdp'
    const TIMEOUT = 5 * 60 * 1000 // 5分钟
    const ERROR_CODE = 445

    return async (ctx, next) => {
        // 只对 API 请求进行签名校验，页面请求不进行签名校验
        if (!ctx.path.startsWith('/api')) {
            await next()
            return
        }

        const { path, method } = ctx
        const { headers } = ctx.request
        const { s_sign: sSign, s_t: st } = headers

        // 辅助函数：返回验证失败响应
        const returnError = message => {
            ctx.status = 200
            ctx.body = {
                success: false,
                code: ERROR_CODE,
                message
            }
            app.logger.warn(`[${method}] ${path} - 签名验证失败: ${message}`)
        }

        // 验证必填字段 - s_sign
        if (!sSign) {
            returnError('s_sign is required')
            return
        }

        // 验证必填字段 - s_t
        if (!st) {
            returnError('s_t is required')
            return
        }

        // 验证时间戳格式
        const timestamp = Number(st)
        if (isNaN(timestamp)) {
            returnError('s_t is invalid')
            return
        }

        // 验证时间戳是否超时
        if (Date.now() - timestamp > TIMEOUT) {
            returnError('signature is timeout')
            return
        }

        // 验证签名
        const signature = md5(`${st}_${signKey}`)
        if (sSign !== signature) {
            returnError('signature is invalid')
            return
        }

        // 验证通过，记录日志并继续执行
        app.logger.info(`[${method}] ${path} - 签名验证通过`)
        await next()
    }
}
