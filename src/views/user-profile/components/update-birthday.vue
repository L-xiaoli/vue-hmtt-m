<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="updateBirthday"
      @cancel="$emit('close')"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import dayJs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  model: {
    prop: 'birthday', // 默认是value
    event: 'update-birthday' // 默认是 input
  },
  props: {
    birthday: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.birthday) // 标准的日期对象
    }
  },
  methods: {
    async updateBirthday() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        const currentDate = dayJs(this.currentDate).format('YYYY-MM-DD')
        await updateUserProfile({
          birthday: currentDate // 输入的昵称
        })
        // 更新视图
        this.$emit('update-birthday', currentDate)
        //  关闭弹层
        this.$emit('close')
        //  提示成功
        this.$toast.success('生日修改成功！')
      } catch (error) {
        this.$toast.fail('生日修改失败！')
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
