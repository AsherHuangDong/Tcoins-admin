export const otcs = {
    path: '/otcs',
    name: 'otcs',
    component: () => import("../components/page/otcs/otcs"),
    title: "OTC承兑商管理",
    children: [
        {
            path: '/applyList',
            name: 'applyList',
            component: () => import("../components/page/otcs/applyList"),
            meta: { title: "承兑商申请列表" }
        },
        {
            path: '/setApply',
            name: 'setApply',
            component: () => import("../components/page/otcs/setApply"),
            meta: { title: "设置申请条件" }
        },
        {
            path: '/teamManagement',
            name: 'teamManagement',
            component: () => import("../components/page/otcs/teamManagement"),
            meta: { title: "团队管理" }
        },
        {
            path: '/addRole',
            name: 'addRole',
            component: () => import("../components/page/otcs/addRole"),
            meta: { title: "角色创建" }
        },
        {
            path: '/memberManagement',
            name: 'memberManagement',
            component: () => import("../components/page/otcs/memberManagement"),
            meta: { title: "承兑商会员管理" }
        },
        {
            path: '/personJiangli',
            name: 'personJiangli',
            component: () => import("../components/page/otcs/personJiangli"),
            meta: { title: "个人激励发放记录" }
        },
        {
            path: '/memberEdit',
            name: 'memberEdit',
            component: () => import("../components/page/otcs/memberEdit"),
            meta: { title: "编辑承兑商" }
        },
        {
            path: '/memberAdd',
            name: 'memberAdd',
            component: () => import("../components/page/otcs/memberAdd"),
            meta: { title: "添加承兑商" }
        },
    ]
}