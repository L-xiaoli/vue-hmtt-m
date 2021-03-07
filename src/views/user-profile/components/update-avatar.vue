<template>
  <div class="update-avatar">
    <img :src="avatar" alt="" ref="img" />
    <div class="toolbar">
      <span @click="$emit('close')">取消</span>
      <span @click="confirm">完成</span>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserAvatar } from '@/api/user'
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
  data() {
    return {
      cropper: null,
      avatar: this.photo
    }
  },
  mounted() {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1, // 1:只能在裁剪的图片范围内移动,0:可超出图片范围移动（默认）
      dragMode: 'move', // move：画布和图片都可以移动，crop:剪裁区域大小区域可移动（默认）;none:只能拖动截图区域.....
      aspectRatio: 1, // 裁剪区形状（默认16/9）;1(1/1)：正方形
      autoCropArea: 1, // 自动调整裁剪图片(1/1)
      cropBoxMovable: false, // 裁剪区能否移动:禁止
      cropBoxResizable: false, // 裁剪区能否缩放:禁止
      background: false // 默认背景：关闭
    })
  },
  methods: {
    confirm() {
      // 基于服务端的裁切：getData方法 获取裁切参数
      // console.log(this.cropper.getData())
      // 基于纯客户端的裁切：getCroppedCanvas方法 获取裁切文件对象
      this.cropper.getCroppedCanvas().toBlob(blob => {
        this.updatePhoto(blob)
      })
    },
    async updatePhoto(blob) {
      try {
        const formData = new FormData()
        formData.append('photo', blob)
        const { data } = await updateUserAvatar(formData)
        this.$emit('update-avatar', data.data.photo)
        //  关闭弹层
        this.$emit('close')
        // 视图更新
        this.$emit('update-avatar', data.data.photo)
        //  提示成功
        this.$toast.success('头像修改成功！')
      } catch (error) {
        this.$toast.fail('头像修改失败！')
      }
    }
  }
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
