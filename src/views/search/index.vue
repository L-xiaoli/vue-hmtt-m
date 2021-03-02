<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!-- 在van-search外层增加form标签, 且action不为空,即可IOS输入法显示搜索按钮 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isShowResult = false"
      />
    </form>
    <!-- / 搜索栏 -->

    <!-- 搜索结果 -->
    <search-result v-if="isShowResult" :searchText="searchText"></search-result>
    <!-- / 搜索结果 -->
    <!-- 搜索联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      @search="onSearch"
      :searchText="searchText"
    ></search-suggestion>
    <!-- / 搜索联想建议 -->
    <!-- 搜索历史记录 -->
    <search-history
      v-else
      :search-histories="searchHistories"
      @deleteAll="searchHistories = []"
      @search="onSearch"
    >
    </search-history>
    <!-- / 搜索历史记录 -->
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import SearchResult from './components/search-result.vue'
export default {
  name: 'SearchIndex',
  props: {},

  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  data() {
    return {
      searchText: '',
      isShowResult: false,
      searchHistories: []
    }
  },

  methods: {
    onSearch(val) {
      // 1.把点击的联想建议赋值给输入框
      this.searchText = val
      // 2. 搜索内容添加到历史记录里面
      // 要求：不要有重复历史记录、最新的排在最前面
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        // 存在：删除之前的数据，重新添加到数组前面
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      // 3. 展示搜索结果
      this.isShowResult = true
    },
    onCancel() {
      this.$toast('取消')
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>
