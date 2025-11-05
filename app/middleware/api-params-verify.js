const Ajv = require('ajv')
const ajv = new Ajv()

/**
 * API 参数验证中间件
 */
module.exports = app => {
    // 使用的 JSON Schema 标准版本
    const $schema = 'http://json-schema.org/draft-07/schema'

    return async (ctx, next) => {
        // 只对 API 请求进行签名校验，页面请求不进行签名校验
        if (!ctx.path.startsWith('/api')) {
            await next()
            return
        }

        const { body, query, headers } = ctx.request
        const { params, path, method } = ctx

        app.logger.info(`[${method}] ${path} body: ${JSON.stringify(body)}`)
        app.logger.info(`[${method}] ${path} query: ${JSON.stringify(query)}`)
        app.logger.info(`[${method}] ${path} params: ${JSON.stringify(params)}`)
        app.logger.info(
            `[${method}] ${path} headers: ${JSON.stringify(headers)}`
        )

        const schema = app.routerSchemas[path]?.[method.toLowerCase()]
        if (!schema) {
            return await next()
        }

        let valid = true

        // ajv 校验器
        let validator

        // 校验 headers
        if (valid && headers && schema.headers) {
            schema.headers.$schema = $schema
            validator = ajv.compile(schema.headers)
            valid = validator(headers)
        }

        // 校验 query
        if (valid && query && schema.query) {
            schema.query.$schema = $schema
            validator = ajv.compile(schema.query)
            valid = validator(query)
        }

        // 校验 body
        if (valid && body && schema.body) {
            schema.body.$schema = $schema
            validator = ajv.compile(schema.body)
            valid = validator(body)
        }

        // 校验 params
        if (valid && params && schema.params) {
            schema.params.$schema = $schema
            validator = ajv.compile(schema.params)
            valid = validator(params)
        }

        if (!valid) {
            ctx.status = 200
            ctx.body = {
                code: 442,
                success: false,
                message: `request validate fail: ${ajv.errorsText(
                    validator.errors
                )}`
            }
            return
        }

        await next()
    }
}
