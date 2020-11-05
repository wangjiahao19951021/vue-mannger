import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import 'babel-polyfill';
//处理axios，让组件通过this.$http来使用
import axios from "axios"
// import axios from "./axios"
import store from "./store"
axios.defaults.withCredentials = true;
Vue.prototype.$http = axios
// import qs from "qs"
import AES from './commonjs/aes/aes'
Vue.prototype.$AES = AES;
Vue.config.productionTip = false;
Vue.use(ElementUI, {
    size: 'small',
    // 修改层级
    zIndex: 1000 
});
import config from "./commonjs/config"
Vue.prototype.$config = config;
Vue.prototype.$img_url = config.img_url;



import { Loading } from "element-ui"
Vue.use(Loading);
let loading;
function startLoading() {    //使用Element loading-start 方法
  loading = ElementUI.Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
function endLoading() {    //使用Element loading-close 方法
  loading.close()
}

axios.interceptors.request.use(
    config => {
        startLoading()
        let data = config.data;
        let params = new URLSearchParams()
        for (var key in config.data) {
            params.append(key, data[key])
        }
        config.data = params
        if (store.state.users && store.state.users.length !== 0) {
            if (store.state.users !== "") {
                let token = store.state.users.data.data
                // 默认值与接口传来的参数进行合并（注：接口参数与默认值不可重复）
                params.append('token', store.state.users.data.data)
            }
        }
        return config
    },
    error => {
        console.log(error)
        Promise.reject(error)
    }
)
axios.interceptors.response.use(function (response) {
    // console.log(response)
    // 对响应数据做点什么
    endLoading()
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});



new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
