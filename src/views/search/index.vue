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
      />
    </form>
    <!-- / 搜索栏 -->

    <!-- 历史结果 -->
    <search-result v-if="isShowResult"></search-result>
    <!-- / 历史结果 -->
    <!-- 搜索联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      :searchText="searchText"
    ></search-suggestion>
    <!-- / 搜索联想建议 -->
    <!-- 搜索历史记录 -->
    <search-history v-else></search-history>
    <!-- / 搜索历史记录 -->
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import SearchResult from './components/search-result.vue'

export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  data() {
    return {
      searchText: '',
      isShowResult: false
    }
  },

  methods: {
    onSearch(val) {
      this.$toast(val)
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
