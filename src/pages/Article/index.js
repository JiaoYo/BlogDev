import { useEffect, useState } from 'react'
import { getarticleList, addArtCateList, editlist, delArtCate } from '@/apis/article'
import { EditOutlined, DeleteOutlined,PlusOutlined,LoadingOutlined } from '@ant-design/icons'
import {getNowDate} from '@/utils/useTools'
import useClass from '@/hooks/useClass'
import Editor from '@/components/Editor';
import {
  Table,
  Input,
  Space,
  Modal,
  Button,
  Form,
  Popconfirm,
  message,
  Select,
  Upload
} from 'antd'
const Acticle = () => {
  const columns = [
    {
      title: '标题',
      dataIndex: 'name',
      width: 220,
    },
    {
      title: '文章简介',
      width: 160,
      dataIndex: 'synopsis',
    },
    {
      title: '文章分类',
      width: 160,
      dataIndex: 'classify',
    },
    {
      title: '创建时间',
      width: 160,
      dataIndex: 'time',
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
  // 删除文章
  const onConfirm = async (data) => {
    await delArtCate(Number(data.id))
    message.success('删除成功')
    setArticleList(
      articleList.filter((item) => {
        return item.id !== data.id
      })
    )
  }
  // 弹框
  const [isdislog, setisdislog] = useState(false)
  const showModal = () => {
    setisdislog(true)
  }
  // 获取频道列表
  const {channelList} =useClass()
  const { Option } = Select
  // 编辑对象
  const [recordobject, setIsRecord] = useState({})
  // 获取文章列表
  const [articleList, setArticleList] = useState([])
  // 提交表单
  const handleOk = async (values) => {
    values.time=getNowDate()
    if (recordobject.id) {
      let res = await editlist({ ...values, id: recordobject.id })
      if (res.status === 1) {
        return message.error(`修改失败:${res.message}`)
      }
      message.success('修改成功')
    } else {
      values.url=imageUrl
      await addArtCateList(values)
      message.success('添加成功')
    }
    setisdislog(false)
    setArticleList([...articleList, values])
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  // 上传图片
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    getBase64(file, (url) => {
      setLoading(false);
      setImageUrl(url);
    });
    return isJpgOrPng && isLt2M;
  };
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  // 图片上传加载动画
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        选择图片
      </div>
    </div>
  );


  // 通过组件传回来的值，设置组件的值
  const setDetails = content => form.setFieldsValue({'content': content})
  useEffect(() => {
    async function getList() {
      const res = await getarticleList()
      setArticleList(res.data)
    }
    if (isdislog) {
      form.setFieldsValue({ ...recordobject })
    } else {
      getList()
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
      width={1000}
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
            maxWidth: 1000,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleOk}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="文章名称"
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
            label="文章简介"
            name="synopsis"
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
            label="文章分类"
            name="classify"
            rules={[
              {
                required: true,
                message: '请选择文章分类',
              },
            ]}
          >
           <Select
              placeholder="请选择文章分类"
              style={{ width: 120 }}
            >
              {channelList.map(item => <Option key={item.id} value={item.name}>{item.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item
            label="文章封面"
            name="url"
            rules={[
              {
                required: true,
                message: '请上传封面',
              },
            ]}
          >
             <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
          </Form.Item>
          <Form.Item  label="文章内容"  name="content">
          <Editor
            setDetails={setDetails}
           />
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
