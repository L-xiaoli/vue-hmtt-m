<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar">
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        >搜索
      </van-button>
    </van-nav-bar>
    <!-- /导航栏 -->
  </div>
</template>

<script>
export default {
  name: 'HomeIndex',

  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang="less" scoped>
// ! vue scoped 深度操作符：>>> /deep/ ::v-deep
// 解决scoped属性带来的问题（vue中的scoped属性给相应的DOM结构和CSS选择器都加上了标识，这个唯一的标记保证了唯一性，从而达到了样式的
.home-container {
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #54a7ff;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
}
</style>
