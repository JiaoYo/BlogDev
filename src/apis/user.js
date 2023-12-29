// 用户相关的所有请求
import { request } from '@/utils'
// 1. 登录
export function login(data) {
  return request({
    url: '/api/login',
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  })
}
// 注册账号
export function register(data) {
  return request({
    url: '/api/reguser',
    method: 'POST',
    data,
  })
}
// 2. 获取用户信息
export function getProfileAPI() {
  return request({
    url: '/my/userinfo',
    method: 'GET',
  })
}
// 更新用户信息
export function editlist(data) {
  return request({
    url: '/api/editlist',
    method: 'POST',
    data,
  })
}
// 重置密码
export function updatepwdAPI(data) {
  return request({
    url: '/updatepwd',
    method: 'POST',
    data,
  })
}
// 更改头像
export function updateavatarAPI(data) {
  return request({
    url: '/update/avatar',
    method: 'POST',
    data,
  })
}
//获取全部用户信息
export function getlist(data) {
  return request({
    url: '/api/getlist',
    method: 'POST',
    data,
  })
}
// 删除用户
export function dellist(data) {
  return request({
    url: `/api/dellist`,
    method: 'post',
    data,
  })
}
