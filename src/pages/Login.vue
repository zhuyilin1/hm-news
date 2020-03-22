<template>
  <div class="login">
    <hm-header>登录</hm-header>
    <hm-logo></hm-logo>
    <hm-input
      type="text"
      placeholder="用户名/手机号码"
      v-model="username"
      :rule="/^1\d{4,10}$/"
      message="用户名格式错误"
      ref="username"
    ></hm-input>
    <hm-input
      type="password"
      placeholder="密码"
      v-model="password"
      :rule="/^\d{3,12}$/"
      message="密码格式错误"
      ref="password"
    ></hm-input>
    <hm-button @click="login">登录</hm-button>
    <div class="go-register">
      没有账号？去
      <router-link to="/register">注册</router-link>
    </div>
  </div>
</template>

<script>
import { log } from 'util'
// import axios from 'axios'
export default {
  methods: {
    async login() {
      this.$refs.username.validate(this.username)
      this.$refs.password.validate(this.password)
      if (
        !this.$refs.username.validate(this.username) ||
        !this.$refs.password.validate(this.password)
      ) {
        return
      }
      // console.log('登录')
      const res = await this.$axios({
        method: 'POST',
        url: '/login',
        data: {
          username: this.username,
          password: this.password
        }
      })
      // console.log(res.data)
      const { statusCode, data, message } = res.data
      if (statusCode === 200) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('userid', data.user.id)
        this.$toast.success(message)
        this.$router.push('/user')
      } else {
        this.$toast.fail(message)
      }
    }
  },
  created() {
    // console.log(this.$route)
    this.username = this.$route.params.username
    this.password = this.$route.params.password
  },
  data() {
    return {
      username: '',
      password: ''
    }
  }
}
</script>

<style scoped>
.go-register {
  font-size: 14px;
  float: right;
  padding-right: 20px;
}
</style>
