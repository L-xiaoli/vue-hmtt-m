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
    <search-history v-else> </search-history>
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
      isShowResult: false
    }
  },

  methods: {
    onSearch(val) {
      console.log(val)
      this.searchText = val // 把点击的联想建议赋值给输入框
      this.isShowResult = true // 展示搜索结果
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
