<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="content"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="PostComment"
      :disabled="!content.length"
    >
      发布
    </van-button>
  </div>
</template>

<script>
import { postComment } from '@/api/comment'
export default {
  name: 'CommentPost',
  props: {
    target: {
      type: [String, Number, Object],
      required: true
    }
  },
  components: {},
  data() {
    return {
      content: '' // 评论内容
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async PostComment() {
      //  loading 转圈圈提示
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间，默认2000(0表示持续展示不停止)
      })
      this.postLoading = true
      try {
        const { data } = await postComment({
          target: this.target, // 评论的文章id（
          content: this.content.toString(), // 评论内容
          art_id: null // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        })
        console.log(data)
        // 清空文本框
        this.content = ''
        // 传递数据
        this.$emit('post-success', data.data)
        this.$toast.success('发表成功！')
      } catch (error) {
        this.$toast.fail('发表评论失败！')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
