import { useEffect, useState } from 'react'
import {
  Table,
  Input,
  Space,
  Modal,
  Button,
  Form,
  Popconfirm,
  message,
} from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { register, dellist, getlist, editlist } from '@/apis/user'
import './index.scss'
const Article = () => {
  const columns = [
    {
      title: '账号',
      dataIndex: 'username',
      width: 220,
    },
    {
      title: '昵称',
      width: 160,
      render: (data) => {
        return (
          <>
            <div className="passwordC">
              <div>{data.nickname}</div>
            </div>
          </>
        )
      },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: 220,
    },
    {
      title: '头像',
      width: 220,
      render: (data) => {
        return (
          <>
            <div className="imgbox">
              <img
                onError={(e) => {
                  e.target.src = require('@/assets/def.jpg')
                }}
                alt="头像"
                src={data.user_pic}
              ></img>
            </div>
          </>
        )
      },
    },
    {
      title: '操作',
      render: (data) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => onEditinfo(data)}
            />
            <Popconfirm
              title="删除文章"
              description="确认要删除当前用户吗?"
              onConfirm={() => onConfirm(data)}
              okText="是"
              cancelText="否"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      },
    },
  ]
  // 删除
  const onConfirm = async (data) => {
    await dellist({ id: data.id })
    message.success('删除成功')
    if (list.length === 1 && pageobj.currentPage > 1) {
      pageobj.currentPage--
    }
    pagesetobj({
      ...pageobj
    })
  }
  // 编辑
  const onEditinfo = (data) => {
    setIsRecord(data)
    form.setFieldsValue({ ...data })
    setIsModalOpen(true)
  }
  // 弹出层
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }
  const [recordobject, setIsRecord] = useState({})
  const [form] = Form.useForm()
  // 添加和修改
  const handleOk = async (values) => {
    if (recordobject.id) {
      let res = await editlist({ ...values, id: recordobject.id })
      if (res.status === 1) {
        return message.error(`修改失败:${res.message}`)
      }
    } else {
      await register(values)
    }
    message.success(`${recordobject.id ? '编辑' : '添加'}成功`)
    setIsModalOpen(false)
    setIsRecord(values)
    pagesetobj({ ...pageobj })
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  const [pageobj, pagesetobj] = useState({
    pageSize: 7,
    currentPage: 1,
    message: ''
  })
  const [total, setTotal] = useState(0)
  const onPageChange = (page, pageSize) => {
    pagesetobj({
      ...pageobj,
      currentPage: page
    })
  }
  // 获取文章列表
  const [list, setList] = useState([])
  const getlistx = async () => {
    let res = await getlist({
      ...pageobj
    })
    res.data &&
      res.data.forEach((item) => {
        item.user_pic = item.user_pic || require('@/assets/def.jpg')
      })
    setTotal(res.total)
    setList(res.data)
  }
  useEffect(() => {
    getlistx()
  }, [pageobj])
  return (
    <div className='home'>
      <div className="header">
        <Button onClick={showModal} type="primary">
          添加
        </Button>
        <Input placeholder='搜索' allowClear onChange={(val) => pagesetobj({ ...pageobj, message: val.target.value })} />
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={list}
        pagination={{
          total: total,
          pageSize: pageobj.pageSize,
          showTitle: true,
          showTotal: (total) => `共${total}条`,
          onChange: onPageChange,
        }}
      />
      <Modal
        title={recordobject.id ? '编辑' : '添加'}
        okButtonProps={{
          style: {
            display: 'none',
          },
        }}
        cancelButtonProps={{
          style: {
            display: 'none',
          },
        }}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false)
          setIsRecord({})
          form.resetFields()
        }}
      >
        <Form
          name="xxx"
          form={form}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleOk}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="账号"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入账号',
              },
              {
                min: 6,
                max: 12,
                message: '请输入6-12位账号',
              },
            ]}
          >
            <Input />
          </Form.Item>
          {!recordobject.id && (
            <Form.Item
              label="密码"
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入密码!',
                },
                {
                  min: 6,
                  max: 12,
                  message: '请输入6-12位密码',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          )}

          <Form.Item
            label="昵称"
            name="nickname"
            rules={[
              {
                required: true,
                message: '请输入昵称!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              {
                required: true,
                message: '请输入邮箱!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Article
