/**
 * 文章评论模块
 */
import request from '@/utils/request'
/**
 * 获取文章评论
 */
export const getComment = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}
/**
 * 发表评论
 */
// export const addComment = params => {
//   return request({
//     method: 'POST',
//     url: ' /app/v1_0/comments',
//     data: {
//       params
//     }
//   })
// }
