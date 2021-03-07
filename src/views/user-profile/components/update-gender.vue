<template>
  <div class="update-gender">
    <van-picker
      title="性别"
      show-toolbar
      :columns="genders"
      :default-index="gender"
      @confirm="updateGender"
      @cancel="$emit('close')"
      @change="onPickerChange"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateGender',
  model: {
    prop: 'gender', // 默认是value
    event: 'update-gender' // 默认是 input
  },
  props: {
    gender: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      genders: ['男', '女'],
      localGender: this.gender // 选中的性别值
    }
  },
  methods: {
    onPickerChange(picker, value, index) {
      this.localGender = index
    },
    async updateGender(value, index) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        const localGender = this.localGender
        await updateUserProfile({
          gender: localGender // 输入的昵称
        })
        // 更新视图
        this.$emit('update-gender', localGender)
        //  关闭弹层
        this.$emit('close')
        //  提示成功
        this.$toast.success('性别修改成功！')
      } catch (error) {
        this.$toast.fail('性别修改失败！')
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
