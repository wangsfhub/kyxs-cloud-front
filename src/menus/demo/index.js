/**
 * 平台菜单
 */

export default [
    {
        label: '组织管理',
        icon: 'icon-caidan',
        permission:'wage_demo_menu',
        id:'1',
        children: [
            {
                label: '组织管理',
                icon: 'icon-yonghu',
                path: '/org',
                permission: 'wage_demo_menu1',
                id:'1-1',
            },
            {
                label: '岗位管理',
                icon: 'icon-yonghu',
                path: '/position',
                permission: 'wage_demo_menu2',
                id:'1-2',
            },
            {
                label: '花名册',
                icon: 'icon-yonghu',
                path: '/emp',
                permission: 'wage_demo_menu3',
                id:'1-3',
            }
        ]
    },
    {
        label: '入职管理',
        icon: 'icon-yonghu',
        path: '/entry',
        permission: 'wage_demo_menu4',
        id:'2',
    }
]