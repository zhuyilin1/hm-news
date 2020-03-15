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
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  methods: {
    login() {
      this.$refs.username.validate(this.username)
      this.$refs.password.validate(this.password)
      if (
        !this.$refs.username.validate(this.username) ||
        !this.$refs.password.validate(this.password)
      ) {
        return
      }
      // console.log('登录')
      this.$axios({
        method: 'POST',
        url: '/login',
        data: {
          username: this.username,
          password: this.password
        }
      }).then(res => {
        console.log(res.data)
        if (res.data.statusCode === 200) {
          this.$toast.success('登录成功')
          this.$router.push('/user')
        } else {
          this.$toast.fail('用户名或密码失败')
        }
      })
    }
  },
  data() {
    return {
      username: '',
      password: ''
    }
  }
}
</script>

<style></style>
