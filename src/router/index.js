import * as VueRouter from 'vue-router'
const Layout = () => import (/* @vite-ignore */ `../page/index.vue`);
import demo from './demo';
let routers = [].concat(demo)
const routes = [
    {
        path: '/',
        component: Layout,
        children: routers
    },
    {
        path: '/login',
        component: () => import(/* @vite-ignore */'../page/login.vue')
    },
]
export default VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
})
