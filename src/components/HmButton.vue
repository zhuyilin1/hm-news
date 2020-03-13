<template>
  <div class="hm-button">
    <slot></slot>
  </div>
</template>

<script>
export default {}
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
