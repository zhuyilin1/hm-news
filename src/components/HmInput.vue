<template>
  <div class="hm-input">
    <input
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="inputFn"
      :class="{ success: status === 'success', error: status === 'error' }"
    />
    <div class="tips" v-show="status === 'error'">{{ message }}</div>
  </div>
</template>

<script>
export default {
  // props: ['type', 'placeholder']
  props: {
    type: {
      type: String,
      defalut: 'text'
    },
    placeholder: {
      type: String,
      defalut: '请输入...'
    },
    value: String,
    rule: RegExp,
    message: String
  },
  data() {
    return {
      status: ''
    }
  },
  methods: {
    inputFn(e) {
      // console.log(e.target.value)
      this.$emit('input', e.target.value)
      let value = e.target.value
      this.validate(value)
    },
    validate(value) {
      if (this.rule) {
        if (this.rule.test(value)) {
          this.status = 'success'
          return true
        } else {
          this.status = 'error'
          return false
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.hm-input {
  height: 50px;
  margin: 0 20px;
  input {
    width: 100%;
    height: 30px;
    line-height: 30px;
    border: none;
    border-bottom: 1px solid #ccc;
    font-size: 18px;
    outline: none;
    &.error {
      border-color: red;
    }
    &.success {
      border-color: green;
    }
  }
  .tips {
    height: 20px;
    line-height: 20px;
    color: red;
    font-size: 12px;
  }
}
</style>
