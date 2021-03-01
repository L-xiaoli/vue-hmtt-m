<template>
  <div class="search-suggestion">
    <van-cell title="搜索联想建议" icon="search" />
    <van-cell title="搜索联想建议" icon="search" />
  </div>
</template>

<script>
export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },
  watch: {
    searchText: {
      handler(searchText) {
        console.log(searchText)
      },
      immediate: true // 该回调将会在侦听开始之后被立即调用
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped></style>
