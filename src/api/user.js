
import request from '@/utils/request'
export default {
  getAdmin: function(data) {
    console.log(data)
    return request({
      url: `/BlAdmin/login`,
      method: 'post',
      data
    })
  }
}
export function login(bladmin) {
  console.log('发送前的数据：')
  console.log(bladmin)
  return request({
    url: '/BlAdmin/login',
    method: 'POST',
    data: bladmin
  })
}

export function getInfo() {
  return request({
    url: '/BlAdmin/info',
    method: 'GET'
  })
}
export function logout() {
  return request({
    url: '/logout',
    method: 'POST'
  })
}

