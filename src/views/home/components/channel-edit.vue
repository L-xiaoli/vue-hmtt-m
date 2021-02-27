<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell class="title-text" title="我的频道" :border="false">
      <van-button class="edit-btn" size="mini" round type="danger" plain
        >编辑</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="channel in myChannels"
        :key="channel.id"
        icon="clear"
        :text="channel.name"
      />
    </van-grid>
    <!-- 我的频道 -->
    <!-- 频道推荐 -->
    <van-cell class="title-text" title="频道推荐" :border="false"> </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item "
        v-for="value in 8"
        :key="value"
        icon="plus"
        text="文字"
      />
    </van-grid>
    <!--/ 频道推荐 -->
  </div>
</template>

<script>
import { getChannels } from '@/api/user'
export default {
  name: 'channelEdit',

  data() {
    return {
      myChannels: [] // 频道列表
    }
  },
  created() {
    this.getChannels()
  },
  methods: {
    async getChannels() {
      try {
        const { data } = await getChannels()
        console.log(data)
        this.myChannels = data.data.channels
      } catch (error) {
        this.$toast('获取频道列表数据失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;

  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/.grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text {
        font-size: 28px;
        color: #222;
        margin-top: 0px;
      }
    }

    .van-icon-clear {
      position: absolute;
      right: -10px;
      top: -10px;
      font-size: 30px;
      color: #ccc;
      z-index: 2;
    }
  }
  /deep/ .recommend-grid {
    .van-grid-item__content {
      flex-direction: row;
      color: #222;
      .van-icon-plus {
        font-size: 32px;
        margin-right: 6px;
        margin-top: -2px;
      }
    }
  }
}
</style>
