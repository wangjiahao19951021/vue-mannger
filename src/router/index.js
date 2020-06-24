import Vue from 'vue';
import Router from 'vue-router';

import store from "../store"


const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/demindreceipt',
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
                    path: '/demindreceipt',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/dingdan/demindreceipt.vue'),
                    meta: { title: '票据审核', permission: true }
                },
                {
                    path: '/demindList',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/dingdan/demindList.vue'),
                    meta: { title: '订单管理列表', permission: true }
                },
                {
                    path: '/toUploadWaybill',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/dingdan/toUploadWaybill.vue'),
                    meta: { title: '上传运单报文', permission: true }
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
        const role = store.state.cars[0]
        // const role = 'su'
        // console.log(role)
        document.title = `${to.meta.title}`;
        if (!role && to.path !== '/login') {
            return next('/login');
        } else {
            if (to.meta.permission) {
                //权限数组
                let rolesw = JSON.parse(sessionStorage.getItem("menu"))
                let rolesarr = [];
                for (const i in rolesw) {
                    if (rolesw[i].subs) {
                        for (const j in rolesw[i].subs) {
                            if (rolesw[i].subs[j].subs) {
                                for (const k in rolesw[i].subs[j].subs) {
                                    if (rolesw[i].subs[j].subs[k].subs) {

                                    } else {
                                        rolesarr.push('/' + rolesw[i].subs[j].subs[k].index);
                                    }
                                }
                            } else {
                                rolesarr.push('/' + rolesw[i].subs[j].index);
                            }
                        }
                    } else {
                        rolesarr.push('/' + rolesw[i].index);
                    }
                }
                // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
                rolesarr.indexOf(to.path) !== -1 ? next() : next('/403')


                // let rolesw = JSON.parse(sessionStorage.getItem("menu"))
                // let rolesarr = [];
                // console.log(rolesw)
                // for (const i in rolesw.data) {
                //     rolesarr.push('/' + rolesw.data[i].href);
                // }
                // next()
            } else {
                next()
            }
        }
    }, 1)

});
Vue.use(Router);
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
export default router