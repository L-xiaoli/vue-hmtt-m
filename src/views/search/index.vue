<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!-- 在van-search外层增加form标签, 且action不为空,即可IOS输入法显示搜索按钮 -->
    <form action="/">
      <van-search
        v-model="value"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <!-- / 搜索栏 -->

    <!-- 搜索历史记录 -->
    <search-history></search-history>
    <!-- / 搜索历史记录 -->

    <!-- 搜索联想建议 -->
    <search-suggestion></search-suggestion>
    <!-- / 搜索联想建议 -->

    <!-- 历史结果 -->

    <search-result></search-result>
    <!-- / 历史结果 -->
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
      value: ''
    }
  },

  methods: {
    onSearch(val) {
      this.$toast(val)
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
