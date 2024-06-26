// axios的封装处理
import axios from 'axios'
import { getToken, removeToken } from './token'
import router from '@/router'
import { message } from 'antd'
// 1. 根域名配置
// 2. 超时时间
// 3. 请求拦截器 / 响应拦截器

const request = axios.create({
  baseURL: 'http://www.jy2002.love:3007',
  // baseURL: 'http://127.0.0.1:3007',
  timeout: 5000,
})

// 添加请求拦截器
// 在请求发送之前 做拦截 插入一些自定义的配置 [参数的处理]
request.interceptors.request.use(
  (config) => {
    // 操作这个config 注入token数据
    // 1. 获取到token
    // 2. 按照后端的格式要求做token拼接
    const token = getToken() //请求携带token
    if (token) {
      config.headers.Authorization = `${token}`
      config.headers['Content-Type'] =
        'application/x-www-form-urlencoded;charset=utf-8'
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
// 在响应返回到客户端之前 做拦截 重点处理返回的数据
request.interceptors.response.use(
  (response) => {
    if (response.data.message === "无权限！") {
      // removeToken();
      // router.navigate('/login');
      return;
  } else if (response.data.status === 1) {
      message.error(response.data.message);
      return;
  }
  return response.data;
  },
  (error) => {
    message.warning(error.response.data.message)
    return Promise.reject().catch(e =>{
      return new Promise(() => {})
    })
  }
)

export { request }
