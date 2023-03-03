/**
 * @author wangsf
 * @description 路由守卫，目前两种模式：all模式与intelligence模式
 */
import router from '@/router'
import store from '@/store'
import getPageTitle from '@/utils/pageTitle'
import {
    setting
} from '@/config/setting.config'
const { authentication, loginInterception, progressBar, routesWhiteList, recordRoute } = setting;
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
    if (progressBar) NProgress.start();
    let hasToken = store.getters['user/accessToken']
    if (!setting.loginInterception) hasToken = true
    if (hasToken) {
        if (to.path === '/login') {
            next({ path: '/' });
            if (progressBar) NProgress.done();
        } else {
            const hasPermissions =
                store.getters['user/permissions'] && store.getters['user/permissions'].length > 0;
            if (hasPermissions) {
                next();
            } else {
                try {
                    let permissions;
                    if (!loginInterception) {
                        //settings.js loginInterception为false时，创建虚拟权限
                        await store.dispatch('user/setPermissions', ['admin']);
                        permissions = ['admin'];
                    } else {
                        permissions = await store.dispatch('user/getUserInfo');
                    }

                    let accessRoutes = [];
                    if (authentication === 'intelligence') {
                        accessRoutes = await store.dispatch('routes/setRoutes', permissions);
                    } else if (authentication === 'all') {
                        accessRoutes = await store.dispatch('routes/setAllRoutes');
                    }
                    accessRoutes.forEach((item) => {
                        router.addRoute(item);
                    });
                    next({ ...to, replace: true });
                } catch {
                    await store.dispatch('user/resetAccessToken');
                    if (progressBar) NProgress.done();
                }
            }
        }
    } else {
        // 免登录路由
        if (routesWhiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            if (recordRoute) {
                next(`/login?redirect=${to.path}`);
            } else {
                next('/login');
            }
            if (progressBar) NProgress.done();
        }
    }
})
router.afterEach((to) => {
    // 在即将进入新的页面组件前，关闭掉进度条
    if (progressBar) NProgress.done()
    document.title = getPageTitle(to.meta.title)
})
