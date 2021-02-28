<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
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
    <!--  swipe-threshold (默认5)滚动阈值，标签数量超过阈值且总宽度超过标签栏宽度时开始横向滚动 -->
    <van-tabs
      class="channel-tabs"
      v-model="active"
      animated
      swipeable
      swipe-threshold="3"
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
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isEditChannelShow = true"
      >
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- / 频道列表 -->
    <van-popup
      v-model="isEditChannelShow"
      closeable
      round
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <channel-edit
        :active="active"
        :myChannels="channels"
        @update-active="updateActive"
      />
    </van-popup>
  </div>
</template>

<script>
import { getChannels } from '@/api/user'
import ArticleList from './components/article-list.vue'
import channelEdit from './components/channel-edit'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    channelEdit
  },
  data() {
    return {
      active: 0,
      channels: [], // 频道列表
      isEditChannelShow: false // 弹出层是否显示
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
      } catch (error) {
        this.$toast('获取频道列表数据失败')
      }
    },
    // 切换频道
    updateActive(i, isShow) {
      this.active = i // 当前频道高亮并切换
      this.isEditChannelShow = isShow // 关闭弹出层
    }
  }
}
</script>

<style lang="less">
// ! vue scoped 深度操作符：>>> /deep/ ::v-deep
// 解决scoped属性带来的问题（vue中的scoped属性给相应的DOM结构和CSS选择器都加上了标识，这个唯一的标记保证了唯一性，从而达到了样式的
.home-container {
  padding-top: 174px;
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
    .van-tabs__content {
      // 响应式布局单位：vm vh
      // vw:1vw=布局视口宽度的1%
      // vh:1vh=布局视口高度度的1%
      min-height: 79vh;
    }
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      z-index: 1;
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
