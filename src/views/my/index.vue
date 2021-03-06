<template>
  <div class="my-container">
    <!-- 登录状态 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image class="avator" round fit="cover" :src="userInfo.photo" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round to="/user/profile">编辑资料</van-button>
        </div>
      </div>
      <div class="data-status">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录状态 -->
    <div v-else class="header not-login">
      <div
        class="loginBtn"
        @click="
          $router.push({
            name: 'login',
            query: {
              redirect: '/my'
            }
          })
        "
      >
        <img src="~@/assets/mobile.png" alt="" />
        <span>登录 / 注册</span>
      </div>
    </div>

    <!--宫格导航 收藏历史 -->
    <van-grid class="grid-nav" :border="false" clickable :column-num="2">
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"> </i>
        <span slot="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text">历史</span>
      </van-grid-item>
    </van-grid>
    <van-cell title="消息通知" is-link />
    <van-cell class="mb-9" title="小智同学" is-link />
    <van-cell
      v-if="user"
      class="logout-cell"
      title="退出登录"
      clickable
      @click="onLogout"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',

  data() {
    return {
      userInfo: {} // 用户信息
    }
  },
  created() {
    // 初始化的时候，如果用户登录了，我才请求获取当前登录用户的信息
    if (this.user) {
      this.loadUser()
    }
  },
  computed: {
    ...mapState(['user'])
  },

  methods: {
    onLogout() {
      // 退出时的提示
      this.$dialog
        .confirm({
          title: '确认退出？'
        })
        .then(() => {
          // confirm 确认
          // 确认退出：清除登录（state.user + 本地的user）
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // cancel 取消
          console.log(2)
        })
    },
    async loadUser() {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (err) {
        console.log(err)
        this.$toast('获取数据失败')
      }
    }
  }
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
      right {
        .van-button__text {
          padding: 0 10px;
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
  .grid-nav {
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span {
        font-size: 28px;
      }
    }
  }

  .logout-cell {
    text-align: center;
    color: #d86262;
  }

  .mb-9 {
    margin-bottom: 9px;
  }
}
</style>
