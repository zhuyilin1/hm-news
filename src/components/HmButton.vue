<template>
  <div class="hm-button" @click="clickFn">
    <slot></slot>
  </div>
</template>

<script>
export default {
  methods: {
    clickFn() {
      console.log("我要登录了");
      this.$emit("click");
    }
  }
};
</script>

<style lang="less" scoped>
.hm-button {
  margin: 20px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: rgba(204, 51, 0, 1);
  font-size: 18px;
  color: #fff;
  border-radius: 25px;
}
</style>
