<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(suggestion, index) in suggestions"
      :key="index"
      icon="search"
      @click="$emit('search', suggestion.title)"
    >
      <div slot="title" v-html="highlightText(suggestion.title)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search.js'
// lodash 支持按需加载，有利于打包结果优化
import { debounce } from 'lodash'
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
      handler: debounce(function(searchText) {
        this.loadSearchSuggestion(searchText)
      }, 1000),
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
    },
    highlightText(text) {
      const highlightStr = `<span class="highlight">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr)
    }
  }
}
</script>

<style lang="less" scoped>
.search-suggestion {
  /deep/ span.highlight {
    color: red;
  }
}
</style>
