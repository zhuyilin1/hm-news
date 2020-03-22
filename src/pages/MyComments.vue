<template>
  <div class="my-comment">
    <hm-header>我的跟帖</hm-header>
    <div class="list">
      <van-list
        @load="onload"
        :immediate-check="false"
        :offset="50"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
      >
        <div class="item" v-for="item in list" :key="item.id">
          <div class="time">{{item.create_date|date('YYYY-MM-DD HH:mm:ss')}}</div>
          <!-- 父评论的内容 -->
          <div class="parent-comment" v-if="item.parent">
            <div class="parent-name">回复： {{item.parent.user.nickname}}</div>
            <div class="parent-content">{{item.parent.content}}</div>
          </div>
          <div class="content">{{item.content}}</div>
          <div class="link" @click="$router.push(`/post-detail/${item.post.id}`)">
            <div class="title one-txt-cut">{{item.post.title}}</div>
            <span class="iconfont iconjiantou1"></span>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 10
    }
  },
  created() {
    this.getComentList()
  },
  methods: {
    async getComentList() {
      const res = await this.$axios({
        method: 'get',
        url: 'user_comments',
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        // this.list = data
        // 合并数组
        this.list = [...this.list, ...data]
        console.log(this.list)
        this.loading = false
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onload() {
      console.log('要触底了，接收更多数据')
      setTimeout(() => {
        this.pageIndex++
        this.getComentList()
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  .item {
    padding: 10px 20px;
    border-bottom: 1px solid #ccc;
    .time {
      color: #999;
      font-size: 14px;
      margin-bottom: 10px;
    }
    .content {
      font-size: 16px;
      margin: 10px 0;
    }
    .link {
      display: flex;
      font-size: 14px;
      .title {
        flex: 1;
        color: #999;
      }
      span {
        width: 50px;
        text-align: right;
      }
    }
  }
  .parent-comment {
    line-height: 30px;
    background-color: #ddd;
    font-size: 14px;
    color: #999;
    padding: 0 10px;
    .parent-name {
      font-size: 12px;
    }
  }
}
</style>