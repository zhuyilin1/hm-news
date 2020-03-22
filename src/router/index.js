import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import User from '../pages/User.vue'
import Edit from '../pages/Edit.vue'
import Test from '../pages/Test.vue'
import Follow from '../pages/Follow.vue'
import MyComment from '../pages/MyComments.vue'
import Collect from '../pages/Collect.vue'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/user', component: User, name: 'user' },
    { path: '/edit', component: Edit, name: 'edit' },
    { path: '/test', component: Test, name: 'test' },
    { path: '/follow', component: Follow, name: 'follow' },
    { path: '/mycomment', component: MyComment, name: 'mycomment' },
    { path: '/collect', component: Collect, name: 'collect' }
  ]
})

router.beforeEach(function (to, from, next) {
  // console.log('to', to);
  // console.log('from', from);
  // console.log('我是路由守卫');
  const token = localStorage.getItem('token')
  const authUrl = ['/user', '/edit', '/follow', '/collect', '/mycomment']
  if (authUrl.includes(to.path) && !token) {
    next('/login')
  } else {
    next()
  }
})
export default router