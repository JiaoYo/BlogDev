// 封装和文章相关的接口函数
import { request } from '@/utils'
// 查询 随拍 列表---------------------------------------------------------
export function getlist(data) {
  return request({
    url: '/api/nojwt/getsomePhtoto',
    method: 'post',
    data
  })
}
// 添加
export function addlist(data) {
  return request({
    url: '/api/addsomePhtoto',
    method: 'post',
    data,
  })
}
// 编辑
export function editlist(data) {
  return request({
    url: `/api/editsomePhtoto`,
    method: 'post',
    data,
  })
}
//删除
export function dellist(data) {
  return request({
    url: `/api/delsomePhtoto/${data}`,
    method: 'post',
  })
}
//切换
export function checkoutType (data) {
  return request({
    url: `/api/checkoutSomePhoto/${data}`,
    method: 'post',
  })
}