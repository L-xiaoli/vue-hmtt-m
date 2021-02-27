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
        v-for="(channel, i) in myChannels"
        :key="channel.id"
        icon="clear"
      >
        <span class="text" :class="{ active: active === i }" slot="text">{{
          channel.name
        }}</span>
      </van-grid-item>
    </van-grid>
    <!-- 我的频道 -->
    <!-- 频道推荐 -->
    <van-cell class="title-text" title="频道推荐" :border="false"> </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item  "
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
import { getAllChannels } from '@/api/channel'
export default {
  name: 'channelEdit',
  props: {
    myChannels: {
      channels: {
        type: Object,
        required: true
      }
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannels: [] // 所有频道数据
    }
  },
  created() {
    this.loadAllChannels()
  },
  methods: {
    // 获取获取所有频道数据
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
        console.log(this.allChannels)
      } catch (error) {
        this.$toast('获取所有频道数据失败！')
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
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0px;
      }
      .active {
        color: red;
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
