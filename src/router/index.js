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