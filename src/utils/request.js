import axios from 'axios'

import { netConfig } from '@/config/net.config'
const {
    baseURL,
    contentType,
    requestTimeout,
    successCode,
    tokenName, } =
    netConfig;
import store from '@/store'
import qs from 'qs'
import router from '@/router'
import { ElMessage } from "element-plus";

let loadingInstance

/**
 * @description 处理code异常
 * @param {*} code
 * @param {*} msg
 */
const handleCode = (code, msg) => {
    switch (code) {
        case 401:
            ElMessage.error(msg || '登录失效')
            store.dispatch('user/resetAll').catch(() => {})
            break
        case 403:
            router.push({ path: '/401' }).catch(() => {})
            break
        default:
            ElMessage.error(msg || `后端接口${code}异常`)
            break
    }
}

/**
 * @description axios初始化
 */
const instance = axios.create({
    baseURL,
    timeout: requestTimeout,
    headers: {
        'Content-Type': contentType,
    },
})

/**
 * @description axios请求拦截器
 */
instance.interceptors.request.use(
    (config) => {
        if (store.getters['user/accessToken'])
            config.headers[tokenName] = store.getters['user/accessToken']
        if (
            config.data &&
            config.headers['Content-Type'] ===
            'application/x-www-form-urlencoded;charset=UTF-8'
        )
        config.data = qs.stringify(config.data)
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

/**
 * @description axios响应拦截器
 */
instance.interceptors.response.use(
    (response) => {
        if (loadingInstance) loadingInstance.close()

        const { data, config } = response
        const { code, msg } = data
        // 是否操作正常
        if (successCode.indexOf(code) !== -1) {
            return data
        } else {
            handleCode(code, msg)
            return Promise.reject(
                '请求异常拦截:' +
                JSON.stringify({ url: config.url, code, msg }) || 'Error'
            )
        }
    },
    (error) => {
        if (loadingInstance) loadingInstance.close()
        const { response, message } = error
        if (error.response && error.response.data) {
            const { status, data } = response
            handleCode(status, data.msg || message)
            return Promise.reject(error)
        } else {
            let { message } = error
            if (message === 'Network Error') {
                message = '后端接口连接异常'
            }
            if (message.includes('timeout')) {
                message = '后端接口请求超时'
            }
            if (message.includes('Request failed with status code')) {
                const code = message.substr(message.length - 3)
                message = '后端接口' + code + '异常'
            }
            ElMessage.error(message || `后端接口未知异常`)
            return Promise.reject(error)
        }
    }
)

export default instance
