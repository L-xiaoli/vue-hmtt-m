<template>
  <div class="update-avator">
    <van-uploader :after-read="afterRead" />
  </div>
</template>

<script>
// import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateAvator',
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
    }
  }
}
</script>

<style lang="less" scoped></style>
