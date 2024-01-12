// 封装和网站分享相关的接口函数
import { request } from '@/utils'
// 查询网站 列表---------------------------------------------------------
export function getsharelist(data) {
  return request({
    url: '/api/getshare',
    method: 'post',
    data
  })
}
//添加网站
export function addshare(data) {
  return request({
    url: '/api/addshare',
    method: 'post',
    data
  })
}
// 编辑网站
export function editshare(data) {
  return request({
    url: '/api/editshare',
    method: 'post',
    data
  })
}
// 删除网站
export function delshare(data) {
  return request({
    url: `/api/delshare/${data}`,
    method: 'post',
    data
  })
}


// 获取网站分类
export function getsharecatelist() {
  return request({
    url: '/api/getsharecate',
    method: 'get',
  })
}

// 添加网站分类
export function addsharecate(data) {
  return request({
    url: '/api/addsharecate',
    method: 'post',
    data
  })
}
//  编辑网站分类
export function editsharecate(data) {
  return request({
    url: '/api/editsharecate',
    method: 'post',
    data
  })
}
// 删除网站分类
export function delsharecate(data) {
  return request({
    url: `/api/delsharecate/${data}`,
    method: 'post',
    data
  })
}