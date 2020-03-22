<template>
  <div class="test">
    <vue-cropper
      ref="cropper"
      img="http://himg2.huanqiu.com/attachment2010/2012/0814/20120814095136664.jpg"
      :outputSize="1"
      outputType="jpeg"
      :autoCrop="true"
      :info="true"
      :autoCropWidth="150"
      :autoCropHeight="150"
    ></vue-cropper>
    <van-button class="crop" type="primary" @click="crop">√</van-button>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  methods: {
    crop() {
      this.$refs.cropper.getCropBlob(data => {
        // 获取base64
        console.log(data)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.test {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .crop {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 45px;
    height: 30px;
    line-height: 30px;
    font-size: 18px;
  }
}
</style>
