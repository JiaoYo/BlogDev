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
              description="确认要删除当前文章吗?"
              onConfirm={() => onConfirm(data)}
              okText="Yes"
              cancelText="No"
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

  const [list, setList] = useState([])
  // 删除
  const onConfirm = async (data) => {
    await dellist({ id: data.id })
    message.success('删除成功')
    setList(
      list.filter((item) => {
        return item.id !== data.id
      })
    )
  }

  // 弹出层
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }

  // 编辑
  const onEditinfo = (data) => {
    setIsRecord(data)
    setIsModalOpen(true)
  }

  const [recordobject, setIsRecord] = useState({})
  const [form] = Form.useForm()
  // 提交表单
  const handleOk = async (values) => {
    console.log(values)
    if (recordobject.id) {
      let res = await editlist({ ...values, id: recordobject.id })
      if (res.status === 1) {
        return message.error(`修改失败:${res.message}`)
      }
      message.success('修改成功')
    } else {
      await register(values)
      message.success('添加成功')
    }
    setIsModalOpen(false)
    setIsRecord(values)
    // setList([...list, values])
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  // const [obj, setobj] = useState({
  //   pageSize: 2,
  //   currentPage: 1,
  //   total: 0,
  // })
  const [total, setTotal] = useState(0)
  const [currentPage, setcurrentPage] = useState(1)
  const [pageSize, setpageSize] = useState(5)

  const onPageChange = (page, pageSize) => {
    console.log(page)
    // setobj({
    //   pageSize,
    //   currentPage: page,
    // })
    setcurrentPage(page)
  }
  const [search, setSearch] = useState(null)
  useEffect(() => {
    // 获取文章列表
    async function getlistx() {
      let res = await getlist({
        message: search,
        pageSize: pageSize,
        currentPage: currentPage,
      })
      res.data &&
        res.data.forEach((item) => {
          item.user_pic = item.user_pic || require('@/assets/def.jpg')
        })
      // setobj({
      //   total: res.total,
      // })
      setTotal(res.total)
      setList(res.data)
    }
    if (isModalOpen) {
      form.setFieldsValue({ ...recordobject })
    } else {
      getlistx()
    }
  }, [recordobject, search, currentPage])
  return (
    <>
      <div className="btnbox">
        <Button onClick={showModal} type="primary">
          添加
        </Button>
        <Input onInput={(val) => setSearch(val.target.value)} value={search} />
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={list}
        pagination={{
          total: total,
          pageSize: pageSize,
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
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Article
