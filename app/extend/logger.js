const log4js = require('log4js')

/**
 * 日志工具
 * @example 外部调用方式 app.logger.info('hello world') app.logger.error('a is not defined')
 */
module.exports = app => {
    let logger

    if (app.env.isLocal()) {
        // 如果是本地环境，则输出到控制台即可
        //  - 输出控制台则直接使用 console 的功能即可
        logger = console
    } else {
        // 其他环境则输出到日志文件中
        log4js.configure({
            appenders: {
                console: { type: 'console' },
                // 日志文件切分，比如以天为单位切分
                dateFile: {
                    type: 'dateFile',
                    filename: './logs/application',
                    pattern: 'yyyy-MM-dd.log', // 日期格式：application.2025-11-03.log
                    alwaysIncludePattern: true // 文件名始终包含日期模式
                }
            },
            categories: {
                default: {
                    appenders: ['console', 'dateFile'],
                    level: 'info'
                }
            }
        })

        logger = log4js.getLogger()
    }

    return logger
}
