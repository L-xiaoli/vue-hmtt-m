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
        @click="onMyChannelClick(i)"
      >
        <!-- <van-icon v-show="isShowEdit && i !== 0" slot="icon" name="clear" /> -->
        <van-icon
          v-show="isShowEdit && !fixChannel.includes(channel.id)"
          slot="icon"
          name="clear"
          @click="removeChannel(channel, i)"
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
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel
} from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'
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
    ...mapState(['user']),
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
    // 点击添加频道
    async addChannel(channel) {
      if (this.user) {
        try {
          // 已登录，数据存储到线上
          const mychannel = await addUserChannel({
            id: channel.id, // 频道 id
            seq: this.myChannels.length // 频道的 序号
          })
          this.myChannels.push(mychannel)
          this.$toast('添加成功')
        } catch (err) {
          this.$toast('添加失败')
        }
      } else {
        // 未登陆
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },

    onMyChannelClick(i) {
      if (!this.isShowEdit) {
        // 非编辑器状态：切换频道
        this.$emit('update-active', i, false)
      }
    },
    // 编辑器状态：点击图标删除频道
    async removeChannel(channel, i) {
      if (i <= this.active) {
        this.$emit('update-active', this.active - 1, true)
      }
      this.myChannels.splice(i, 1)
      if (this.user) {
        try {
          // 已登录，将数据存储到线上
          await deleteUserChannel(channel.id)
          this.$toast('删除成功')
        } catch (error) {
          this.$toast('删除失败')
        }
      } else {
        // 未登录，将数据存储到本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
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
