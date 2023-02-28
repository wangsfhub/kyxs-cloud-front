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
// export const asyncRoutes  = [
//     {
//         path: '/index',
//         component: Layout,
//         children: routers
//     },
// ]
export const asyncRoutes = [
    {
        path: '/',
        component: Layout,
        redirect: '/index',
        name: 'Root',
        children: [
            {
                path: '/index',
                name: 'Index',
                component: () => import('@/views/index/index.vue'),
                meta: {
                    title: '首页',
                    icon: 'icon-home',
                    affix: true,
                    noKeepAlive: true,
                },
            },
        ],
    },
    {
        path: '/org',
        component: Layout,
        name: 'Org',
        meta: { title: '组织管理', icon: 'icon-code' },
        children: [
            {
                path: '/org',
                name: '组织管理',
                component: () => import('@/views/org/index.vue'),
                meta: {
                    title: '组织管理',
                    icon: 'icon-code',
                },
            },
        ],
    },
    {
        path: '/emp',
        component: Layout,
        name: 'emp',
        meta: { title: '员工花名册', icon: 'icon-code' },
        children: [
            {
                path: '/emp',
                name: '员工管理',
                component: () => import('@/views/emp/index.vue'),
                meta: {
                    title: '员工管理',
                    icon: 'icon-code',
                },
            },
        ],
    },
    {
        path: '/errorPage',
        name: 'ErrorPage',
        component: Layout,
        meta: {
            title:'错误页面',
            icon: 'icon-link-cloud-faild',
        },
        children: [
            {
                path: '/404Page',
                name: '404Page',
                component: () => import('@/page/errorPage/404.vue'),
                meta: {
                    title: '404',
                    icon: 'icon-link-cloud-faild',
                },
            },
            {
                path: '/401Page',
                name: '401Page',
                component: () => import('@/page/errorPage/401.vue'),
                meta: {
                    title:'401',
                    icon: 'icon-link-interrupt',
                },
            },
        ],
    },
];

const allRouter = constantRoutes.concat(asyncRoutes)
const router = createRouter({
   // history: createWebHashHistory(),
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
