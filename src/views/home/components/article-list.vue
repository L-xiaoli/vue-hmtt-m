<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      success-duration="1500"
    >
      <van-list
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中Loading 效果
      finished: false, // 控制数据加载结束 效果
      timestamp: null, // 请求下一页数据的时间戳
      error: false, // 是否加载失败
      isRefreshLoading: false, // 控制下拉刷新的loading状态
      refreshSuccessText: '' // 下拉刷新提示文本
    }
  },

  methods: {
    async onLoad() {
      if (this.refreshing) {
        this.list = []
        this.refreshing = false
      }
      // 1、请求获取数据
      try {
        // 1. 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道 id
          timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })

        // 2、把请求结果数据放到list数组中
        const { results } = data.data
        this.list.push(...results)
        // 3、本次数据加载结束之后要把加载状态设置为结束
        // loading关闭以后才能触发下一次的加载更多
        this.loading = false

        // 4、 判断数据是否全部加载完成
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了,不再load加载更多数据了
          this.finished = true
        }
      } catch (err) {
        this.error = true // 开启错误提示
        this.loading = false // 关闭 loading 效果
      }
    },
    async onRefresh() {
      try {
        // 1. 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道 id
          timestamp: Date.now(), // 下拉刷新，获取最新时间戳
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        // 模拟随机失败情况
        // if (Math.random() > 0.5) {
        //   JSON.parse('ss')
        // }
        // 2、将数据加载到列表顶部
        const { results } = data.data
        this.list.unshift(...results)
        // 3、关闭下拉刷新的loading状态
        this.isRefreshLoading = false
        // 4、更新刷新成功提示文本
        this.refreshSuccessText = `刷新成功，更新了${results.length} 条数据`
      } catch (err) {
        this.isRefreshLoading = false
        this.refreshSuccessText = '刷新失败'
        this.$toast('刷新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
