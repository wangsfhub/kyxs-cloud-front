/**
 * 菜单
 */


export default [
    {
        path: '/org',
        name: '组织管理',
        component: () => import ( /* @vite-ignore */`../../views/demo/index.vue`),
    },
    {
        path: '/position',
        name: '岗位管理',
        component: () =>  import ( /* @vite-ignore */`../../views/demo/index1.vue`),
    },
    {
        path: '/emp',
        name: '员工管理',
        component: () =>  import ( /* @vite-ignore */`../../views/demo/index2.vue`),
    },
    {
        path: '/entry',
        name: '入职管理',
        component: () =>  import ( /* @vite-ignore */`../../views/demo/index3.vue`),
    },
]