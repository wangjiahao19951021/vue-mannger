import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/home/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/home',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/home/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/demindreceipt',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/dingdan/demindreceipt.vue'),
                    meta: { title: '票据审核' }
                },
                {
                    path: '/demindList',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/dingdan/demindList.vue'),
                    meta: { title: '订单管理列表' }
                },
                {
                    path: '/toUploadWaybill',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/dingdan/toUploadWaybill.vue'),
                    meta: { title: '上传运单报文' }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/404/404.vue'),
                    meta: { title: '404' }
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
            redirect: '/404'
        }
    ]
});
