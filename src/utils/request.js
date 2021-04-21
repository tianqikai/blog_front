import axios from 'axios'
import store from '@/store'
// import qs from 'qs'
import { MessageBox, Message } from 'element-ui'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // baseURL: 'http://localhost:1002/api',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    console.log('设置axios请求拦截器')
    config.headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = getToken()
    }
    console.log(config)
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// 设置axios请求拦截器
// 拦截器中，可以对请求进行一些统一化的操作
service.interceptors.request.use(
  config => {
    console.log('设置axios请求拦截器')
    config.headers = {
      'Content-Type': 'application/json;charset=UTF-8'
      // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
    }
    console.log('请求报文:')
    console.log(config)
    // 统一设置请求头
    return config
  },
  err => {
    console.log(err)
    // Message.error('请求失败！')
    return Promise.reject('请求异常！')
  }
)
// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    console.log(res)
    // if the custom code is not 20000, it is judged as an error.
    if (res.code && res.code !== 20000) {
      if (res.message === undefined || res.message === '') {
        res.message = res.msg
      }
      if (res.code === 40003) {
        // 未登录
        store.commit('SET_USER', {})
      }
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
