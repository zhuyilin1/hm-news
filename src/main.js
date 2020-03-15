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
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$axios = axios
// 导入vantui,若全局导入，所有组件在打包时会很大
/* import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant) */
import { Button, Field, Toast } from 'vant'
Vue.use(Button)
Vue.use(Field)
Vue.use(Toast)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
