<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoadResults"
    >
      <van-cell v-for="result in list" :key="result.id" :title="result.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search.js'
export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      require: true
    }
  },

  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false, // 是否加载失败
      page: 1, // 否,页数，不传默认为1
      perPage: 10 // 否,页数量，不传每页数量由后端决定
    }
  },

  methods: {
    async onLoadResults() {
      try {
        // 1. 请求获取数据
        const { data } = await getSearchResults({
          page: this.page, // 页码
          per_page: this.perPage, // 每页大小
          q: this.searchText // 搜索关键字
        })
        // 模拟随机失败情况
        // if (Math.random() > 0.5) {
        //   JSON.parse('ss')
        // }
        // 2. 将数据添加到列表中
        const { results } = data.data
        this.list.push(...results)

        // 3. 设置加载状态结束
        this.loading = false

        // 4. 判断数据是否加载完毕
        if (results.length) {
          this.page++ // 更新获取下一页数据的页码
        } else {
          this.finished = true // 没有数据了，将加载状态设置结束，不再 onLoad
        }
      } catch (err) {
        this.$toast('数据获取失败')
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
