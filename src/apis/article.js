// 封装和文章相关的接口函数
// 查询
import { request } from '@/utils'
export function getlist() {
  return request({
    url: '/my/article/cates',
    method: 'GET',
  })
}
// 添加
export function addlist(data) {
  return request({
    url: '/my/article/addcate',
    method: 'post',
    data,
  })
}
// 编辑
export function editlist(data) {
  return request({
    url: `/my/article/editcate`,
    method: 'post',
    data,
  })
}
//删除
export function dellist(data) {
  return request({
    url: `/my/article/delcate/${data}`,
    method: 'get',
  })
}
