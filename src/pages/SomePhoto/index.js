import { useEffect, useState } from 'react'
import { getlist, addlist, editlist, dellist } from '@/apis/somephoto'
import { EditOutlined, DeleteOutlined,PlusOutlined } from '@ant-design/icons'
import {getNowDate} from '@/utils/useTools'
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
  Upload,
  Image 
} from 'antd'
const { TextArea } = Input;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const Acticle = () => {
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      width: 160,
    },
    {
      title: '图片',
      width: 160,
      render:(data)=>{
        return <Image.PreviewGroup
          items={data.urls}
        >
          <Image
            className='img'
            src={data.url[0].url}
          />
        </Image.PreviewGroup>
      }
    },
    {
      title: '文章内容',
      dataIndex: 'content',
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
  /**
   * 编辑
   */
  const [form] = Form.useForm()
  const onEditinfo = (data) => {
    seteditObj(data)
    setFileList(data.url)
    form.setFieldsValue({ ...data })
    setisdislog(true)
  }
  /**
   * 删除
   */
  const onConfirm = async (data) => {
    await dellist(Number(data.id))
    message.success('删除成功')
    setpagination({...pagination}) //刷新数据
  }
  /**
   * 弹框
   */
  const [isdislog, setisdislog] = useState(false)
  const showModal = () => {
    setisdislog(true)
  }
  // 编辑对象
  const [editObj, seteditObj] = useState({})

  /**
   * 
   * 提交表单
   */
  const handleOk = async (values) => {
    let arr = []
    fileList.forEach(item=>{
      if (item.url) {
        arr.push(item.url)
      }else {
        arr.push(item.response.url)
      }
    })
    values.url= JSON.stringify(arr)
    if (editObj.id) {
      let res = await editlist({ ...values, id: editObj.id })
      if (res.status === 1) {
        return message.error(`修改失败:${res.message}`)
      }
      message.success('修改成功')
    } else {
      values.time=getNowDate()
      await addlist(values)
      message.success('添加成功')
    }
    oncancel()
    setpagination({...pagination}) //刷新数据
  }
  /**
   * 表单错误回调
   *  */  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  // 关闭弹窗
  const oncancel = () => {
    setisdislog(false)
    seteditObj({})
    setFileList([])
    form.resetFields()
  }
  // 分页
  const [pagination,setpagination] = useState({
    pageSize:8,
    currentPage:1,
  })
  const onPageChange=(page)=>{
    setpagination({
      ...pagination,
      currentPage:page
    })
  }
  /**
   * 请求获取文章列表
   * 
   */
  const [articleList, setArticleList] = useState([])
  const [total,settotal] = useState(0)
  useEffect(() => {
    async function getList() {
      const res = await getlist(pagination)
      res.data.forEach(item=>{
        item.url=JSON.parse(item.url)
        item.urls=item.url
        item.url=item.url.map(url=>{
          return {url: url};
        })
      })
      setArticleList(res.data)
      settotal(res.total)
    }
    getList()
    
  }, [pagination])
  // 图片上传
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewOpen(false);
  // 预览图片
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  // 上传图片
  const handleChange = ({ fileList: newFileList }) =>{
    setFileList(newFileList)
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  // 自定义效验规则
  const checkImg =()=>{
    if (fileList.length > 0) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('请上传图片或输入图片地址!'));
  }
  return (
    <div className='active'>
      <div className='header'>
        <Button onClick={showModal} type="primary">
          添加
        </Button>
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
        width={900}
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
            label="标题"
            name="title"
            required={false}
            rules={[
              {
                required: true,
                message: '请输入标题',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            required={false}
            rules={[
              {
                required: true,
                message: '请输入内容',
              },
            ]}
          >
            <TextArea rows={6} />
          </Form.Item>
          <Form.Item
            label="图片"
            valuePropName="fileList"
            rules={[
              {
                validator: checkImg,
              },
            ]}
          >
            <Upload
                action="http://60.205.130.133:3007/api/upload"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
              <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
              <img
                alt="example"
                style={{
                  width: '100%',
                }}
                src={previewImage}
              />
            </Modal>
            <div style={{display:'flex',alignItems:"center",width:'50%'}}>
           </div>
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
