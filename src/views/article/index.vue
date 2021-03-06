<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="onClickLeft"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="isLoading" class="loading-wrap">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="article.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <!-- 传递给子组件的数据既要使用又要更改：
            传递：props
                :is-followed="article.is_followed"
            修改：自定义事件
                @update-follow="article.is_followed = $event"
            简写方式：在组件上使用v-model(一个组件只能使用一次)
            v-model=  value="article.is_followed"   +  @input="article.is_followed = $event"
            多个数据想实现这个功能：.sync
            -->
          <user-follow
            class="follow-btn"
            v-model="article.is_followed"
            :user-id="article.aut_id"
          />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          ref="article-content"
          class="markdown-body  article-content"
          v-html="article.content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 文章评论 -->
        <comment-list
          :source="article.art_id"
          :list="commentList"
          @onload-success="totalCount = $event.total_count"
          @reply-click="onReplyClick"
        />
        <!-- /  文章评论 -->
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPostShow = true"
            >写评论</van-button
          >
          <van-icon name="comment-o" :info="totalCount" color="#777" />
          <!-- 收藏文章按钮 -->
          <collect-article
            v-model="article.is_collected"
            :article-id="article.art_id"
          />
          <!-- / 收藏文章按钮 -->
          <!-- 点赞 -->
          <like-article
            class="btn-item"
            v-model="article.attitude"
            :article-id="article.art_id"
          />

          <!-- /点赞 -->
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
        <!-- 发布评论弹出层-->
        <van-popup v-model="isPostShow" position="bottom">
          <comment-post
            :target="article.art_id"
            @post-success="onPostSuccess"
          />
        </van-popup>
        <!-- / 发布评论弹出层 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="errStatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArtcileInfo"
          >点击重试</van-button
        >
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- 回复评论 弹出层-->
    <!-- // ! 解决内容不重新获取问题
        原因：弹出层是懒渲染的：只有在第一次展示的时候才会渲染里面的内容，之后它的关闭与显示都只是通过 CSS 控制隐藏和显示
        解决：利用v-if（条件渲染）控制组件的创建和销毁
     -->
    <van-popup v-model="isReplyShow" position="bottom" style="height:90%;">
      <comment-reply
        v-if="isReplyShow"
        :comment="currentComment"
        @close="isReplyShow = false"
      />
    </van-popup>
    <!-- / 回复评论 弹出层-->
  </div>
</template>

<script>
import { getArticleById } from '@/api/article.js'
import './github-markdown.css'
import { ImagePreview } from 'vant'
import UserFollow from '@/components/user-follow'
import CollectArticle from '@/components/collect-article'
import LikeArticle from '@/components/like-article'
import CommentList from './components/comment-list'
import CommentPost from './components/comment-post'
import CommentReply from './components/comment-reply.vue'
export default {
  name: 'ArticleIndex',
  components: {
    UserFollow,
    CollectArticle,
    LikeArticle,
    CommentList,
    CommentPost,
    CommentReply
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      article: '', // 文章详情
      isLoading: true, // 文章加载状态
      errStatus: 0, // 失败状态码
      followLoading: false, // 关注加载状态
      totalCount: 0, // 评论总条数
      isPostShow: false, // 评论弹出层，
      commentList: [], // 评论列表
      isReplyShow: false, // 回复评论弹出层，
      currentComment: {} // 当前点击回复的评论项
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadArtcileInfo()
  },
  mounted() {},
  methods: {
    // 获取文章详情
    async loadArtcileInfo() {
      this.isLoading = true
      try {
        const { data } = await getArticleById(this.articleId)
        this.article = data.data
        // 数据加载完成
        // setTimeout(() => {
        //   this.previewImage()
        // }, 10)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
        this.$toast('获取失败')
      }
      // 无论成功失败，都需要关闭loading
      this.isLoading = false
      this.$nextTick(this.previewImage)
    },
    onClickLeft() {
      this.$router.push('/')
    },

    // 点击图片预览
    previewImage() {
      //  得到所有的图片节点
      const articleContent = this.$refs['article-content']
      const allImg = articleContent.querySelectorAll('img')
      const images = []
      allImg.forEach((img, index) => {
        images.push(img.src)
        // 给每个图片添加点击事件
        img.onclick = () => {
          ImagePreview({
            // 预览的图片地址数组
            images,
            // 设置初始页,点击谁就从谁开始
            startPosition: index
          })
        }
      })
    },
    // 发布评论成功的事件
    onPostSuccess(data) {
      // 关闭弹出层
      this.isPostShow = false
      // 展示数据到顶部
      this.commentList.unshift(data.new_obj)
    },
    // 点击回复按钮后的事件
    onReplyClick(comment) {
      this.currentComment = comment
      this.isReplyShow = true
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
