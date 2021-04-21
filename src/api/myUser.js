import request from '@/utils/request'
var group_name = 'user'
export default {
  register(user) { // 用户登录
    return request({
      url: `/${group_name}/register`,
      method: 'post',
      data: user
    })
  },
  login(user) { // 用户登录
    return request({
      url: `/${group_name}/login`,
      method: 'post',
      data: user
    })
  },
  logout() { // 用户注销登录
    return request({
      url: `/${group_name}/logout`,
      method: 'post',
      data: ''
    })
  },
  save(user) { // 添加
    return request({
      url: `/${group_name}/save`,
      method: 'post',
      data: user
    })
  },
  getByPage(page) { // 前台查询
    return request({
      url: `/${group_name}/getByPage`,
      method: 'post',
      data: page
    })
  },
  update(user) { // 更新
    return request({
      url: `/${group_name}/update`,
      method: 'put',
      data: user
    })
  },
  resetPwd(userIds) { // 重置密码
    return request({
      url: `/${group_name}/resetPwd`,
      method: 'put',
      data: userIds
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
  commentAndCollectionCount() {
    return request({
      url: `/${group_name}/commentAndCollectionCount`,
      method: 'get'
    })
  },
  upfile: function(data) {
    console.log(data)
    return request({
      url: `/upload/test`,
      method: 'post',
      data
    })
  }
}
