<template>
  <div class="update-avatar">
    <img :src="photo" alt="" />
    <div class="toolbar">
      <span @click="$emit('close')">取消</span>
      <span>完成</span>
    </div>
  </div>
</template>

<script>
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
  methods: {}
}
</script>

<style lang="less" scoped>
.update-avatar {
  background: #000;
  width: 50%;
  height: 50%;
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
