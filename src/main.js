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
    size: 'small'
});

axios.interceptors.request.use(
    config => {
        let data = config.data;
        let params = new URLSearchParams()
        for (var key in config.data) {
            params.append(key, data[key])
        }
        // if (config.method === 'post') {
        //     config.data = qs.stringify(config.data)
        // }
        config.data = params
        // console.log(config)
        // config.headers.cc = "1"
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
