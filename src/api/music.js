import request from '@/utils/request'
var group_name = 'music'
export default {
  getList(page) { // 前台查询
    return request({
      url: `/${group_name}/getList`,
      method: 'get',
      data: page
    })
  }
}
