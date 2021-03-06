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
        v-model.trim="localName"
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
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateName',
  model: {
    prop: 'name', // 默认是value
    event: 'update-name' // 默认是 input
  },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      localName: this.name // 输入的内容
    }
  },

  methods: {
    async onUpdateName() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        const localName = this.localName
        if (!localName.length) {
          this.$toast('昵称不能为空！')
          return
        }
        const { data } = await updateUserProfile({
          name: localName // 输入的昵称
        })
        console.log(data)
        // 更新视图
        this.$emit('update-name', localName)
        //  关闭弹层
        this.$emit('close')
        //  提示成功
        this.$toast.success('昵称修改成功！')
      } catch (error) {
        console.log(error)
        this.$toast.fail('昵称修改失败！')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.field-wrap {
  padding-top: 20px;
}
</style>
