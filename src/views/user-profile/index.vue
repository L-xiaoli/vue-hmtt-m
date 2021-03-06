<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="个人信息">
      <van-icon slot="left" name="cross" @click="$router.push('/my')" />
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 个人信息 -->
    <van-cell title="头像" is-link>
      <van-image
        class="avator"
        round
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
    </van-cell>
    <van-cell title="昵称" is-link value="内容" />
    <van-cell title="性别" is-link value="内容" />
    <van-cell title="生日" is-link value="内容" />
    <!-- /个人信息 -->
  </div>
</template>

<script>
export default {
  name: 'UserProfile',

  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang="less" scoped>
.user-profile {
  .avator {
    height: 60px;
    width: 60px;
  }
}
</style>
