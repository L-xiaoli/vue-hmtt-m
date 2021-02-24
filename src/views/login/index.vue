<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- /导航栏 -->
    <!-- 登录表单 -->
    <van-form @submit="onSubmit">
      <van-field name="手机号" v-model="user.mobile" placeholder="请输入手机号">
        <i slot="left-icon" class="iconfont iconshouji"> </i>
      </van-field>
      <van-field
        v-model="user.code"
        type="password"
        name="验证码"
        left-icon="smile-o"
        placeholder="请输入验证码"
      >
        <i slot="left-icon" class="iconfont iconyanzhengma"> </i>
        <template #button>
          <van-button class="send-sms-btn" round size="small" type="default"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="default" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
    <!-- / 登录表单 -->
  </div>
</template>

<script>
import { login } from '@/api/user.js'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      // 1、截取表单数据
      const user = this.user
      // 2、表单验证
      // 3、提交表单请求登录
      try {
        const res = await login(user)
        console.log('登录成功', res)
      } catch (err) {
        if (err.response.status === 400) {
          console.log('登录手机号验证码错误失败', err)
        } else {
          console.log('登陆失败，请稍后重试！', err)
        }
      }
      // 4、根据请求响应结果处理后续操作
    }
  }
}
</script>

<style scoped lang="less">
.iconfont {
  font-size: 37px;
  margin-right: 10px;
}
.send-sms-btn {
  width: 152px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 22px;
  color: #666;
}
.login-btn-wrap {
  padding: 53px 33px;
  .login-btn {
    background-color: #66b1ff;
    border: none;
    color: #fff;
    border-radius: 10px;
  }
}
</style>
