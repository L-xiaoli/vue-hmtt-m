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
    <!-- 频道列表 -->
    <van-tabs
      class="channel-tabs"
      v-model="active"
      animated
      swipeable
      color="#3296fa"
      line-width="15px"
      line-height="3px"
      title-inactive-colo="#777"
      title-active-color="#333"
    >
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
      >
        <article-list :channel="channel" />
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- / 频道列表 -->
  </div>
</template>

<script>
import { getChannels } from '@/api/user'
import ArticleList from './components/article-list.vue'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList
  },
  data() {
    return {
      active: 0,
      channels: [] // 频道列表
    }
  },
  created() {
    this.getChannels()
  },

  methods: {
    async getChannels() {
      try {
        const { data } = await getChannels()
        this.channels = data.data.channels
        console.log(data)
      } catch (error) {
        this.$toast('获取频道列表数据失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
// ! vue scoped 深度操作符：>>> /deep/ ::v-deep
// 解决scoped属性带来的问题（vue中的scoped属性给相应的DOM结构和CSS选择器都加上了标识，这个唯一的标记保证了唯一性，从而达到了样式的
.home-container {
  padding-bottom: 100px;
  /deep/ .van-nav-bar__title {
    max-width: unset !important;
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
  /deep/ .channel-tabs {
    .van-tabs_wraps {
      height: 82px;
    }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      bottom: 8px;
      // width: 31px !important;
      // height: 6px;
    }

    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }

    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: rgba(255, 255, 255, 0.9);
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        content: '';
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
