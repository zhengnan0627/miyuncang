import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
import uView from "uview-ui";
//引入自建请求封装
import $request from './common/request.js'
Vue.prototype.$request = $request

Vue.use(uView);

const app = new Vue({
    ...App
})
app.$mount()
