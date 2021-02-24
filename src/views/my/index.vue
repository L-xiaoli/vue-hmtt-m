<template>
  <div class="my-container">
    <div class="header not-login">
      <div class="loginBtn" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" alt="" />
        <span>登录 / 注册</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyIndex',

  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang="less" scoped>
.my-container {
  .header {
    height: 361px;
    background: url('~@/assets/banner.png');
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .loginBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img {
        width: 132px;
        height: 132px;
      }
      span {
        color: #fff;
        font-size: 28px;
      }
    }
  }
}
</style>
