<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- /导航栏 -->
    <!-- 登录表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        name="mobile"
        v-model="user.mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="iconfont iconshouji"> </i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        left-icon="smile-o"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="iconfont iconyanzhengma"> </i>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="time"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            class="send-sms-btn"
            round
            size="small"
            type="default"
            native-type="button"
            @click="onSendSms"
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
import { login, sendSmsCode } from '@/api/user.js'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      isCountDownShow: false,
      time: 10 * 1000
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
      //! 在组件中必须通过this.$toast来调用组件
      //  loading 转圈圈提示
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间，默认2000(0表示持续展示不停止)
      })
      // 3、提交表单请求登录
      try {
        const { data } = await login(user)
        this.$toast.success('登录成功')
        this.$store.commit('setUser', data.data)
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('登录手机号验证码错误失败')
        } else {
          this.$toast.fail('登陆失败，请稍后重试！')
        }
      }
      // 4、根据请求响应结果处理后续操作
    },
    async onSendSms() {
      // 1. 校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (error) {
        return console.log('验证失败', error)
      }
      // 2. 验证通过，显示倒计时
      this.isCountDownShow = true
      // 3. 请求发送验证码
      try {
        const res = await sendSmsCode(this.user.mobile)
        this.$toast('发送成功')
        console.log(res)
      } catch (err) {
        // 接口访问次数受限:每手机号每分钟1次
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
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
