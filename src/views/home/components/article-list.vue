<template>
  <div class="article-list">文章列表组件</div>
</template>

<script>
export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },

  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang="less" scoped></style>
