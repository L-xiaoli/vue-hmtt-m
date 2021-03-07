<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="个人信息">
      <van-icon slot="left" name="cross" @click="$router.push('/my')" />
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 个人信息 -->
    <input type="file" hidden ref="inputFile" @change="inputChange" />
    <van-cell title="头像" is-link @click="$refs.inputFile.click()">
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>

    <van-cell
      title="昵称"
      is-link
      :value="user.name"
      @click="isUpdateNameShow = true"
    />
    <van-cell
      title="性别"
      is-link
      :value="user.gender === 0 ? '男' : '女'"
      @click="isUpdateGenderShow = true"
    />
    <van-cell
      title="生日"
      is-link
      :value="user.birthday"
      @click="isUpdateBirthdayShow = true"
    />
    <!-- /个人信息 -->

    <!-- 昵称弹出层 -->
    <van-popup
      v-model="isUpdateNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-name
        v-if="isUpdateNameShow"
        v-model="user.name"
        @close="isUpdateNameShow = false"
        @update-name="user.name = $event"
      />
    </van-popup>
    <!-- / 昵称弹出层 -->
    <!-- 性别弹出层 -->
    <van-popup v-model="isUpdateGenderShow" position="bottom">
      <update-gender
        v-if="isUpdateGenderShow"
        v-model="user.gender"
        @close="isUpdateGenderShow = false"
        @update-gender="user.gender = $event"
      />
    </van-popup>
    <!-- / 性别弹出层 -->
    <!-- 生日弹出层 -->
    <van-popup v-model="isUpdateBirthdayShow" position="bottom">
      <update-birthday
        v-if="isUpdateBirthdayShow"
        v-model="user.birthday"
        @close="isUpdateBirthdayShow = false"
        @update-gender="user.birthday = $event"
      />
    </van-popup>
    <!-- / 生日弹出层 -->
    <!-- 头像弹出层 -->
    <van-popup
      class="avatar-popup"
      v-model="isUpdateAvatarShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-avatar
        v-if="isUpdateAvatarShow"
        v-model="user.photo"
        @close="isUpdateAvatarShow = false"
      />
    </van-popup>
    <!-- / 头像弹出层 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdateBirthday from './components/update-birthday'
import UpdateAvatar from './components/update-avatar'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdateAvatar
  },
  data() {
    return {
      user: {}, // 用户个人信息
      isUpdateNameShow: false, // 修改昵称弹出层
      isUpdateGenderShow: false, // 修改性别弹出层
      isUpdateBirthdayShow: false, // 修改生日弹出层
      isUpdateAvatarShow: false // 修改头像弹出层
    }
  },
  created() {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile()
        // console.log(data)
        this.user = data.data
      } catch (error) {
        this.$toast.fail('获取个人信息失败！')
      }
    },
    // 上传图片事件
    inputChange() {
      console.log(1)
      // 获取文件对象
      const file = this.$refs.inputFile.files[0]
      // 获取blob数据
      const imgUrl = window.URL.createObjectURL(file)
      console.log(imgUrl)
      // 打开弹出层
      this.isUpdateAvatarShow = true
    }
  }
}
</script>

<style lang="less" scoped>
.user-profile {
  .avatar {
    height: 60px;
    width: 60px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
  /deep/.van-uploader,
  /deep/.van-uploader__input-wrapper {
    width: 100%;
  }
  .avatar-popup {
    background: #000;
  }
}
</style>
