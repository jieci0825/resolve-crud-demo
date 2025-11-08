import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import pinia from '$store'
import {
    createRouter,
    createWebHistory,
    createWebHashHistory
} from 'vue-router'
import 'element-plus/dist/index.css'
import './assets/styles/custom.css'

function registerRouter(app, routes) {
    if (!Array.isArray(routes) || !routes.length) return

    const router = createRouter({
        history: createWebHashHistory(),
        routes
    })

    app.use(router)
}

function registerLibs(app, libs) {
    if (!Array.isArray(libs) || !libs.length) return

    for (let i = 0; i < libs.length; i++) {
        app.use(libs[i])
    }
}

function globalRegister(app, options) {
    registerRouter(app, options.routes)
    registerLibs(app, options.libs)
    app.use(ElementPlus)
    app.use(pinia)
}

/**
 * @typedef {object} Options
 * @property {Array} routes 路由配置
 * @property {Array} libs 需要加载的库
 */

/**
 * 页面启动函数
 * @param {object} pageComponent Vue 入口组件
 * @param {Options} options 配置项
 */
export default function boot(pageComponent, options) {
    const _options = normalizeOptions(options)
    const app = createApp(pageComponent)
    globalRegister(app, _options)
    app.mount('#root')
}

/**
 * 归一化 options
 * @param {Options} options
 */
function normalizeOptions(options) {
    const defaultOptions = {
        routes: [],
        libs: []
    }

    return Object.assign({}, defaultOptions, options)
}
