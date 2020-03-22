<template>
  <div class="follow">
    <hm-header>我的关注</hm-header>
    <div class="list">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="left">
          <img :src="$axios.defaults.baseURL+item.head_img" alt />
        </div>
        <div class="center">
          <div class="title">{{item.nickname}}</div>
          <div class="time">{{item.create_date|date}}</div>
        </div>
        <div class="right" @click="cancelFollow(item.id)">取消关注</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getFollowList()
  },
  methods: {
    async getFollowList() {
      const res = await this.$axios({
        method: 'get',
        url: '/user_follows'
      })
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        console.log(this.list)
      }
    },
    async cancelFollow(id) {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '确定要取消关注吗?'
        })
        const res = await this.$axios({
          method: 'get',
          url: `/user_unfollow/${id}`
        })
        const { statusCode, message } = res.data
        if (statusCode === 200) {
          this.getFollowList()
          this.$toast.success(message)
        }
      } catch {
        this.$toast('取消操作')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  .item {
    border-bottom: 1px solid #ccc;
    display: flex;
    height: 100px;
    align-items: center;
    padding: 0 20px;
    .left {
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    .center {
      flex: 1;
      margin-left: 20px;
      .title {
        font-size: 16px;
      }
      .time {
        color: #999;
        font-size: 14px;
      }
    }
    .right {
      text-align: right;
      width: 70px;
      height: 30px;
      text-align: center;
      background-color: #ddd;
      line-height: 30px;
      border-radius: 15px;
      font-size: 14px;
    }
  }
}
</style>