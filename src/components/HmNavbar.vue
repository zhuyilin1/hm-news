<template>
  <div class="hm-navbar" @click="clickFn">
    <div class="left">{{ title }}</div>
    <div class="center">{{ component }}</div>
    <div class="right">
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    component: String
  },
  methods: {
    clickFn() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
.hm-navbar {
  height: 50px;
  line-height: 50px;
  display: flex;
  border-bottom: 1px solid #ccc;
  margin-left: 20px;
  font-size: 14px;
  .center {
    flex: 1;
    text-align: right;
    color: #999;
  }
  .right {
    width: 30px;
    color: #999;
  }
}
</style>
