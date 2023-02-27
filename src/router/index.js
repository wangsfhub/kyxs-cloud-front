import { createRouter, createWebHashHistory,createWebHistory } from 'vue-router';
const Layout = () => import (/* @vite-ignore */ `../page/index.vue`);
import demo from './demo';
let routers = [].concat(demo)
export const constantRoutes = [
    {
        path: '/',
        redirect:'/index'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/page/login/index.vue'),
        meta: {
            title: '登录',
        },
        hidden: true,
    },
    {
        path: '/401',
        name: '401',
        component: () => import('@/page/errorPage/401.vue'),
        hidden: true,
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/page/errorPage/404.vue'),
        hidden: true,
    },
];
export const asyncRoutes  = [
    {
        path: '/index',
        component: Layout,
        children: routers
    },

]
const allRouter = constantRoutes.concat(asyncRoutes)
const router = createRouter({
    //history: createWebHashHistory(),
    history: createWebHistory(),//不带#
    routes: allRouter,
});
// reset router
export function resetRouter() {
    router.getRoutes().forEach((route) => {
        const { name } = route;
        if (name) {
            router.hasRoute(name) && router.removeRoute(name);
        }
    });
}

export default router;
