<template>
  <div class="search-container">
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
  </div>
</template>

<script>
export default {
  name: 'SearchIndex',

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
