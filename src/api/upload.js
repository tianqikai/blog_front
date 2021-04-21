import request from '@/utils/request'
export default {
  upfile: function(data) {
    console.log(data)
    return request({
      url: `upload/uploadImage`,
      method: 'post',
      data
    })
  },
  delfile: function(data) {
    console.log(data)
    return request({
      url: `upload/delfile`,
      method: 'post',
      data
    })
  }
}
