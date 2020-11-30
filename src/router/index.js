import Vue from 'vue';
import Router from 'vue-router';

import store from "../store"


const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/home',
            meta: { title: '' }
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/home/Home.vue'),
            meta: { title: '自述文件', permission: true },
            children: [
                {
                    path: '/home',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/home/Dashboard.vue'),
                    meta: { title: '系统首页', permission: true }
                },
                {
                    path: '/220102',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/dingdan/demindreceipt.vue'),
                    meta: { title: '发布运单', permission: true }
                },
                {
                    path: '/220101',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/dingdan/demindList.vue'),
                    meta: { title: '运单列表', permission: true }
                },
                {
                    path: '/220103',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/dingdan/toUploadWaybill.vue'),
                    meta: { title: '历史订单', permission: true }
                },
                {
                    path: '/240103',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/ceshi/ceshi.vue'),
                    meta: { title: '数据总览', permission: true }
                },
                {
                    path: '/2601',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/vehicle/vehicle_index.vue'),
                    meta: { title: '车辆列表', permission: true }
                },
                {
                    path: '/2602',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/vehicle/vehicle_review.vue'),
                    meta: { title: '车辆审核', permission: true }
                },
                {
                    path: '/2604',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/vehicle/vehicle_come.vue'),
                    meta: { title: '车辆加油管理', permission: true }
                },
                {
                    path: '/2605',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/vehicle/vehicle_new_energy.vue'),
                    meta: { title: '新能源车辆充电费', permission: true }
                },
                {
                    path: '/2606',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/vehicle/vehicle_insurance.vue'),
                    meta: { title: '车辆保险费', permission: true }
                },
                {
                    path: '/2607',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/vehicle/vehicle_other.vue'),
                    meta: { title: '车辆其他费用', permission: true }
                },
                {
                    path: '/2608',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/vehicle/vehicle_depreciation.vue'),
                    meta: { title: '车辆折旧费', permission: true }
                },
                {
                    path: '/2609',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/vehicle/vehicle_taxes.vue'),
                    meta: { title: '车辆税金', permission: true }
                },
                {
                    path: '/2610',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/vehicle/vehicle_person.vue'),
                    meta: { title: '人员费用', permission: true }
                },
                {
                    path: '/210101',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/map/map.vue'),
                    meta: { title: '实时浏览', permission: true }
                },
                {
                    path: '/210102',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/map/map_arr.vue'),
                    meta: { title: '车辆分组', permission: true }
                },
                {
                    path: '/200202',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/basis/shop_index.vue'),
                    meta: { title: '店铺管理', permission: true }
                },
                {
                    path: '/200201',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/basis/add_shop.vue'),
                    meta: { title: '添加店铺', permission: true }
                },
                {
                    path: '/200401',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/basis/commodity_list.vue'),
                    meta: { title: '商品管理', permission: true }
                },
                {
                    path: '/200402',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/basis/add_good.vue'),
                    meta: { title: '商品添加', permission: true }
                },
                {
                    path: '/2005',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/basis/enterprise_information.vue'),
                    meta: { title: '企业信息管理', permission: true }
                },
                {
                    path: '/230101',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/statistics/statistics1.vue'),
                    meta: { title: '车辆里程统计', permission: true }
                },
                {
                    path: '/230102',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/statistics/statistics2.vue'),
                    meta: { title: '车辆能耗统计', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/404/404.vue'),
                    meta: { title: '404', }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/403/403.vue'),
                    meta: { title: '403', }
                },
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/login/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404',
            meta: { title: '404', }
        }
    ]
});




//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    setTimeout(() => {
        console.log(to)
        const role = store.state.users
        document.title = `${to.meta.title}`;
        if (role.length ==  0 && to.path !== '/login') {
            return next('/login');
        } else {
            // if (to.meta.permission) {
            //     let rolesw = store.state.users.menus.data.data
            //     let rolesarr = [];
            //     for (const i in rolesw) {
            //         rolesarr.push('/' + rolesw[i].href);
            //     }
            //     next()
            // } else {
            //     next()
            // }
            next()
        }
    }, 1)

});
Vue.use(Router);
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
export default router