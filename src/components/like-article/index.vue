<template>
  <van-icon
    :color="isLike === 1 ? '#e5645f' : ''"
    :name="isLike === 1 ? 'good-job' : 'good-job-o'"
    @click="onLike"
    loading
  />
</template>

<script>
import { addLike, deleteLike } from '@/api/article'
export default {
  name: 'LikeArticle',
  model: {
    prop: 'isLike', // 默认是value
    event: 'update-isLike' // 默认是 input
  },
  props: {
    isLike: {
      type: Number,
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },

  methods: {
    async onLike() {
      this.loading = true
      try {
        let likeStatus = -1
        if (this.isLike === 1) {
          // 已点赞： 取消点赞
          await deleteLike(this.articleId)
        } else {
          // 未点赞： 添加点赞
          await addLike(this.articleId) // 否则添加点赞
          likeStatus = 1
        }
        this.$emit('update-isLike', likeStatus)
        // 此时 数据不是立即的，应该取反
        this.$toast.success(likeStatus === 1 ? '点赞成功' : '取消点赞')
      } catch (error) {
        this.$toast.fail('收藏失败，请稍后再试！')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped></style>
