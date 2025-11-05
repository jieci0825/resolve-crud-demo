module.exports = app => {
    return class BaseController {
        constructor() {
            this.app = app
            this.config = app.config
            this.services = app.services
        }

        /**
         * API 请求成功
         * @param {object} ctx koa context
         * @param {any} data 返回数据
         * @param {object} metadata 附加数据
         */
        success(ctx, data = {}, metadata = {}) {
            ctx.status = 200
            ctx.body = {
                success: true,
                data,
                metadata
            }
        }

        /**
         * API 请求失败
         * @param {object} ctx koa context
         * @param {string} message 错误消息
         * @param {number} code 错误码
         */
        fail(ctx, message, code) {
            ctx.body = {
                success: false,
                message,
                code
            }
        }
    }
}
