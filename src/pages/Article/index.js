import { useEffect, useState } from 'react'
import { getarticleList, addArtCateList, editArtCate, delArtCate } from '@/apis/article'
import { upload } from '@/apis/user'
import { EditOutlined, DeleteOutlined,PlusOutlined,LoadingOutlined } from '@ant-design/icons'
import {getNowDate} from '@/utils/useTools'
import useClass from '@/hooks/useClass'
import Editor from '@/components/Editor';
import './index.scss'
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
    },
    {
      title: '文章简介',
      dataIndex: 'synopsis',
    },
    {
      title: '文章分类',
      width: 100,
      render: (data) => {
        return (
          <>
            { channelList.filter(item=>item.id===data.classify*1)[0]?.name }
          </>
        )
      }
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
    setcontent(data.content)
    seteditObj(data)
    setImageUrl(data.url)
    form.setFieldsValue({ ...data,classify:data.classify*1 })
    setisdislog(true)
  }
  // 删除文章
  const onConfirm = async (data) => {
    await delArtCate(Number(data.id))
    message.success('删除成功')
    setpagination({...pagination}) //刷新数据
  }
  // 弹框
  const [isdislog, setisdislog] = useState(false)
  const showModal = () => {
    setisdislog(true)
  }
  // 切换分类
  const onChange = (value) => {
    setpagination({...pagination,classify:value})
  };
  // 频道列表
  const {channelList} =useClass()
  const { Option } = Select
  // 编辑对象
  const [editObj, seteditObj] = useState({})

  // 提交表单
  const handleOk = async (values) => {
    values.url=imageUrl 
    if (editObj.id) {
      let res = await editArtCate({ ...values, id: editObj.id })
      if (res.status === 1) {
        return message.error(`修改失败:${res.message}`)
      }
      message.success('修改成功')
    } else {
      values.time=getNowDate()
      await addArtCateList(values)
      message.success('添加成功')
    }
    oncancel()
    setpagination({...pagination}) //刷新数据
  }
  /* 表单错误回调 */
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  // 关闭弹窗
  const oncancel = () => {
    setisdislog(false)
    seteditObj({})
    setcontent(null)
    setImageUrl('')
    form.resetFields()
  }
  // 通过组件传回来的值，设置组件的值
  const setDetails = content => form.setFieldsValue({'content': content})
  const [content,setcontent] =useState(null) // 编辑器内容

  // 分页
  const [pagination,setpagination] = useState({
    pageSize:8,
    currentPage:1,
    classify:''
  })
  const onPageChange=(page)=>{
    setpagination({
      ...pagination,
      currentPage:page
    })
  }
  const [articleList, setArticleList] = useState([])
  const [total,settotal] = useState(0)
  useEffect(() => {
    // 请求获取文章列表
    async function getList() {
      const res = await getarticleList(pagination)
      setArticleList(res.data)
      settotal(res.total)
    }
    getList()
  }, [pagination])
  // 图片上传
  const customRequest= async(options)=>{
    setLoading(true);
    const { file } = options;
    const formData = new FormData();
    formData.append('file', file);
    const {url}= await upload(formData)
    setLoading(false);
    setImageUrl(url)
  }
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
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
  // 自定义效验规则
  const checkImg =()=>{
    if (imageUrl) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('请上传图片或输入图片地址!'));
  }
  const checkContent =()=>{
    if (content) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('请输入文章内容!'));
  }
  return (
    <div className='active'>
      <div className='header'>
        <Button onClick={showModal} type="primary">
          添加
        </Button>
        <Select  onChange={onChange} placeholder="选择分类" allowClear
          fieldNames={
            {label: 'name', value: 'id'}
          }
          options={channelList}>
        </Select>
      </div>
      <div>
        <Table
        rowKey={record => record.id}
          columns={columns}
          dataSource={articleList}
          pagination={{
            total: total,
            pageSize: pagination.pageSize,
            onChange: onPageChange,
            showTitle: true,
            showTotal: (total) => `共 ${total} 条数据`,
          }}
        ></Table>
      </div>
       <Modal
        width={1000}
        title={editObj.id ? '编辑' : '添加'}
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
        onCancel={oncancel}
      >
        <Form
          name="xxx"
          form={form}
          style={{
            maxWidth: 1000,
            marginTop: 20,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleOk}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          scrollToFirstError
        >
          <Form.Item
            label="文章名称"
            name="name"
            required={false}
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
            required={false}
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
            required={false}
            rules={[
              {
                required: true,
                message: '请选择文章分类',
              },
            ]}
          >
           <Select
              placeholder="请选择文章分类"
              style={{ width: 180 }}
            >
              {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item
            label="文章封面"
            name="imageUrl"
            rules={[
              {
                validator: checkImg,
              },
            ]}
          >
             <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              customRequest={customRequest}
               >
                 {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
            <div style={{display:'flex',alignItems:"center",width:'50%'}}>
            <Input value={imageUrl} placeholder='添加图片地址' allowClear onChange={(val)=>setImageUrl(val.target.value)}/>
            <Button style={{marginLeft:'10px'}} type="primary"   onClick={()=>setImageUrl('http://101.201.58.143:3007/api/映日.jpeg')}>使用默认</Button>
           </div>
          </Form.Item>
          <Form.Item  label="文章内容"  name="content"   rules={[
              {
                validator: checkContent,
              },
            ]}>
          <Editor
            setDetails={setDetails}
            value={content}
           />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 12,
              span: 12,
            }}
          >
            <Button type="primary" htmlType="submit" size='large'>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
export default Acticle
