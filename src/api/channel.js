/**
 * 获取所有频道数据
 */
import request from '@/utils/request'
// 获取所有频道数据
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
