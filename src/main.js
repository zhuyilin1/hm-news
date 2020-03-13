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

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
