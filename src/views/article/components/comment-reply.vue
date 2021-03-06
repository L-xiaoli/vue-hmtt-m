<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复 ` : '暂无回复'
      "
    >
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>
    <!-- /导航栏 -->
    <div class="srcoll-wrap">
      <!-- 当前评论项 -->
      <comment-item :comment="comment" />
      <!-- /当前评论项 -->

      <!-- 评论的回复列表 -->
      <van-cell title="全部回复" />
      <comment-list :source="comment.com_id" type="c" :list="commentList" />
      <!-- /评论的回复列表 -->
    </div>

    <!-- 底部 -->
    <div class="post-wrap">
      <van-button @click="isPostShow = true" class="post-btn" size="small" round
        >写评论</van-button
      >
    </div>
    <!-- /底部 -->
    <!-- 发表评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <comment-post :target="comment.com_id" @post-success="onReplySuccess" />
    </van-popup>
    <!-- / 发表评论 -->
  </div>
</template>

<script>
import CommentItem from './comment-item'
import CommentList from './comment-list'
import CommentPost from './comment-post'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },

  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isPostShow: false, // 弹出层
      commentList: [] // 评论回复列表
    }
  },

  methods: {
    onReplySuccess(data) {
      // 更新回复数量
      this.comment.reply_count++
      //  关闭弹出层
      this.isPostShow = false
      // 将最新的内容展示到列表顶部
      this.commentList.unshift(data.new_obj)
    }
  }
}
</script>

<style lang="less" scoped>
.srcoll-wrap {
  position: fixed;
  top: 10%;
  margin-top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}

.post-wrap {
  position: fixed;
  height: 88px;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  .post-btn {
    width: 60%;
    border-top: 1px solid #d8d8d8;
  }
}
</style>
