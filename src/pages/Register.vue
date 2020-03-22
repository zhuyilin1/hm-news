<template>
  <div class="register">
    <hm-header>注册</hm-header>
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
      type="text"
      placeholder="昵称"
      v-model="nickname"
      :rule="/^[\u4e00-\u9fa5]{3,7}$/"
      message="昵称必须是3-7位中文"
      ref="nickname"
    ></hm-input>
    <hm-input
      type="password"
      placeholder="密码"
      v-model="password"
      :rule="/^\d{3,12}$/"
      message="密码格式错误"
      ref="password"
    ></hm-input>
    <hm-button @click="register">注册</hm-button>
    <div class="go-login">
      已有账号？去
      <router-link to="/login">登录</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      nickname: ''
    }
  },
  methods: {
    async register() {
      let status1 = this.$refs.username.validate(this.username)
      let status2 = this.$refs.password.validate(this.password)
      let status3 = this.$refs.nickname.validate(this.nickname)
      if (!status1 || !status2 || !status3) {
        return
      }
      const res = await this.$axios({
        method: 'post',
        url: '/register',
        data: {
          username: this.username,
          nickname: this.nickname,
          password: this.password
        }
      })
      if (res.data.statusCode === 200) {
        this.$toast.success(res.data.message)
        // 使用query获取参数
        // this.$router.push({
        //   path: '/login',
        //   query: { username: this.username, password: this.password }
        // })
        // 使用params获取参数
        this.$router.push({
          name: 'login',
          params: { username: this.username, password: this.password }
        })
      } else {
        this.$toast.fail(res.data.message)
      }
    }
  }
}
</script>

<style scoped>
.go-login {
  font-size: 14px;
  float: right;
  padding-right: 20px;
}
</style>
