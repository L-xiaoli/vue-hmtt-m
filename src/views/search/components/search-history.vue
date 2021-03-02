<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="ishowAllDelete">
        <span @click="$emit('deleteAll')" class="delete">全部删除</span>
        <span @click="ishowAllDelete = false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="ishowAllDelete = true" />
    </van-cell>
    <van-cell
      v-for="(history, index) in searchHistories"
      :key="index"
      :title="history"
      @click="searchHistory(history)"
    >
      <van-icon name="close" v-if="ishowAllDelete" @click="deleteThis(index)" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      ishowAllDelete: false
    }
  },

  methods: {
    // 根据索引删除某条记录
    deleteThis(index) {
      this.searchHistories.splice(index, 1)
    },
    searchHistory(HistoryItem) {
      if (!this.ishowAllDelete) {
        this.$emit('search', HistoryItem)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-history {
  .delete {
    margin-right: 10px;
  }
}
</style>
