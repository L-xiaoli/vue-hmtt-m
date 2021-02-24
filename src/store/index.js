import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const TOKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    // 一个对象，存储当前登录的用户信息（token等数据）
    user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      window.localStorage.setItem(TOKEN_KEY, JSON.stringify(data))
    }
    // 数据持久化 把数据备份存储到本地
  },
  actions: {},
  modules: {}
})
