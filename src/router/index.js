// 路由配置
import Layout from '@/pages/Layout' // src/pages/layout
import Login from '@/pages/Login'
import { createBrowserRouter } from 'react-router-dom'
import { AuthRoute } from '@/components/AuthRoute'
import { Suspense, lazy } from 'react'

// 1. lazy函数对组件进行导入
const Home = lazy(() => import('@/pages/Home'))
const Classify = lazy(() => import('@/pages/Classify'))
const Article = lazy(() => import('@/pages/Article'))
const Share = lazy(() => import('@/pages/Share'))
const SomePhoto =lazy(()=> import('@/pages/SomePhoto'))
// 配置路由实例

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthRoute>
        {' '}
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={'加载中'}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'article',
        element: (
          <Suspense fallback={'加载中'}>
            <Article />
          </Suspense>
        ),
      },
      {
        path: 'classify',
        element: (
          <Suspense fallback={'加载中'}>
            <Classify />
          </Suspense>
        ),
      },
      {
        path: 'share',
        element: (
          <Suspense fallback={'加载中'}>
            <Share />
          </Suspense>
        ),
      },
      {
        path: 'somephoto',
        element: (
          <Suspense fallback={'加载中'}>
            <SomePhoto />
          </Suspense>
        ),
      },
      
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export default router
