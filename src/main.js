import Vue from 'vue'
import App from './App.vue'

// 导入样式
import './styles/common.less'
// 导入字体图标
import './styles/iconfont.less'
// 导入lib-flexible,自动适配所有屏幕
import 'lib-flexible'
// 导入路由
import router from './router'
// 导入HmHeader组件
import HmHeader from './components/HmHeader.vue'
Vue.component('hm-header', HmHeader)
// 导入HmLogo组件
import HmLogo from './components/HmLogo.vue'
Vue.component('hm-logo', HmLogo)
// 导入HmButton组件
import HmButton from './components/HmButton.vue'
Vue.component('hm-button', HmButton)
// 导入HmInput组件
import HmInput from './components/HmInput.vue'
Vue.component('hm-input', HmInput)
// 导入HmNavbar组件
import HmNavbar from './components/HmNavbar.vue'
Vue.component('hm-navbar', HmNavbar)
// 全局过滤，导入moment组件
import moment from 'moment'
Vue.filter('date', function (input, format = 'YYYY-MM-DD') {
  return moment(input).format(format)
})

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$axios = axios
// 导入vantui,若全局导入，所有组件在打包时会很大
/* import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant) */
import { Button, Field, Toast, Dialog, RadioGroup, Radio, Cell, CellGroup, Uploader, List } from 'vant'
Vue.use(Button)
Vue.use(Field)
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Uploader)
Vue.use(List)
// axios响应拦截器
axios.interceptors.response.use(function (res) {
  // console.log(res);
  const { statusCode, message } = res.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    router.push('/login')
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    Toast.fail(message)
  }
  return res
})
// axios请求拦截器
axios.interceptors.request.use(function (config) {
  // console.log(config);
  const token = localStorage.getItem('token')
  config.headers.Authorization = token
  return config
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
