/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'

const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn/', // 接口的基准路径
  // baseURL: 'https://gitee.com/ifercarly/tt',
  transformResponse: [
    function(data) {
      // Do whatever you want to transform the data
      /* 处理后端返回的数据 */
      try {
        return JSONBig.parse(data)
      } catch (error) {
        return data
      }
    }
  ]
})

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    // config ：本次请求的配置对象
    // config 里面有一个属性：headers
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// 响应拦截器

export default request
