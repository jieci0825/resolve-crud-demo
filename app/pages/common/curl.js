import { ElMessage } from 'element-plus'
const axios = require('axios')
const md5 = require('md5')

const CODE_ERRORS = {
    442: '请求参数异常',
    445: '请求不合法',
    50000: '服务器异常'
}

/**
 * 前端请求封装
 */
const curl = ({
    url,
    method = 'post',
    headers = {},
    data = {},
    params = {},
    responseType,
    timeout = 10000,
    errorMessage = '网络异常'
}) => {
    const signKey = 'ajofkopdkposkdasldasldasdp'
    const st = Date.now()

    const axiosParams = {
        url,
        method,
        headers: {
            ...headers,
            s_sign: md5(`${st}_${signKey}`),
            s_t: st
        },
        data,
        params,
        timeout,
        responseType
    }

    return axios(axiosParams)
        .then(response => {
            const respData = response.data || {}

            // 失败的请求
            if (!respData.success) {
                // 业务错误
                const { code } = respData
                if (CODE_ERRORS[code]) {
                    ElMessage.error(CODE_ERRORS[code])
                } else {
                    ElMessage.error(errorMessage)
                }

                return Promise.resolve({
                    success: false,
                    code,
                    message: respData.message || errorMessage
                })
            }

            const { data, metadata } = respData

            return Promise.resolve({
                success: true,
                data,
                metadata
            })
        })
        .catch(error => {
            const { message } = error
            if (message.match(/timeout/)) {
                return Promise.reject({
                    code: 504,
                    message: '请求超时'
                })
            }

            return Promise.reject(error)
        })
}

export default curl
