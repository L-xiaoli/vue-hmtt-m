<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onComment"
    >
      <comment-item
        v-for="(item, index) in list"
        :key="index"
        :comment="item"
      />
    </van-list>
  </div>
</template>

<script>
import { getComment } from '@/api/comment.js'
import CommentItem from './commit-item'
export default {
  name: 'CommentList',
  props: {
    source: {
      type: [String, Number, Object],
      required: true
    }
  },
  components: {
    CommentItem
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      offset: null, // 获取下一页的标记
      limit: 10 // 首次获取评论的条数
    }
  },
  created() {
    this.onComment()
  },
  methods: {
    async onComment() {
      try {
        // 1. 请求数据
        const { data } = await getComment({
          type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source.toString(), // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit // 获取的评论数据个数
        })
        // console.log(data)
        // 2. 将数据添加到列表中
        const { results } = data.data
        this.list.push(...results)
        // 将文章总数量  传递还给父组件
        this.$emit('onload-success', data.data)
        // 3. 将loading设置为false
        this.loading = false
        // 4. 判断是否还有数据 有：获取下一页的页码，无：设置finshed设置结束
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
