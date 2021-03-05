<template>
  <van-button
    v-if="isFollowed"
    @click="onFollow"
    round
    size="small"
    :loading="followLoading"
    >已关注</van-button
  >
  <van-button
    @click="onFollow"
    v-else
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="followLoading"
    >关注</van-button
  >
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user.js'
export default {
  name: 'UserFollow',
  model: {
    prop: 'isFollowed', // 默认是value
    event: 'update-isFollowed' // 默认是 input
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data() {
    return {
      followLoading: false
    }
  },

  methods: {
    // 关注于取消关注
    async onFollow() {
      // 开启 loading状态
      this.followLoading = true
      try {
        if (this.isFollowed) {
          // 已关注： 取消关注
          await deleteFollow(this.userId)
        } else {
          // 未关注 ： 关注用户
          await addFollow(this.userId)
        }
        // 更新视图
        this.$emit('update-isFollowed', !this.isFollowed)
      } catch (error) {
        let message = '操作失败,请稍后重试！'
        if (error.response && error.response.status === 400) {
          message = '用户不能关注自己！'
        }
        this.$toast.fail(message)
      }
      // 关闭 loading状态
      this.followLoading = false
    }
  }
}
</script>

<style lang="less" scoped></style>
