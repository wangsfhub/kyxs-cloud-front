/**
 * @author chuzhixin 1204505056@qq.com
 * @description 路由守卫，目前两种模式：all模式与intelligence模式
 */
import router from '@/router'
import store from '@/store'
import getPageTitle from '@/utils/pageTitle'
import {
    setting
} from '@/config/setting.config'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({
    easing: 'ease',  // 动画方式
    speed: 500,  // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3 // 初始化时的最小百分比
})
router.beforeEach(async (to, from, next) => {
    // 每次切换页面时，调用进度条
    NProgress.start();
    next();
    return ;
    let hasToken = store.getters['user/accessToken']

    if (!setting.loginInterception) hasToken = true

    if (hasToken) {
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            const hasRoles =
                store.getters['acl/admin'] ||
                store.getters['acl/role'].length > 0 ||
                store.getters['acl/ability'].length > 0
            if (hasRoles) {
                next()
            } else {
                try {
                    if (setting.loginInterception) {
                        await store.dispatch('user/getUserInfo')
                    } else {
                        //loginInterception为false（关闭登录拦截时）时，创建虚拟角色
                        await store.dispatch('user/setVirtualRoles')
                    }

                    let accessRoutes = []
                    if (setting.authentication === 'intelligence') {
                        accessRoutes = await store.dispatch('routes/setRoutes')
                    } else if (setting.authentication === 'all') {
                        accessRoutes = await store.dispatch('routes/setAllRoutes')
                    }
                    accessRoutes.forEach((item) => {
                        router.addRoute(item)
                    })

                    next({ ...to, replace: true })
                } catch {
                    await store.dispatch('user/resetAll')
                    if (setting.recordRoute)
                        next({
                            path: '/login',
                            query: { redirect: to.path },
                            replace: true,
                        })
                    else next({ path: '/login', replace: true })
                }
            }
        }
    } else {
        if (setting.routesWhiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            if (setting.recordRoute)
                next({ path: '/login', query: { redirect: to.path }, replace: true })
            else next({ path: '/login', replace: true })
        }
    }
})
router.afterEach((to) => {
    // 在即将进入新的页面组件前，关闭掉进度条
    NProgress.done()
    document.title = getPageTitle(to.meta.title)
})
