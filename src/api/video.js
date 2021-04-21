import request from '@/utils/request'
var group_name = 'video'
export default {
  save(video) { // 添加
    return request({
      url: `/${group_name}/save`,
      method: 'post',
      data: video
    })
  },
  update(video) { // 更新
    return request({
      url: `/${group_name}/update`,
      method: 'put',
      data: video
    })
  },
  deleteById(id) { // 删除
    return request({
      url: `/${group_name}/delete/${id}`,
      method: 'delete'
    })
  },
  get(id) { // 根据id查询
    return request({
      url: `/${group_name}/get/${id}`,
      method: 'get'
    })
  },
  enableById(id) { // 启用
    return request({
      url: `/${group_name}/enable/${id}`,
      method: 'put'
    })
  },
  getByPage(page) { // 前台查询
    return request({
      url: `/${group_name}/getByPage`,
      method: 'post',
      data: page
    })
  },
  disableById(id) { // 弃用
    return request({
      url: `/${group_name}/disable/${id}`,
      method: 'put'
    })
  }
}
