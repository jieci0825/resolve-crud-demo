const path = require('path')
const glob = require('glob')
const { camelCase } = require('lodash')
const { tools } = require('@utils')

/**
 * router-schema
 * @param {object} app Koa 实例
 *
 * @description 通过 'json-schema' 和 'ajv' 对 API 规则进行约束，配合 api-params-verify 中间件使用
 * @example
 * 读取 router-schema 目录下的文件，输出：
 * ```
 * app.routerSchema =  {
 *     `${api1}`: {jsonSchema},
 *     `${api2}`: {jsonSchema},
 *     `${api3}`: {jsonSchema},
 * }
 * ```
 */
module.exports = app => {
    // 读取符合 glob 规则 app/router-schema/**.js 的文件
    const routerSchemaPath = path.join(app.businessDir, 'router-schema')
    const filePathList = glob.sync(path.join(routerSchemaPath, '**/*.js'))

    const routerSchemas = {}

    filePathList.forEach(filePath => {
        Object.assign(routerSchemas, require(filePath))
    })

    app.routerSchemas = routerSchemas
}
