<template>
  <div class="edit">
    <hm-header>编辑资料</hm-header>
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + info.head_img" alt />
      <van-uploader class="uploader" :after-read="afterRead" />
    </div>
    <hm-navbar title="昵称" :component="info.nickname" @click="showNickname"></hm-navbar>
    <hm-navbar title="密码" :component="info.password | password" @click="showPassword"></hm-navbar>
    <hm-navbar title="性别" :component="info.gender === 1 ? '男' : '女'" @click="showGender"></hm-navbar>
    <!-- 修改昵称 -->
    <van-dialog v-model="show" title="修改昵称" show-cancel-button @confirm="editNickname">
      <van-field v-model="nickname" placeholder="请输入用户名" />
    </van-dialog>
    <!-- 修改密码 -->
    <van-dialog v-model="show1" title="修改密码" show-cancel-button @confirm="editPassword">
      <van-field v-model="password" placeholder="请输入密码" />
    </van-dialog>
    <!-- 修改性别 -->
    <van-dialog v-model="show2" title="修改性别" show-cancel-button @confirm="editGender">
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <van-radio slot="right-icon" :name="1" />
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <van-radio slot="right-icon" :name="0" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
    <!-- 裁剪框 -->
    <div class="crop" v-show="showCropper">
      <VueCropper
        ref="cropper"
        :img="img"
        :autoCrop="true"
        :autoCropWidth="150"
        :autoCropHeight="150"
        :fixed="true"
      ></VueCropper>
      <van-button class="bingo" type="primary" @click="crop">√</van-button>
      <van-button class="cancel" type="info" @click="cancel">×</van-button>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  data() {
    return {
      info: {
        // password: ''
      },
      show: false,
      nickname: '',
      show1: false,
      password: '',
      show2: false,
      gender: 1,
      showCropper: false,
      img: ''
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    async getInfo() {
      const user_id = localStorage.getItem('userid')
      const token = localStorage.getItem('token')
      const res = await this.$axios({
        method: 'get',
        url: `/user/${user_id}`,
        headers: {
          Authorization: token
        }
      })
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.info = data
      }
    },
    async editUser(data) {
      const user_id = localStorage.getItem('userid')
      const res = await this.$axios({
        method: 'post',
        url: `/user_update/${user_id}`,
        data
      })
      // console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.getInfo()
        this.$toast.success(message)
      }
    },
    showNickname() {
      this.show = true
      this.nickname = this.info.nickname
    },
    editNickname() {
      // console.log('修改昵称')
      this.editUser({
        nickname: this.nickname
      })
    },
    showPassword() {
      this.show1 = true
    },
    editPassword() {
      // console.log('修改密码')
      this.editUser({
        password: this.password
      })
    },
    showGender() {
      this.show2 = true
    },
    editGender() {
      this.editUser({
        gender: this.gender
      })
    },
    /* beforeRead(file) {
      console.log('上传之前', file)
      if (file.size / 1024 >= 200) {
        this.$toast.fail('文件大小不能超过200kb')
        return false
      }
      if (file.type !== 'image/jpeg') {
        this.$toast.fail('文件格式必须为jpeg')
        return false
      }
      return true
    }, */
    afterRead(file) {
      // console.log('异步上传文件', file.file)
      this.showCropper = true
      this.img = file.content
      // const fd = new FormData()
      // fd.append('file', file.file)
      // this.$axios({
      //   method: 'post',
      //   url: '/upload',
      //   data: fd
      // }).then(res => {
      //   // console.log(res)
      //   const { statusCode, data } = res.data
      //   if (statusCode === 200) {
      //     console.log(data.url)
      //     this.editUser({
      //       head_img: data.url
      //     })
      //   }
      // })
    },
    cancel() {
      this.showCropper = false
      this.img = ''
    },
    crop() {
      this.$refs.cropper.getCropBlob(async data => {
        // 获取file文件
        // console.log(data)
        const fd = new FormData()
        fd.append('file', data)
        const res = await this.$axios({
          method: 'post',
          url: '/upload',
          data: fd
        })
        const { statusCode, data: data1 } = res.data
        if (statusCode === 200) {
          // console.log(data.url)
          this.showCropper = false
          this.img = ''
          this.editUser({
            head_img: data1.url
          })
        }
      })
    }
  },
  // 定义局部过滤器，动态渲染密码
  filters: {
    password(input) {
      if (input) {
        return input.replace(/./g, '*')
      } else {
        return ''
      }
    }
  },
  components: {
    VueCropper
  }
}
</script>

<style lang="less" scoped>
.edit {
  .avatar {
    position: relative;
    img {
      width: 70px;
      height: 70px;
      display: block;
      margin: 30px auto;
      border-radius: 50%;
    }
    .uploader {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 0;
      opacity: 0;
    }
  }
  .van-dialog {
    padding: 0 10px;
  }
  .van-field {
    border: 1px solid #ccc;
    margin: 10px 0;
  }
  .crop {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 1;
    .bingo,
    .cancel {
      position: absolute;
      top: 0;
      font-size: 18px;
    }
    .bingo {
      left: 0;
    }
    .cancel {
      right: 0;
    }
  }
}
</style>
