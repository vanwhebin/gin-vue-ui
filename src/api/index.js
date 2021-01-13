import { axios } from '@/util/request'

const api = {
  login: '/auth/login',
  register: '/auth/register',
  info: '/auth/info',
  logout: '/auth/logout'
}

export default api

export function postLogin(data) {
  return axios({
    url: api.login,
    method: 'post',
    data: data
  })
}

export function postRegister(data) {
  return axios({
    url: api.register,
    method: 'post',
    data: data
  })
}

export function getUserInfo(parameter) {
  return axios({
    url: api.info,
    method: 'get',
    params: parameter
  })
}

export function getLogout() {
  return axios({
    url: api.logout,
    method: 'get'
  })
}

