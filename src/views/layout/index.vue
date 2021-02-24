<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />
    <!-- / 子路由出口 -->
    <!-- 标签导航栏  route：开启路由模式-->
    <van-tabbar class="layout-tabbar" v-model="active" route>
      <van-tabbar-item to="/">
        <i slot="icon" class="toutiao toutiao-shouye"> </i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/question">
        <i slot="icon" class="toutiao toutiao-wenda"> </i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="toutiao toutiao-shipin "> </i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="toutiao toutiao-wode"> </i>
        <span class="text">{{ user ? '我的' : '未登录' }}</span>
      </van-tabbar-item>
    </van-tabbar>
    <!-- / 标签导航栏 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'layoutIndex',

  data() {
    return {
      active: 0
    }
  },
  computed: {
    ...mapState(['user'])
  },

  methods: {}
}
</script>

<style lang="less" scoped>
.layout-container {
  .layout-tabbar {
    i.toutiao {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>
