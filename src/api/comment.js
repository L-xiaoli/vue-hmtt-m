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
 * 对评论或评论回复点赞
 */
export const addCommentLike = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target
    }
  })
}

/**
 * 取消对评论或评论回复点赞
 */

export const deleteCommentLike = commentId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${commentId}`
  })
}
