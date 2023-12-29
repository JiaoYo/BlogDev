import { useEffect, useState } from 'react'
import { getlist, addlist, editlist, dellist } from '@/apis/article'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
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
const Acticle = () => {
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      width: 220,
    },
    {
      title: '别名',
      width: 160,
      dataIndex: 'alias',
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
  const [form] = Form.useForm()
  const onEditinfo = (data) => {
    setIsRecord(data)
    setisdislog(true)
  }
  const onConfirm = async (data) => {
    await dellist(Number(data.id))
    message.success('删除成功')
    setArticleList(
      articleList.filter((item) => {
        return item.id !== data.id
      })
    )
  }
  const [isdislog, setisdislog] = useState(false)
  const showModal = () => {
    setisdislog(true)
  }
  const [recordobject, setIsRecord] = useState({})
  const [articleList, setArticleList] = useState([])
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
      await addlist(values)
      message.success('添加成功')
    }
    setisdislog(false)
    setArticleList([...articleList, values])
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  useEffect(() => {
    async function getarticleList() {
      const res = await getlist()
      setArticleList(res.data)
    }
    if (isdislog) {
      form.setFieldsValue({ ...recordobject })
    } else {
      getarticleList()
    }
  }, [articleList.length, recordobject])
  return (
    <>
      <div>
        <Button onClick={showModal} type="primary">
          添加
        </Button>
      </div>
      <div>
        <Table
          rowKey={(record, index) => index}
          columns={columns}
          dataSource={articleList}
        ></Table>
      </div>
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
        open={isdislog}
        onCancel={() => {
          setisdislog(false)
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
            label="名称"
            name="name"
            rules={[
              {
                required: true,
                message: '请输入名称',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="别名"
            name="alias"
            rules={[
              {
                required: true,
                message: '请输入别名!',
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
export default Acticle
