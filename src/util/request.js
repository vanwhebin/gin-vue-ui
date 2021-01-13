// import Vue from 'vue'
import axios from 'axios'
// import store from '@/store'

import defaultSetting from '@/config/defaultSetting'
import apiSetting from '@/config/apiSetting'
import { localGet } from '@/util/storage'

// 创建 axios 实例
const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? process.env.VUE_APP_API_BASE_URL : apiSetting.baseUrl,
  timeout: 3000
})

const errHandler = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = localGet(defaultSetting.ACCESS_TOKEN)
    console.log(data)
    console.log(token)
    if (error.response.status === 403) {
      // notification.error({
      //   message: 'Forbidden',
      //   description: data.message
      // })
    }
    // if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
    //   notification.error({
    //     message: 'Unauthorized',
    //     description: 'Authorization verification failed'
    //   })
    //   if (token) {
    //     store.dispatch('Logout')
    //       .then(() => {
    //         setTimeout(() => {
    //           window.location.reload()
    //         }, 1500)
    //       })
    //   }
    // }
  }
  return Promise.reject(error)
}

// request interceptor
instance.interceptors.request.use(config => {
  const token = localGet(defaultSetting.ACCESS_TOKEN)
  if (token) {
    const authHeader = apiSetting.authHeader
    config.headers[authHeader] = apiSetting.authHeaderValuePrefix + token
  }
  return config
}, errHandler)

// response interceptor
instance.interceptors.response.use((response) => {
  return response.data
}, errHandler)

export {
  instance as axios
}
