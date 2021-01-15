import { axios } from '@/util/request'

const api = {
  getDetail: '/posts/',
  postList: '/posts/list'
}

export function postList(parameter) {
  return axios({
    url: api.postList,
    method: 'post',
    params: parameter
  })
}

export function getDetail(postID, parameter) {
  return axios({
    url: api.getDetail + postID,
    method: 'get',
    params: parameter
  })
}
