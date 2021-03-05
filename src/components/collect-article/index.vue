<template>
  <van-icon
    :color="isCollected ? '#ffa500' : ''"
    :name="isCollected ? 'star' : 'star-o'"
    @click="onCollect"
    loading
  />
</template>

<script>
import { deleteCollect, addCollect } from '@/api/article.js'
export default {
  name: 'CollectArticle',
  model: {
    prop: 'isCollected', // 默认是value
    event: 'update-isCollected' // 默认是 input
  },
  props: {
    isCollected: {
      type: Boolean,
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
    async onCollect() {
      this.loading = true
      try {
        if (this.isCollected) {
          // 已收藏： 取消收藏
          await deleteCollect(this.articleId)
        } else {
          // 未收藏： 添加收藏
          await addCollect(this.articleId)
        }
        this.$emit('update-isCollected', !this.isCollected)
        // 此时 数据不是立即的，应该取反
        this.$toast.success(!this.isCollected ? '收藏成功' : '取消收藏')
      } catch (error) {
        this.$toast('收藏失败，请稍后再试！')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped></style>
