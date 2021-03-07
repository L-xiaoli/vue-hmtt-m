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
      aspectRatio: 16 / 9,
      crop(event) {
        console.log(event.detail.x)
        console.log(event.detail.y)
        console.log(event.detail.width)
        console.log(event.detail.height)
        console.log(event.detail.rotate)
        console.log(event.detail.scaleX)
        console.log(event.detail.scaleY)
      }
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
