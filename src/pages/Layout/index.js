import { Layout, Menu, Popconfirm } from 'antd'
import { HomeOutlined, DiffOutlined, LogoutOutlined } from '@ant-design/icons'
import './index.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserInfo, clearUserInfo } from '@/store/modules/user'

const { Header, Sider } = Layout

const items = [
  {
    label: '账号管理',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: '文章分类',
    key: '/Classify',
    icon: <DiffOutlined />,
  },
  {
    label: '文章列表',
    key: '/article',
    icon: <DiffOutlined />,
  },
]

const GeekLayout = () => {
  const navigate = useNavigate()
  const onMenuClick = (route) => {
    // console.log('菜单被点击了', route)
    const path = route.key
    navigate(path)
  }

  // 反向高亮
  // 1. 获取当前路由路径
  const location = useLocation()
  // console.log(location.pathname)
  const selectedkey = location.pathname

  // 触发个人用户信息action
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch])

  // 退出登录确认回调
  const onConfirm = () => {
    console.log('确认退出')
    dispatch(clearUserInfo())
    navigate('/login')
  }

  const name = useSelector((state) => state.user.userInfo.username)
  return (
    <Layout>
      <Header className="header">
        <div className="logo" >后台管理 </div>
        <div className="user-info">
          <span className="user-name">{name}</span>
          <span className="user-logout">
            <Popconfirm
              title="是否确认退出？"
              okText="退出"
              cancelText="取消"
              onConfirm={onConfirm}
            >
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={selectedkey}
            onClick={onMenuClick}
            items={items}
            style={{ height: '100%', borderRight: 0 }}
          ></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级路由的出口 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}
export default GeekLayout
