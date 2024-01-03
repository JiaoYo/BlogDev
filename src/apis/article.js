// 封装和文章相关的接口函数
import { request } from '@/utils'
// 查询 文章分类 列表---------------------------------------------------------
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

// 查询文章列表 ---------------------------------------------------------
export function getarticleList(data) {
  return request({
    url: `/api/getArtCateList`,
    method: 'post',
    data
  })
}
// 添加文章
export function addArtCateList(data) {
  return request({
    url: `/api/addArtCateList`,
    method: 'post',
    data
  })
}
// 删除文章
export function delArtCate(id) {
  return request({
    url: `/api/delArtCate/${id}`,
    method: 'post',
  })
}
// 编辑文章
export function editArtCate(data) {
  return request({
    url: `/api/editArtCate`,
    method: 'post',
    data
  })
}

