import Vue from 'vue'
import dayjs from 'dayjs'

// 加载中文语言包（默认英文）
import 'dayjs/locale/zh-cn'

// 导入使用处理相对时间的插件
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)

// 配置使用中文语言包
dayjs.locale('zh-cn')

// 全局过滤器：处理相对时间
// 使用方式： {{ 表达式 | 过滤器名称 }}
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
