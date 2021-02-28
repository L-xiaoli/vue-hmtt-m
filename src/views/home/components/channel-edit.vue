<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell class="title-text" title="我的频道" :border="false">
      <van-button
        class="edit-btn"
        size="mini"
        round
        type="danger"
        plain
        @click="isShowEdit = !isShowEdit"
        >{{ isShowEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, i) in myChannels"
        :key="channel.id"
        @click="onMyChannelClick(channel, i)"
      >
        <!-- <van-icon v-show="isShowEdit && i !== 0" slot="icon" name="clear" /> -->
        <van-icon
          v-show="isShowEdit && !fixChannel.includes(channel.id)"
          slot="icon"
          name="clear"
        />
        <van-icon
          v-show="isShowEdit && !fixChannel.includes(channel.id)"
          slot="icon"
          name="clear"
        />
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
        v-for="(channel, i) in getRecommendChannels"
        :key="i"
        icon="plus"
        :text="channel.name"
        @click="addChannel(channel)"
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
      allChannels: [], // 所有频道数据
      isShowEdit: false, // 删除图标是否显示
      fixChannel: [0] // 固定频道（不允许删除）
    }
  },
  created() {
    this.loadAllChannels()
  },
  computed: {
    // 计算属性：观测依赖数据的变化
    // 若依赖的数据发生变化，则计算属性会重新运算获取最新的数据。
    getRecommendChannels() {
      return this.allChannels.filter(channel => {
        // return 一个boolean值（符合条件的第一个元素）
        return !this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
      })
    }
  },
  methods: {
    // 获取获取所有频道数据
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (error) {
        this.$toast('获取所有频道数据失败！')
      }
    },
    // 添加频道到我的频道
    addChannel(channel) {
      console.log(channel)
      this.myChannels.push(channel)
    },
    onMyChannelClick(channel, i) {
      // 判断是否为推荐,不能删除推荐
      if (i === 0) return
      if (this.isShowEdit) {
        // 编辑器状态：删除频道
        if (i <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
        this.myChannels.splice(i, 1)
      } else {
        // 非编辑器状态：切换频道
        this.$emit('update-active', i, false)
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
    .van-grid-item__icon-wrapper {
      position: unset;
    }
    /deep/.van-icon-clear {
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
