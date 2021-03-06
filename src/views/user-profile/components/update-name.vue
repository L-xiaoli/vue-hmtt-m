<template>
  <div class="update-name">
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onUpdateName"
    />
    <div class="field-wrap">
      <van-field
        v-model="name"
        rows="1"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      >
      </van-field>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UpdateName',

  data() {
    return {
      name: ''
    }
  },

  methods: {
    onUpdateName() {
      console.log(2)
    }
  }
}
</script>

<style lang="less" scoped>
.field-wrap {
  padding-top: 20px;
}
</style>
