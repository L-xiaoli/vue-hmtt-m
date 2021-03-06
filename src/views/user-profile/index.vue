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
    <van-cell title="昵称" is-link :value="user.name" />
    <van-cell title="性别" is-link :value="user.gender === 0 ? '男' : '女'" />
    <van-cell title="生日" is-link :value="user.birthday" />
    <!-- /个人信息 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
export default {
  name: 'UserProfile',

  data() {
    return {
      user: {} // 用户个人信息
    }
  },
  created() {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile()
        console.log(data)
        this.user = data.data
      } catch (error) {
        this.$toast.fail('获取个人信息失败！')
      }
    }
  }
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
