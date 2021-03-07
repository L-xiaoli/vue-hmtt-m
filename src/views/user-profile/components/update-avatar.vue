<template>
  <div class="update-avatar">
    <img :src="photo" alt="" ref="img" />
    <div class="toolbar">
      <span @click="$emit('close')">取消</span>
      <span>完成</span>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
// import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateAvatar',
  model: {
    prop: 'photo',
    event: 'update-avatar' // 默认是 input
  },
  props: {
    photo: {
      typp: [String, Object],
      required: true
    }
  },
  mounted() {
    const image = this.$refs.img
    const cropper = new Cropper(image, {
      viewMode: 1, // 1:只能在裁剪的图片范围内移动,0:可超出图片范围移动（默认）
      dragMode: 'move', // move：画布和图片都可以移动，crop:剪裁区域大小区域可移动（默认）;none:只能拖动截图区域.....
      aspectRatio: 1, // 裁剪区形状（默认16/9）;1(1/1)：正方形
      autoCropArea: 1, // 自动调整裁剪图片(1/1)
      cropBoxMovable: false, // 裁剪区能否移动:禁止
      cropBoxResizable: false, // 裁剪区能否缩放:禁止
      background: false // 默认背景：关闭
    })
    console.log(cropper)
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.update-avatar {
  background: #000;
  width: 100%;
  height: 100%;
  .toolbar {
    position: fixed;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 32px;
    color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
  }
}
</style>
