<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(suggestion, index) in suggestions"
      :key="index"
      :title="suggestion.title"
      icon="search"
    />
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search.js'
export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  watch: {
    searchText: {
      handler(searchText) {
        this.loadSearchSuggestion(searchText)
      },
      immediate: true // 该回调将会在侦听开始之后被立即调用
    }
  },
  methods: {
    async loadSearchSuggestion(q) {
      try {
        const { data } = await getSearchSuggestion(q)
        this.suggestions = data.data.results
      } catch {
        this.$toast('获取失败')
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
