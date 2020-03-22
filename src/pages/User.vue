<template>
  <div class="user">
    <hm-header>个人中心</hm-header>
    <div class="info" @click="$router.push('/edit')">
      <div class="left">
        <img :src="$axios.defaults.baseURL + info.head_img" alt />
      </div>
      <div class="center">
        <div class="name">
          <span v-if="info.gender === 1" class="iconfont iconxingbienan"></span>
          <span v-else class="iconfont iconxingbienv"></span>
          <span>{{ info.nickname }}</span>
        </div>
        <div class="time">{{ info.create_date | date }}</div>
      </div>
      <div class="right">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <hm-navbar title="我的关注" component="关注的用户" @click="$router.push('/follow')"></hm-navbar>
    <hm-navbar title="我的跟帖" component="跟帖/回复" @click="$router.push('/mycomment')"></hm-navbar>
    <hm-navbar title="我的收藏" component="文章/视频" @click="$router.push('/collect')"></hm-navbar>
    <hm-navbar title="设置" @click="$router.push('/edit')"></hm-navbar>
    <hm-navbar title="退出" @click="logout"></hm-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {}
    }
  },
  async created() {
    const user_id = localStorage.getItem('userid')
    // 缺点：每个页面都要写
    // if (!token) {
    //   this.$router.push('/login')
    // }
    const res = await this.$axios({
      method: 'get',
      url: `/user/${user_id}`
    })
    // console.log(res)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.info = data
      // console.log(this.info)
    }
  },
  methods: {
    async logout() {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '你确定要退出本系统吗'
        })
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
        this.$router.push('/login')
        this.$toast.success('退出成功')
      } catch {
        this.$toast('取消操作')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  .info {
    height: 100px;
    display: flex;
    align-items: center;
    border-bottom: 3px solid #ccc;
    padding: 0 20px;
    .left {
      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
    }
    .center {
      flex: 1;
      margin-left: 20px;
      font-size: 14px;
      .name {
        .iconxingbienan {
          color: blue;
        }
        .iconxingbienv {
          color: pink;
        }
      }
      .time {
        color: #666;
      }
    }
    .right {
      width: 30px;
      text-align: right;
    }
  }
}
</style>
