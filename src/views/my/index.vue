<template>
  <div class="my-container">
    <!-- 未登录状态 -->
    <div class="header not-login">
      <div class="loginBtn" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" alt="" />
        <span>登录 / 注册</span>
      </div>
    </div>
    <!-- 登录状态 -->
    <div class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image
            class="avator"
            round
            fit="cover"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
          <span>黑马头条</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-status">
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">动态</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">获赞</span>
        </div>
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
  .user-info {
    justify-content: space-between;
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        justify-content: center;
        align-items: center;
        .avator {
          height: 132px;
          width: 132px;
          border: 4px solid #fff;
        }
        span {
          font-size: 30px;
          color: #fff;
          margin-left: 23px;
        }
      }
    }
    .data-status {
      display: flex;
      .data-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        height: 130px;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
}
</style>
